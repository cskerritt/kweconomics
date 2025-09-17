/**
 * Node.js compatible version of LegacyUrlHandler for verification testing
 * Extracted from the React component for use in Node.js scripts
 */

// Comprehensive mapping of legacy service patterns to current service slugs
const legacyServiceMappings = {
  'forensic-economist': 'economic-loss-assessment',
  'personal-injury-economist': 'economic-loss-assessment',
  'business-valuation': 'business-valuation',
  'wrongful-death-damages': 'economic-loss-assessment',
  'vocational-expert': 'vocational-evaluation',
  'life-care-planner': 'life-care-planning',
  'disability-evaluation': 'disability-evaluation',
  'expert-witness': 'expert-testimony',
  'economist': 'economic-loss-assessment', // Generic economist mapping
  'economic-damages': 'economic-loss-assessment',
  'lost-earnings': 'economic-loss-assessment',
  'present-value': 'economic-loss-assessment',
  'business-damages': 'business-valuation',
  'commercial-damages': 'business-valuation',
};

// State abbreviations to full name mappings
const stateAbbreviations = {
  'al': 'alabama', 'ak': 'alaska', 'az': 'arizona', 'ar': 'arkansas', 'ca': 'california',
  'co': 'colorado', 'ct': 'connecticut', 'de': 'delaware', 'fl': 'florida', 'ga': 'georgia',
  'hi': 'hawaii', 'id': 'idaho', 'il': 'illinois', 'in': 'indiana', 'ia': 'iowa',
  'ks': 'kansas', 'ky': 'kentucky', 'la': 'louisiana', 'me': 'maine', 'md': 'maryland',
  'ma': 'massachusetts', 'mi': 'michigan', 'mn': 'minnesota', 'ms': 'mississippi', 'mo': 'missouri',
  'mt': 'montana', 'ne': 'nebraska', 'nv': 'nevada', 'nh': 'new-hampshire', 'nj': 'new-jersey',
  'nm': 'new-mexico', 'ny': 'new-york', 'nc': 'north-carolina', 'nd': 'north-dakota', 'oh': 'ohio',
  'ok': 'oklahoma', 'or': 'oregon', 'pa': 'pennsylvania', 'ri': 'rhode-island', 'sc': 'south-carolina',
  'sd': 'south-dakota', 'tn': 'tennessee', 'tx': 'texas', 'ut': 'utah', 'vt': 'vermont',
  'va': 'virginia', 'wa': 'washington', 'wv': 'west-virginia', 'wi': 'wisconsin', 'wy': 'wyoming',
  'dc': 'district-of-columbia'
};

// Metro area mappings to primary cities
const metroAreaMappings = {
  'philadelphia-metro': { state: 'pennsylvania', city: 'philadelphia' },
  'washington-dc-metro': { state: 'district-of-columbia', city: 'washington' },
  'dallas-fort-worth': { state: 'texas', city: 'dallas' },
  'chicago-metro': { state: 'illinois', city: 'chicago' },
  'new-york-metro': { state: 'new-york', city: 'new-york-city' },
  'los-angeles-metro': { state: 'california', city: 'los-angeles' },
  'atlanta-metro': { state: 'georgia', city: 'atlanta' },
  'miami-metro': { state: 'florida', city: 'miami' },
  'san-francisco-bay-area': { state: 'california', city: 'san-francisco' },
  'greater-boston-area': { state: 'massachusetts', city: 'boston' },
  'seattle-metro': { state: 'washington', city: 'seattle' },
  'phoenix-metro': { state: 'arizona', city: 'phoenix' },
  'denver-metro': { state: 'colorado', city: 'denver' },
  'las-vegas-metro': { state: 'nevada', city: 'las-vegas' },
  'detroit-metro': { state: 'michigan', city: 'detroit' },
  'houston-metro': { state: 'texas', city: 'houston' },
  'minneapolis-metro': { state: 'minnesota', city: 'minneapolis' },
  'san-diego-metro': { state: 'california', city: 'san-diego' },
  'tampa-metro': { state: 'florida', city: 'tampa' },
  'st-louis-metro': { state: 'missouri', city: 'saint-louis' }
};

