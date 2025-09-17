import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DOMAIN = 'https://kweconomics.com';
const lastmod = new Date().toISOString().split('T')[0];

function extractServiceSlugs() {
  const file = path.join(__dirname, 'src', 'data', 'services.ts');
  const text = fs.readFileSync(file, 'utf-8');
  const slugs = [];
  const re = /slug:\s*"([a-z0-9-]+)"/g;
  let m;
  while ((m = re.exec(text))) {
    slugs.push(m[1]);
  }
  return Array.from(new Set(slugs)).map(slug => ({ slug }));
}

function extractStatesAllCities() {
  const file = path.join(__dirname, 'src', 'data', 'allStatesLocations.ts');
  const text = fs.readFileSync(file, 'utf-8');

  const states = [];
  const stateRe = /name:\s*"[^"]+"[\s\S]*?slug:\s*"([a-z0-9-]+)"[\s\S]*?cities:\s*\[([\s\S]*?)\]/g;
  const citySlugRe = /slug:\s*"([a-z0-9-]+)"/g;
  let s;
  while ((s = stateRe.exec(text))) {
    const stateSlug = s[1];
    const citiesBlock = s[2];
    const cities = [];
    let c;
    while ((c = citySlugRe.exec(citiesBlock))) {
      cities.push({ slug: c[1] });
    }
    if (stateSlug && cities.length) states.push({ slug: stateSlug, cities });
  }
  return states;
}

function generateSitemap() {
  const urls = [];
  const services = extractServiceSlugs();
  const states = extractStatesAllCities();

  // Optional content readiness gating
  let readyMap = new Map();
  try {
    const readinessMod = fs.readFileSync(path.join(__dirname, 'src', 'data', 'contentReadiness.ts'), 'utf-8');
    // Extract all 'state:city' occurrences across the file (covers initializer + later additions)
    const allMatches = Array.from(readinessMod.matchAll(/['"`]([a-z0-9-]+:[a-z0-9-]+)['"`]/g));
    allMatches.forEach(m => readyMap.set(m[1], true));
  } catch {}

  const staticPages = [
    { path: '/', priority: 1.0, changefreq: 'weekly' },
    { path: '/services', priority: 0.9, changefreq: 'weekly' },
    { path: '/advisory', priority: 0.9, changefreq: 'weekly' },
    { path: '/about', priority: 0.8, changefreq: 'monthly' },
    { path: '/experience', priority: 0.8, changefreq: 'monthly' },
    { path: '/contact', priority: 0.9, changefreq: 'monthly' },
    { path: '/case-studies', priority: 0.7, changefreq: 'monthly' },
    { path: '/schedule-consultation', priority: 0.8, changefreq: 'monthly' },
    { path: '/emergency-consultation', priority: 0.8, changefreq: 'monthly' },
    { path: '/locations', priority: 0.9, changefreq: 'weekly' },
  ];

  staticPages.forEach(page => {
    urls.push({ loc: `${DOMAIN}${page.path}`, lastmod, changefreq: page.changefreq, priority: page.priority });
  });

  services.forEach(service => {
    urls.push({ loc: `${DOMAIN}/services/${service.slug}`, lastmod, changefreq: 'weekly', priority: 0.8 });
  });

  states.forEach(state => {
    urls.push({ loc: `${DOMAIN}/${state.slug}`, lastmod, changefreq: 'monthly', priority: 0.7 });
    state.cities.forEach(city => {
      // Gate service-location URLs to contentReady only; always include city overview URL
      urls.push({ loc: `${DOMAIN}/${state.slug}/${city.slug}`, lastmod, changefreq: 'monthly', priority: 0.6 });
      const key = `${state.slug}:${city.slug}`;
      const isReady = readyMap.size === 0 ? true : readyMap.has(key);
      if (isReady) {
        services.forEach(service => {
          urls.push({ loc: `${DOMAIN}/services/${service.slug}/${state.slug}/${city.slug}`, lastmod, changefreq: 'monthly', priority: 0.5 });
        });
      }
    });
  });

  const xmlUrls = urls.map(url => `  <url>\n    <loc>${url.loc}</loc>\n    <lastmod>${url.lastmod}</lastmod>\n    <changefreq>${url.changefreq}</changefreq>\n    <priority>${url.priority}</priority>\n  </url>`).join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${xmlUrls}\n</urlset>`;

  return { urls, xml, count: urls.length, stats: { services: services.length, states: states.length, cities: states.reduce((s, st) => s + st.cities.length, 0) } };
}

const { urls, xml, count, stats } = generateSitemap();
const sitemapDir = path.join(__dirname, 'public');
fs.mkdirSync(sitemapDir, { recursive: true });

// Split into multiple sitemaps if needed (50k max per file)
const CHUNK_SIZE = 45000;
if (count <= CHUNK_SIZE) {
  const publicPath = path.join(sitemapDir, 'sitemap.xml');
  fs.writeFileSync(publicPath, xml, 'utf-8');
  // Also create an index referencing the single sitemap
  const indexXml = `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <sitemap>\n    <loc>${DOMAIN}/sitemap.xml</loc>\n    <lastmod>${lastmod}</lastmod>\n  </sitemap>\n</sitemapindex>`;
  fs.writeFileSync(path.join(sitemapDir, 'sitemap-index.xml'), indexXml, 'utf-8');
  console.log('✅ Sitemap generated successfully!');
  console.log('================================');
  console.log(`📊 Total URLs: ${count}`);
  console.log(`   - Service hub pages: ${stats.services}`);
  console.log(`   - State pages: ${stats.states}`);
  console.log(`   - City pages: ${stats.cities}`);
  console.log('================================');
  console.log(`📁 Saved to: ${publicPath}`);
} else {
  const parts = Math.ceil(count / CHUNK_SIZE);
  for (let i = 0; i < parts; i++) {
    const chunk = urls.slice(i * CHUNK_SIZE, (i + 1) * CHUNK_SIZE);
    const xmlUrls = chunk.map(url => `  <url>\n    <loc>${url.loc}</loc>\n    <lastmod>${url.lastmod}</lastmod>\n    <changefreq>${url.changefreq}</changefreq>\n    <priority>${url.priority}</priority>\n  </url>`).join('\n');
    const chunkXml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${xmlUrls}\n</urlset>`;
    const partPath = path.join(sitemapDir, `sitemap-part-${i + 1}.xml`);
    fs.writeFileSync(partPath, chunkXml, 'utf-8');
  }
  const indexEntries = Array.from({ length: Math.ceil(count / CHUNK_SIZE) }, (_, i) => `  <sitemap>\n    <loc>${DOMAIN}/sitemap-part-${i + 1}.xml</loc>\n    <lastmod>${lastmod}</lastmod>\n  </sitemap>`).join('\n');
  const indexXml = `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${indexEntries}\n</sitemapindex>`;
  fs.writeFileSync(path.join(sitemapDir, 'sitemap-index.xml'), indexXml, 'utf-8');
  // Write the index also to sitemap.xml for compatibility
  fs.writeFileSync(path.join(sitemapDir, 'sitemap.xml'), indexXml, 'utf-8');
  console.log(`✅ Generated ${Math.ceil(count / CHUNK_SIZE)} sitemap parts and index`);
  console.log('================================');
  console.log(`📊 Total URLs: ${count}`);
  console.log(`   - Service hub pages: ${stats.services}`);
  console.log(`   - State pages: ${stats.states}`);
  console.log(`   - City pages: ${stats.cities}`);
  console.log('================================');
  console.log(`📁 Saved to: ${sitemapDir}/sitemap-index.xml`);
}
