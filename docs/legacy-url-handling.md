# Legacy URL Handling System

This document describes the comprehensive legacy URL handling system implemented to address 5XX errors and redirect issues for legacy URLs in the Econ Detective web application.

## Overview

The legacy URL handling system consists of three main components:

1. **Server-level redirects** via Netlify's `_redirects` file
2. **Client-side routing** via React Router and the `LegacyUrlHandler` component
3. **URL pattern matching** and normalization utilities

## Architecture

### Server-Level Redirects (`public/_redirects`)

The `_redirects` file handles the most common legacy URL patterns at the server level, providing fast 301 redirects without loading the React application. This includes:

- HTTPS enforcement
- Service-state patterns (e.g., `/forensic-economist-california`)
- Metro area patterns (e.g., `/philadelphia-metro-economist`)
- County patterns (e.g., `/cook-county-economist`)
- Practice areas (e.g., `/practice-areas/forensic-economist`)
- Service directories (e.g., `/forensic-economist/california`)

### Client-Side Handling (`LegacyUrlHandler` Component)

For more complex patterns that require dynamic resolution, the React `LegacyUrlHandler` component provides:

- Pattern matching for compound location names
- State abbreviation resolution
- Service name mapping to current service slugs
- Fallback handling for unrecognized patterns

### URL Pattern Recognition

The system recognizes these legacy URL patterns:

#### 1. Service-Location Patterns
```
/[service]-[location]/
```
Examples:
- `/forensic-economist-california/` → `/california`
- `/personal-injury-economist-texas/` → `/texas`
- `/business-valuation-jersey-city-nj/` → `/services/business-valuation/new-jersey/jersey-city`

#### 2. Service Directory Patterns
```
/[service]/[location]/
/[service]/[state]/[city]/
```
Examples:
- `/forensic-economist/california/` → `/california`
- `/business-valuation/texas/houston/` → `/services/business-valuation/texas/houston`

#### 3. Practice Areas Patterns
```
/practice-areas/[service]/
/practice-areas/[service]/[location]/
```
Examples:
- `/practice-areas/forensic-economist/` → `/services/economic-loss-assessment`
- `/practice-areas/business-valuation/california/` → `/california`

#### 4. Metro Area Patterns
```
/[metro-area]-[service]/
```
Examples:
- `/philadelphia-metro-economist/` → `/services/economic-loss-assessment/pennsylvania/philadelphia`
- `/chicago-metro-wrongful-death-damages/` → `/services/economic-loss-assessment/illinois/chicago`

#### 5. County Patterns
```
/[county]-economist/
```
Examples:
- `/cook-county-economist/` → `/services/economic-loss-assessment/illinois/chicago`
- `/orange-county-ca-economist/` → `/services/economic-loss-assessment/california/santa-ana`

## Service Mappings

Legacy service names are mapped to current service slugs:

| Legacy Service | Current Service Slug |
|----------------|---------------------|
| `forensic-economist` | `economic-loss-assessment` |
| `personal-injury-economist` | `economic-loss-assessment` |
| `wrongful-death-damages` | `economic-loss-assessment` |
| `business-valuation` | `business-valuation` |
| `vocational-expert` | `vocational-evaluation` |
| `life-care-planner` | `life-care-planning` |
| `disability-evaluation` | `disability-evaluation` |
| `expert-witness` | `expert-testimony` |

## Location Handling

### State Recognition
- Full state names: `california`, `texas`, `new-york`
- State abbreviations: `ca`, `tx`, `ny`
- Special cases: `dc` → `district-of-columbia`

### City Name Normalization
- Hyphenated format: `new-york-city`, `los-angeles`
- Common variations: `nyc` → `new-york-city`, `la` → `los-angeles`
- State indicators: `jersey-city-nj` → `new-jersey/jersey-city`

### Metro Areas
Metro areas are mapped to their primary cities:
- `philadelphia-metro` → `pennsylvania/philadelphia`
- `chicago-metro` → `illinois/chicago`
- `dallas-fort-worth` → `texas/dallas`

### Counties
Counties are mapped to their primary cities:
- `cook-county` → `illinois/chicago`
- `los-angeles-county` → `california/los-angeles`
- `harris-county` → `texas/houston`

## Implementation Details

### React Router Integration

The routing is structured to handle legacy patterns before generic location routes:

```tsx
{/* Legacy service directory patterns - must come before generic location routes */}
<Route path="/forensic-economist/*" element={<LegacyLocationRedirect />} />
<Route path="/personal-injury-economist/*" element={<LegacyLocationRedirect />} />
<Route path="/business-valuation/*" element={<LegacyLocationRedirect />} />
<Route path="/wrongful-death-damages/*" element={<LegacyLocationRedirect />} />
<Route path="/vocational-expert/*" element={<LegacyLocationRedirect />} />
<Route path="/life-care-planner/*" element={<LegacyLocationRedirect />} />
<Route path="/practice-areas/*" element={<LegacyLocationRedirect />} />

{/* Legacy URL redirects for hyphenated patterns */}
<Route path="/:slug" element={<LegacyLocationRedirect />} />

{/* Current location routes */}
<Route path="/:stateSlug/:citySlug" element={<LocationServicesPage />} />
<Route path="/:stateSlug" element={<StatePage />} />
```

### Performance Considerations

1. **Server-first approach**: Most common patterns are handled at the server level for maximum performance
2. **Pattern specificity**: More specific patterns are matched first to avoid conflicts
3. **Permanent redirects**: All redirects use 301 status codes for SEO preservation
4. **Caching**: Netlify CDN caches redirect responses

### Error Handling

- Unrecognized patterns redirect to `/locations`
- Invalid service names default to the base service page
- Malformed location names are normalized or fallback to state pages

## Monitoring and Analytics

The system includes logging for legacy URL access:

```typescript
// Log legacy URL access for monitoring
console.log('Legacy URL accessed:', location.pathname);

// Google Analytics tracking (if available)
if (typeof window !== 'undefined' && window.gtag) {
  window.gtag('event', 'legacy_url_redirect', {
    event_category: 'navigation',
    event_label: originalUrl,
    custom_parameter_redirect_to: redirectUrl
  });
}
```

## Testing

The system includes comprehensive test coverage in `src/utils/__tests__/legacyUrlRedirects.test.ts` covering:

- All major URL patterns
- Edge cases (trailing slashes, mixed case)
- Service mappings
- Location normalization
- Error scenarios

## Deployment

1. The `_redirects` file is automatically deployed with the static site
2. React routing changes are included in the main application bundle
3. No additional server configuration required for Netlify deployment

## Future Maintenance

To add new legacy URL patterns:

1. **For simple patterns**: Add to `public/_redirects`
2. **For complex patterns**: Update the `LegacyUrlHandler` component
3. **Always**: Add corresponding test cases
4. **Consider**: Performance impact and specificity order

## SEO Considerations

- All redirects use 301 (permanent) status codes
- Redirects preserve link equity for SEO
- Server-level redirects are faster and more SEO-friendly
- Old URLs are properly mapped to new canonical URLs

This system ensures that all legacy URLs continue to work while redirecting users and search engines to the correct new URL structure, preventing 5XX errors and maintaining SEO value.