// County mappings to primary cities
const countyMappings = {
  'cook-county': { state: 'illinois', city: 'chicago' },
  'los-angeles-county': { state: 'california', city: 'los-angeles' },
  'harris-county': { state: 'texas', city: 'houston' },
  'maricopa-county': { state: 'arizona', city: 'phoenix' },
  'orange-county-ca': { state: 'california', city: 'santa-ana' },
  'san-diego-county': { state: 'california', city: 'san-diego' },
  'kings-county': { state: 'new-york', city: 'brooklyn' },
  'miami-dade-county': { state: 'florida', city: 'miami' },
  'dallas-county': { state: 'texas', city: 'dallas' },
  'queens-county': { state: 'new-york', city: 'queens' },
  'riverside-county': { state: 'california', city: 'riverside' },
  'san-bernardino-county': { state: 'california', city: 'san-bernardino' },
  'clark-county': { state: 'nevada', city: 'las-vegas' },
  'tarrant-county': { state: 'texas', city: 'fort-worth' },
  'santa-clara-county': { state: 'california', city: 'san-jose' },
  'wayne-county': { state: 'michigan', city: 'detroit' },
  'alameda-county': { state: 'california', city: 'oakland' },
  'broward-county': { state: 'florida', city: 'fort-lauderdale' },
  'new-york-county': { state: 'new-york', city: 'manhattan' },
  'middlesex-county-ma': { state: 'massachusetts', city: 'cambridge' }
};

// List of all US states for pattern matching
const allStates = [
  'alabama', 'alaska', 'arizona', 'arkansas', 'california', 'colorado', 'connecticut',
  'delaware', 'florida', 'georgia', 'hawaii', 'idaho', 'illinois', 'indiana', 'iowa',
  'kansas', 'kentucky', 'louisiana', 'maine', 'maryland', 'massachusetts', 'michigan',
  'minnesota', 'mississippi', 'missouri', 'montana', 'nebraska', 'nevada', 'new-hampshire',
  'new-jersey', 'new-mexico', 'new-york', 'north-carolina', 'north-dakota', 'ohio',
  'oklahoma', 'oregon', 'pennsylvania', 'rhode-island', 'south-carolina', 'south-dakota',
  'tennessee', 'texas', 'utah', 'vermont', 'virginia', 'washington', 'west-virginia',
  'wisconsin', 'wyoming', 'district-of-columbia'
];

// Main function to parse legacy URLs and determine redirects
function parseLegacyUrl(pathname) {
  // Clean the pathname and remove file extensions
  let cleanPath = pathname.toLowerCase().replace(/^\/+|\/+$/g, '');
  
  // Remove common file extensions
  cleanPath = cleanPath.replace(/\.(html?|php|aspx?|jsp)$/i, '');
  
  if (!cleanPath) {
    return null;
  }

  // Handle vendor/bundle paths - return 404 with noindex
  if (cleanPath.startsWith('vendor/bundle') || cleanPath.includes('vendor/bundle')) {
    return {
      redirectTo: '/404',
      permanent: false,
      status: 404,
      noIndex: true
    };
  }

  // Handle blog/rss paths
  if (cleanPath === 'blog/rss' || cleanPath.startsWith('blog/rss/')) {
    return { redirectTo: '/', permanent: true };
  }
  
  // Handle all blog paths
  if (cleanPath.startsWith('blog/') || cleanPath === 'blog') {
    return { redirectTo: '/', permanent: true };
  }

  // Handle tools/* paths
  if (cleanPath.startsWith('tools/') || cleanPath === 'tools') {
    return { redirectTo: '/services', permanent: true };
  }

  // Handle services/business-consulting/* paths
  if (cleanPath.startsWith('services/business-consulting/') || cleanPath === 'services/business-consulting') {
    return { redirectTo: '/services', permanent: true };
  }

  // Split the path into segments
  const segments = cleanPath.split('/').filter(Boolean);

  // Check specific patterns first (highest priority)
  
  // Pattern: /practice-areas/service/ or /practice-areas/service/location/
  if (segments[0] === 'practice-areas') {
    return handlePracticeAreasPattern(segments.slice(1));
  }

  // Pattern: /locations/cities/[city]-[state]-[service].html
  if (segments.length >= 3 && segments[0] === 'locations' && segments[1] === 'cities') {
    return handleLocationCitiesPattern(segments[2]);
  }

  // Pattern: /locations/states/[state]/
  if (segments.length === 3 && segments[0] === 'locations' && segments[1] === 'states') {
    return handleLocationStatesPattern(segments[2]);
  }

  // Generic patterns (lower priority)
  
  // Pattern: /service-location/ (e.g., /forensic-economist-california/)
  if (segments.length === 1) {
    return handleServiceLocationPattern(segments[0]);
  }

  // Pattern: /service-type/location/ (e.g., /business-valuation/california/)
  if (segments.length === 2) {
    return handleServiceDirectoryPattern(segments[0], segments[1]);
  }

  // Pattern: /service-type/state/city/ (e.g., /forensic-economist/california/los-angeles/)
  if (segments.length === 3) {
    return handleServiceStateCity(segments[0], segments[1], segments[2]);
  }

  return null;
}

