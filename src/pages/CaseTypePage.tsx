import { useParams, Navigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import Breadcrumbs from '@/components/Breadcrumbs';
import SearchComponent from '@/components/SearchComponent';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getCaseTypeBySlug, getAllCaseTypes } from '@/utils/caseTypes';
import { getServiceBySlug } from '@/data/services';
import { 
  Scale, 
  ArrowRight,
  CheckCircle,
  Users,
  Building,
  FileText,
  Phone,
  Mail
} from 'lucide-react';

const CaseTypePage = () => {
  const { caseTypeSlug } = useParams<{ caseTypeSlug: string }>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const caseType = caseTypeSlug ? getCaseTypeBySlug(caseTypeSlug) : null;

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!caseType) {
    return <Navigate to="/404" replace />;
  }

  const relatedServices = caseType.relatedServices
    .map(slug => getServiceBySlug(slug))
    .filter(Boolean);

  const otherCaseTypes = getAllCaseTypes()
    .filter(ct => ct.slug !== caseType.slug && ct.category === caseType.category)
    .slice(0, 6);

  const seoTitle = `${caseType.name} Economic Analysis & Expert Testimony | Skerritt Economics`;
  const seoDescription = `Expert ${caseType.name.toLowerCase()} economic analysis and testimony services. ${caseType.description}`;
  const canonical = `${window.location.origin}/case-types/${caseType.slug}`;

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'Case Types', href: '/services#case-types' },
    { label: caseType.name, href: `/case-types/${caseType.slug}` }
  ];

  const keywords = [
    `${caseType.name.toLowerCase()} economic analysis`,
    `${caseType.name.toLowerCase()} expert witness`,
    `${caseType.name.toLowerCase()} testimony`,
    'forensic economics',
    'litigation support'
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": `${caseType.name} Economic Analysis`,
    "description": seoDescription,
    "provider": {
      "@type": "Organization",
      "name": "KW Economics",
      "url": window.location.origin
    },
    "serviceType": caseType.name,
    "url": canonical
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={seoTitle}
        description={seoDescription}
        canonical={canonical}
        keywords={keywords}
        schema={structuredData}
      />
      
      <Header />
      
      {/* Hero Section */}
      <section className="py-16 bg-gradient-hero">
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-primary-foreground">
            <Breadcrumbs items={breadcrumbs} className="mb-6 text-primary-foreground/80" />
            
            <div className="flex items-center mb-4">
              <Scale className="h-12 w-12 text-primary-foreground mr-4" />
              <div>
                <h1 className="text-4xl font-bold mb-2">
                  {caseType.name} Economic Analysis
                </h1>
                <Badge variant="secondary" className="bg-primary-foreground/20 text-primary-foreground border-primary-foreground/30">
                  {caseType.category.charAt(0).toUpperCase() + caseType.category.slice(1)} Cases
                </Badge>
              </div>
            </div>
            
            <p className="text-xl mb-8 max-w-3xl">
              {caseType.description}
            </p>
            
            <div className="mb-8">
              <SearchComponent />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact">
                <Button variant="hero" size="lg" className="group">
                  <Phone className="h-5 w-5 mr-2" />
                  Get Case Consultation
                  <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/schedule-consultation">
                <Button variant="hero-outline" size="lg">
                  <Mail className="h-5 w-5 mr-2" />
                  Request Analysis Quote
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Case Type Details */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Card className="p-8 shadow-card border-0 bg-card mb-8">
                <h2 className="text-3xl font-bold text-foreground mb-6">
                  Expert Analysis for {caseType.name} Cases
                </h2>
                
                <p className="text-muted-foreground leading-relaxed mb-6 text-lg">
                  Our comprehensive approach to {caseType.name.toLowerCase()} cases combines rigorous economic 
                  analysis with deep understanding of legal requirements. We provide Daubert-compliant 
                  analysis that meets the highest standards of professional practice.
                </p>

                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <Link 
                    to="/about"
                    className="text-center hover:scale-105 transition-transform cursor-pointer group"
                  >
                    <Users className="h-8 w-8 text-primary mx-auto mb-2 group-hover:text-primary-dark transition-colors" />
                    <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">Expert Testimony</h4>
                    <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">Qualified expert witness services</p>
                  </Link>
                  <Link 
                    to="/services"
                    className="text-center hover:scale-105 transition-transform cursor-pointer group"
                  >
                    <Building className="h-8 w-8 text-primary mx-auto mb-2 group-hover:text-primary-dark transition-colors" />
                    <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">Comprehensive Analysis</h4>
                    <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">Thorough economic evaluation</p>
                  </Link>
                  <Link 
                    to="/experience"
                    className="text-center hover:scale-105 transition-transform cursor-pointer group"
                  >
                    <FileText className="h-8 w-8 text-primary mx-auto mb-2 group-hover:text-primary-dark transition-colors" />
                    <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">Proven Experience</h4>
                    <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">Extensive case history</p>
                  </Link>
                </div>

                <div className="bg-gradient-subtle p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-foreground mb-4">
                    Key Considerations for {caseType.name} Cases
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-foreground">Economic loss calculation methodologies</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-foreground">Present value discount rate analysis</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-foreground">Labor market and wage data research</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-foreground">Future care cost projections</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-foreground">Functional capacity evaluation integration</span>
                    </li>
                  </ul>
                </div>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Related Services */}
              <Card className="p-6 shadow-card border-0 bg-card mb-6">
                <h3 className="text-xl font-semibold text-foreground mb-4">Related Services</h3>
                <div className="space-y-3">
                  {relatedServices.map((service) => (
                    <Link 
                      key={service!.id} 
                      to={`/services/${service!.slug}`}
                      className="block border-l-2 border-primary/20 pl-4 hover:border-primary hover:bg-primary/5 transition-all duration-300 rounded-r-md py-2 cursor-pointer group"
                    >
                      <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">{service!.title}</h4>
                      <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{service!.description}</p>
                    </Link>
                  ))}
                </div>
              </Card>

              {/* Related Case Types */}
              {otherCaseTypes.length > 0 && (
                <Card className="p-6 shadow-card border-0 bg-card">
                  <h3 className="text-xl font-semibold text-foreground mb-4">Related Case Types</h3>
                  <div className="space-y-2">
                    {otherCaseTypes.map((relatedCaseType) => (
                      <Link 
                        key={relatedCaseType.slug}
                        to={`/case-types/${relatedCaseType.slug}`}
                        className="block p-3 rounded-md hover:bg-primary/5 transition-colors cursor-pointer group"
                      >
                        <div className="font-medium text-foreground group-hover:text-primary transition-colors text-sm">
                          {relatedCaseType.name}
                        </div>
                      </Link>
                    ))}
                  </div>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CaseTypePage;