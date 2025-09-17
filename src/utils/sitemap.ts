import { getAllServices } from '@/data/services';
import { getAllCombinations } from '@/data/allStatesLocations';

export interface SitemapEntry {
  url: string;
  lastModified: string;
  changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

export const generateSitemap = (): SitemapEntry[] => {
  const baseUrl = 'https://skerritteconomics.com';
  const currentDate = new Date().toISOString();
  const sitemap: SitemapEntry[] = [];

  // Static pages
  const staticPages = [
    { path: '/', priority: 1.0, frequency: 'weekly' as const },
    { path: '/about', priority: 0.8, frequency: 'monthly' as const },
    { path: '/services', priority: 0.9, frequency: 'weekly' as const },
    { path: '/experience', priority: 0.7, frequency: 'monthly' as const },
    { path: '/contact', priority: 0.8, frequency: 'monthly' as const },
  ];

  staticPages.forEach(page => {
    sitemap.push({
      url: `${baseUrl}${page.path}`,
      lastModified: currentDate,
      changeFrequency: page.frequency,
      priority: page.priority
    });
  });

  // Service hub pages
  const services = getAllServices();
  services.forEach(service => {
    sitemap.push({
      url: `${baseUrl}/services/${service.slug}`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8
    });
  });

  // All state/city/service combinations
  const combinations = getAllCombinations();
  
  // Service + Location pages (highest priority location pages)
  services.forEach(service => {
    combinations.forEach(combo => {
      sitemap.push({
        url: `${baseUrl}/services/${service.slug}/${combo.stateSlug}/${combo.citySlug}`,
        lastModified: currentDate,
        changeFrequency: 'monthly',
        priority: 0.7
      });
    });
  });

  // State pages
  const stateGroups = combinations.reduce((acc, combo) => {
    if (!acc[combo.stateSlug]) {
      acc[combo.stateSlug] = combo;
    }
    return acc;
  }, {} as Record<string, typeof combinations[0]>);

  Object.values(stateGroups).forEach(state => {
    sitemap.push({
      url: `${baseUrl}/${state.stateSlug}`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.6
    });
  });

  // City pages
  combinations.forEach(combo => {
    sitemap.push({
      url: `${baseUrl}/${combo.stateSlug}/${combo.citySlug}`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.5
    });
  });

  return sitemap.sort((a, b) => b.priority - a.priority);
};

export const generateSitemapXML = (): string => {
  const sitemap = generateSitemap();
  
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemap.map(entry => `  <url>
    <loc>${entry.url}</loc>
    <lastmod>${entry.lastModified}</lastmod>
    <changefreq>${entry.changeFrequency}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return xml;
};

export const generateRobotsTxt = (): string => {
  const baseUrl = 'https://skerritteconomics.com';
  
  return `User-agent: *
Allow: /

# Sitemap
Sitemap: ${baseUrl}/sitemap.xml

# Crawl-delay for respectful crawling
Crawl-delay: 1`;
};