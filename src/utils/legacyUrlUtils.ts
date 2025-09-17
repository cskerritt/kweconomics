// Utility functions for handling legacy URL patterns

// Normalize city names for URL matching
export const normalizeCityName = (city: string): string => {
  return city
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
};

// Normalize state names for URL matching
export const normalizeStateName = (state: string): string => {
  return state
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
};

// Common city name variations that should map to the same city
export const cityNameMappings: Record<string, string> = {
  'nyc': 'new-york-city',
  'new-york': 'new-york-city',
  'la': 'los-angeles',
  'san-fran': 'san-francisco',
  'sf': 'san-francisco',
  'vegas': 'las-vegas',
  'dc': 'washington',
  'washington-dc': 'washington',
  'philly': 'philadelphia',
  'chi-town': 'chicago',
  'the-big-apple': 'new-york-city',
  'motor-city': 'detroit',
  'windy-city': 'chicago',
  'city-of-angels': 'los-angeles',
  'sin-city': 'las-vegas',
  'steel-city': 'pittsburgh',
  'music-city': 'nashville',
  'magic-city': 'miami',
  'emerald-city': 'seattle',
  'charm-city': 'baltimore',
  'bean-town': 'boston',
  'beantown': 'boston',
  'h-town': 'houston',
  'big-d': 'dallas',
  'the-atl': 'atlanta',
  'nola': 'new-orleans',
  'st-pete': 'saint-petersburg',
  'st-paul': 'saint-paul',
  'st-louis': 'saint-louis',
  'ft-worth': 'fort-worth',
  'ft-lauderdale': 'fort-lauderdale'
};

// Common state abbreviations used in legacy URLs
export const stateAbbreviationMappings: Record<string, string> = {
  'al': 'alabama',
  'ak': 'alaska', 
  'az': 'arizona',
  'ar': 'arkansas',
  'ca': 'california',
  'co': 'colorado',
  'ct': 'connecticut',
  'de': 'delaware',
  'fl': 'florida',
  'ga': 'georgia',
  'hi': 'hawaii',
  'id': 'idaho',
  'il': 'illinois',
  'in': 'indiana',
  'ia': 'iowa',
  'ks': 'kansas',
  'ky': 'kentucky',
  'la': 'louisiana',
  'me': 'maine',
  'md': 'maryland',
  'ma': 'massachusetts',
  'mi': 'michigan',
  'mn': 'minnesota',
  'ms': 'mississippi',
  'mo': 'missouri',
  'mt': 'montana',
  'ne': 'nebraska',
  'nv': 'nevada',
  'nh': 'new-hampshire',
  'nj': 'new-jersey',
  'nm': 'new-mexico',
  'ny': 'new-york',
  'nc': 'north-carolina',
  'nd': 'north-dakota',
  'oh': 'ohio',
  'ok': 'oklahoma',
  'or': 'oregon',
  'pa': 'pennsylvania',
  'ri': 'rhode-island',
  'sc': 'south-carolina',
  'sd': 'south-dakota',
  'tn': 'tennessee',
  'tx': 'texas',
  'ut': 'utah',
  'vt': 'vermont',
  'va': 'virginia',
  'wa': 'washington',
  'wv': 'west-virginia',
  'wi': 'wisconsin',
  'wy': 'wyoming',
  'dc': 'district-of-columbia'
};

// Map legacy service names to current service slugs
export const legacyServiceToCurrentService: Record<string, string> = {
  'forensic-economist': 'economic-loss-assessment',
  'personal-injury-economist': 'economic-loss-assessment',
  'wrongful-death-damages': 'economic-loss-assessment',
  'economic-damages': 'economic-loss-assessment',
  'lost-earnings': 'economic-loss-assessment',
  'present-value': 'economic-loss-assessment',
  'business-valuation': 'business-valuation',
  'business-damages': 'business-valuation',
  'commercial-damages': 'business-valuation',
  'vocational-expert': 'vocational-evaluation',
  'life-care-planner': 'life-care-planning',
  'disability-evaluation': 'disability-evaluation',
  'expert-witness': 'expert-testimony',
  'expert-testimony': 'expert-testimony',
  'business-consulting': 'business-consulting'
};

// Validate if a string is a known US state
export const isValidState = (state: string): boolean => {
  const normalizedState = state.toLowerCase();
  return Object.values(stateAbbreviationMappings).includes(normalizedState) ||
         stateAbbreviationMappings[normalizedState] !== undefined;
};

// Get the full state name from abbreviation or return as-is if already full
export const getFullStateName = (state: string): string => {
  const normalizedState = state.toLowerCase();
  return stateAbbreviationMappings[normalizedState] || normalizedState;
};

// Get normalized city name, handling common variations
export const getNormalizedCityName = (city: string): string => {
  const normalizedCity = normalizeCityName(city);
  return cityNameMappings[normalizedCity] || normalizedCity;
};

// Check if a URL segment looks like a service name
export const isLegacyServiceName = (segment: string): boolean => {
  return legacyServiceToCurrentService[segment] !== undefined;
};

// Extract location info from a compound location string (like "jersey-city-nj")
export const extractLocationInfo = (locationStr: string): { city?: string; state?: string } => {
  const parts = locationStr.split('-');
  
  // Look for state abbreviations at the end
  const lastPart = parts[parts.length - 1];
  const secondLastPart = parts[parts.length - 2];
  
  // Check for state abbreviations like "nj", "ny", "ca"
  if (stateAbbreviationMappings[lastPart]) {
    return {
      state: stateAbbreviationMappings[lastPart],
      city: parts.slice(0, -1).join('-')
    };
  }
  
  // Check for two-part state abbreviations like "new-york" -> "ny"
  const twoPartState = `${secondLastPart}-${lastPart}`;
  if (Object.values(stateAbbreviationMappings).includes(twoPartState)) {
    return {
      state: twoPartState,
      city: parts.slice(0, -2).join('-')
    };
  }
  
  // Check if the whole string is a state
  if (isValidState(locationStr)) {
    return { state: getFullStateName(locationStr) };
  }
  
  // Default to treating it as a city
  return { city: getNormalizedCityName(locationStr) };
};

// Log legacy URL access for analytics
export const logLegacyUrlAccess = (originalUrl: string, redirectUrl: string) => {
  console.log('Legacy URL redirect:', {
    from: originalUrl,
    to: redirectUrl,
    timestamp: new Date().toISOString()
  });
  
  // In production, you might want to send this to an analytics service
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'legacy_url_redirect', {
      event_category: 'navigation',
      event_label: originalUrl,
      custom_parameter_redirect_to: redirectUrl
    });
  }
};