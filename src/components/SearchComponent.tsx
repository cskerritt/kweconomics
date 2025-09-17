import { useState, useMemo } from 'react';
import { Search, MapPin, Briefcase, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { getAllServices } from '@/data/services';
import { getAllStates } from '@/data/allStatesLocations';

interface SearchResult {
  type: 'service' | 'location' | 'service-location';
  title: string;
  description: string;
  url: string;
  icon: React.ReactNode;
  relevanceScore: number;
}

const SearchComponent = () => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const services = getAllServices();
  const states = getAllStates();

  const searchResults = useMemo(() => {
    if (!query || query.length < 2) return [];

    const results: SearchResult[] = [];
    const searchTerm = query.toLowerCase();

    // Search services
    services.forEach(service => {
      const titleMatch = service.title.toLowerCase().includes(searchTerm);
      const descMatch = service.description.toLowerCase().includes(searchTerm);
      const featureMatch = service.features.some(f => f.toLowerCase().includes(searchTerm));
      
      if (titleMatch || descMatch || featureMatch) {
        results.push({
          type: 'service',
          title: service.title,
          description: service.description.substring(0, 120) + '...',
          url: `/services/${service.slug}`,
          icon: <Briefcase className="h-4 w-4" />,
          relevanceScore: titleMatch ? 10 : (descMatch ? 5 : 2)
        });
      }
    });

    // Search locations
    states.forEach(state => {
      const stateMatch = state.name.toLowerCase().includes(searchTerm);
      if (stateMatch) {
        results.push({
          type: 'location',
          title: `${state.name} Services`,
          description: `Economic analysis and expert witness services throughout ${state.name}`,
          url: `/${state.slug}`,
          icon: <MapPin className="h-4 w-4" />,
          relevanceScore: 8
        });
      }

      state.cities.forEach(city => {
        const cityMatch = city.name.toLowerCase().includes(searchTerm);
        if (cityMatch) {
          results.push({
            type: 'location',
            title: `${city.name}, ${state.abbreviation}`,
            description: `Professional economic services in ${city.name}, ${state.name}`,
            url: `/${state.slug}/${city.slug}`,
            icon: <MapPin className="h-4 w-4" />,
            relevanceScore: cityMatch ? 9 : 6
          });
        }
      });
    });

    // Search service-location combinations
    if (searchTerm.includes(' in ') || searchTerm.includes(', ')) {
      const parts = searchTerm.split(/\s+(?:in|,)\s+/);
      if (parts.length === 2) {
        const [servicePart, locationPart] = parts;
        
        const matchingService = services.find(s => 
          s.title.toLowerCase().includes(servicePart)
        );
        
        if (matchingService) {
          states.forEach(state => {
            if (state.name.toLowerCase().includes(locationPart)) {
              state.cities.slice(0, 3).forEach(city => {
                results.push({
                  type: 'service-location',
                  title: `${matchingService.title} in ${city.name}, ${state.abbreviation}`,
                  description: `Expert ${matchingService.title.toLowerCase()} services in ${city.name}`,
                  url: `/services/${matchingService.slug}/${state.slug}/${city.slug}`,
                  icon: <Briefcase className="h-4 w-4" />,
                  relevanceScore: 12
                });
              });
            }
            
            state.cities.forEach(city => {
              if (city.name.toLowerCase().includes(locationPart)) {
                results.push({
                  type: 'service-location',
                  title: `${matchingService.title} in ${city.name}, ${state.abbreviation}`,
                  description: `Professional ${matchingService.title.toLowerCase()} in ${city.name}`,
                  url: `/services/${matchingService.slug}/${state.slug}/${city.slug}`,
                  icon: <Briefcase className="h-4 w-4" />,
                  relevanceScore: 15
                });
              }
            });
          });
        }
      }
    }

    return results
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .slice(0, 8);
  }, [query, services, states]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchResults.length > 0) {
      window.location.href = searchResults[0].url;
    }
  };

  return (
    <div className="relative">
      <form onSubmit={handleSearch} className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search services or locations..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          className="pl-10 pr-10"
        />
        {query && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
            onClick={() => {
              setQuery('');
              setIsOpen(false);
            }}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </form>

      {isOpen && query && searchResults.length > 0 && (
        <Card className="absolute top-full left-0 right-0 mt-2 z-50 shadow-lg">
          <CardContent className="p-2">
            {searchResults.map((result, index) => (
              <Link
                key={index}
                to={result.url}
                className="flex items-start space-x-3 p-3 rounded-md hover:bg-muted transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <div className="flex-shrink-0 mt-1">
                  {result.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm line-clamp-1">
                    {result.title}
                  </h4>
                  <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                    {result.description}
                  </p>
                </div>
              </Link>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Structured data for search functionality */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "url": "https://kweconomics.com",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://kweconomics.com/search?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          })
        }}
      />
    </div>
  );
};

export default SearchComponent;