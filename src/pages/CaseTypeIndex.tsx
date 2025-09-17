import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import SearchComponent from '@/components/SearchComponent';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getAllCaseTypes } from '@/utils/caseTypes';
import { 
  Scale, 
  ArrowRight,
  Users,
  Building,
  FileText,
  Briefcase
} from 'lucide-react';

const CaseTypeIndex = () => {
  const allCaseTypes = getAllCaseTypes();
  
  const categorizedCaseTypes = {
    litigation: allCaseTypes.filter(ct => ct.category === 'litigation'),
    disability: allCaseTypes.filter(ct => ct.category === 'disability'),
    business: allCaseTypes.filter(ct => ct.category === 'business'),
    legal: allCaseTypes.filter(ct => ct.category === 'legal'),
    vocational: allCaseTypes.filter(ct => ct.category === 'vocational'),
    general: allCaseTypes.filter(ct => ct.category === 'general')
  };

  const categoryInfo = {
    litigation: {
      title: 'Litigation Support',
      description: 'Economic analysis and expert testimony for civil litigation cases',
      icon: Scale,
      color: 'text-red-600'
    },
    disability: {
      title: 'Disability Evaluation',
      description: 'Comprehensive disability and vocational assessments',
      icon: Users,
      color: 'text-blue-600'
    },
    business: {
      title: 'Business Analysis',
      description: 'Business valuation and financial consulting services',
      icon: Building,
      color: 'text-green-600'
    },
    legal: {
      title: 'Legal Proceedings',
      description: 'Expert testimony and analysis for various legal settings',
      icon: FileText,
      color: 'text-purple-600'
    },
    vocational: {
      title: 'Vocational Services',
      description: 'Employment and rehabilitation planning services',
      icon: Briefcase,
      color: 'text-orange-600'
    }
  };

  const currentUrl = "https://skerritteconomics.com/case-types";
  
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Case Types - Economic Analysis & Expert Testimony",
    "description": "Comprehensive economic analysis and expert testimony services across various case types including litigation, disability evaluation, and business consulting.",
    "url": currentUrl,
    "mainEntity": {
      "@type": "ItemList",
      "name": "Case Types",
      "numberOfItems": allCaseTypes.length,
      "itemListElement": allCaseTypes.map((caseType, index) => ({
        "@type": "Service",
        "position": index + 1,
        "name": caseType.name,
        "description": caseType.description,
        "provider": {
          "@type": "Organization",
          "name": "Skerritt Economics & Consulting"
        }
      }))
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="Case Types - Economic Analysis & Expert Testimony | Skerritt Economics"
        description="Comprehensive economic analysis and expert testimony services across various case types including personal injury, wrongful death, disability evaluation, business valuation, and more."
        canonical={currentUrl}
        keywords={["case types", "economic analysis", "expert testimony", "litigation support", "disability evaluation", "business valuation", "forensic economics", "vocational assessment"]}
        schema={structuredData}
      />
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center text-primary-foreground">
            <h1 className="text-5xl font-bold mb-6">
              Case Types & Practice Areas
            </h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Expert economic analysis and testimony across a comprehensive range of case types. 
              Our specialists provide professional consultation for litigation, disability evaluation, 
              business analysis, and more.
            </p>
            
            <div className="mb-8">
              <SearchComponent />
            </div>
            
            <Button variant="hero" size="lg" className="group">
              <Link to="/contact" className="flex items-center">
                Find Your Case Type Expert
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Case Type Categories */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          {Object.entries(categorizedCaseTypes).map(([categoryKey, caseTypes]) => {
            if (caseTypes.length === 0) return null;
            
            const category = categoryInfo[categoryKey as keyof typeof categoryInfo];
            if (!category) return null;
            
            return (
              <div key={categoryKey} className="mb-16">
                <div className="text-center mb-12">
                  <div className="flex justify-center mb-4">
                    <category.icon className={`h-12 w-12 ${category.color}`} />
                  </div>
                  <h2 className="text-4xl font-bold text-foreground mb-4">
                    {category.title}
                  </h2>
                  <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    {category.description}
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {caseTypes.map((caseType) => (
                    <Link key={caseType.slug} to={`/case-types/${caseType.slug}`} className="block">
                      <Card className="p-6 shadow-card hover:shadow-elegant transition-all duration-300 group border-0 bg-card cursor-pointer h-full">
                        <div className="mb-4">
                          <Badge variant="secondary" className={`${category.color} bg-current/10 border-current/20 mb-3`}>
                            {category.title}
                          </Badge>
                          <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                            {caseType.name}
                          </h3>
                          <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors line-clamp-3">
                            {caseType.description}
                          </p>
                        </div>

                        <div className="mt-auto">
                          <Button variant="outline" size="sm" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                            Learn More
                            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform ml-2" />
                          </Button>
                        </div>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-20 bg-gradient-subtle">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Comprehensive Case Coverage
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our expertise spans across all major practice areas with specialized knowledge 
              in economic analysis and expert testimony.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">{categorizedCaseTypes.litigation.length}</div>
              <div className="text-muted-foreground">Litigation Cases</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">{categorizedCaseTypes.disability.length}</div>
              <div className="text-muted-foreground">Disability Types</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">{categorizedCaseTypes.business.length}</div>
              <div className="text-muted-foreground">Business Areas</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">{allCaseTypes.length}</div>
              <div className="text-muted-foreground">Total Case Types</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CaseTypeIndex;