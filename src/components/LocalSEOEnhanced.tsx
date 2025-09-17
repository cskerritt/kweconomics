import RichSnippets from './RichSnippets';

interface LocalSEOEnhancedProps {
  cityName?: string;
  stateName?: string;
  stateAbbr?: string;
  serviceName?: string;
  population?: number;
  metro?: string;
  coordinates?: {
    latitude: string;
    longitude: string;
  };
}

const LocalSEOEnhanced: React.FC<LocalSEOEnhancedProps> = ({
  cityName,
  stateName,
  stateAbbr,
  serviceName,
  population,
  metro,
  coordinates
}) => {
  const generateLocalBusinessSchema = () => ({
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": `Skerritt Economics & Consulting${cityName ? ` - ${cityName}` : ''}`,
    "description": `Professional forensic economic analysis and expert witness services ${cityName ? `serving ${cityName}, ${stateAbbr}` : 'nationwide'}. Specializing in economic loss assessments, vocational evaluations, and litigation support.`,
    "url": "https://skerritteconomics.com",
    "telephone": "(203) 605-2814",
    "email": "chris@skerritteconomics.com",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "400 Putnam Pike Ste J",
      "addressLocality": "Smithfield",
      "addressRegion": "RI",
      "postalCode": "02917",
      "addressCountry": "US"
    },
    "geo": coordinates ? {
      "@type": "GeoCoordinates",
      "latitude": coordinates.latitude,
      "longitude": coordinates.longitude
    } : {
      "@type": "GeoCoordinates",
      "latitude": "41.9211",
      "longitude": "-71.5253"
    },
    "areaServed": cityName && stateName ? {
      "@type": "City",
      "name": cityName,
      "containedInPlace": {
        "@type": "State",
        "name": stateName,
        "addressCountry": "US"
      }
    } : {
      "@type": "Country",
      "name": "United States"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "17:00"
      }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Economic Analysis Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Economic Loss Assessment",
            "description": `Professional economic loss analysis ${cityName ? `in ${cityName}, ${stateAbbr}` : 'nationwide'}`
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Vocational Evaluation",
            "description": `Expert vocational assessment services ${cityName ? `in ${cityName}, ${stateAbbr}` : 'nationwide'}`
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Expert Witness Testimony",
            "description": `Professional expert witness services ${cityName ? `in ${cityName}, ${stateAbbr}` : 'nationwide'}`
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Life Care Planning",
            "description": `Comprehensive life care planning ${cityName ? `in ${cityName}, ${stateAbbr}` : 'nationwide'}`
          }
        }
      ]
    },
    "founder": {
      "@type": "Person",
      "name": "Christopher Skerritt",
      "jobTitle": "Principal Economist",
      "hasCredential": [
        "Master of Business Administration",
        "Master of Education in Rehabilitation Counseling",
        "Certified Rehabilitation Counselor (CRC)",
        "Certified Life Care Planner (CLCP)",
        "Fellow of the American Board of Vocational Experts (ABVE/F)"
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "reviewCount": "47",
      "bestRating": "5",
      "worstRating": "1"
    }
  });

  const generateServiceAreaSchema = () => {
    if (!cityName || !stateName) return null;

    return {
      "@context": "https://schema.org",
      "@type": "ServiceArea",
      "name": `${cityName} Economic Services Area`,
      "description": `Professional economic analysis services covering ${cityName} and surrounding areas in ${stateName}`,
      "geo": {
        "@type": "GeoCircle",
        "geoMidpoint": coordinates ? {
          "@type": "GeoCoordinates",
          "latitude": coordinates.latitude,
          "longitude": coordinates.longitude
        } : {
          "@type": "GeoCoordinates",
          "latitude": "41.9211",
          "longitude": "-71.5253"
        },
        "geoRadius": "50 miles"
      }
    };
  };

  const generatePlaceSchema = () => {
    if (!cityName || !stateName || !population) return null;

    return {
      "@context": "https://schema.org",
      "@type": "City",
      "name": cityName,
      "containedInPlace": {
        "@type": "State",
        "name": stateName,
        "addressCountry": "US"
      },
      "population": population,
      "description": `${cityName} is served by professional economic analysis and expert witness services from Skerritt Economics & Consulting.`,
      ...(metro && { "isPartOf": metro })
    };
  };

  return (
    <>
      {/* Local Business Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateLocalBusinessSchema())
        }}
      />

      {/* Service Area Schema */}
      {generateServiceAreaSchema() && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateServiceAreaSchema())
          }}
        />
      )}

      {/* Place Schema */}
      {generatePlaceSchema() && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generatePlaceSchema())
          }}
        />
      )}

      {/* Service-specific Rich Snippets */}
      {serviceName && (
        <RichSnippets
          type="service"
          serviceName={serviceName}
          cityName={cityName}
          stateName={stateName}
          stateAbbr={stateAbbr}
        />
      )}

      {/* Local Business Rich Snippets */}
      <RichSnippets
        type="local-business"
        cityName={cityName}
        stateName={stateName}
        stateAbbr={stateAbbr}
      />
    </>
  );
};

export default LocalSEOEnhanced;