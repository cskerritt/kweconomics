import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, FileBarChart, TrendingUp, Shield, Building2, Gavel, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const caseStudies = [
  {
    id: 1,
    icon: Gavel,
    title: "Personal Injury Economic Analysis",
    category: "Forensic Economics",
    description: "Comprehensive economic loss analysis for catastrophic injury case involving construction worker",
    challenge: "Calculate lifetime economic damages for a construction worker with permanent disability",
    solution: "Detailed analysis of lost wages, benefits, and career progression opportunities over projected work-life expectancy",
    outcome: "Provided thorough economic analysis covering future economic losses and medical expenses",
    tags: ["Personal Injury", "Lost Wages", "Life Care Planning"],
    duration: "3 weeks",
    value: "Economic Analysis"
  },
  {
    id: 2,
    icon: Building2,
    title: "Business Valuation Analysis",
    category: "Commercial Litigation",
    description: "Expert testimony in partnership dissolution case involving manufacturing company valuation",
    challenge: "Determine fair market value of manufacturing business during partnership dissolution",
    solution: "Applied multiple valuation methodologies including DCF, comparable sales, and asset-based approaches",
    outcome: "Court accepted valuation methodology, providing basis for equitable asset distribution",
    tags: ["Business Valuation", "Expert Testimony", "Partnership Dispute"],
    duration: "6 weeks",
    value: "Expert Testimony"
  },
  {
    id: 3,
    icon: Heart,
    title: "Medical Malpractice Life Care Plan",
    category: "Life Care Planning",
    description: "Comprehensive life care plan for pediatric patient with permanent neurological injuries",
    challenge: "Project lifetime care costs and economic impact for child with severe disabilities",
    solution: "Collaborated with medical experts to develop detailed care plan spanning projected lifetime",
    outcome: "Established comprehensive framework for lifetime medical care and support services",
    tags: ["Medical Malpractice", "Pediatric Care", "Long-term Planning"],
    duration: "8 weeks",
    value: "Life Care Plan"
  },
  {
    id: 4,
    icon: Shield,
    title: "Workers' Compensation Vocational Assessment",
    category: "Vocational Rehabilitation",
    description: "Vocational rehabilitation analysis for injured police officer unable to return to active duty",
    challenge: "Assess transferable skills and earning capacity after career-ending injury",
    solution: "Comprehensive vocational evaluation including skills assessment and labor market analysis",
    outcome: "Identified retraining opportunities with comparable earning potential",
    tags: ["Workers' Compensation", "Career Transition", "Skills Assessment"],
    duration: "4 weeks",
    value: "Vocational Analysis"
  },
  {
    id: 5,
    icon: TrendingUp,
    title: "Employment Discrimination Analysis",
    category: "Employment Law",
    description: "Economic analysis of wage discrimination and career impact in federal employment case",
    challenge: "Quantify financial impact of discriminatory practices on career advancement",
    solution: "Statistical analysis comparing plaintiff's trajectory to similarly situated colleagues",
    outcome: "Demonstrated clear pattern of discrimination with quantified economic impact",
    tags: ["Employment Discrimination", "Statistical Analysis", "Federal Case"],
    duration: "5 weeks",
    value: "Economic Impact Analysis"
  },
  {
    id: 6,
    icon: FileBarChart,
    title: "Regulatory Compliance Economic Impact",
    category: "Regulatory Analysis",
    description: "Cost-benefit analysis for proposed environmental regulations affecting manufacturing sector",
    challenge: "Assess economic impact of new environmental standards on industry competitiveness",
    solution: "Comprehensive economic modeling of compliance costs and environmental benefits",
    outcome: "Provided evidence-based recommendations that informed regulatory framework development",
    tags: ["Regulatory Analysis", "Environmental Policy", "Cost-Benefit"],
    duration: "12 weeks",
    value: "Policy Analysis"
  }
];

