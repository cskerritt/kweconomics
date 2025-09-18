import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import FAQSection from "@/components/FAQSection";
import RichSnippets from "@/components/RichSnippets";
import TestimonialsSection from "@/components/TestimonialsSection";
import CaseStudyPreviews from "@/components/CaseStudyPreviews";
import TrustBadges from "@/components/TrustBadges";

import FloatingNavigation from "@/components/FloatingNavigation";
import Testimonials from "@/components/Testimonials";

const Index = () => {
  const currentUrl = "https://kweconomics.com";
  
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Kincaid Wolstein Economics",
    "alternateName": ["KW Economics"],
    "description": "Expert forensic economic analysis, vocational rehabilitation, and life care planning services. 25+ years experience providing litigation support and expert testimony.",
    "url": currentUrl,
    "telephone": "(201) 343-0700",
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
    "founder": {
      "@type": "Person",
      "name": "Christopher Skerritt",
      "jobTitle": "Principal Economist",
      "description": "Forensic economist with M.Ed., MBA, and multiple professional certifications",
      "hasCredential": [
        "Master of Business Administration",
        "Master of Education in Rehabilitation Counseling",
        "Certified Rehabilitation Counselor (CRC)",
        "Certified Life Care Planner (CLCP)",
        "Fellow of the American Board of Vocational Experts (ABVE/F)"
      ]
    },
    "serviceArea": {
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
            "description": "Forensic economic analysis for personal injury and wrongful death cases"
          }
        },
        {
          "@type": "Offer", 
          "itemOffered": {
            "@type": "Service",
            "name": "Vocational Evaluation",
            "description": "Professional assessment of work capacity and employability"
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
        }
      ]
    },
    "sameAs": [
      "https://www.linkedin.com/in/christopherskerritt"
    ]
  };

  const homepageFAQs = [
    {
      question: "What is forensic economics and how can it help my case?",
      answer: "Forensic economics is the application of economic principles and methods to legal issues. Our experts analyze economic damages in personal injury, wrongful death, and business litigation cases, providing crucial calculations for lost earnings, reduced earning capacity, and other financial impacts."
    },
    {
      question: "How do you calculate economic damages in personal injury cases?",
      answer: "We use established economic methodologies considering factors like age, education, work history, career trajectory, benefits, and economic data. Our analysis includes lost wages, reduced earning capacity, loss of benefits, and other economic impacts, discounted to present value."
    },
    {
      question: "What qualifications do your experts have?",
      answer: "Our team includes economists with advanced degrees (M.Ed., MBA), professional certifications (CRC, CLCP, ABVE/F), and extensive courtroom experience. We maintain current knowledge of economic trends and legal standards."
    },
    {
      question: "Do you provide expert witness testimony?",
      answer: "Yes, we provide expert witness testimony in depositions and trials. Our experts are experienced in explaining complex economic concepts clearly to judges and juries, with extensive courtroom experience."
    },
    {
      question: "What geographic areas do you serve?",
      answer: "We provide services nationwide, with experience in all 50 states. Our experts are familiar with regional economic conditions and can travel for depositions and trials as needed."
    },
    {
      question: "How long does an economic analysis take?",
      answer: "Timeline varies by case complexity, but typically ranges from 2-4 weeks for standard cases. Complex cases involving multiple parties or extensive documentation may take 6-8 weeks. We work with your timeline whenever possible."
    }
  ];

  return (
    <div className="min-h-screen">
      <SEOHead 
        title="Kincaid Wolstein Economics | Forensic Economic Analysis & Expert Testimony"
        description="Professional forensic economic analysis and expert testimony for litigation support. 25+ years experience in damages calculation, lost profits analysis, and business valuation. Serving attorneys nationwide."
        canonical={currentUrl}
        keywords={["forensic economics", "expert witness", "economic damages", "litigation support", "lost profits", "business valuation", "vocational rehabilitation", "life care planning", "personal injury economics", "wrongful death analysis"]}
        schema={structuredData}
      />
      <Header />
      <Hero />
      <TrustBadges />
      <Services />
      <CaseStudyPreviews />
      <Testimonials />
      <TestimonialsSection />
      <About />
      <FAQSection 
        title="Frequently Asked Questions" 
        faqs={homepageFAQs} 
        addStructuredData={true} 
      />
      <Contact />
      <RichSnippets type="organization" />
      <Footer />
      
      <FloatingNavigation />
      
    </div>
  );
};

export default Index;
