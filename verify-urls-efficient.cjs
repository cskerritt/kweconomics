#!/usr/bin/env node

/**
 * Efficient URL Verification System
 * Tests representative samples from each URL pattern category
 * Provides concise pass/fail summary for LegacyUrlHandler logic
 */

// Import the LegacyUrlHandler logic (Node.js compatible version)
const { parseLegacyUrl } = require('./legacy-url-handler-node.cjs');

// Color codes for console output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

// Test categories with representative samples
const testCategories = {
  '5XX_ERRORS_SERVICE_STATE': {
    description: '5XX Server Errors - Service-State Patterns',
    samples: [
      '/personal-injury-economist-pomona',
      '/business-valuation-colorado', 
      '/forensic-economist-connecticut',
      '/wrongful-death-damages-alabama',
      '/vocational-expert-florida',
      '/life-care-planner-texas',
      '/disability-evaluation-california',
      '/expert-witness-new-york',
      '/forensic-economist-ca',
      '/business-valuation-tx'
    ],
    expectedPattern: (result) => {
      return result && (
        result.redirectTo.includes('/services/') || 
        result.redirectTo.match(/^\/[a-z-]+$/) // State pages
      );
    }
  },

  '404_REDIRECTS_SERVICE_DIRECTORY': {
    description: '404 Redirects - Service/Location Subdirectory Patterns',
    samples: [
      '/business-valuation/camden-de',
      '/forensic-economist/beulah',
      '/life-care-planner/summersville', 
      '/business-valuation/california',
      '/forensic-economist/texas',
      '/business-valuation/ca',
      '/forensic-economist/tx',
      '/vocational-expert/jersey-city-nj',
      '/wrongful-death-damages/fort-worth-tx',
      '/disability-evaluation/unknown-city'
    ],
    expectedPattern: (result) => {
      return result && (
        result.redirectTo.includes('/services/') ||
        result.redirectTo.match(/^\/[a-z-]+$/) // State pages
      );
    }
  },

  '404_NOT_FOUND_COMPLEX': {
    description: '404 Not Found - Complex Patterns',
    samples: [
      '/locations/cities/laredo-tx-tx-vocational-expert.html',
      '/vendor/bundle/ruby/2.6.0/gems/kramdown-2.4.0/test/testcases/',
      '/practice-areas/eminent-domain/',
      '/tools/calculator',
      '/blog/some-post',
      '/locations/states/california',
      '/practice-areas/forensic-economist/california',
      '/services/business-consulting/valuation',
      '/blog/rss',
      '/vendor/bundle/gems/test.rb'
    ],
    expectedPattern: (result) => {
      if (!result) return false;
      // Vendor/bundle should return 404 with noindex
      if (result.status === 404 && result.noIndex) return true;
      // Other patterns should redirect appropriately
      return result.redirectTo === '/' || 
             result.redirectTo === '/services' || 
             result.redirectTo === '/locations' ||
             result.redirectTo.includes('/services/') ||
             result.redirectTo.match(/^\/[a-z-]+$/); // State pages like /california
    }
  },

  'METRO_AREAS': {
    description: 'Metro Area Patterns',
    samples: [
      '/philadelphia-metro-economist',
      '/washington-dc-metro-business-valuation',
      '/dallas-fort-worth-vocational-expert',
      '/chicago-metro-forensic-economist',
      '/new-york-metro-life-care-planner',
      '/los-angeles-metro-disability-evaluation',
      '/san-francisco-bay-area-expert-witness',
      '/greater-boston-area-personal-injury-economist',
      '/seattle-metro-wrongful-death-damages',
      '/denver-metro-economic-damages'
    ],
    expectedPattern: (result) => {
      return result && result.redirectTo.includes('/services/') && 
             result.redirectTo.split('/').length >= 4; // Should have state/city
    }
  },

  'COUNTY_PATTERNS': {
    description: 'County Patterns',
    samples: [
      '/cook-county-economist',
      '/los-angeles-county-business-valuation',
      '/harris-county-vocational-expert',
      '/maricopa-county-forensic-economist',
      '/orange-county-ca-life-care-planner',
      '/san-diego-county-disability-evaluation',
      '/kings-county-expert-witness',
      '/miami-dade-county-personal-injury-economist',
      '/dallas-county-wrongful-death-damages',
      '/santa-clara-county-economic-damages'
    ],
    expectedPattern: (result) => {
      return result && result.redirectTo.includes('/services/') && 
             result.redirectTo.split('/').length >= 4; // Should have state/city
    }
  },

  'COMPLEX_CITY_STATE': {
    description: 'Complex City-State Patterns',
    samples: [
      '/personal-injury-economist-jersey-city-nj',
      '/forensic-economist-elizabeth-nj',
      '/business-valuation-fort-worth-tx',
      '/vocational-expert-san-antonio-tx',
      '/life-care-planner-new-orleans-la',
      '/disability-evaluation-las-vegas-nv',
      '/expert-witness-virginia-beach-va',
      '/wrongful-death-damages-colorado-springs-co',
      '/economic-damages-salt-lake-city-ut',
      '/present-value-saint-paul-mn'
    ],
    expectedPattern: (result) => {
      return result && result.redirectTo.includes('/services/') && 
             result.redirectTo.split('/').length >= 4; // Should have state/city
    }
  }
};

