import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  X, 
  TrendingUp, 
  Clock, 
  Users, 
  Star,
  ArrowRight,
  Lightbulb
} from 'lucide-react';

interface Suggestion {
  id: string;
  title: string;
  description: string;
  href: string;
  category: string;
  reason: string;
  priority: 'high' | 'medium' | 'low';
  isPopular?: boolean;
  estimatedTime?: string;
}

const SmartSuggestions = () => {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [dismissed, setDismissed] = useState<string[]>([]);
  const location = useLocation();

  // Get smart suggestions based on current page and user behavior
  const generateSuggestions = (pathname: string): Suggestion[] => {
    const baseSuggestions: Suggestion[] = [
      {
        id: 'free-consultation',
        title: 'Get Your Free Case Assessment',
        description: 'Quick 15-minute review of your case potential',
        href: '/schedule-consultation',
        category: 'Action',
        reason: 'Most requested service',
        priority: 'high',
        estimatedTime: '15 min'
      },
      {
        id: 'case-calculator',
        title: 'Economic Loss Calculator',
        description: 'Estimate potential damages instantly',
        href: '/tools/calculator',
        category: 'Tool',
        reason: 'Popular with new visitors',
        priority: 'high',
        isPopular: true,
        estimatedTime: '5 min'
      }
    ];

    // Add contextual suggestions based on current page
    if (pathname.includes('services')) {
      baseSuggestions.push({
        id: 'case-types',
        title: 'Find Your Case Type',
        description: 'Match your situation to our expertise',
        href: '/case-types',
        category: 'Navigation',
        reason: 'Viewed services page',
        priority: 'medium',
        estimatedTime: '3 min'
      });
    }

    if (pathname.includes('case-types')) {
      baseSuggestions.push({
        id: 'similar-cases',
        title: 'View Similar Case Studies',
        description: 'See successful outcomes in your case type',
        href: '/case-studies',
        category: 'Reference',
        reason: 'Viewing case types',
        priority: 'medium',
        isPopular: true,
        estimatedTime: '8 min'
      });
    }

    if (pathname === '/') {
      baseSuggestions.push({
        id: 'about-credentials',
        title: 'Our Expert Credentials',
        description: '15+ certifications & 1000+ cases analyzed',
        href: '/about',
        category: 'Credibility',
        reason: 'Build trust',
        priority: 'medium',
        estimatedTime: '4 min'
      });
    }

    // Add location-based suggestion if not on location page
    if (!pathname.includes('locations') && !pathname.includes('/california/') && !pathname.includes('/new-york/')) {
      baseSuggestions.push({
        id: 'find-local',
        title: 'Find Local Expert',
        description: 'Connect with specialists in your area',
        href: '/locations',
        category: 'Location',
        reason: 'Location-specific expertise',
        priority: 'low',
        estimatedTime: '2 min'
      });
    }

    return baseSuggestions
      .filter(suggestion => !dismissed.includes(suggestion.id))
      .sort((a, b) => {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      })
      .slice(0, 3);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      const newSuggestions = generateSuggestions(location.pathname);
      setSuggestions(newSuggestions);
      if (newSuggestions.length > 0) {
        setIsVisible(true);
      }
    }, 3000); // Show after 3 seconds

    return () => clearTimeout(timer);
  }, [location.pathname]);

  const handleDismiss = (suggestionId?: string) => {
    if (suggestionId) {
      setDismissed(prev => [...prev, suggestionId]);
      setSuggestions(prev => prev.filter(s => s.id !== suggestionId));
    } else {
      setIsVisible(false);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-blue-600 bg-blue-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  if (!isVisible || suggestions.length === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-6 left-6 z-40 max-w-sm animate-fade-in">
      <Card className="shadow-2xl border-0 bg-background/95 backdrop-blur-sm">
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-yellow-500" />
              <h3 className="font-semibold text-foreground">Suggestions for You</h3>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0"
              onClick={() => handleDismiss()}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-3">
            {suggestions.map((suggestion, index) => (
              <div
                key={suggestion.id}
                className="group relative animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Link
                  to={suggestion.href}
                  className="block p-3 rounded-lg border hover:bg-muted/50 transition-all duration-200 hover:shadow-md"
                  onClick={() => handleDismiss(suggestion.id)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-sm text-foreground group-hover:text-primary transition-colors">
                          {suggestion.title}
                        </h4>
                        {suggestion.isPopular && (
                          <div className="flex items-center gap-1">
                            <TrendingUp className="h-3 w-3 text-orange-500" />
                          </div>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">
                        {suggestion.description}
                      </p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0 ml-2" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant="secondary" 
                        className={`text-xs px-2 py-0.5 ${getPriorityColor(suggestion.priority)}`}
                      >
                        {suggestion.category}
                      </Badge>
                      {suggestion.estimatedTime && (
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>{suggestion.estimatedTime}</span>
                        </div>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {suggestion.reason}
                    </div>
                  </div>
                </Link>

                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-1 right-1 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleDismiss(suggestion.id);
                  }}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>

          <div className="mt-3 pt-3 border-t text-center">
            <Button
              variant="outline"
              size="sm"
              className="text-xs"
              onClick={() => handleDismiss()}
            >
              Dismiss All
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SmartSuggestions;