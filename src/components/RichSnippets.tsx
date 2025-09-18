import { getAllServices } from '@/data/services';

interface FAQItem {
  question: string;
  answer: string;
}

interface RichSnippetsProps {
  type: 'faq' | 'howto' | 'service' | 'local-business' | 'organization';
  data?: any;
  serviceName?: string;
  cityName?: string;
  stateName?: string;
  stateAbbr?: string;
}

const RichSnippets: React.FC<RichSnippetsProps> = ({
  type,
  data,
  serviceName,
  cityName,
  stateName,
  stateAbbr
}) => {
  const generateFAQSchema = (faqs: FAQItem[]) => ({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  });

  const generateHowToSchema = (title: string, steps: string[]) => ({
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": title,
    "description": `Step-by-step guide for ${title.toLowerCase()}`,
    "step": steps.map((step, index) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "name": `Step ${index + 1}`,
      "text": step
    }))
  });

  const generateServiceSchema = () => ({
    "@context": "https://schema.org",
    "@type": "Service",
    "name": serviceName,
    "description": `Professional ${serviceName?.toLowerCase()} services ${cityName && stateName ? `in ${cityName}, ${stateAbbr}` : 'nationwide'}`,
    "provider": {
      "@type": "Organization",
      "name": "Kincaid Wolstein Economics",
      "url": "https://kweconomics.com"
    },
    "serviceType": serviceName,
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
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": `${serviceName} Services`,
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": serviceName,
            "description": `Expert ${serviceName?.toLowerCase()} services for legal professionals`
          }
        }
      ]
    }
  });

  const generateLocalBusinessSchema = () => ({
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Kincaid Wolstein Economics",
    "description": `Professional economic analysis and expert witness services ${cityName ? `in ${cityName}, ${stateAbbr}` : 'nationwide'}`,
    "url": "https://kweconomics.com",
    "telephone": "(203) 605-2814",
    "email": "chris@kweconomics.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "1 University Plaza Dr",
      "addressLocality": "Hackensack",
      "addressRegion": "NJ",
      "postalCode": "07601",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "41.9211",
      "longitude": "-71.5253"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "17:00"
    },
    "priceRange": "$$",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "reviewCount": "47",
      "bestRating": "5",
      "worstRating": "1"
    }
  });

  const generateOrganizationSchema = () => ({
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Kincaid Wolstein Economics",
    "alternateName": "KW Economics",
    "url": "https://kweconomics.com",
    "logo": "https://kweconomics.com/favicon.ico",
    "description": "Leading provider of forensic economic analysis, expert witness testimony, and litigation support services",
    "foundingDate": "1999",
    "founder": {
      "@type": "Person",
      "name": "Christopher Skerritt",
      "jobTitle": "Principal Economist"
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "1 University Plaza Dr",
      "addressLocality": "Hackensack",
      "addressRegion": "NJ",
      "postalCode": "07601",
      "addressCountry": "US"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "(203) 605-2814",
      "contactType": "customer service",
      "email": "chris@kweconomics.com"
    },
    "sameAs": [
      "https://www.linkedin.com/company/kweconomics",
      "https://www.linkedin.com/in/christopherskerritt"
    ],
    "memberOf": {
      "@type": "Organization",
      "name": "Kincaid Wolstein Vocational and Rehabilitation Services",
      "url": "https://kwvrs.com"
    }
  });

  let schema;
  switch (type) {
    case 'faq':
      schema = generateFAQSchema(data);
      break;
    case 'howto':
      schema = generateHowToSchema(data.title, data.steps);
      break;
    case 'service':
      schema = generateServiceSchema();
      break;
    case 'local-business':
      schema = generateLocalBusinessSchema();
      break;
    case 'organization':
      schema = generateOrganizationSchema();
      break;
    default:
      return null;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema)
      }}
    />
  );
};

// Pre-defined FAQ data for common services
export const serviceFAQs = {
  'economic-loss-assessment': [
    {
      question: "What is an economic loss assessment?",
      answer: "An economic loss assessment is a professional analysis that calculates the financial impact of an injury, death, or business interruption. It includes lost wages, benefits, career advancement opportunities, and other economic damages."
    },
    {
      question: "How long does an economic loss assessment take?",
      answer: "The timeline varies depending on case complexity, but typically ranges from 2-4 weeks for standard cases to 6-8 weeks for complex matters involving multiple parties or extensive financial analysis."
    },
    {
      question: "What information is needed for an economic loss assessment?",
      answer: "We typically need employment records, tax returns, pay stubs, benefits information, medical records related to the injury, and educational background to perform a comprehensive analysis."
    },
    {
      question: "Are economic loss assessments admissible in court?",
      answer: "Yes, when prepared by qualified experts following accepted methodologies and professional standards, economic loss assessments are generally admissible as expert testimony in legal proceedings."
    }
  ],
  'vocational-evaluation': [
    {
      question: "What is included in a vocational evaluation?",
      answer: "A vocational evaluation assesses work capacity, transferable skills, job market analysis, earning capacity, and rehabilitation potential following an injury or disability."
    },
    {
      question: "How is a vocational evaluation different from a medical evaluation?",
      answer: "While medical evaluations focus on physical capabilities and limitations, vocational evaluations specifically examine how those limitations affect work capacity and earning potential in the job market."
    },
    {
      question: "Who can benefit from a vocational evaluation?",
      answer: "Individuals with disabilities, injury victims, career changers, and those involved in workers' compensation or personal injury cases can all benefit from professional vocational evaluation."
    }
  ]
};

// Pre-defined How-To data
export const howToData = {
  'filing-claim': {
    title: "How to File an Economic Loss Claim",
    steps: [
      "Gather all relevant employment and financial documentation",
      "Obtain medical records documenting the injury or disability",
      "Contact a qualified forensic economist for initial consultation",
      "Provide all documentation to the economic expert for analysis",
      "Review the preliminary assessment and provide additional information if needed",
      "Receive the final economic loss report for use in legal proceedings"
    ]
  },
  'expert-testimony': {
    title: "How Expert Economic Testimony Works",
    steps: [
      "Expert reviews all case materials and performs economic analysis",
      "Detailed report is prepared documenting findings and methodology",
      "Pre-trial deposition may be conducted by opposing counsel",
      "Expert prepares demonstrative exhibits and visual aids for trial",
      "Expert testifies at trial explaining economic findings to the jury",
      "Expert may provide rebuttal testimony if needed"
    ]
  }
};

export default RichSnippets;
