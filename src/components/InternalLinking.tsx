import { Link } from 'react-router-dom';
import { getAllServices } from '@/data/services';
import { getAllStates } from '@/data/allStatesLocations';
import { ArrowRight, MapPin, Briefcase } from 'lucide-react';

interface InternalLinkingProps {
  currentPage?: 'service' | 'location' | 'service-location';
  currentServiceSlug?: string;
  currentStateSlug?: string;
  currentCitySlug?: string;
  limit?: number;
}

const InternalLinking: React.FC<InternalLinkingProps> = ({
  currentPage,
  currentServiceSlug,
  currentStateSlug,
  currentCitySlug,
  limit = 6
}) => {
  const services = getAllServices();
  const states = getAllStates();

  const getRelatedServices = () => {
    return services
      .filter(service => service.slug !== currentServiceSlug)
      .slice(0, limit);
  };

  const getRelatedLocations = () => {
    const currentState = states.find(state => state.slug === currentStateSlug);
    if (!currentState) return [];

    const relatedCities = currentState.cities
      .filter(city => city.slug !== currentCitySlug)
      .slice(0, 4);

    const otherStates = states
      .filter(state => state.slug !== currentStateSlug)
      .slice(0, 2);

    return [
      ...relatedCities.map(city => ({
        title: `${city.name}, ${currentState.abbreviation}`,
        url: `/${currentState.slug}/${city.slug}`,
        type: 'city' as const
      })),
      ...otherStates.map(state => ({
        title: `${state.name} Services`,
        url: `/${state.slug}`,
        type: 'state' as const
      }))
    ].slice(0, limit);
  };

  const getServiceLocationCombinations = () => {
    if (!currentServiceSlug) return [];

    const currentService = services.find(s => s.slug === currentServiceSlug);
    if (!currentService) return [];

    return states.slice(0, 6).map(state => ({
      title: `${currentService.title} in ${state.name}`,
      url: `/${state.slug}`,
      description: `Expert ${currentService.title.toLowerCase()} services throughout ${state.name}`,
      type: 'service-state' as const
    }));
  };

  const getCityServiceCombinations = () => {
    if (!currentStateSlug || !currentCitySlug) return [];

    const currentState = states.find(s => s.slug === currentStateSlug);
    const currentCity = currentState?.cities.find(c => c.slug === currentCitySlug);
    
    if (!currentState || !currentCity) return [];

    return services.slice(0, 6).map(service => ({
      title: `${service.title} in ${currentCity.name}`,
      url: `/services/${service.slug}/${currentState.slug}/${currentCity.slug}`,
      description: service.description.substring(0, 100) + '...',
      type: 'city-service' as const
    }));
  };

  if (currentPage === 'service') {
    const relatedServices = getRelatedServices();
    const serviceLocations = getServiceLocationCombinations();

    return (
      <div className="space-y-8">
        {/* Related Services */}
        <div>
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <Briefcase className="h-5 w-5 mr-2" />
            Related Services
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {relatedServices.map(service => (
              <Link
                key={service.slug}
                to={`/services/${service.slug}`}
                className="group p-4 border rounded-lg hover:shadow-md transition-all"
              >
                <h4 className="font-medium group-hover:text-primary transition-colors">
                  {service.title}
                </h4>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                  {service.description}
                </p>
                <div className="flex items-center mt-2 text-sm text-primary">
                  Learn More <ArrowRight className="h-3 w-3 ml-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Service Locations */}
        <div>
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <MapPin className="h-5 w-5 mr-2" />
            Service Locations
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {serviceLocations.map(location => (
              <Link
                key={location.url}
                to={location.url}
                className="group p-3 border rounded-lg hover:shadow-md transition-all"
              >
                <h4 className="font-medium group-hover:text-primary transition-colors">
                  {location.title}
                </h4>
                <p className="text-sm text-muted-foreground mt-1">
                  {location.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (currentPage === 'location') {
    const relatedLocations = getRelatedLocations();
    const allServices = services.slice(0, 6);

    return (
      <div className="space-y-8">
        {/* Related Locations */}
        <div>
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <MapPin className="h-5 w-5 mr-2" />
            Nearby Locations
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {relatedLocations.map(location => (
              <Link
                key={location.url}
                to={location.url}
                className="group p-3 border rounded-lg hover:shadow-md transition-all"
              >
                <h4 className="font-medium group-hover:text-primary transition-colors flex items-center">
                  {location.type === 'city' ? (
                    <MapPin className="h-4 w-4 mr-2" />
                  ) : (
                    <Briefcase className="h-4 w-4 mr-2" />
                  )}
                  {location.title}
                </h4>
              </Link>
            ))}
          </div>
        </div>

        {/* Available Services */}
        <div>
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <Briefcase className="h-5 w-5 mr-2" />
            Available Services
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {allServices.map(service => (
              <Link
                key={service.slug}
                to={`/services/${service.slug}`}
                className="group p-4 border rounded-lg hover:shadow-md transition-all"
              >
                <h4 className="font-medium group-hover:text-primary transition-colors">
                  {service.title}
                </h4>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                  {service.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (currentPage === 'service-location') {
    const relatedServices = getRelatedServices();
    const cityServices = getCityServiceCombinations();

    return (
      <div className="space-y-8">
        {/* Other Services in This City */}
        <div>
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <Briefcase className="h-5 w-5 mr-2" />
            Other Services in This Area
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {cityServices.slice(0, 4).map(service => (
              <Link
                key={service.url}
                to={service.url}
                className="group p-4 border rounded-lg hover:shadow-md transition-all"
              >
                <h4 className="font-medium group-hover:text-primary transition-colors">
                  {service.title}
                </h4>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                  {service.description}
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* Related Services */}
        <div>
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <Briefcase className="h-5 w-5 mr-2" />
            Related Services
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {relatedServices.slice(0, 4).map(service => (
              <Link
                key={service.slug}
                to={`/services/${service.slug}`}
                className="group p-4 border rounded-lg hover:shadow-md transition-all"
              >
                <h4 className="font-medium group-hover:text-primary transition-colors">
                  {service.title}
                </h4>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                  {service.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default InternalLinking;
