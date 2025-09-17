import { getAllServices } from '@/data/services';
import { getAllStates } from '@/data/allStatesLocations';

interface SitemapURL {
  loc: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

const DOMAIN = 'https://kweconomics.com';

export const generateSitemapURLs = (): SitemapURL[] => {
  const urls: SitemapURL[] = [];
  const lastmod = new Date().toISOString().split('T')[0];
  
  // Static pages with high priority
  const staticPages = [
    { path: '/', priority: 1.0, changefreq: 'weekly' as const },
    { path: '/services', priority: 0.9, changefreq: 'weekly' as const },
    { path: '/about', priority: 0.8, changefreq: 'monthly' as const },
    { path: '/experience', priority: 0.8, changefreq: 'monthly' as const },
    { path: '/contact', priority: 0.9, changefreq: 'monthly' as const },
    { path: '/case-studies', priority: 0.7, changefreq: 'monthly' as const },
    { path: '/schedule-consultation', priority: 0.8, changefreq: 'monthly' as const },
    { path: '/emergency-consultation', priority: 0.8, changefreq: 'monthly' as const },
  ];
  
  // Add static pages
  staticPages.forEach(page => {
    urls.push({
      loc: `${DOMAIN}${page.path}`,
      lastmod,
      changefreq: page.changefreq,
      priority: page.priority
    });
  });
  
  const services = getAllServices();
  const states = getAllStates();
  
  // Service hub pages (e.g., /services/economic-loss-assessment)
  services.forEach(service => {
    urls.push({
      loc: `${DOMAIN}/services/${service.slug}`,
      lastmod,
      changefreq: 'weekly',
      priority: 0.8
    });
  });
  
  // State pages (e.g., /alabama)
  states.forEach(state => {
    urls.push({
      loc: `${DOMAIN}/${state.slug}`,
      lastmod,
      changefreq: 'monthly',
      priority: 0.7
    });
    
    // City pages (e.g., /alabama/birmingham)
    state.cities.forEach(city => {
      urls.push({
        loc: `${DOMAIN}/${state.slug}/${city.slug}`,
        lastmod,
        changefreq: 'monthly',
        priority: 0.6
      });
      
      // Service + Location pages (e.g., /services/economic-loss-assessment/alabama/birmingham)
      services.forEach(service => {
        urls.push({
          loc: `${DOMAIN}/services/${service.slug}/${state.slug}/${city.slug}`,
          lastmod,
          changefreq: 'monthly',
          priority: 0.5
        });
      });
    });
  });
  
  return urls;
};

export const generateSitemapXML = (): string => {
  const urls = generateSitemapURLs();
  
  const xmlUrls = urls.map(url => `
  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('');
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlUrls}
</urlset>`;
};

// Function to generate a sitemap index if we need to split into multiple sitemaps
export const generateSitemapIndex = (): string => {
  const lastmod = new Date().toISOString().split('T')[0];
  
  // We could split by service type if needed
  const services = getAllServices();
  const sitemaps = services.map(service => `
  <sitemap>
    <loc>${DOMAIN}/sitemap-${service.slug}.xml</loc>
    <lastmod>${lastmod}</lastmod>
  </sitemap>`).join('');
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${DOMAIN}/sitemap-main.xml</loc>
    <lastmod>${lastmod}</lastmod>
  </sitemap>
${sitemaps}
</sitemapindex>`;
};

// Function to get URL count statistics
export const getSitemapStats = () => {
  const urls = generateSitemapURLs();
  const services = getAllServices();
  const states = getAllStates();
  
  const totalCities = states.reduce((sum, state) => sum + state.cities.length, 0);
  const serviceLocationPages = services.length * totalCities;
  
  return {
    totalURLs: urls.length,
    staticPages: 8,
    serviceHubPages: services.length,
    statePages: states.length,
    cityPages: totalCities,
    serviceLocationPages: serviceLocationPages,
    breakdown: {
      services: services.length,
      states: states.length,
      totalCities: totalCities
    }
  };
};