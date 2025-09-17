import { useEffect } from 'react';

const GlobalSchemaMarkup = () => {
  useEffect(() => {
    // Organization Schema - Global
    const organizationSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Kincaid Wolstein Economics",
      "alternateName": ["KW Economics", "Kincaid Wolstein Economics"],
      "url": "https://kweconomics.com",
      "logo": "https://kweconomics.com/favicon.ico",
      "description": "Expert forensic economic analysis, vocational rehabilitation, and life care planning services for litigation support and expert testimony.",
      "foundingDate": "2015",
      "founder": {
        "@type": "Person",
        "name": "Christopher Skerritt",
        "jobTitle": "Principal Economist",
        "description": "Forensic economist with M.Ed., MBA, CRC, CLCP, and ABVE/F credentials"
      },
      "memberOf": [
        {
          "@type": "Organization",
          "name": "Kincaid Wolstein Vocational and Rehabilitation Services",
          "url": "https://kwvrs.com"
        }
      ],
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "400 Putnam Pike Ste J",
        "addressLocality": "Smithfield",
        "addressRegion": "RI",
        "postalCode": "02917",
        "addressCountry": "US"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+1-203-605-2814",
        "email": "chris@kweconomics.com",
        "contactType": "customer service",
        "availableLanguage": "en",
        "hoursAvailable": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          "opens": "08:00",
          "closes": "18:00"
        }
      },
      "areaServed": {
        "@type": "Country",
        "name": "United States"
      },
      "serviceType": [
        "Forensic Economics",
        "Economic Loss Assessment", 
        "Vocational Evaluation",
        "Life Care Planning",
        "Expert Witness Testimony",
        "Business Valuation",
        "Disability Evaluation"
      ],
      "expertise": [
        "Personal Injury Economics",
        "Wrongful Death Analysis", 
        "Workers' Compensation",
        "Social Security Disability",
        "Medical Malpractice",
        "Employment Litigation",
        "Commercial Litigation"
      ],
      "credentials": [
        "Master of Business Administration",
        "Master of Education in Rehabilitation Counseling",
        "Certified Rehabilitation Counselor (CRC)",
        "Certified Life Care Planner (CLCP)",
        "Fellow of the American Board of Vocational Experts (ABVE/F)",
        "Certified Vocational Evaluator (CVE)"
      ],
      "sameAs": [
        "https://www.linkedin.com/in/christopherskerritt",
        "https://www.linkedin.com/company/kweconomics"
      ]
    };

    // Website Schema with Search Action
    const websiteSchema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Kincaid Wolstein Economics",
      "alternateName": "KW Economics",
      "url": "https://kweconomics.com",
      "description": "Expert forensic economic analysis and litigation support services",
      "inLanguage": "en-US",
      "copyrightYear": "2025",
      "copyrightHolder": {
        "@type": "Organization",
        "name": "Kincaid Wolstein Economics"
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://kweconomics.com/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      },
      "mainEntity": {
        "@type": "Organization",
        "@id": "https://kweconomics.com/#organization"
      }
    };

    // Professional Service Schema
    const professionalServiceSchema = {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "name": "Forensic Economic Analysis Services",
      "description": "Expert forensic economic analysis, vocational rehabilitation, and life care planning for litigation support",
      "url": "https://kweconomics.com",
      "serviceType": "Forensic Economics",
      "provider": {
        "@type": "Organization",
        "name": "Kincaid Wolstein Economics"
      },
      "areaServed": {
        "@type": "Country", 
        "name": "United States"
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Economic Analysis Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Economic Loss Assessment",
              "description": "Forensic economic analysis for personal injury, wrongful death, and disability cases"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service", 
              "name": "Vocational Evaluation",
              "description": "Professional assessment of work capacity, transferable skills, and employability"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Life Care Planning", 
              "description": "Comprehensive future care cost analysis for catastrophic injuries"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Expert Witness Testimony",
              "description": "Qualified expert testimony for depositions and trials"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Business Valuation",
              "description": "Expert valuation services for closely held businesses in litigation contexts"
            }
          }
        ]
      }
    };


    // Local Business Schema
    const localBusinessSchema = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Kincaid Wolstein Economics",
      "description": "Expert forensic economic analysis and litigation support services",
      "url": "https://kweconomics.com",
      "telephone": "+1-203-605-2814",
      "email": "chris@kweconomics.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "400 Putnam Pike Ste J",
        "addressLocality": "Smithfield",
        "addressRegion": "RI", 
        "postalCode": "02917",
        "addressCountry": "US"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "41.9211",
        "longitude": "-71.5253"
      },
      "openingHours": "Mo-Fr 08:00-18:00",
      "priceRange": "Contact for pricing",
      "serviceArea": {
        "@type": "Country",
        "name": "United States"
      }
    };

    // Combine all schemas
    const combinedSchema = {
      "@context": "https://schema.org",
      "@graph": [
        organizationSchema,
        websiteSchema, 
        professionalServiceSchema,
        localBusinessSchema
      ]
    };

    // Add to document head
    const existingGlobalSchema = document.querySelector('#global-schema-data');
    if (existingGlobalSchema) {
      existingGlobalSchema.textContent = JSON.stringify(combinedSchema);
    } else {
      const script = document.createElement('script');
      script.id = 'global-schema-data';
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(combinedSchema);
      document.head.appendChild(script);
    }

    // Add additional meta tags for AI crawlers
    const addMetaTag = (name: string, content: string) => {
      const existing = document.querySelector(`meta[name="${name}"]`);
      if (existing) {
        existing.setAttribute('content', content);
      } else {
        const meta = document.createElement('meta');
        meta.name = name;
        meta.content = content;
        document.head.appendChild(meta);
      }
    };

    // Enhanced meta tags for AI understanding
    addMetaTag('business-type', 'Professional Services');
    addMetaTag('industry', 'Forensic Economics');
    addMetaTag('service-area', 'United States');
    addMetaTag('expertise', 'Economic Loss Assessment, Vocational Evaluation, Life Care Planning, Expert Testimony');
    addMetaTag('target-audience', 'Attorneys, Law Firms, Insurance Companies');
    addMetaTag('credentials', 'MBA, M.Ed., CRC, CLCP, ABVE/F, CVE');
    addMetaTag('experience-years', '10+');
    addMetaTag('case-types', 'Personal Injury, Wrongful Death, Workers Compensation, Disability');

  }, []);

  return null;
};

export default GlobalSchemaMarkup;
