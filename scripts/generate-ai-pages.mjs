#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ORIGIN = 'https://kweconomics.com';

// Helpers to extract data from TS files without a TS runtime
function extractServices() {
  const text = fs.readFileSync(path.join(__dirname, '..', 'src', 'data', 'services.ts'), 'utf-8');
  const items = [];
  // naive split per service object
  const blocks = text.split(/\{\s*id:\s*"/).slice(1);
  for (const b of blocks) {
    const slug = (b.match(/slug:\s*"([a-z0-9-]+)"/) || [])[1];
    const title = (b.match(/title:\s*"([^"]+)"/) || [])[1];
    const meta = (b.match(/metaDescription:\s*"([^"]+)"/) || [])[1];
    if (slug && title) items.push({ slug, title, meta });
  }
  return items;
}

function extractStates(maxCitiesPerState) {
  const text = fs.readFileSync(path.join(__dirname, '..', 'src', 'data', 'allStatesLocations.ts'), 'utf-8');
  const states = [];
  const stateRe = /name:\s*"([^"]+)"[\s\S]*?slug:\s*"([a-z0-9-]+)"[\s\S]*?abbreviation:\s*"([A-Z]{2})"[\s\S]*?cities:\s*\[([\s\S]*?)\]/g;
  const cityRe = /name:\s*"([^"]+)"[\s\S]*?slug:\s*"([a-z0-9-]+)"/g;
  let s;
  while ((s = stateRe.exec(text))) {
    const [ , name, slug, abbr, citiesBlock ] = s;
    const cities = [];
    let c;
    while ((c = cityRe.exec(citiesBlock))) {
      cities.push({ name: c[1], slug: c[2] });
      if (maxCitiesPerState && cities.length >= maxCitiesPerState) break;
    }
    states.push({ name, slug, abbr, cities });
  }
  return states;
}

function writeJson(relPath, obj) {
  const outPath = path.join(__dirname, '..', 'public', 'ai', 'pages', relPath);
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(obj, null, 2), 'utf-8');
}

function build() {
  const services = extractServices();
  const ALL_CITIES = process.env.AI_JSON_ALL_CITIES === 'true';
  const states = extractStates(ALL_CITIES ? undefined : 3);

  const now = new Date().toISOString();

  // Static pages
  writeJson('index.json', {
    title: 'Kincaid Wolstein Economics | Forensic Economic Analysis & Expert Testimony',
    description: 'Professional forensic economic analysis and expert testimony for litigation support. Serving attorneys nationwide.',
    canonical: `${ORIGIN}/`,
    updatedAt: now
  });
  const staticPages = [
    { path: 'services', title: 'Economic Analysis Services - Expert Forensic Economics | Kincaid Wolstein Economics', desc: 'Comprehensive forensic economic analysis and advisory services.' },
    { path: 'advisory', title: 'Advisory Services | Kincaid Wolstein Economics', desc: 'Business & industry, public policy, health/education, finance, international and data science advisory services.' },
    { path: 'about', title: 'About Kincaid Wolstein Economics', desc: 'Experience, credentials, and methodology.' },
    { path: 'experience', title: 'Experience - Kincaid Wolstein Economics', desc: 'Court and industry experience.' },
    { path: 'contact', title: 'Contact - Kincaid Wolstein Economics', desc: 'Get in touch for consultation.' },
    { path: 'case-studies', title: 'Case Studies - Kincaid Wolstein Economics', desc: 'Selected case studies and examples.' },
    { path: 'schedule-consultation', title: 'Schedule Consultation - Kincaid Wolstein Economics', desc: 'Book a consultation.' },
    { path: 'locations', title: 'Locations - Kincaid Wolstein Economics', desc: 'State and city coverage.' }
  ];
  staticPages.forEach(p => writeJson(`${p.path}.json`, { title: p.title, description: p.desc, canonical: `${ORIGIN}/${p.path}`, updatedAt: now }));

  // Service hubs
  services.forEach(s => {
    const title = `${s.title} Services Across the United States | Kincaid Wolstein Economics`;
    const description = `Professional ${s.title.toLowerCase()} services available nationwide. Find expert economic consulting in your state and city.`;
    writeJson(`services/${s.slug}.json`, {
      title, description,
      canonical: `${ORIGIN}/services/${s.slug}`,
      service: { slug: s.slug, title: s.title, meta: s.meta || undefined },
      updatedAt: now
    });
  });

  // States and sample cities
  states.forEach(st => {
    writeJson(`${st.slug}.json`, {
      title: `Economic Analysis Services in ${st.name} | Kincaid Wolstein Economics`,
      description: `Professional economic analysis, forensic economics, and expert witness services throughout ${st.name}.`,
      canonical: `${ORIGIN}/${st.slug}`,
      state: { slug: st.slug, name: st.name, abbr: st.abbr },
      updatedAt: now
    });
    st.cities.forEach(city => {
      writeJson(`${st.slug}/${city.slug}.json`, {
        title: `Economic Analysis Services in ${city.name}, ${st.abbr} | Kincaid Wolstein Economics`,
        description: `Professional economic analysis, forensic economics, and expert witness services in ${city.name}, ${st.name}.`,
        canonical: `${ORIGIN}/${st.slug}/${city.slug}`,
        state: { slug: st.slug, name: st.name, abbr: st.abbr },
        city,
        updatedAt: now
      });
    });
    // Sample service-location combos for JSON; expand with AI_JSON_SERVICE_LOCATIONS=all
    const svcList = (process.env.AI_JSON_SERVICE_LOCATIONS === 'all') ? services : services.slice(0, 2);
    const cityList = (process.env.AI_JSON_SERVICE_LOCATIONS === 'all') ? st.cities : st.cities.slice(0, 2);
    svcList.forEach(svc => {
      cityList.forEach(city => {
        writeJson(`services/${svc.slug}/${st.slug}/${city.slug}.json`, {
          title: `${svc.title} in ${city.name}, ${st.abbr} | Kincaid Wolstein Economics`,
          description: `Expert ${svc.title.toLowerCase()} services in ${city.name}, ${st.name}. ${svc.meta || ''}`.trim(),
          canonical: `${ORIGIN}/services/${svc.slug}/${st.slug}/${city.slug}`,
          service: { slug: svc.slug, title: svc.title },
          state: { slug: st.slug, name: st.name, abbr: st.abbr },
          city,
          updatedAt: now
        });
      });
    });
  });
}

build();
