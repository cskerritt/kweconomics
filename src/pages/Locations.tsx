import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { getAllStates } from '@/data/allStatesLocations';
import { getAllServices } from '@/data/services';
import { MapPin, Building2, Search, Users, ChevronRight, Navigation } from "lucide-react";

const Locations = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedState, setSelectedState] = useState<string | null>(null);
  
  const states = getAllStates();
  const services = getAllServices();
  
  // Filter states and cities based on search term
  const filteredStates = states.filter(state => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return state.name.toLowerCase().includes(term) ||
           state.cities.some(city => city.name.toLowerCase().includes(term));
  });

  // Calculate total locations
  const totalCities = states.reduce((sum, state) => sum + state.cities.length, 0);
  const totalPages = services.length * totalCities + totalCities + states.length;

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="All Service Locations | Kincaid Wolstein Economics"
        description="Browse all our service locations across the United States. Expert economic analysis available in all 50 states and major cities."
        keywords={["locations", "service areas", "economic consulting locations", "expert witness locations"]}
      />
      
      <Header />
      
      {/* Hero Section */}
      <section className="py-16 bg-gradient-hero">
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center text-primary-foreground">
            <div className="flex items-center justify-center mb-4">
              <Navigation className="h-12 w-12 mr-3" />
              <h1 className="text-5xl font-bold">All Service Locations</h1>
            </div>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Expert economic analysis and consulting services available nationwide. 
              Browse our complete directory of service locations.
            </p>
            
            {/* Statistics */}
            <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-8">
              <div className="text-center">
                <div className="text-3xl font-bold">{states.length}</div>
                <div className="text-sm opacity-90">States</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">{totalCities}</div>
                <div className="text-sm opacity-90">Cities</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">{services.length}</div>
                <div className="text-sm opacity-90">Services</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">{totalPages.toLocaleString()}</div>
                <div className="text-sm opacity-90">Total Pages</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-8 bg-background border-b">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                type="text"
                placeholder="Search for a state or city..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-6 text-lg"
              />
            </div>
            {searchTerm && (
              <div className="mt-2 text-sm text-muted-foreground">
                Found {filteredStates.length} states and {
                  filteredStates.reduce((sum, state) => 
                    sum + state.cities.filter(city => 
                      city.name.toLowerCase().includes(searchTerm.toLowerCase())
                    ).length, 0
                  )
                } cities matching "{searchTerm}"
              </div>
            )}
          </div>
        </div>
      </section>

      {/* States and Cities Grid */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-6">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">Browse by State</h2>
            <p className="text-muted-foreground">
              Select a state to view all available cities and service locations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredStates.map((state) => {
              const isExpanded = selectedState === state.slug;
              const filteredCities = searchTerm 
                ? state.cities.filter(city => 
                    city.name.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                : state.cities;

              return (
                <Card 
                  key={state.slug} 
                  className="hover:shadow-lg transition-all duration-300"
                >
                  <CardHeader 
                    className="cursor-pointer"
                    onClick={() => setSelectedState(isExpanded ? null : state.slug)}
                  >
                    <CardTitle className="text-lg flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-primary" />
                        {state.name}
                      </span>
                      <Badge variant="secondary">{state.abbreviation}</Badge>
                    </CardTitle>
                    <CardDescription className="flex items-center gap-4 text-sm">
                      <span className="flex items-center gap-1">
                        <Building2 className="h-4 w-4" />
                        {state.cities.length} cities
                      </span>
                      <ChevronRight className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className={`${isExpanded ? 'block' : 'hidden'}`}>
                    <div className="space-y-3">
                      {/* State Overview Link */}
                      <Link 
                        to={`/${state.slug}`}
                        className="block p-2 rounded hover:bg-muted transition-colors"
                      >
                        <div className="font-medium text-primary">View All {state.name} Services</div>
                        <div className="text-xs text-muted-foreground">State overview page</div>
                      </Link>
                      
                      <div className="border-t pt-3">
                        <div className="text-sm font-medium mb-2">Major Cities:</div>
                        <div className="space-y-1 max-h-64 overflow-y-auto">
                          {(searchTerm ? filteredCities : state.cities.slice(0, 10)).map((city) => (
                            <Link
                              key={city.slug}
                              to={`/${state.slug}/${city.slug}`}
                              className="block p-2 rounded hover:bg-muted transition-colors text-sm"
                            >
                              <div className="flex items-center justify-between">
                                <span>{city.name}</span>
                                {city.population && (
                                  <span className="text-xs text-muted-foreground">
                                    {city.population.toLocaleString()}
                                  </span>
                                )}
                              </div>
                            </Link>
                          ))}
                          {!searchTerm && state.cities.length > 10 && (
                            <div className="text-xs text-muted-foreground pt-2">
                              +{state.cities.length - 10} more cities
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Quick Service Links */}
                      <div className="border-t pt-3">
                        <div className="text-sm font-medium mb-2">Popular Services:</div>
                        <div className="flex flex-wrap gap-1">
                          {services.slice(0, 3).map((service) => (
                            <Link
                              key={service.slug}
                              to={`/services/${service.slug}/${state.slug}/${state.cities[0].slug}`}
                              className="text-xs bg-primary/10 text-primary px-2 py-1 rounded hover:bg-primary/20 transition-colors"
                            >
                              {service.title.split(' ')[0]}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Quick Access */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Services Available at All Locations
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our comprehensive economic analysis services are available in every listed location. 
              Click any service to explore specific locations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {services.map((service) => (
              <Card key={service.slug} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <Link 
                    to={`/services/${service.slug}`}
                    className="flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <service.icon className="h-5 w-5 text-primary" />
                      <span className="text-sm font-medium">{service.title}</span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Can't Find Your Location?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            We provide services nationwide, including locations not listed here. 
            Contact us directly to discuss services in your area.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/contact">
                Contact Us
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              <Users className="h-5 w-5 mr-2" />
              Call (203) 605-2814
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Locations;