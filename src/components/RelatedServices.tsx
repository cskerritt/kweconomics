import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getAllServices, Service } from '@/data/services';
import { ArrowRight } from 'lucide-react';

interface RelatedServicesProps {
  currentServiceSlug: string;
  stateSlug?: string;
  citySlug?: string;
  limit?: number;
}

const RelatedServices: React.FC<RelatedServicesProps> = ({ 
  currentServiceSlug, 
  stateSlug, 
  citySlug, 
  limit = 3 
}) => {
  const allServices = getAllServices();
  const relatedServices = allServices
    .filter(service => service.slug !== currentServiceSlug)
    .slice(0, limit);

  if (relatedServices.length === 0) {
    return null;
  }

  const getServiceUrl = (service: Service) => {
    if (stateSlug && citySlug) {
      return `/services/${service.slug}/${stateSlug}/${citySlug}`;
    }
    return `/services/${service.slug}`;
  };

  return (
    <section className="py-12 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Related Services
          </h2>
          <p className="text-muted-foreground">
            Explore our other expert economic consulting services
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedServices.map((service) => (
            <Card key={service.slug} className="hover:shadow-lg transition-all duration-300 group">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3 mb-2">
                  <service.icon className="h-8 w-8 text-primary group-hover:scale-110 transition-transform duration-300" />
                  <CardTitle className="text-lg">{service.title}</CardTitle>
                </div>
                <CardDescription className="line-clamp-2">
                  {service.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="space-y-4">
                  <div className="text-sm text-muted-foreground">
                    <p className="font-medium mb-1">Key Areas:</p>
                    <ul className="space-y-1">
                      {service.features.slice(0, 2).map((feature, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                          <span className="line-clamp-1">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Button variant="outline" size="sm" asChild className="w-full group">
                    <Link to={getServiceUrl(service)}>
                      <span>Learn More</span>
                      <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {allServices.length > limit + 1 && (
          <div className="text-center mt-8">
            <Button variant="outline" asChild>
              <Link to="/services">
                View All Services
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default RelatedServices;