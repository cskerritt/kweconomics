import { useParams, Navigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import LocalSEOEnhanced from '@/components/LocalSEOEnhanced';
import Breadcrumbs from '@/components/Breadcrumbs';
import SearchComponent from '@/components/SearchComponent';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { getStateBySlug } from '@/data/locations';
import { generateBreadcrumbs } from '@/utils/slugs';
import { 
  MapPin, 
  ArrowRight,
  Users,
  Building,
  Scale,
  BarChart3,
  Landmark,
  LineChart
} from 'lucide-react';

const StatePage = () => {
  const { stateSlug } = useParams<{ stateSlug: string }>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const state = stateSlug ? getStateBySlug(stateSlug) : null;

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!state) {
    return <Navigate to="/404" replace />;
  }

  const seoTitle = `Economic Analysis Services in ${state.name} | Skerritt Economics`;
  const seoDescription = `Professional economic analysis, forensic economics, and expert witness services throughout ${state.name}. Serving major cities with comprehensive litigation support.`;
  const canonical = `https://skerritteconomics.com/${state.slug}`;
  
  const breadcrumbs = generateBreadcrumbs(
    undefined,
    state.name,
    undefined,
    undefined,
    state.slug,
    undefined
  );

  const keywords = [
    `economic analysis ${state.name.toLowerCase()}`,
    `forensic economics ${state.name.toLowerCase()}`,
    `expert witness ${state.name.toLowerCase()}`,
    `economic services ${state.name.toLowerCase()}`
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Skerritt Economics",
    "description": seoDescription,
    "areaServed": {
      "@type": "State",
      "name": state.name,
      "addressCountry": "US"
    },
    "url": canonical
  };

  const majorCities = state.cities.slice(0, 12); // Show top 12 cities

  // Advisory recommendations per state (simple heuristic by state size)
  const advisoryMeta: Record<string, { title: string; desc: string; icon: any; href: string }> = {
    'market-analysis-forecasting': {
      title: 'Market Analysis & Forecasting',
      desc: 'Time‑series & scenario benchmarking vs Fed SEP / CBO / IMF / SPF.',
      icon: BarChart3,
      href: `/services/market-analysis-forecasting`
    },
    'pricing-strategy': {
      title: 'Pricing Strategy',
      desc: 'Elasticity, SSNIP/critical‑loss, WTP for pricing moves.',
      icon: LineChart,
      href: `/services/pricing-strategy`
    },
    'labor-economics-consulting': {
      title: 'Labor Economics Consulting',
      desc: 'Wage structures, ECI/ECEC/OEWS benchmarks, and geo differentials.',
      icon: Users,
      href: `/services/labor-economics-consulting`
    },
    'economic-impact-studies': {
      title: 'Economic Impact Studies',
      desc: 'IO multipliers, distributional and fiscal impacts with uncertainty analysis.',
      icon: Landmark,
      href: `/services/economic-impact-studies`
    }
  };
  const stateAdvisorySlugs = state.cities.length > 8
    ? ['market-analysis-forecasting', 'pricing-strategy', 'labor-economics-consulting']
    : ['economic-impact-studies', 'labor-economics-consulting', 'market-analysis-forecasting'];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={seoTitle}
        description={seoDescription}
        canonical={canonical}
        keywords={keywords}
        schema={structuredData}
      />
      {/* Local schema for state-level pages to improve AI + SEO */}
      <LocalSEOEnhanced stateName={state.name} stateAbbr={state.abbreviation} />
      
      <Header />
      
      {/* Hero Section */}
      <section className="py-16 bg-gradient-hero">
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-primary-foreground">
            <Breadcrumbs items={breadcrumbs} className="mb-6 text-primary-foreground/80" />
            
            <div className="flex items-center mb-4">
              <MapPin className="h-12 w-12 text-primary-foreground mr-4" />
              <div>
                <h1 className="text-4xl font-bold mb-2">
                  Economic Analysis Services in {state.name}
                </h1>
                <div className="text-primary-foreground/80">
                  Serving {state.cities.length} major cities statewide
                </div>
              </div>
            </div>
            
            <p className="text-xl mb-8 max-w-3xl">
              Professional economic analysis, forensic economics, and expert witness services 
              throughout {state.name}. Our team provides comprehensive litigation support and 
              business consulting for legal professionals and organizations across the state.
            </p>
            
            <div className="mb-8">
              <SearchComponent />
            </div>
            
            <Link to="/contact">
              <Button variant="hero" size="lg" className="group">
                Contact Our {state.name} Team
                <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* State Overview */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Statewide Economic Analysis Expertise
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our team of experienced economists and vocational experts provides comprehensive 
              analysis and testimony services throughout {state.name}.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Link 
              to="/about" 
              className="block group"
            >
              <Card className="p-6 text-center shadow-card border-0 bg-card hover:shadow-elegant transition-all duration-300 cursor-pointer h-full">
                <Scale className="h-12 w-12 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">Legal Expertise</h3>
                <p className="text-muted-foreground group-hover:text-foreground transition-colors">
                  Extensive experience with {state.name} legal system and court procedures.
                </p>
              </Card>
            </Link>
            
            <Link 
              to="/experience" 
              className="block group"
            >
              <Card className="p-6 text-center shadow-card border-0 bg-card hover:shadow-elegant transition-all duration-300 cursor-pointer h-full">
                <Building className="h-12 w-12 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">Market Knowledge</h3>
                <p className="text-muted-foreground group-hover:text-foreground transition-colors">
                  Deep understanding of {state.name}'s diverse economic landscape and industries.
                </p>
              </Card>
            </Link>
            
            <Link 
              to="/contact" 
              className="block group"
            >
              <Card className="p-6 text-center shadow-card border-0 bg-card hover:shadow-elegant transition-all duration-300 cursor-pointer h-full">
                <Users className="h-12 w-12 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">Professional Network</h3>
                <p className="text-muted-foreground group-hover:text-foreground transition-colors">
                  Established relationships with legal professionals throughout {state.name}.
                </p>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Advisory Highlights */}
      <section className="py-14 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-foreground mb-2">Advisory Highlights</h2>
            <p className="text-muted-foreground">Strategic services frequently requested in {state.name}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {stateAdvisorySlugs.map((slug) => {
              const m = advisoryMeta[slug];
              const Icon = m.icon as any;
              return (
                <Tooltip key={slug}>
                  <TooltipTrigger asChild>
                    <Link to={m.href} className="block">
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

      {/* Cities Grid */}
      <section className="py-20 bg-gradient-subtle">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Cities We Serve in {state.name}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Professional economic analysis services available in major metropolitan areas throughout {state.name}.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {majorCities.map((city) => (
              <Link key={city.slug} to={`/${state.slug}/${city.slug}`} className="block">
                <Card className="p-6 shadow-card hover:shadow-elegant transition-all duration-300 group border-0 bg-card cursor-pointer h-full">
                  <div className="flex items-center mb-4">
                    <MapPin className="h-6 w-6 text-primary mr-3 group-hover:scale-110 transition-transform" />
                    <div>
                      <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                        {city.name}
                      </h3>
                      {city.metro && (
                        <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{city.metro}</p>
                      )}
                    </div>
                  </div>
                  
                  {city.population && (
                    <p className="text-sm text-muted-foreground mb-4 group-hover:text-foreground transition-colors">
                      Population: {city.population.toLocaleString()}
                    </p>
                  )}

                  <Button 
                    variant="outline" 
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      window.location.href = `/${state.slug}/${city.slug}`;
                    }}
                  >
                    View Services
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform ml-2" />
                  </Button>
                </Card>
              </Link>
            ))}
          </div>

          {state.cities.length > 12 && (
            <div className="text-center mt-12">
              <p className="text-muted-foreground mb-4">
                And {state.cities.length - 12} more cities throughout {state.name}
              </p>
              <Link to="/locations">
                <Button variant="professional">
                  View All Cities
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default StatePage;
