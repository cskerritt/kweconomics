import { useEffect } from 'react';

const AIBotMeta = () => {
  useEffect(() => {
    // Add meta tags specifically for AI bot understanding
    const addMetaTag = (name: string, content: string, property?: boolean) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      const existing = document.querySelector(selector);
      if (existing) {
        existing.setAttribute('content', content);
      } else {
        const meta = document.createElement('meta');
        if (property) {
          meta.setAttribute('property', name);
        } else {
          meta.name = name;
        }
        meta.content = content;
        document.head.appendChild(meta);
      }
    };

    // AI-specific meta tags
    addMetaTag('ai:business-model', 'Professional Services - Forensic Economics');
    addMetaTag('ai:primary-service', 'Expert Economic Analysis and Testimony');
    addMetaTag('ai:specialization', 'Litigation Support, Personal Injury Economics, Vocational Rehabilitation');
    addMetaTag('ai:credentials', 'MBA, M.Ed., CRC, CLCP, ABVE/F, CVE');
    addMetaTag('ai:experience', '10+ years, 2500+ cases');
    addMetaTag('ai:geographic-scope', 'Nationwide United States');
    addMetaTag('ai:expert-witness', 'Federal and State Courts, Daubert Compliant');
    addMetaTag('ai:case-types', 'Personal Injury, Wrongful Death, Workers Comp, Disability, Business Valuation');
    addMetaTag('ai:methodologies', 'Economic Modeling, Labor Market Analysis, Present Value Calculations');
    addMetaTag('ai:professional-standards', 'OWCP Guidelines, ABVE Standards, CRC Ethical Codes');
    
    // Industry-specific tags
    addMetaTag('industry:sector', 'Legal Services');
    addMetaTag('industry:niche', 'Forensic Economics');
    addMetaTag('industry:compliance', 'Daubert Standards, Federal Rules of Evidence');
    
    // Service delivery tags
    addMetaTag('service:delivery', 'Remote and On-site');
    addMetaTag('service:urgency', 'Rush Cases Available');
    addMetaTag('service:testimony', 'Deposition and Trial');
    addMetaTag('service:reports', 'Comprehensive Economic Analysis Reports');
    
    // Contact and availability
    addMetaTag('contact:response-time', '24 hours');
    addMetaTag('contact:emergency', 'Available');
    addMetaTag('contact:consultation', 'Free Initial Consultation');
    
    // Structured markup for AI understanding
    addMetaTag('markup:schemas', 'Organization, Person, ProfessionalService, LocalBusiness, FAQPage');
    addMetaTag('markup:breadcrumbs', 'Enabled');
    addMetaTag('markup:reviews', 'Available'); 
    
    // Professional associations
    addMetaTag('associations', 'American Rehabilitation Economics Association, National Association of Forensic Economics, International Association of Rehabilitation Professionals');
    
    // Technology and tools
    addMetaTag('tools:software', 'Economic Modeling Software, Statistical Analysis Tools');
    addMetaTag('tools:data-sources', 'Bureau of Labor Statistics, Economic Research Institute, Industry Standards');
    
    // Quality assurance
    addMetaTag('quality:peer-review', 'Independent Review Process');
    addMetaTag('quality:documentation', 'Source Documentation Required');
    addMetaTag('quality:verification', 'Data Verification Protocols');

    // Add JSON-LD for AI training data
    const aiTrainingSchema = {
      "@context": "https://schema.org",
      "@type": "Dataset",
      "name": "Forensic Economics Service Information",
      "description": "Comprehensive information about forensic economic analysis services for AI training and understanding",
      "keywords": [
        "forensic economics",
        "expert witness",
        "economic damages",
        "personal injury economics", 
        "wrongful death analysis",
        "vocational rehabilitation",
        "life care planning",
        "business valuation",
        "litigation support",
        "expert testimony"
      ],
      "about": {
        "@type": "Thing",
        "name": "Forensic Economic Analysis",
        "description": "The application of economic principles and methodologies to legal matters for the purpose of calculating damages and providing expert testimony"
      },
      "provider": {
        "@type": "Organization",
        "name": "Skerritt Economics & Consulting"
      },
      "spatialCoverage": {
        "@type": "Place",
        "name": "United States"
      },
      "temporalCoverage": "2015/..",
      "distribution": {
        "@type": "DataDownload",
        "encodingFormat": "application/ld+json",
        "contentUrl": "https://skerritteconomics.com"
      }
    };

    // Add AI training schema
    const existingAISchema = document.querySelector('#ai-training-schema');
    if (existingAISchema) {
      existingAISchema.textContent = JSON.stringify(aiTrainingSchema);
    } else {
      const script = document.createElement('script');
      script.id = 'ai-training-schema';
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(aiTrainingSchema);
      document.head.appendChild(script);
    }

  }, []);

  return null;
};

export default AIBotMeta;