import React from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import Breadcrumbs from '@/components/Breadcrumbs';
import InternalLinking from '@/components/InternalLinking';
import RichSnippets, { serviceFAQs, howToData } from '@/components/RichSnippets';
import { getServiceBySlug } from '@/data/services';
import { getAllStates } from '@/data/allStatesLocations';
import { generateBreadcrumbs } from '@/utils/slugs';
import { MapPin, Users, Building2 } from 'lucide-react';

const ServiceHubPage: React.FC = () => {
  const { serviceSlug } = useParams<{ serviceSlug: string }>();
  
  if (!serviceSlug) {
    return <Navigate to="/services" replace />;
  }

  const service = getServiceBySlug(serviceSlug);
  
  if (!service) {
    return <Navigate to="/404" replace />;
  }

  const states = getAllStates();
  const breadcrumbs = generateBreadcrumbs(service.title, undefined, undefined, serviceSlug);

  const seoTitle = `${service.title} Services Across the United States | Skerritt Economics`;
  const seoDescription = `Professional ${service.title.toLowerCase()} services available nationwide. Find expert economic consulting in your state and city.`;
  const canonical = `https://skerritteconomics.com/services/${serviceSlug}`;

  const keywords = [
    service.title.toLowerCase(),
    'economic consulting',
    'expert analysis',
    'nationwide services',
    'professional consulting',
    'economic research'
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.title,
    "description": service.description,
    "provider": {
      "@type": "Organization",
      "name": "Skerritt Economics",
      "url": "https://skerritteconomics.com"
    },
    "areaServed": "United States",
    "serviceType": "Economic Consulting"
  };

  return (
    <>
      <SEOHead
        title={seoTitle}
        description={seoDescription}
        canonical={canonical}
        keywords={keywords}
        schema={structuredData}
      />
      {/* Service-level JSON-LD for AI + SEO */}
      <RichSnippets 
        type="service"
        serviceName={service.title}
      />
      <RichSnippets 
        type="faq" 
        data={serviceFAQs[service.slug as keyof typeof serviceFAQs] || serviceFAQs['economic-loss-assessment']} 
      />
      <RichSnippets 
        type="howto" 
        data={howToData['expert-testimony']} 
      />
      
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-1 pt-20">
          {/* Hero Section */}
          <section className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="mb-8">
                <Breadcrumbs items={breadcrumbs} />
              </div>
              
              <div className="text-center max-w-4xl mx-auto">
                <div className="flex justify-center mb-6">
                  <service.icon className="h-16 w-16 text-primary" />
                </div>
                
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                  {service.title} Services
                </h1>
                
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                  {service.description}
                </p>
                
                <div className="flex flex-wrap justify-center gap-2 mb-8">
                  {service.caseTypes.slice(0, 4).map((caseType, index) => (
                    <Link 
                      key={index}
                      to={`/case-types/${caseType.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')}`}
                      className="inline-block"
                    >
                      <Badge variant="secondary" className="text-sm hover:bg-primary/20 transition-colors cursor-pointer">
                        {caseType}
                      </Badge>
                    </Link>
                  ))}
                </div>
                
                <Button size="lg" asChild>
                  <Link to="/contact">
                    Get Expert Consultation
                  </Link>
                </Button>
              </div>
            </div>
          </section>

          {/* Service Details */}
          <section className="py-16 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid md:grid-cols-2 gap-12 items-start">
                <div>
                  <h2 className="text-3xl font-bold text-foreground mb-6">
                    Our {service.title} Expertise
                  </h2>
                  <p className="text-muted-foreground mb-8 leading-relaxed">
                    {service.metaDescription}
                  </p>
                  
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-foreground">Key Service Areas:</h3>
                    <div className="grid gap-3">
                      {service.features.map((feature, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                          <span className="text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                    {service.methods && service.methods.length > 0 && (
                      <div className="pt-2">
                        <h3 className="text-xl font-semibold text-foreground mt-6">Methods</h3>
                        <div className="grid gap-3 mt-2">
                          {service.methods.map((m, idx) => (
                            <div key={idx} className="flex items-start gap-3">
                              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                              <span className="text-muted-foreground">{m}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {(service.standards && service.standards.length > 0) || (service.references && service.references.length > 0) ? (
                      <div className="pt-2">
                        <h3 className="text-xl font-semibold text-foreground mt-6">Standards & References</h3>
                        {service.standards && service.standards.length > 0 && (
                          <ul className="list-disc list-inside text-muted-foreground mt-2">
                            {service.standards.map((s, idx) => (
                              <li key={idx}>{s}</li>
                            ))}
                          </ul>
                        )}
                        {service.references && service.references.length > 0 && (
                          <ul className="list-disc list-inside text-muted-foreground mt-2">
                            {service.references.map((r, idx) => (
                              <li key={idx}>{r}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ) : null}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-6">
                    Case Types We Handle
                  </h3>
                  <div className="grid gap-3">
                    {service.caseTypes.map((caseType, index) => (
                      <Link 
                        key={index}
                        to={`/case-types/${caseType.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')}`}
                        className="block"
                      >
                        <Card className="border-l-4 border-l-primary hover:shadow-md hover:bg-primary/5 transition-all cursor-pointer group">
                          <CardContent className="p-4">
                            <p className="text-foreground font-medium group-hover:text-primary transition-colors">{caseType}</p>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Available Locations */}
          <section className="py-16 bg-muted/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  {service.title} Services Available Nationwide
                </h2>
                <p className="text-xl text-muted-foreground">
                  Professional economic consulting services in all 50 states
                </p>
              </div>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {states.map((state) => (
                  <Card key={state.slug} className="hover:shadow-lg transition-shadow duration-300">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-primary" />
                        {state.name}
                      </CardTitle>
                      <CardDescription className="flex items-center gap-4 text-sm">
                        <span className="flex items-center gap-1">
                          <Building2 className="h-4 w-4" />
                          {state.cities.length} cities
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          Available
                        </span>
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="pt-0">
                      <div className="space-y-3">
                        <p className="text-sm text-muted-foreground">
                          Major cities: {state.cities.slice(0, 3).map(city => city.name).join(', ')}
                          {state.cities.length > 3 && ` +${state.cities.length - 3} more`}
                        </p>
                        
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" asChild className="flex-1">
                            <Link to={`/${state.slug}`}>
                              View State
                            </Link>
                          </Button>
                          <Button size="sm" asChild className="flex-1">
                            <Link to={`/services/${serviceSlug}/${state.slug}/${state.cities[0].slug}`}>
                              Get Service
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Internal Linking Section */}
          <section className="py-16 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <InternalLinking 
                currentPage="service"
                currentServiceSlug={service.slug}
                limit={6}
              />
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-16 bg-primary text-primary-foreground">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-3xl font-bold mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Contact us today for expert {service.title.toLowerCase()} consultation tailored to your specific needs.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" variant="secondary" asChild>
                  <Link to="/contact">
                    Schedule Consultation
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                  <Link to="/about">
                    Learn About Us
                  </Link>
                </Button>
              </div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default ServiceHubPage;
