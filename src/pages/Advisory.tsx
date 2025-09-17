import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { services } from "@/data/services";
import { ArrowRight, CheckCircle } from "lucide-react";

const advisorySlugs = new Set([
  'market-analysis-forecasting',
  'pricing-strategy',
  'cost-benefit-roi-analysis',
  'labor-economics-consulting',
  'economic-impact-studies',
  'public-policy-analysis',
  'regulatory-impact-assessments',
  'labor-market-employment-studies',
  'health-economics',
  'education-economics',
  'program-evaluation',
  'finance-investment-economics',
  'international-development-economics',
  'econometrics-data-science'
]);

const Advisory = () => {
  const currentUrl = "https://kweconomics.com/advisory";
  const advisoryServices = services.filter(s => advisorySlugs.has(s.slug));

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Advisory Services - Kincaid Wolstein Economics",
    "description": "Business & industry, public policy, health/education, finance, international and data science advisory services.",
    "url": currentUrl,
    "mainEntity": {
      "@type": "ItemList",
      "name": "Advisory Services",
      "numberOfItems": advisoryServices.length,
      "itemListElement": advisoryServices.map((service, index) => ({
        "@type": "Service",
        "position": index + 1,
        "name": service.title,
        "description": service.description
      }))
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Advisory Services | Kincaid Wolstein Economics"
        description="Advisory offerings across business & industry, government & public policy, healthcare & education, finance & investment, international & development, and econometrics/data science."
        canonical={currentUrl}
        keywords={["advisory services", "market analysis", "pricing strategy", "cost benefit", "labor economics", "economic impact", "RIA", "program evaluation", "health economics", "education economics", "finance economics", "international economics", "econometrics", "data science"]}
        schema={structuredData}
      />

      <Header />

      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-6 relative z-10 text-center text-primary-foreground">
          <h1 className="text-5xl font-bold mb-6">Advisory Services</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Evidence‑based advisory across markets, policy, health, education, finance, international, and data science — with documented methods and standards.
          </p>
          <Button variant="hero" size="lg" asChild>
            <Link to="/contact" className="group">
              Get Expert Consultation
              <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {advisoryServices.map((service, index) => (
              <Card key={index} className="p-8 shadow-card hover:shadow-elegant transition-all duration-300 group border-0 bg-card">
                <div className="mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-lg">
                    <service.icon className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <div className="mb-4">
                  <h2 className="text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {service.title}
                  </h2>
                  <p className="text-muted-foreground">
                    {service.description}
                  </p>
                </div>
                <div className="mb-6">
                  <h4 className="font-semibold text-foreground mb-3">Key Services:</h4>
                  <ul className="space-y-2 mb-4">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mb-6">
                  <h4 className="font-semibold text-foreground mb-3">Case Types:</h4>
                  <div className="flex flex-wrap gap-2">
                    {service.caseTypes.map((caseType, caseIndex) => (
                      <Link key={caseIndex} to={`/case-types/${caseType.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')}`} className="inline-block">
                        <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors cursor-pointer">
                          {caseType}
                        </Badge>
                      </Link>
                    ))}
                  </div>
                </div>
                <Button variant="professional" className="w-full group" asChild>
                  <Link to={`/services/${service.slug}`}>
                    Learn More
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Advisory;