// Mock parseLegacyUrl function if the actual one isn't available
function mockParseLegacyUrl(pathname) {
  // This is a simplified version for demonstration
  // In reality, this would import the actual function
  
  // Clean the pathname
  let cleanPath = pathname.toLowerCase().replace(/^\/+|\/+$/g, '');
  cleanPath = cleanPath.replace(/\.(html?|php|aspx?|jsp)$/i, '');
  
  if (!cleanPath) return null;

  // Handle vendor/bundle paths
  if (cleanPath.startsWith('vendor/bundle') || cleanPath.includes('vendor/bundle')) {
    return {
      redirectTo: '/404',
      permanent: false,
      status: 404,
      noIndex: true
    };
  }

  // Handle blog paths
  if (cleanPath.startsWith('blog/') || cleanPath === 'blog') {
    return { redirectTo: '/', permanent: true };
  }

  // Handle tools paths
  if (cleanPath.startsWith('tools/') || cleanPath === 'tools') {
    return { redirectTo: '/services', permanent: true };
  }

  // Handle practice-areas paths
  if (cleanPath.startsWith('practice-areas/')) {
    return { redirectTo: '/services', permanent: true };
  }

  // Handle locations/states patterns
  if (cleanPath.startsWith('locations/states/')) {
    const state = cleanPath.split('/')[2];
    return { redirectTo: `/${state}`, permanent: true };
  }

  // Simplified service-state pattern handling
  const segments = cleanPath.split('/').filter(Boolean);
  if (segments.length === 1) {
    const parts = segments[0].split('-');
    if (parts.length >= 2) {
      // Check for state at the end
      const lastPart = parts[parts.length - 1];
      const states = ['california', 'texas', 'florida', 'new-york', 'colorado', 'connecticut', 'alabama'];
      const stateAbbrs = {'ca': 'california', 'tx': 'texas', 'fl': 'florida', 'ny': 'new-york', 'co': 'colorado', 'ct': 'connecticut', 'al': 'alabama'};
      
      if (states.includes(lastPart)) {
        return { redirectTo: `/${lastPart}`, permanent: true };
      }
      if (stateAbbrs[lastPart]) {
        return { redirectTo: `/${stateAbbrs[lastPart]}`, permanent: true };
      }
    }
  }

  // Default service handling
  if (segments.length >= 1) {
    const services = {
      'forensic-economist': 'economic-loss-assessment',
      'personal-injury-economist': 'economic-loss-assessment',
      'business-valuation': 'business-valuation',
      'vocational-expert': 'vocational-evaluation',
      'life-care-planner': 'life-care-planning'
    };
    
    const service = segments[0];
    if (services[service]) {
      return { redirectTo: `/services/${services[service]}`, permanent: true };
    }
  }

  return null;
}

// Results tracking
let totalTests = 0;
let passedTests = 0;
let failedTests = 0;
const results = {};