// Handle patterns like /forensic-economist-california/ or /philadelphia-metro-economist/
function handleServiceLocationPattern(segment) {
  // Try different delimiters
  const delimiters = ['-', '_'];
  
  for (const delimiter of delimiters) {
    const parts = segment.split(delimiter);
    
    if (parts.length >= 2) {
      
      // First, check for LOCATION-SERVICE patterns (location comes first)
      const locationServiceResult = handleLocationServicePattern(parts, delimiter);
      if (locationServiceResult) {
        return locationServiceResult;
      }
      
      // Then, check for SERVICE-LOCATION patterns (service comes first)
      for (let i = 1; i < parts.length; i++) {
        const potentialService = parts.slice(0, i).join(delimiter);
        const potentialLocation = parts.slice(i).join(delimiter);
        
        // Check if it's a known service pattern
        if (legacyServiceMappings[potentialService]) {
          const currentService = legacyServiceMappings[potentialService];
          
          // Handle complex city-state patterns like "jersey-city-nj"
          const cityStateMatch = handleComplexCityStatePattern(potentialLocation, currentService);
          if (cityStateMatch) {
            return cityStateMatch;
          }
          
          // Handle metro areas
          const metroKey = potentialLocation.replace(/-/g, '-');
          if (metroAreaMappings[metroKey]) {
            const metro = metroAreaMappings[metroKey];
            return {
              redirectTo: `/services/${currentService}/${metro.state}/${metro.city}`,
              permanent: true
            };
          }
          
          // Handle counties
          if (countyMappings[potentialLocation]) {
            const county = countyMappings[potentialLocation];
            return {
              redirectTo: `/services/${currentService}/${county.state}/${county.city}`,
              permanent: true
            };
          }
          
          // Handle state abbreviations
          if (stateAbbreviations[potentialLocation]) {
            return {
              redirectTo: `/${stateAbbreviations[potentialLocation]}`,
              permanent: true
            };
          }
          
          // Handle full state names
          if (allStates.includes(potentialLocation)) {
            return {
              redirectTo: `/${potentialLocation}`,
              permanent: true
            };
          }
          
          // If location not recognized but has city-like pattern, assume it's a city
          if (potentialLocation.length > 1) {
            return {
              redirectTo: `/services/${currentService}`,
              permanent: true
            };
          }
        }
      }
    }
  }
  
  return null;
}

// Handle patterns like /business-valuation/california/ or /business-valuation/camden-de/
function handleServiceDirectoryPattern(service, location) {
  const currentService = legacyServiceMappings[service];
  if (!currentService) return null;
  
  // Handle complex city-state patterns like "camden-de"
  const cityStateMatch = handleComplexCityStatePattern(location, currentService);
  if (cityStateMatch) {
    return cityStateMatch;
  }
  
  // Handle state abbreviations
  if (stateAbbreviations[location]) {
    return {
      redirectTo: `/${stateAbbreviations[location]}`,
      permanent: true
    };
  }
  
  // Handle full state names
  if (allStates.includes(location)) {
    return {
      redirectTo: `/${location}`,
      permanent: true
    };
  }
  
  // Handle metro areas
  if (metroAreaMappings[location]) {
    const metro = metroAreaMappings[location];
    return {
      redirectTo: `/services/${currentService}/${metro.state}/${metro.city}`,
      permanent: true
    };
  }
  
  // Handle counties
  if (countyMappings[location]) {
    const county = countyMappings[location];
    return {
      redirectTo: `/services/${currentService}/${county.state}/${county.city}`,
      permanent: true
    };
  }
  
  // If it looks like a city name (single word or hyphenated), default to service page
  return {
    redirectTo: `/services/${currentService}`,
    permanent: true
  };
}

