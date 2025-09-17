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
import { 
  getServiceBySlug, 
  getAllServices 
} from '@/data/services';
import { 
  getStateBySlug, 
  getCityBySlug 
} from '@/data/locations';
import { 
  generateSEOTitle, 
  generateSEODescription, 
  generateBreadcrumbs,
  createServiceLocationUrl
} from '@/utils/slugs';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  CheckCircle, 
  ArrowRight,
  Users,
  Building,
  Scale
} from 'lucide-react';
import { isContentReady } from '@/data/contentReadiness';
import { getCityInsights } from '@/data/localInsights';

const ServiceLocationPage = () => {
  const { serviceSlug, stateSlug, citySlug } = useParams<{
    serviceSlug: string;
    stateSlug: string;
    citySlug: string;
  }>();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  // Validate parameters
  const service = serviceSlug ? getServiceBySlug(serviceSlug) : null;
  const state = stateSlug ? getStateBySlug(stateSlug) : null;
  const city = (stateSlug && citySlug) ? getCityBySlug(stateSlug, citySlug) : null;

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!service || !state || !city) {
    return <Navigate to="/404" replace />;
  }

  const allServices = getAllServices().filter(s => s.id !== service.id).slice(0, 3);
  
  const seoTitle = generateSEOTitle(service.title, city.name, state.abbreviation);
  const seoDescription = generateSEODescription(service.title, city.name, state.abbreviation, service.metaDescription);
  const canonical = `https://skerritteconomics.com${createServiceLocationUrl(service.slug, state.slug, city.slug)}`;
  
  const breadcrumbs = generateBreadcrumbs(
    service.title,
    state.name,
    city.name,
    service.slug,
    state.slug,
    city.slug
  );

  const keywords = [
    service.title.toLowerCase(),
    `${service.title.toLowerCase()} ${city.name.toLowerCase()}`,
    `${service.title.toLowerCase()} ${state.name.toLowerCase()}`,
    `economic analysis ${city.name.toLowerCase()}`,
    `forensic economics ${city.name.toLowerCase()}`,
    `expert witness ${city.name.toLowerCase()}`
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": `${service.title} - ${city.name}, ${state.abbreviation}`,
    "description": seoDescription,
    "provider": {
      "@type": "Organization",
      "name": "Skerritt Economics",
      "url": window.location.origin
    },
    "areaServed": {
      "@type": "City",
      "name": city.name,
      "addressRegion": state.abbreviation,
      "addressCountry": "US"
    },
    "serviceType": service.title,
    "url": canonical
  };

  const contentReady = isContentReady(state.slug, city.slug);
  const insights = getCityInsights(state.slug, city.slug, city.name, state.name);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={seoTitle}
        description={seoDescription}
        canonical={canonical}
        keywords={keywords}
        schema={structuredData}
        noIndex={!contentReady}
      />
      
      <Header />
      
      {/* Hero Section */}
      <section className="py-16 bg-gradient-hero">
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-primary-foreground">
            <Breadcrumbs items={breadcrumbs} className="mb-6 text-primary-foreground/80" />
            
            <div className="flex items-center mb-4">
              <Link 
                to={`/services/${service.slug}`}
                className="hover:scale-110 transition-transform cursor-pointer"
              >
                <service.icon className="h-12 w-12 text-primary-foreground mr-4 hover:text-accent transition-colors" />
              </Link>
              <div>
                <Link 
                  to={`/services/${service.slug}`}
                  className="hover:text-accent transition-colors"
                >
                  <h1 className="text-4xl font-bold mb-2">
                    {service.title} in {city.name}, {state.abbreviation}
                  </h1>
                </Link>
                <div className="flex items-center text-primary-foreground/80">
                  <Link 
                    to={`/${state.slug}/${city.slug}`}
                    className="flex items-center hover:text-primary-foreground transition-colors"
                  >
                    <MapPin className="h-4 w-4 mr-2" />
                    {city.metro && <span className="mr-4">{city.metro} Metro Area</span>}
                    {city.population && <span>Population: {city.population.toLocaleString()}</span>}
                  </Link>
                </div>
              </div>
            </div>
            
            <p className="text-xl mb-8 max-w-3xl">
              Expert {service.title.toLowerCase()} services in {city.name}, {state.name}. 
              {service.description} Professional consultation available for legal professionals and businesses.
            </p>
            
            <div className="mb-8">
              <SearchComponent />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact">
                <Button variant="hero" size="lg" className="group">
                  <Phone className="h-5 w-5 mr-2" />
                  Call Now for Consultation
                  <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/schedule-consultation">
                <Button variant="hero-outline" size="lg">
                  <Mail className="h-5 w-5 mr-2" />
                  Request Quote
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Local Insights for Unique Content */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 bg-card shadow-card border-0">
              <h3 className="text-xl font-semibold mb-3">Local Context</h3>
              <p className="text-muted-foreground leading-relaxed">{insights.summary}</p>
            </Card>
            <Card className="p-6 bg-card shadow-card border-0">
              <h3 className="text-xl font-semibold mb-3">Courts We Serve</h3>
              <ul className="list-disc pl-5 text-muted-foreground">
                {insights.courtsServed.map((c, i) => <li key={i}>{c}</li>)}
              </ul>
            </Card>
            <Card className="p-6 bg-card shadow-card border-0">
              <h3 className="text-xl font-semibold mb-3">Local Industries</h3>
              <ul className="list-disc pl-5 text-muted-foreground">
                {insights.commonIndustries.map((c, i) => <li key={i}>{c}</li>)}
              </ul>
            </Card>
          </div>
          <div className="mt-8 grid md:grid-cols-2 gap-6">
            {insights.faqs.map((f, i) => (
              <Card className="p-6 bg-card shadow-card border-0" key={i}>
                <h4 className="font-semibold mb-2">{f.q}</h4>
                <p className="text-muted-foreground">{f.a}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Service Details */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Card className="p-8 shadow-card border-0 bg-card mb-8">
                <h2 className="text-3xl font-bold text-foreground mb-6">
                  Professional {service.title} Services in {city.name}
                </h2>
                
                <p className="text-muted-foreground leading-relaxed mb-6 text-lg">
                  Our team provides comprehensive {service.title.toLowerCase()} services throughout the {city.name} metropolitan area. 
                  With extensive experience in {state.name} courts and regulatory environments, we deliver precise analysis 
                  and expert testimony that meets the highest professional standards.
                </p>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-4">Key Services</h3>
                    <ul className="space-y-3">
                      {service.features.map((feature, index) => (
                        <Link
                          key={index}
                          to={`/services/${service.slug}#${feature.toLowerCase().replace(/\s+/g, '-')}`}
                          className="flex items-start hover:text-primary transition-colors cursor-pointer group"
                        >
                          <CheckCircle className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground group-hover:text-primary transition-colors">{feature}</span>
                        </Link>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-4">Case Types</h3>
                    <div className="flex flex-wrap gap-2">
                      {service.caseTypes.map((caseType, index) => (
                        <Link 
                          key={index}
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
                </div>

                <div className="bg-gradient-subtle p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-foreground mb-4">
                    Why Choose Our {service.title} Services in {city.name}?
                  </h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <Link 
                      to="/about"
                      className="text-center hover:scale-105 transition-transform cursor-pointer group"
                    >
                      <Scale className="h-8 w-8 text-primary mx-auto mb-2 group-hover:text-primary-dark transition-colors" />
                      <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">Proven Expertise</h4>
                      <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">Years of experience in {state.name} legal system</p>
                    </Link>
                    <Link 
                      to={`/${state.slug}/${city.slug}`}
                      className="text-center hover:scale-105 transition-transform cursor-pointer group"
                    >
                      <Users className="h-8 w-8 text-primary mx-auto mb-2 group-hover:text-primary-dark transition-colors" />
                      <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">Local Knowledge</h4>
                      <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">Deep understanding of {city.name} market conditions</p>
                    </Link>
                    <Link 
                      to="/services"
                      className="text-center hover:scale-105 transition-transform cursor-pointer group"
                    >
                      <Building className="h-8 w-8 text-primary mx-auto mb-2 group-hover:text-primary-dark transition-colors" />
                      <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">Professional Standards</h4>
                      <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">Daubert-compliant analysis and testimony</p>
                    </Link>
                  </div>
                </div>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Contact Card */}
              <Card className="p-6 shadow-card border-0 bg-card mb-6">
                <h3 className="text-xl font-semibold text-foreground mb-4">Contact Us</h3>
                <div className="space-y-4">
                  <Link 
                    to="tel:+12036052814"
                    className="flex items-center hover:text-primary transition-colors cursor-pointer group"
                  >
                    <Phone className="h-5 w-5 text-primary mr-3 group-hover:scale-110 transition-transform" />
                    <span className="text-muted-foreground group-hover:text-primary transition-colors">(203) 605-2814</span>
                  </Link>
                  <Link 
                    to="mailto:chris@skerritteconomics.com"
                    className="flex items-center hover:text-primary transition-colors cursor-pointer group"
                  >
                    <Mail className="h-5 w-5 text-primary mr-3 group-hover:scale-110 transition-transform" />
                    <span className="text-muted-foreground group-hover:text-primary transition-colors">chris@skerritteconomics.com</span>
                  </Link>
                  <Link 
                    to={`/${state.slug}/${city.slug}`}
                    className="flex items-start hover:text-primary transition-colors cursor-pointer group"
                  >
                    <MapPin className="h-5 w-5 text-primary mr-3 mt-1 group-hover:scale-110 transition-transform" />
                    <span className="text-muted-foreground group-hover:text-primary transition-colors">Serving {city.name} and surrounding areas</span>
                  </Link>
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-primary mr-3" />
                    <span className="text-muted-foreground">Mon-Fri: 9AM-5PM</span>
                  </div>
                </div>
                <Link to="/schedule-consultation">
                  <Button className="w-full mt-4">
                    Schedule Consultation
                  </Button>
                </Link>
              </Card>

              {/* Related Services */}
              <Card className="p-6 shadow-card border-0 bg-card">
                <h3 className="text-xl font-semibold text-foreground mb-4">Other Services in {city.name}</h3>
                <div className="space-y-3">
                  {allServices.map((relatedService) => (
                    <Link 
                      key={relatedService.id} 
                      to={createServiceLocationUrl(relatedService.slug, state.slug, city.slug)}
                      className="block border-l-2 border-primary/20 pl-4 hover:border-primary hover:bg-primary/5 transition-all duration-300 rounded-r-md py-2 cursor-pointer group"
                    >
                      <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">{relatedService.title}</h4>
                      <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{relatedService.description}</p>
                    </Link>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ServiceLocationPage;
