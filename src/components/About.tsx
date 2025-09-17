import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  GraduationCap, 
  Award, 
  BookOpen, 
  Users2,
  ArrowRight,
  CheckCircle
} from "lucide-react";
// Professional photo will be added via uploaded images

const About = () => {
  const qualifications = [
    "Master of Business Administration - Healthcare Leadership, Bryant University (2024)",
    "Master of Education in Rehabilitation Counseling, Springfield College (2016)",
    "Certified Rehabilitation Counselor (CRC)",
    "Licensed Rehabilitation Counselor (LRC)",
    "Fellow of Vocational Experts (FVE)",
    "Certified Life Care Planner (CLCP)",
    "Fellow of the American Board of Vocational Experts (ABVE/F)",
    "Certified Vocational Evaluator (CVE)",
    "President, American Rehabilitation Economics Association (2025-2026)"
  ];

  const expertise = [
    { area: "Economic Loss Assessments", cases: "500+" },
    { area: "Vocational Evaluations", cases: "1000+" },
    { area: "Life Care Planning", cases: "300+" },
    { area: "Business Valuations", cases: "200+" },
    { area: "Disability Evaluations", cases: "800+" },
    { area: "Clients Returned to Work", cases: "25+" }
  ];

  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <div className="flex flex-col lg:flex-row gap-8 items-start mb-8">
              <div className="flex-shrink-0">
                <img 
                  src="/lovable-uploads/abec9830-380f-469f-9ee8-f9c7278c3372.png" 
                  alt="Christopher Skerritt, Principal Economist" 
                  className="w-48 h-48 lg:w-64 lg:h-64 object-cover object-top rounded-lg shadow-card"
                />
              </div>
              <div className="flex-1">
                <h2 className="text-4xl font-bold text-foreground mb-6">
                  Christopher Skerritt, M.Ed., MBA
                </h2>
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                  Principal Economist specializing in forensic economic analysis, vocational rehabilitation, 
                  and life care planning. Extensive credentials including CRC, LRC, FVE, CVE, CLCP, and ABVE/F. 
                  Expert in economic loss assessments, business valuation, and disability evaluation.
                </p>
              </div>
            </div>
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-foreground mb-4 flex items-center">
                <GraduationCap className="h-6 w-6 text-primary mr-2" />
                Credentials & Qualifications
              </h3>
              <div className="space-y-3">
                {qualifications.map((qual, index) => (
                  <Link
                    key={index}
                    to="/about#credentials"
                    className="flex items-center hover:text-primary transition-colors cursor-pointer group p-2 -ml-2 rounded-md hover:bg-primary/5"
                  >
                    <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                    <span className="text-foreground group-hover:text-primary transition-colors">{qual}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/about#cv">
                <Button variant="professional" size="lg" className="group">
                  <BookOpen className="h-5 w-5 mr-2" />
                  View CV & Publications
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/about#affiliations">
                <Button variant="outline" size="lg">
                  <Award className="h-5 w-5 mr-2" />
                  Professional Affiliations
                </Button>
              </Link>
            </div>
          </div>

          <div className="space-y-8">
            <Card className="p-8 shadow-card border-0 bg-gradient-subtle">
              <h3 className="text-2xl font-semibold text-foreground mb-6 flex items-center">
                <Users2 className="h-6 w-6 text-primary mr-2" />
                Case Experience by Practice Area
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {expertise.map((item, index) => (
                  <Link
                    key={index}
                    to="/case-studies"
                    className="text-center p-4 bg-background rounded-lg shadow-soft hover:shadow-card transition-all cursor-pointer group hover:scale-105"
                  >
                    <div className="text-2xl font-bold text-primary mb-1 group-hover:text-primary-dark transition-colors">{item.cases}</div>
                    <div className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{item.area}</div>
                  </Link>
                ))}
              </div>
            </Card>

            <Card className="p-8 shadow-card border-0 bg-card">
              <h3 className="text-xl font-semibold text-foreground mb-4">Professional Memberships</h3>
              <div className="flex flex-wrap gap-2">
                <a 
                  href="https://www.rehabecon.org" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors cursor-pointer">
                    American Rehabilitation Economics Association
                  </Badge>
                </a>
                <a 
                  href="https://www.nafe.net" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors cursor-pointer">
                    National Association of Forensic Economics
                  </Badge>
                </a>
                <a 
                  href="https://www.rehabpro.org" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors cursor-pointer">
                    International Association of Rehabilitation Professionals
                  </Badge>
                </a>
                <a 
                  href="https://www.nacva.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors cursor-pointer">
                    National Association of Certified Valuators and Analysts
                  </Badge>
                </a>
                <a 
                  href="https://www.abve.net" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors cursor-pointer">
                    American Board of Vocational Experts
                  </Badge>
                </a>
              </div>
            </Card>

            <Card className="p-8 shadow-card border-0 bg-card">
              <h3 className="text-xl font-semibold text-foreground mb-4">Recent Recognition</h3>
              <ul className="space-y-3 text-muted-foreground">
                <Link 
                  to="/about#recognition" 
                  className="flex items-start hover:text-primary transition-colors cursor-pointer group p-2 -ml-2 rounded-md hover:bg-primary/5"
                >
                  <Award className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span className="group-hover:text-primary transition-colors">President-Elect, American Rehabilitation Economics Association (2024-2025)</span>
                </Link>
                <a 
                  href="https://tedx.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-start hover:text-primary transition-colors cursor-pointer group p-2 -ml-2 rounded-md hover:bg-primary/5"
                >
                  <Award className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span className="group-hover:text-primary transition-colors">TedX Speaker - "Bridging the Gap in Disability Employment" (2024)</span>
                </a>
                <Link 
                  to="/about#publications" 
                  className="flex items-start hover:text-primary transition-colors cursor-pointer group p-2 -ml-2 rounded-md hover:bg-primary/5"
                >
                  <Award className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span className="group-hover:text-primary transition-colors">Published Research - AI in Vocational Rehabilitation (2023-2024)</span>
                </Link>
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;