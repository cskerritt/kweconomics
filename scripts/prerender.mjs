#!/usr/bin/env node
/*
  Simple prerender for Vite SPA using Puppeteer.
  - Serves ./dist locally
  - Builds a route list from services and states data files
  - Navigates each route and writes static HTML to dist/<route>/index.html
*/
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DIST_DIR = path.resolve(__dirname, '..', 'dist');
const SRC_DIR = path.resolve(__dirname, '..', 'src');
const PORT = process.env.PRERENDER_PORT ? Number(process.env.PRERENDER_PORT) : 4182;
const ORIGIN = `http://localhost:${PORT}`;

function contentTypeFor(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  switch (ext) {
    case '.html': return 'text/html; charset=utf-8';
    case '.js': return 'application/javascript; charset=utf-8';
    case '.css': return 'text/css; charset=utf-8';
    case '.svg': return 'image/svg+xml';
    case '.png': return 'image/png';
    case '.jpg':
    case '.jpeg': return 'image/jpeg';
    case '.webp': return 'image/webp';
    case '.ico': return 'image/x-icon';
    case '.json': return 'application/json; charset=utf-8';
    default: return 'application/octet-stream';
  }
}

function startStaticServer() {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      const reqUrl = decodeURI(req.url || '/');
      const safePath = reqUrl.split('?')[0].split('#')[0];
      let filePath = path.join(DIST_DIR, safePath);

      // If path is directory-like, try index.html
      if (!path.extname(filePath)) {
        filePath = path.join(filePath, 'index.html');
      }

      // If the file exists, serve it; else serve root index.html (SPA fallback)
      fs.stat(filePath, (err, stats) => {
        if (!err && stats.isFile()) {
          fs.readFile(filePath, (err2, data) => {
            if (err2) {
              res.writeHead(500);
              res.end('Internal Server Error');
              return;
            }
            res.writeHead(200, { 'Content-Type': contentTypeFor(filePath) });
            res.end(data);
          });
        } else {
          const fallback = path.join(DIST_DIR, 'index.html');
          fs.readFile(fallback, (err3, data) => {
            if (err3) {
              res.writeHead(404);
              res.end('Not Found');
              return;
            }
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(data);
          });
        }
      });
    }).listen(PORT, () => resolve(server));
  });
}

function extractServiceSlugs() {
  const file = path.join(SRC_DIR, 'data', 'services.ts');
  const text = fs.readFileSync(file, 'utf-8');
  const slugs = new Set();
  const re = /slug:\s*"([a-z0-9-]+)"/g;
  let m;
  while ((m = re.exec(text))) {
    slugs.add(m[1]);
  }
  return Array.from(slugs);
}

function extractStatesAndSampleCities(maxCitiesPerState = 3) {
  const file = path.join(SRC_DIR, 'data', 'allStatesLocations.ts');
  const lines = fs.readFileSync(file, 'utf-8').split(/\r?\n/);
  const states = [];
  let inState = false;
  let gotStateSlug = false;
  let inCities = false;
  let stateSlug = '';
  let citySlugs = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const nameMatch = line.match(/^\s*name:\s*"[^"]+"/);
    if (!inState && nameMatch) {
      inState = true;
      gotStateSlug = false;
      inCities = false;
      stateSlug = '';
      citySlugs = [];
      continue;
    }
    if (inState && !gotStateSlug) {
      const slugMatch = line.match(/^\s*slug:\s*"([a-z0-9-]+)"/);
      if (slugMatch) {
        stateSlug = slugMatch[1];
        gotStateSlug = true;
        continue;
      }
    }
    if (inState && line.includes('cities: [')) {
      inCities = true;
      continue;
    }
    if (inCities) {
      const cMatch = line.match(/slug:\s*"([a-z0-9-]+)"/);
      if (cMatch && citySlugs.length < maxCitiesPerState) {
        citySlugs.push(cMatch[1]);
      }
      if (line.includes(']')) {
        // End of this state's cities block; finalize this state
        if (stateSlug) {
          states.push({ slug: stateSlug, cities: citySlugs.slice() });
        }
        inState = false;
        inCities = false;
      }
    }
  }
  return states;
}

function buildRoutes() {
  const routes = new Set([
    '/',
    '/services',
    '/about',
    '/experience',
    '/contact',
    '/case-studies',
    '/schedule-consultation',
    '/locations'
  ]);

  // Service hubs
  const serviceSlugs = extractServiceSlugs();
  serviceSlugs.forEach(slug => routes.add(`/services/${slug}`));

  // States and a sample of cities
  const citiesPerStateEnv = process.env.PRERENDER_CITIES_PER_STATE || 'all';
  const maxCities = citiesPerStateEnv === 'all' ? Number.MAX_SAFE_INTEGER : parseInt(citiesPerStateEnv, 10) || 3;
  let states = extractStatesAndSampleCities(maxCities);
  // Optional batching to manage build time
  const batchTotal = parseInt(process.env.PRERENDER_BATCH_TOTAL || '0', 10);
  const batchIndex = parseInt(process.env.PRERENDER_BATCH_INDEX || '0', 10);
  if (batchTotal > 0) {
    states = states.filter((_, i) => (i % batchTotal) === (batchIndex % batchTotal));
    console.log(`Prerender batching: index ${batchIndex}/${batchTotal} -> ${states.length} state groups`);
  }
  states.forEach(s => {
    routes.add(`/${s.slug}`);
    s.cities.forEach(city => routes.add(`/${s.slug}/${city}`));
  });

  // Service-location combos: configurable size
  const servicesPerStateEnv = process.env.PRERENDER_SERVICES_PER_STATE || 'all';
  const sampleServices = servicesPerStateEnv === 'all' ? serviceSlugs : serviceSlugs.slice(0, parseInt(servicesPerStateEnv, 10) || 2);
  states.forEach(s => {
    const sampleCities = s.cities.slice(0, maxCities);
    sampleServices.forEach(svc => {
      sampleCities.forEach(city => routes.add(`/services/${svc}/${s.slug}/${city}`));
    });
  });

  return Array.from(routes);
}

async function prerenderRoute(browser, route) {
  const url = `${ORIGIN}${route}`;
  const page = await browser.newPage();
  try {
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 });
    // Wait until head contains a title (Helmet applied)
    await page.waitForFunction(() => !!document.title, { timeout: 15000 });
    const html = await page.content();

    let outPath = route === '/' ? path.join(DIST_DIR, 'index.html')
      : path.join(DIST_DIR, route.replace(/^\//, ''), 'index.html');

    // Ensure folder exists
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, html, 'utf-8');
    console.log(`✔ prerendered ${route}`);
  } catch (err) {
    console.warn(`✖ failed ${route}: ${err.message}`);
  } finally {
    await page.close();
  }
}

async function main() {
  if (!fs.existsSync(DIST_DIR)) {
    console.error('dist/ not found. Build first (vite build) or run npm run build:prerender');
    process.exit(1);
  }

  const server = await startStaticServer();
  try {
    const routes = buildRoutes();
    console.log(`Prerendering ${routes.length} routes...`);
    const browser = await puppeteer.launch({ headless: 'new' });
    for (const r of routes) {
      // eslint-disable-next-line no-await-in-loop
      await prerenderRoute(browser, r);
    }
    await browser.close();
    console.log('✅ Prerender complete');
  } finally {
    server.close();
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
