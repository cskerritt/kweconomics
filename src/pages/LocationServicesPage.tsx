import { useParams, Navigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import Breadcrumbs from '@/components/Breadcrumbs';
import InternalLinking from '@/components/InternalLinking';
import LocalSEOEnhanced from '@/components/LocalSEOEnhanced';
import SearchComponent from '@/components/SearchComponent';
import { Card } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { getStateBySlug, getCityBySlug } from '@/data/locations';
import { isContentReady } from '@/data/contentReadiness';
import { getCityInsights } from '@/data/localInsights';
import { getAllServices } from '@/data/services';
import { generateBreadcrumbs, createServiceLocationUrl } from '@/utils/slugs';
import { MapPin, Users, Building, ArrowRight, Phone, Mail, BarChart3, Landmark, ClipboardList, LineChart } from 'lucide-react';
const LocationServicesPage = () => {
  const {
    stateSlug,
    citySlug
  } = useParams<{
    stateSlug: string;
    citySlug: string;
  }>();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(false);
  }, []);

  // Validate parameters
  const state = stateSlug ? getStateBySlug(stateSlug) : null;
  const city = stateSlug && citySlug ? getCityBySlug(stateSlug, citySlug) : null;
  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  if (!state || !city) {
    return <Navigate to="/404" replace />;
  }
  const services = getAllServices();
  const seoTitle = `Economic Analysis Services in ${city.name}, ${state.abbreviation} | Skerritt Economics`;
  const seoDescription = `Professional economic analysis, forensic economics, and expert witness services in ${city.name}, ${state.name}. Comprehensive litigation support and business consulting.`;
  const canonical = `https://skerritteconomics.com/${state.slug}/${city.slug}`;
  const breadcrumbs = generateBreadcrumbs(undefined, state.name, city.name, undefined, state.slug, city.slug);
  const keywords = [`economic analysis ${city.name.toLowerCase()}`, `forensic economics ${city.name.toLowerCase()}`, `expert witness ${city.name.toLowerCase()}`, `business consulting ${city.name.toLowerCase()}`, `economic services ${state.name.toLowerCase()}`];
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Skerritt Economics",
    "description": seoDescription,
    "areaServed": {
      "@type": "City",
      "name": city.name,
      "addressRegion": state.abbreviation,
      "addressCountry": "US"
    },
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "addressLocality": city.name,
        "addressRegion": state.abbreviation
      }
    },
    "url": canonical
  };
  // Advisory recommendations per city (metro-focused heuristic)
  const advisoryMetaCity: Record<string, { title: string; desc: string; icon: any }> = {
    'market-analysis-forecasting': {
      title: 'Market Analysis & Forecasting',
      desc: 'Local demand projections and scenario benchmarking.',
      icon: BarChart3
    },
    'pricing-strategy': {
      title: 'Pricing Strategy',
      desc: 'Elasticity and WTP for pricing moves.',
      icon: LineChart
    },
    'labor-economics-consulting': {
      title: 'Labor Economics Consulting',
      desc: 'Wage structures and geo differentials for local talent decisions.',
      icon: Users
    },
    'economic-impact-studies': {
      title: 'Economic Impact Studies',
      desc: 'Distributional and fiscal impacts for major initiatives.',
      icon: Landmark
    },
    'program-evaluation': {
      title: 'Program Evaluation',
      desc: 'Evaluation design and analysis for local programs.',
      icon: ClipboardList
    }
  };
  const cityAdvisorySlugs = city.metro
    ? ['market-analysis-forecasting', 'pricing-strategy', 'labor-economics-consulting']
    : ['economic-impact-studies', 'labor-economics-consulting', 'program-evaluation'];
  const contentReady = isContentReady(state.slug, city.slug);
  const insights = getCityInsights(state.slug, city.slug, city.name, state.name);

  return <div className="min-h-screen bg-background">
      <SEOHead title={seoTitle} description={seoDescription} canonical={canonical} keywords={keywords} schema={structuredData} noIndex={!contentReady} />
      <LocalSEOEnhanced 
        cityName={city.name}
        stateName={state.name}
        stateAbbr={state.abbreviation}
        population={city.population}
        metro={city.metro}
      />
      
      <Header />
      
      {/* Hero Section */}
      <section className="py-16 bg-gradient-hero">
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-primary-foreground">
            <Breadcrumbs items={breadcrumbs} className="mb-6 text-primary-foreground/80" />
            
            <div className="flex items-center mb-4">
              <Link 
                to={`/${state.slug}`}
                className="hover:scale-110 transition-transform cursor-pointer"
              >
                <MapPin className="h-12 w-12 text-primary-foreground mr-4 hover:text-accent transition-colors" />
              </Link>
              <div>
                <Link 
                  to={`/${state.slug}/${city.slug}`}
                  className="hover:text-accent transition-colors"
                >
                  <h1 className="text-4xl font-bold mb-2">
                    Economic Analysis Services in {city.name}, {state.abbreviation}
                  </h1>
                </Link>
                <div className="flex items-center text-primary-foreground/80">
                  {city.metro && <Link to={`/${state.slug}/${city.slug}`} className="mr-4 hover:text-primary-foreground transition-colors">{city.metro} Metro Area</Link>}
                  {city.population && <span>Population: {city.population.toLocaleString()}</span>}
                </div>
              </div>
            </div>
            
            <p className="text-xl mb-8 max-w-3xl">
              Professional economic analysis, forensic economics, and expert witness services 
              in {city.name}, {state.name}. Comprehensive litigation support and business consulting 
              for legal professionals and organizations.
            </p>
            
            <div className="mb-8">
              <SearchComponent />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact">
                <Button variant="hero" size="lg" className="group">
                  <Phone className="h-5 w-5 mr-2" />
                  Contact Our {city.name} Team
                  <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/schedule-consultation">
                <Button variant="outline" size="lg" className="border-primary-foreground/20 hover:bg-primary-foreground/10 text-slate-950">
                  <Mail className="h-5 w-5 mr-2" />
                  Request Consultation
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Advisory Highlights in City */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-2">Strategic Advisory in {city.name}</h2>
            <p className="text-muted-foreground">Explore frequently requested advisory services tailored for {city.name} and {state.name}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {cityAdvisorySlugs.map((slug) => {
              const m = advisoryMetaCity[slug];
              const Icon = m.icon as any;
              return (
                <Tooltip key={slug}>
                  <TooltipTrigger asChild>
                    <Link to={createServiceLocationUrl(slug, state.slug, city.slug)} className="block">
                      <Card className="p-6 shadow-card border-0 bg-card hover:shadow-elegant transition-all duration-300 cursor-pointer h-full">
                        <div className="flex items-center mb-3">
                          <Icon className="h-6 w-6 text-primary mr-3" />
                          <h3 className="text-lg font-semibold text-foreground">{m.title}</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">{m.desc}</p>
                      </Card>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Standards/methods: see hub page for details</p>
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </div>
          <div className="text-center mt-8">
            <Link to="/advisory">
              <Button variant="professional">See all Advisory</Button>
            </Link>
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

      {/* Location Overview */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Serving {city.name} and Surrounding Areas
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our team of experienced economists and vocational experts provides comprehensive 
              analysis and testimony services throughout the {city.metro || city.name} region.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Link 
              to="/about"
              className="block group"
            >
              <Card className="p-6 text-center shadow-card border-0 bg-card hover:shadow-elegant transition-all duration-300 cursor-pointer h-full">
                <Users className="h-12 w-12 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">Local Expertise</h3>
                <p className="text-muted-foreground group-hover:text-foreground transition-colors">
                  Deep understanding of {city.name}'s economic landscape and market conditions.
                </p>
              </Card>
            </Link>
            
            <Link 
              to="/experience"
              className="block group"
            >
              <Card className="p-6 text-center shadow-card border-0 bg-card hover:shadow-elegant transition-all duration-300 cursor-pointer h-full">
                <Building className="h-12 w-12 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">Court Experience</h3>
                <p className="text-muted-foreground group-hover:text-foreground transition-colors">
                  Extensive experience testifying in {state.name} state and federal courts.
                </p>
              </Card>
            </Link>
            
            <Link 
              to="/locations"
              className="block group"
            >
              <Card className="p-6 text-center shadow-card border-0 bg-card hover:shadow-elegant transition-all duration-300 cursor-pointer h-full">
                <MapPin className="h-12 w-12 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">Regional Coverage</h3>
                <p className="text-muted-foreground group-hover:text-foreground transition-colors">
                  Serving clients throughout the {city.metro || `${city.name} area`} and beyond.
                </p>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-gradient-subtle">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Our Services in {city.name}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive economic analysis and expert witness services tailored to your needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map(service => 
              <Link key={service.id} to={createServiceLocationUrl(service.slug, state.slug, city.slug)} className="block">
                <Card className="p-8 shadow-card hover:shadow-elegant transition-all duration-300 group border-0 bg-card cursor-pointer h-full">
                  <div className="mb-6">
                    <Link 
                      to={createServiceLocationUrl(service.slug, state.slug, city.slug)}
                      className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-lg mb-4 group-hover:bg-primary/20 transition-colors cursor-pointer"
                    >
                      <service.icon className="h-8 w-8 text-primary" />
                    </Link>
                    <Link 
                      to={createServiceLocationUrl(service.slug, state.slug, city.slug)}
                      className="block"
                    >
                      <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                        {service.title}
                      </h3>
                    </Link>
                    <Link 
                      to={createServiceLocationUrl(service.slug, state.slug, city.slug)}
                      className="block"
                    >
                      <p className="text-muted-foreground leading-relaxed mb-4 group-hover:text-foreground transition-colors">
                        {service.description}
                      </p>
                    </Link>
                  </div>

                  <Button variant="professional" className="w-full group">
                    Learn More
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform ml-2" />
                  </Button>
                </Card>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Internal Linking Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-6">
          <InternalLinking 
            currentPage="location"
            currentStateSlug={state.slug}
            currentCitySlug={city.slug}
            limit={6}
          />
        </div>
      </section>

      <Footer />
    </div>;
};
export default LocationServicesPage;
