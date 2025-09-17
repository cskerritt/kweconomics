import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Eye, TrendingUp, Clock } from 'lucide-react';

interface RelatedItem {
  id: string;
  title: string;
  description: string;
  href: string;
  category: string;
  isPopular?: boolean;
  isNew?: boolean;
  estimatedTime?: string;
}

interface RelatedContentSuggestionsProps {
  currentPage: 'service' | 'location' | 'case-type' | 'general';
  currentId?: string;
  limit?: number;
  title?: string;
}

const RelatedContentSuggestions = ({
  currentPage,
  currentId,
  limit = 6,
  title = "You Might Also Be Interested In"
}: RelatedContentSuggestionsProps) => {

  // Mock data - in a real app, this would be dynamically generated based on user behavior, current page, etc.
  const getRelatedContent = (): RelatedItem[] => {
    const allContent: RelatedItem[] = [
      {
        id: 'economic-loss-calculator',
        title: 'Economic Loss Calculator',
        description: 'Interactive tool to estimate potential damages in personal injury cases',
        href: '/tools/economic-calculator',
        category: 'Tools',
        isPopular: true,
        estimatedTime: '5 min'
      },
      {
        id: 'expert-testimony-guide',
        title: 'Expert Testimony Guide',
        description: 'Understanding the role of economic experts in litigation',
        href: '/resources/expert-testimony-guide',
        category: 'Resources',
        isNew: true,
        estimatedTime: '8 min'
      },
      {
        id: 'case-study-brain-injury',
        title: 'Brain Injury Case Study',
        description: 'Real case analysis: $2.3M settlement for traumatic brain injury',
        href: '/case-studies/brain-injury-settlement',
        category: 'Case Studies',
        isPopular: true,
        estimatedTime: '12 min'
      },
      {
        id: 'vocational-assessment-process',
        title: 'Vocational Assessment Process',
        description: 'Step-by-step guide to comprehensive vocational evaluation',
        href: '/services/vocational-evaluation',
        category: 'Services',
        estimatedTime: '6 min'
      },
      {
        id: 'life-care-planning-basics',
        title: 'Life Care Planning Basics',
        description: 'Essential elements of effective life care planning',
        href: '/case-types/life-care-planning',
        category: 'Case Types',
        estimatedTime: '10 min'
      },
      {
        id: 'business-valuation-methods',
        title: 'Business Valuation Methods',
        description: 'Key approaches to business valuation in litigation',
        href: '/services/business-valuation',
        category: 'Services',
        isNew: true,
        estimatedTime: '15 min'
      },
      {
        id: 'disability-evaluation-criteria',
        title: 'Disability Evaluation Criteria',
        description: 'Understanding SSDI and workers\' compensation standards',
        href: '/case-types/disability-claims',
        category: 'Case Types',
        estimatedTime: '7 min'
      },
      {
        id: 'present-value-calculations',
        title: 'Present Value Calculations',
        description: 'Economic fundamentals for damage calculations',
        href: '/resources/present-value-guide',
        category: 'Resources',
        estimatedTime: '9 min'
      }
    ];

    // Filter based on current page context and shuffle for variety
    return allContent
      .filter(item => item.id !== currentId)
      .sort(() => Math.random() - 0.5)
      .slice(0, limit);
  };

  const relatedItems = getRelatedContent();

  if (relatedItems.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-gradient-subtle">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            {title}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore related services, resources, and insights to help with your case
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedItems.map((item) => (
            <Link key={item.id} to={item.href} className="block group">
              <Card className="p-6 h-full shadow-card hover:shadow-elegant transition-all duration-300 border-0 bg-card group-hover:bg-card/90">
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <Badge 
                      variant="secondary" 
                      className="text-xs bg-primary/10 text-primary border-primary/20"
                    >
                      {item.category}
                    </Badge>
                    <div className="flex items-center gap-2">
                      {item.isPopular && (
                        <div className="flex items-center gap-1 text-orange-600">
                          <TrendingUp className="h-3 w-3" />
                          <span className="text-xs font-medium">Popular</span>
                        </div>
                      )}
                      {item.isNew && (
                        <Badge variant="outline" className="text-xs border-green-200 text-green-700 bg-green-50">
                          New
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors line-clamp-3">
                    {item.description}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    {item.estimatedTime && (
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{item.estimatedTime}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      <span>View</span>
                    </div>
                  </div>
                  
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" asChild>
            <Link to="/services">
              Explore All Services
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default RelatedContentSuggestions;