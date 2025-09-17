import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { services } from "@/data/services";
import { 
  Scale, 
  TrendingDown, 
  Building2, 
  Users, 
  FileText, 
  PieChart,
  ArrowRight,
  CheckCircle,
  Calculator,
  Briefcase,
  ClipboardList,
  DollarSign
} from "lucide-react";

const Services = () => {

  const methodologies = [
    {
      icon: Calculator,
      title: "Economic Modeling",
      description: "Advanced statistical and econometric analysis using industry-standard methodologies."
    },
    {
      icon: Briefcase,
      title: "Labor Market Analysis",
      description: "Comprehensive evaluation of employment opportunities and wage data."
    },
    {
      icon: ClipboardList,
      title: "Vocational Assessment",
      description: "Professional evaluation of skills, abilities, and functional limitations."
    },
    {
      icon: DollarSign,
      title: "Financial Projections",
      description: "Present value calculations and future economic loss estimations."
    }
  ];

  const currentUrl = "https://skerritteconomics.com/services";
  
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Economic Analysis Services - Expert Forensic Economics",
    "description": "Comprehensive forensic economic analysis services including economic loss assessment, vocational evaluation, life care planning, and expert testimony.",
    "url": currentUrl,
    "mainEntity": {
      "@type": "ItemList",
      "name": "Economic Analysis Services",
      "numberOfItems": services.length,
      "itemListElement": services.map((service, index) => ({
        "@type": "Service",
        "position": index + 1,
        "name": service.title,
        "description": service.description,
        "provider": {
          "@type": "Organization",
          "name": "Skerritt Economics & Consulting"
        }
      }))
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://skerritteconomics.com"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Services",
          "item": currentUrl
        }
      ]
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="Economic Analysis Services - Expert Forensic Economics | Skerritt Economics"
        description="Comprehensive forensic economic analysis services including economic loss assessment, vocational evaluation, life care planning, and expert testimony. Daubert-compliant analysis for litigation support."
        canonical={currentUrl}
        keywords={["economic analysis services", "forensic economics", "economic loss assessment", "vocational evaluation", "life care planning", "expert testimony", "business valuation", "disability evaluation", "litigation support", "Daubert compliance"]}
        schema={structuredData}
      />
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-hero">
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center text-primary-foreground">
            <h1 className="text-5xl font-bold mb-6">
              Comprehensive Economic Analysis Services
            </h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Expert forensic economic analysis, vocational rehabilitation, and life care planning 
              services tailored to your litigation and disability evaluation needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg" className="group">
                Get Expert Consultation
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="hero-outline" size="lg" className="group" asChild>
                <Link to="/advisory">
                  Explore Advisory
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Forensic & Litigation Services */}
      <section id="forensic" className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-foreground mb-8">Forensic & Litigation Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services
              .filter(s => !new Set([
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
              ]).has(s.slug))
              .map((service, index) => (
              <Card key={index} className="p-8 shadow-card hover:shadow-elegant transition-all duration-300 group border-0 bg-card">
                <div className="mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-lg mb-4 group-hover:bg-primary/20 transition-colors">
                    <service.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-3">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
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
                      <Link 
                        key={caseIndex}
                        to={`/case-types/${caseType.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')}`}
                        className="inline-block"
                      >
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

      {/* Advisory CTA */}
      <section className="py-12 bg-muted/20">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-2xl font-semibold mb-4">Need Strategic Advisory Beyond Litigation?</h3>
          <p className="text-muted-foreground mb-6 max-w-3xl mx-auto">Explore our market analysis, pricing strategy, cost‑benefit, labor economics, policy, and data science services.</p>
          <Button variant="professional" size="lg" asChild>
            <Link to="/advisory">
              Explore Advisory Services
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Advisory Services */}
      <section id="advisory" className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-foreground mb-8">Advisory Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services
              .filter(s => new Set([
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
              ]).has(s.slug))
              .map((service, index) => (
              <Card key={index} className="p-8 shadow-card hover:shadow-elegant transition-all duration-300 group border-0 bg-card">
                <div className="mb-6">
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-primary/10 rounded-lg">
                    <service.icon className="h-7 w-7 text-primary" />
                  </div>
                </div>

                <div className="mb-4">
                  <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground mt-2">
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
                      <Link 
                        key={caseIndex}
                        to={`/case-types/${caseType.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')}`}
                        className="inline-block"
                      >
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

      {/* Methodologies Section */}
      <section className="py-20 bg-gradient-subtle">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Our Methodologies
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We employ rigorous, industry-standard methodologies to ensure accurate, 
              defensible, and Daubert-compliant economic analysis.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {methodologies.map((method, index) => (
              <Card key={index} className="p-6 text-center shadow-card border-0 bg-card">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-4">
                  <method.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {method.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {method.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Standards & Compliance */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Standards & Compliance
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 shadow-card border-0 bg-card">
              <h3 className="text-xl font-semibold text-foreground mb-4">Daubert Compliance</h3>
              <p className="text-muted-foreground mb-4">
                All analyses meet Federal Rules of Evidence standards for expert testimony, 
                ensuring admissibility in court proceedings.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-primary mr-2" />
                  Peer-reviewed methodologies
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-primary mr-2" />
                  Known error rates
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-primary mr-2" />
                  Scientific reliability
                </li>
              </ul>
            </Card>

            <Card className="p-8 shadow-card border-0 bg-card">
              <h3 className="text-xl font-semibold text-foreground mb-4">Professional Standards</h3>
              <p className="text-muted-foreground mb-4">
                Adherence to professional ethical codes and industry best practices 
                across all evaluations and testimony.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-primary mr-2" />
                  OWCP guidelines
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-primary mr-2" />
                  ABVE standards
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-primary mr-2" />
                  CRC ethical codes
                </li>
              </ul>
            </Card>

            <Card className="p-8 shadow-card border-0 bg-card">
              <h3 className="text-xl font-semibold text-foreground mb-4">Quality Assurance</h3>
              <p className="text-muted-foreground mb-4">
                Rigorous quality control processes ensure accurate calculations 
                and comprehensive documentation.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-primary mr-2" />
                  Independent review
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-primary mr-2" />
                  Data verification
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-primary mr-2" />
                  Source documentation
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Advisory Standards & References */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-foreground mb-4">Advisory Standards & References</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              Our advisory work follows recognized economic, policy, and evaluation guidance. Key references are integrated into our methods and deliverables.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="p-6 bg-card shadow-card border-0">
              <h3 className="font-semibold mb-2">Market Analysis & Forecasting</h3>
              <p className="text-sm text-muted-foreground">ARIMA/VAR, structural drivers, scenarios vs Fed SEP, CBO, IMF, and FRB‑Philadelphia SPF.
              Data: BEA/BLS, Census; cross‑checks with IMF WEO.</p>
            </Card>
            <Card className="p-6 bg-card shadow-card border-0">
              <h3 className="font-semibold mb-2">Pricing Strategy</h3>
              <p className="text-sm text-muted-foreground">Elasticity estimation, WTP, SSNIP & critical‑loss tests following DOJ/FTC Merger Guidelines and OECD toolkits.</p>
            </Card>
            <Card className="p-6 bg-card shadow-card border-0">
              <h3 className="font-semibold mb-2">Cost‑Benefit & ROI</h3>
              <p className="text-sm text-muted-foreground">ROI/NPV with Monte Carlo and assumptions logs per OMB Circular A‑94; sector guidance (e.g., USDOT BCA).</p>
            </Card>
            <Card className="p-6 bg-card shadow-card border-0">
              <h3 className="font-semibold mb-2">Labor Economics</h3>
              <p className="text-sm text-muted-foreground">Wage structures, geographic differentials using BLS OEWS/ECI/ECEC and area wage tables.</p>
            </Card>
            <Card className="p-6 bg-card shadow-card border-0">
              <h3 className="font-semibold mb-2">Public Policy & RIA</h3>
              <p className="text-sm text-muted-foreground">GAO Designing Evaluations, current A‑4 (2003) framework and A‑94 discounting unless superseded; USDOT for transport.</p>
            </Card>
            <Card className="p-6 bg-card shadow-card border-0">
              <h3 className="font-semibold mb-2">Health & Education</h3>
              <p className="text-sm text-muted-foreground">CHEERS 2022 and Second Panel on Cost‑Effectiveness; WWC procedures, BLS Education Pays, OECD Education at a Glance.</p>
            </Card>
            <Card className="p-6 bg-card shadow-card border-0">
              <h3 className="font-semibold mb-2">Finance & Investment</h3>
              <p className="text-sm text-muted-foreground">Macro/rates outlooks and stress testing with scenario matrices; capital appraisals aligned with A‑94/USDOT.</p>
            </Card>
            <Card className="p-6 bg-card shadow-card border-0">
              <h3 className="font-semibold mb-2">International & Development</h3>
              <p className="text-sm text-muted-foreground">WTO tariffs, UNCTAD FDI/WIR, World Bank WDI for trade, market‑entry, and development evaluations.</p>
            </Card>
            <Card className="p-6 bg-card shadow-card border-0">
              <h3 className="font-semibold mb-2">Econometrics & Data Science</h3>
              <p className="text-sm text-muted-foreground">Forecasting and causal inference (DiD, RD, synthetic control), survey analytics, and data pipelines informed by leading literature.</p>
            </Card>
          </div>

          <div className="text-center mt-8">
            <a href="/ai/services.json" className="text-primary underline hover:opacity-80">
              View machine‑readable advisory catalog
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
