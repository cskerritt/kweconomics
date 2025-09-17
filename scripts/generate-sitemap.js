import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { generateSitemapXML, getSitemapStats } from '../src/utils/generateSitemap.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Generate sitemap
const sitemap = generateSitemapXML();

// Write to public directory
const publicPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
fs.writeFileSync(publicPath, sitemap, 'utf-8');

// Get and display statistics
const stats = getSitemapStats();

console.log('Sitemap generated successfully!');
console.log('================================');
console.log(`Total URLs: ${stats.totalURLs}`);
console.log(`- Static pages: ${stats.staticPages}`);
console.log(`- Service hub pages: ${stats.serviceHubPages}`);
console.log(`- State pages: ${stats.statePages}`);
console.log(`- City pages: ${stats.cityPages}`);
console.log(`- Service/Location pages: ${stats.serviceLocationPages}`);
console.log('================================');
console.log('Breakdown:');
console.log(`- Services: ${stats.breakdown.services}`);
console.log(`- States: ${stats.breakdown.states}`);
console.log(`- Total Cities: ${stats.breakdown.totalCities}`);
console.log('================================');
console.log(`Sitemap saved to: ${publicPath}`);