// Test runner function
function runTests() {
  console.log(`${colors.bold}${colors.cyan}🔍 Efficient URL Verification System${colors.reset}\n`);
  console.log(`${colors.blue}Testing representative samples from each URL pattern category...${colors.reset}\n`);

  Object.entries(testCategories).forEach(([categoryKey, category]) => {
    console.log(`${colors.bold}${colors.magenta}📂 ${category.description}${colors.reset}`);
    
    const categoryResults = {
      total: category.samples.length,
      passed: 0,
      failed: 0,
      details: []
    };

    category.samples.forEach((url, index) => {
      totalTests++;
      
      try {
        // Use actual LegacyUrlHandler logic
        const result = parseLegacyUrl(url);
        const isValid = category.expectedPattern(result);
        
        if (isValid) {
          passedTests++;
          categoryResults.passed++;
          categoryResults.details.push({
            url,
            status: 'PASS',
            result: result?.redirectTo || 'No redirect',
            permanent: result?.permanent
          });
        } else {
          failedTests++;
          categoryResults.failed++;
          categoryResults.details.push({
            url,
            status: 'FAIL',
            result: result?.redirectTo || 'No redirect',
            expected: 'Should match expected pattern'
          });
        }
      } catch (error) {
        failedTests++;
        categoryResults.failed++;
        categoryResults.details.push({
          url,
          status: 'ERROR',
          error: error.message
        });
      }
    });

    // Print category summary
    const passRate = Math.round((categoryResults.passed / categoryResults.total) * 100);
    const statusColor = passRate === 100 ? colors.green : passRate >= 80 ? colors.yellow : colors.red;
    
    console.log(`  ${statusColor}✓ ${categoryResults.passed}/${categoryResults.total} passed (${passRate}%)${colors.reset}`);
    
    // Show failed tests if any
    if (categoryResults.failed > 0) {
      categoryResults.details.forEach(detail => {
        if (detail.status === 'FAIL' || detail.status === 'ERROR') {
          console.log(`    ${colors.red}✗ ${detail.url} - ${detail.status}${colors.reset}`);
          if (detail.result) {
            console.log(`      Got: ${detail.result}`);
          }
          if (detail.expected) {
            console.log(`      Expected: ${detail.expected}`);
          }
          if (detail.error) {
            console.log(`      Error: ${detail.error}`);
          }
        }
      });
    }
    
    console.log('');
    results[categoryKey] = categoryResults;
  });

  // Print overall summary
  const overallPassRate = Math.round((passedTests / totalTests) * 100);
  const summaryColor = overallPassRate === 100 ? colors.green : overallPassRate >= 80 ? colors.yellow : colors.red;
  
  console.log(`${colors.bold}${colors.cyan}📊 VERIFICATION SUMMARY${colors.reset}`);
  console.log(`${colors.bold}═══════════════════════${colors.reset}`);
  console.log(`${summaryColor}${colors.bold}Overall: ${passedTests}/${totalTests} tests passed (${overallPassRate}%)${colors.reset}`);
  console.log(`${colors.green}✓ Passed: ${passedTests}${colors.reset}`);
  console.log(`${colors.red}✗ Failed: ${failedTests}${colors.reset}`);
  
  // Category breakdown
  console.log(`\n${colors.bold}📋 CATEGORY BREAKDOWN${colors.reset}`);
  console.log(`${colors.bold}═══════════════════════${colors.reset}`);
  
  Object.entries(results).forEach(([key, result]) => {
    const passRate = Math.round((result.passed / result.total) * 100);
    const statusIcon = passRate === 100 ? '✅' : passRate >= 80 ? '⚠️' : '❌';
    const statusColor = passRate === 100 ? colors.green : passRate >= 80 ? colors.yellow : colors.red;
    
    console.log(`${statusIcon} ${statusColor}${key}: ${result.passed}/${result.total} (${passRate}%)${colors.reset}`);
  });

  // Recommendations
  console.log(`\n${colors.bold}${colors.blue}💡 RECOMMENDATIONS${colors.reset}`);
  console.log(`${colors.bold}═════════════════${colors.reset}`);
  
  if (overallPassRate === 100) {
    console.log(`${colors.green}🎉 Excellent! All URL patterns are properly handled.${colors.reset}`);
    console.log(`${colors.green}✓ LegacyUrlHandler logic covers all tested scenarios${colors.reset}`);
    console.log(`${colors.green}✓ No additional configuration needed${colors.reset}`);
  } else if (overallPassRate >= 80) {
    console.log(`${colors.yellow}⚠️  Good coverage with some issues to address${colors.reset}`);
    console.log(`${colors.yellow}• Review failed test cases above${colors.reset}`);
    console.log(`${colors.yellow}• Consider additional pattern matching rules${colors.reset}`);
  } else {
    console.log(`${colors.red}❌ Significant issues found in URL handling${colors.reset}`);
    console.log(`${colors.red}• Multiple pattern categories failing${colors.reset}`);
    console.log(`${colors.red}• LegacyUrlHandler logic needs enhancement${colors.reset}`);
  }

  // Performance note
  console.log(`\n${colors.bold}⚡ PERFORMANCE NOTE${colors.reset}`);
  console.log(`Tested ${totalTests} representative URLs in batch mode`);
  console.log(`This covers ~${Math.round((totalTests / 1500) * 100)}% of the estimated total legacy URLs`);
  
  return {
    totalTests,
    passedTests,
    failedTests,
    overallPassRate,
    categoryResults: results
  };
}

// Export for use as module or run directly
if (require.main === module) {
  runTests();
} else {
  module.exports = { runTests, testCategories, mockParseLegacyUrl };
}