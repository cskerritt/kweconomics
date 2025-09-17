/**
 * Converts a string to a URL-friendly slug
 */
export function createSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .trim()
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

/**
 * Converts a slug back to a display name
 */
export function slugToTitle(slug: string): string {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Creates a canonical URL for a service in a location
 */
export function createServiceLocationUrl(
  serviceSlug: string, 
  stateSlug: string, 
  citySlug: string
): string {
  return `/services/${serviceSlug}/${stateSlug}/${citySlug}`;
}

/**
 * Creates a canonical URL for a location overview
 */
export function createLocationUrl(stateSlug: string, citySlug?: string): string {
  return citySlug ? `/${stateSlug}/${citySlug}` : `/${stateSlug}`;
}

/**
 * Parses URL parameters and validates them
 */
export function parseLocationParams(
  serviceSlug?: string,
  stateSlug?: string,
  citySlug?: string
) {
  return {
    serviceSlug: serviceSlug?.toLowerCase() || '',
    stateSlug: stateSlug?.toLowerCase() || '',
    citySlug: citySlug?.toLowerCase() || ''
  };
}

/**
 * Generates SEO-friendly title for service location pages
 */
export function generateSEOTitle(
  serviceName: string,
  cityName: string,
  stateAbbr: string,
  companyName = "Skerritt Economics"
): string {
  return `${serviceName} in ${cityName}, ${stateAbbr} | ${companyName}`;
}

/**
 * Generates SEO-friendly meta description for service location pages
 */
export function generateSEODescription(
  serviceName: string,
  cityName: string,
  stateAbbr: string,
  baseDescription: string
): string {
  return `Expert ${serviceName.toLowerCase()} services in ${cityName}, ${stateAbbr}. ${baseDescription} Contact us for professional consultation.`;
}

/**
 * Creates breadcrumb data for navigation
 */
export interface BreadcrumbItem {
  label: string;
  href: string;
}

export function generateBreadcrumbs(
  serviceName?: string,
  stateName?: string,
  cityName?: string,
  serviceSlug?: string,
  stateSlug?: string,
  citySlug?: string
): BreadcrumbItem[] {
  const breadcrumbs: BreadcrumbItem[] = [
    { label: "Home", href: "/" }
  ];

  if (serviceName && serviceSlug) {
    breadcrumbs.push({ label: "Services", href: "/services" });
    breadcrumbs.push({ label: serviceName, href: `/services/${serviceSlug}` });
  }

  if (stateName && stateSlug) {
    breadcrumbs.push({ label: stateName, href: `/${stateSlug}` });
  }

  if (cityName && citySlug && stateSlug) {
    breadcrumbs.push({ label: cityName, href: `/${stateSlug}/${citySlug}` });
  }

  return breadcrumbs;
}