// Handle patterns like /forensic-economist/california/los-angeles/
function handleServiceStateCity(service, state, city) {
  const currentService = legacyServiceMappings[service];
  if (!currentService) return null;
  
  // Normalize state
  let normalizedState = state;
  if (stateAbbreviations[state]) {
    normalizedState = stateAbbreviations[state];
  }
  
  if (allStates.includes(normalizedState)) {
    return {
      redirectTo: `/services/${currentService}/${normalizedState}/${city}`,
      permanent: true
    };
  }
  
  return null;
}

// Handle /practice-areas/ patterns
function handlePracticeAreasPattern(segments) {
  if (segments.length === 0) {
    return { redirectTo: '/services', permanent: true };
  }
  
  const service = segments[0];
  if (legacyServiceMappings[service]) {
    const currentService = legacyServiceMappings[service];
    
    if (segments.length === 1) {
      return { redirectTo: `/services/${currentService}`, permanent: true };
    }
    
    if (segments.length >= 2) {
      const location = segments[1];
      
      // Handle state
      if (allStates.includes(location) || stateAbbreviations[location]) {
        const normalizedState = stateAbbreviations[location] || location;
        
        if (segments.length === 2) {
          return { redirectTo: `/${normalizedState}`, permanent: true };
        } else {
          const city = segments[2];
          return {
            redirectTo: `/services/${currentService}/${normalizedState}/${city}`,
            permanent: true
          };
        }
      }
    }
  }
  
  // For unknown services or any other practice-areas pattern, redirect to services
  return { redirectTo: '/services', permanent: true };
}

// Handle /locations/cities/[city]-[state]-[service].html patterns
function handleLocationCitiesPattern(segment) {
  // Parse patterns like "laredo-tx-tx-vocational-expert" or "dallas-texas-forensic-economist"
  const parts = segment.split('-');
  if (parts.length < 3) return null;
  
  // Look for service patterns in the last parts of the URL
  let service = '';
  let stateAbbr = '';
  let city = '';
  
  // Common service patterns to look for
  const servicePatterns = ['vocational-expert', 'forensic-economist', 'personal-injury-economist', 
                          'business-valuation', 'wrongful-death-damages', 'life-care-planner',
                          'disability-evaluation', 'expert-witness'];
  
  // Find the service pattern in the URL
  for (const pattern of servicePatterns) {
    const segmentStr = parts.join('-');
    
    if (segmentStr.includes(pattern)) {
      service = pattern;
      // Extract city and state
      const beforeService = segmentStr.substring(0, segmentStr.indexOf(pattern));
      const cityStateParts = beforeService.replace(/-$/, '').split('-');
      
      // Handle duplicate state abbreviations like "laredo-tx-tx-vocational-expert"
      if (cityStateParts.length >= 2) {
        // Remove duplicate state abbreviations
        let cleanedParts = [];
        let lastStateAbbr = '';
        
        for (let i = cityStateParts.length - 1; i >= 0; i--) {
          const part = cityStateParts[i];
          if (stateAbbreviations[part]) {
            if (!lastStateAbbr) {
              lastStateAbbr = part;
            }
            // Skip duplicate state abbreviations
          } else {
            cleanedParts.unshift(part);
          }
        }
        
        if (lastStateAbbr) {
          city = cleanedParts.join('-');
          stateAbbr = lastStateAbbr;
        } else {
          city = cityStateParts.slice(0, -1).join('-');
          stateAbbr = cityStateParts[cityStateParts.length - 1];
        }
        break;
      }
    }
  }
  
  if (service && legacyServiceMappings[service]) {
    const currentService = legacyServiceMappings[service];
    
    if (stateAbbr && stateAbbreviations[stateAbbr] && city) {
      const fullState = stateAbbreviations[stateAbbr];
      return {
        redirectTo: `/services/${currentService}/${fullState}/${city}`,
        permanent: true
      };
    } else if (stateAbbr && stateAbbreviations[stateAbbr]) {
      return {
        redirectTo: `/${stateAbbreviations[stateAbbr]}`,
        permanent: true
      };
    }
    
    return {
      redirectTo: `/services/${currentService}`,
      permanent: true
    };
  }
  
  return null;
}