const CaseStudies = () => {
  const currentUrl = "https://kweconomics.com/case-studies";
  
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Case Studies - Expert Economic Analysis Success Stories",
    "description": "Real-world case studies showcasing expert forensic economic analysis, life care planning, and vocational rehabilitation by Christopher Skerritt.",
    "url": currentUrl,
    "inLanguage": "en-US",
    "mainEntity": {
      "@type": "ItemList",
      "name": "Economic Analysis Case Studies",
      "numberOfItems": caseStudies.length,
      "itemListElement": caseStudies.map((study, index) => ({
        "@type": "CreativeWork",
        "position": index + 1,
        "name": study.title,
        "description": study.description,
        "about": {
          "@type": "Service",
          "name": study.category,
          "provider": {
            "@type": "Person",
            "name": "Christopher Skerritt",
            "jobTitle": "Forensic Economist"
          }
        },
        "keywords": study.tags.join(", ")
      }))
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://kweconomics.com"
        },
        {
          "@type": "ListItem", 
          "position": 2,
          "name": "Case Studies",
          "item": currentUrl
        }
      ]
    },
    "author": {
      "@type": "Person",
      "name": "Christopher Skerritt",
      "jobTitle": "Forensic Economist & Expert Witness",
      "description": "Economic expert with 25+ years experience in forensic analysis"
    }
  };

  return (
    <div className="min-h-screen">
      <SEOHead 
        title="Case Studies - Expert Economic Analysis Success Stories | KW Economics"
        description="Explore real-world case studies showcasing expert forensic economic analysis, life care planning, and vocational rehabilitation by Christopher Skerritt, M.Ed., MBA. Proven results in personal injury, commercial litigation, and employment law."
        canonical={currentUrl}
        keywords={["case studies", "forensic economics", "expert testimony", "economic analysis", "life care planning", "vocational rehabilitation", "personal injury economics", "business valuation", "employment discrimination", "workers compensation"]}
        schema={structuredData}
      />
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-hero py-20">
        <div className="container mx-auto px-6">
          <div className="text-center text-primary-foreground max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold mb-6">
              Case Studies & Success Stories
            </h1>
            <p className="text-xl mb-8">
              Real-world examples of expert economic analysis, forensic testimony, and comprehensive 
              consulting services that have made a difference in complex legal and regulatory matters.
            </p>
            <Button variant="hero" size="lg" className="group" asChild>
              <Link to="/contact">
                Discuss Your Case
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-foreground">
              Proven Results Across Multiple Practice Areas
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Each case study demonstrates thorough expert analysis 
              and professional collaboration in complex economic matters.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {caseStudies.map((study) => (
              <Card key={study.id} className="h-full hover:shadow-elegant transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <study.icon className="h-6 w-6 text-primary" />
                    </div>
                    <Badge variant="outline">{study.category}</Badge>
                  </div>
                  <CardTitle className="text-xl mb-2">{study.title}</CardTitle>
                  <CardDescription className="text-base">{study.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-4">
                    <div>
                      <h4 className="font-semibold text-sm uppercase tracking-wide text-primary mb-2">
                        Challenge
                      </h4>
                      <p className="text-sm text-muted-foreground">{study.challenge}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm uppercase tracking-wide text-primary mb-2">
                        Solution
                      </h4>
                      <p className="text-sm text-muted-foreground">{study.solution}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm uppercase tracking-wide text-primary mb-2">
                        Outcome
                      </h4>
                      <p className="text-sm text-muted-foreground">{study.outcome}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {study.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex justify-between items-center pt-4 border-t">
                    <div className="text-sm text-muted-foreground">
                      Duration: {study.duration}
                    </div>
                    <div className="font-semibold text-primary">
                      {study.value}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6 text-foreground">
            Ready to Discuss Your Case?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Every case is unique. Contact us for a confidential consultation about your 
            specific economic analysis, expert testimony, or life care planning needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link to="/contact">
                Schedule Consultation
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/services">
                Explore Services
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CaseStudies;