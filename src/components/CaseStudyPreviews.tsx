import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const CaseStudyPreviews = () => {
  const caseStudies = [
    {
      id: 1,
      title: "Construction Worker Disability Case",
      category: "Personal Injury",
      challenge: "Complex vocational rehabilitation assessment for skilled tradesman",
      outcome: "Comprehensive analysis of earning capacity loss and alternative career options",
      duration: "4 months",
      highlights: ["Detailed wage analysis", "Alternative career pathways", "Life care planning"],
      badge: "High Impact"
    },
    {
      id: 2,
      title: "Executive Wrongful Death Analysis",
      category: "Wrongful Death",
      challenge: "Calculating lost earnings for high-income executive with complex compensation",
      outcome: "Thorough economic analysis including comprehensive compensation review",
      duration: "6 months",
      highlights: ["Executive compensation analysis", "Tax implications", "Family impact assessment"],
      badge: "Complex Case"
    },
    {
      id: 3,
      title: "Medical Malpractice Economic Loss",
      category: "Medical Malpractice",
      challenge: "Proving economic impact of delayed diagnosis on young professional",
      outcome: "Detailed analysis of career trajectory impact and associated economic effects",
      duration: "5 months",
      highlights: ["Career progression modeling", "Medical cost projections", "Quality of life analysis"],
      badge: "Expert Testimony"
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Recent Case Studies</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Professional economic analysis across complex cases. See how our expertise 
            supports comprehensive legal and business decision-making.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {caseStudies.map((study) => (
            <Card key={study.id} className="shadow-card hover:shadow-elegant transition-all duration-300 group">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary">{study.category}</Badge>
                  <Badge variant={study.badge === "High Impact" ? "default" : "outline"}>
                    {study.badge}
                  </Badge>
                </div>
                
                <CardTitle className="text-lg group-hover:text-primary transition-colors">
                  {study.title}
                </CardTitle>
                
                <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{study.duration}</span>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Challenge</h4>
                    <p className="text-sm text-muted-foreground">{study.challenge}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Outcome</h4>
                    <p className="text-sm text-muted-foreground">{study.outcome}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Key Highlights</h4>
                    <ul className="space-y-1">
                      {study.highlights.map((highlight, index) => (
                        <li key={index} className="text-sm text-muted-foreground flex items-center">
                          <TrendingUp className="h-3 w-3 mr-2 text-primary" />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <Button variant="outline" className="w-full mt-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors" asChild>
                  <Link to="/case-studies">
                    View Full Case Study
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button size="lg" asChild>
            <Link to="/case-studies">
              View All Case Studies
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CaseStudyPreviews;