import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import SearchComponent from '@/components/SearchComponent';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Search, MapPin, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getAllServices } from '@/data/services';
import { getAllStates } from '@/data/allStatesLocations';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState<any[]>([]);

  const services = getAllServices();
  const states = getAllStates();

  useEffect(() => {
    if (query) {
      performSearch(query);
    }
  }, [query]);

  const performSearch = (searchQuery: string) => {
    const searchTerm = searchQuery.toLowerCase();
    const searchResults: any[] = [];

    // Search services
    services.forEach(service => {
      const titleMatch = service.title.toLowerCase().includes(searchTerm);
      const descMatch = service.description.toLowerCase().includes(searchTerm);
      const featureMatch = service.features.some(f => f.toLowerCase().includes(searchTerm));
      
      if (titleMatch || descMatch || featureMatch) {
        searchResults.push({
          type: 'service',
          title: service.title,
          description: service.description.substring(0, 150) + '...',
          url: `/services/${service.slug}`,
          icon: <Briefcase className="h-5 w-5" />,
          relevance: titleMatch ? 10 : (descMatch ? 5 : 2)
        });
      }
    });

    // Search locations
    states.forEach(state => {
      const stateMatch = state.name.toLowerCase().includes(searchTerm);
      if (stateMatch) {
        searchResults.push({
          type: 'location',
          title: `${state.name} Services`,
          description: `Economic analysis and expert witness services throughout ${state.name}`,
          url: `/${state.slug}`,
          icon: <MapPin className="h-5 w-5" />,
          relevance: 8
        });
      }

      state.cities.forEach(city => {
        const cityMatch = city.name.toLowerCase().includes(searchTerm);
        if (cityMatch) {
          searchResults.push({
            type: 'location',
            title: `${city.name}, ${state.abbreviation}`,
            description: `Professional economic services in ${city.name}, ${state.name}`,
            url: `/${state.slug}/${city.slug}`,
            icon: <MapPin className="h-5 w-5" />,
            relevance: cityMatch ? 9 : 6
          });
        }
      });
    });

    setResults(
      searchResults
        .sort((a, b) => b.relevance - a.relevance)
        .slice(0, 20)
    );
  };

  const seoTitle = query 
    ? `Search Results for "${query}" | Kincaid Wolstein Economics`
    : 'Search Economic Services | Kincaid Wolstein Economics';
  
  const seoDescription = query
    ? `Find economic analysis and expert witness services related to "${query}". Professional consultation nationwide.`
    : 'Search our comprehensive economic analysis and expert witness services. Find the right expertise for your case.';

  return (
    <div className="min-h-screen">
      <SEOHead 
        title={seoTitle}
        description={seoDescription}
        canonical="/search"
      />
      
      <Header />
      
      <main className="pt-20 pb-16">
        {/* Search Hero */}
        <section className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <Search className="h-16 w-16 text-primary mx-auto mb-6" />
              <h1 className="text-4xl font-bold text-foreground mb-4">
                {query ? `Search Results for "${query}"` : 'Search Our Services'}
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Find the economic analysis and expert witness services you need
              </p>
            </div>
            
            <div className="max-w-2xl mx-auto">
              <SearchComponent />
            </div>
          </div>
        </section>

        {/* Search Results */}
        {query && (
          <section className="py-16">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              {results.length > 0 ? (
                <>
                  <div className="mb-8">
                    <p className="text-muted-foreground">
                      Found {results.length} result{results.length !== 1 ? 's' : ''} for "{query}"
                    </p>
                  </div>
                  
                  <div className="grid gap-6">
                    {results.map((result, index) => (
                      <Card key={index} className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-3">
                            <div className="text-primary">
                              {result.icon}
                            </div>
                            <Link 
                              to={result.url}
                              className="hover:text-primary transition-colors"
                            >
                              {result.title}
                            </Link>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground mb-4">
                            {result.description}
                          </p>
                          <Button variant="outline" asChild>
                            <Link to={result.url}>
                              View Details
                            </Link>
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-center py-16">
                  <Search className="h-16 w-16 text-muted-foreground mx-auto mb-6" />
                  <h2 className="text-2xl font-bold text-foreground mb-4">
                    No results found for "{query}"
                  </h2>
                  <p className="text-muted-foreground mb-8">
                    Try searching with different keywords or browse our services below.
                  </p>
                  <div className="flex flex-wrap justify-center gap-4">
                    <Button asChild>
                      <Link to="/services">
                        Browse All Services
                      </Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link to="/locations">
                        View Locations
                      </Link>
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Popular Services */}
        {!query && (
          <section className="py-16 bg-muted/30">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Popular Services
                </h2>
                <p className="text-xl text-muted-foreground">
                  Explore our most requested economic analysis services
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.slice(0, 6).map(service => (
                  <Card key={service.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        <service.icon className="h-6 w-6 text-primary" />
                        {service.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">
                        {service.description.substring(0, 100)}...
                      </p>
                      <Button variant="outline" asChild className="w-full">
                        <Link to={`/services/${service.slug}`}>
                          Learn More
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default SearchPage;