// Handle /locations/states/[state]/ patterns
function handleLocationStatesPattern(state) {
  // Handle state abbreviations
  if (stateAbbreviations[state]) {
    return {
      redirectTo: `/${stateAbbreviations[state]}`,
      permanent: true
    };
  }
  
  // Handle full state names
  if (allStates.includes(state)) {
    return {
      redirectTo: `/${state}`,
      permanent: true
    };
  }
  
  return { redirectTo: '/locations', permanent: true };
}

// Handle complex city-state patterns like "jersey-city-nj" or "camden-de"
function handleComplexCityStatePattern(locationStr, currentService) {
  const parts = locationStr.split('-');
  
  if (parts.length < 2) return null;
  
  // Check for state abbreviation at the end
  const lastPart = parts[parts.length - 1];
  if (stateAbbreviations[lastPart]) {
    const state = stateAbbreviations[lastPart];
    const city = parts.slice(0, -1).join('-');
    
    return {
      redirectTo: `/services/${currentService}/${state}/${city}`,
      permanent: true
    };
  }
  
  // Check for two-part state names like "new-jersey"
  if (parts.length >= 3) {
    const lastTwoParts = `${parts[parts.length - 2]}-${parts[parts.length - 1]}`;
    if (allStates.includes(lastTwoParts)) {
      const city = parts.slice(0, -2).join('-');
      
      return {
        redirectTo: `/services/${currentService}/${lastTwoParts}/${city}`,
        permanent: true
      };
    }
  }
  
  // Check if the entire string is a state
  if (stateAbbreviations[locationStr]) {
    return {
      redirectTo: `/${stateAbbreviations[locationStr]}`,
      permanent: true
    };
  }
  
  if (allStates.includes(locationStr)) {
    return {
      redirectTo: `/${locationStr}`,
      permanent: true
    };
  }
  
  return null;
}

// Handle LOCATION-SERVICE patterns where location comes first
function handleLocationServicePattern(parts, delimiter) {
  // Try different split points to find location-service combinations
  for (let i = 1; i < parts.length; i++) {
    const potentialLocation = parts.slice(0, i).join(delimiter);
    const potentialService = parts.slice(i).join(delimiter);
    
    // Check if the potential service is valid
    if (legacyServiceMappings[potentialService]) {
      const currentService = legacyServiceMappings[potentialService];
      
      // Check for metro areas first (they have higher priority)
      if (metroAreaMappings[potentialLocation]) {
        const metro = metroAreaMappings[potentialLocation];
        return {
          redirectTo: `/services/${currentService}/${metro.state}/${metro.city}`,
          permanent: true
        };
      }
      
      // Check for counties
      if (countyMappings[potentialLocation]) {
        const county = countyMappings[potentialLocation];
        return {
          redirectTo: `/services/${currentService}/${county.state}/${county.city}`,
          permanent: true
        };
      }
      
      // Check for state abbreviations
      if (stateAbbreviations[potentialLocation]) {
        return {
          redirectTo: `/${stateAbbreviations[potentialLocation]}`,
          permanent: true
        };
      }
      
      // Check for full state names
      if (allStates.includes(potentialLocation)) {
        return {
          redirectTo: `/${potentialLocation}`,
          permanent: true
        };
      }
    }
  }
  
  return null;
}

module.exports = {
  parseLegacyUrl,
  legacyServiceMappings,
  stateAbbreviations,
  metroAreaMappings,
  countyMappings,
  allStates
};