import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Briefcase, 
  Calendar, 
  MapPin, 
  TrendingUp, 
  Users, 
  Award,
  Building,
  GraduationCap,
  FileText,
  ArrowRight,
  CheckCircle,
  Clock,
  DollarSign,
  Scale
} from "lucide-react";

const Experience = () => {
  const currentPositions = [
    {
      title: "Principal Economist",
      company: "Skerritt Economics and Consulting",
      period: "August 2022 – Present",
      location: "Smithfield, Rhode Island",
      description: "Lead forensic economist providing expert economic analysis and testimony for litigation matters.",
      responsibilities: [
        "Design and execute regression-based and time-series economic models to quantify lost earnings capacity",
        "Prepare Daubert-compliant economic loss appraisals in accordance with OWCP standards",
        "Conduct labor-market analyses and transferable-skills inventories",
        "Provide deposition and trial testimony on economic principles and analytical findings",
        "Leverage advanced analytical tools (Stata, R, Python) for enhanced precision and defensibility"
      ],
      achievements: [
        "Economic loss assessments across multiple jurisdictions"
      ]
    },
    {
      title: "Vocational Counselor, Economist and Consultant Evaluator",
      company: "Kincaid Wolstein Vocational and Rehabilitation Services",
      period: "August 2022 – Present",
      location: "Multi-state practice",
      description: "Providing comprehensive vocational rehabilitation and economic consultation services.",
      responsibilities: [
        "Compose labor market surveys and job analysis reports",
        "Perform transferable skills analyses and vocational evaluations",
        "Prepare economic appraisals for business valuations in personal injury contexts",
        "Apply valuation methods including DCF, market approach, and asset-based approaches",
        "Provide expert opinions on economic damages involving business profits and disputes"
      ]
    },
    {
      title: "Contract Counselor",
      company: "VRE4VETS",
      period: "August 2020 – Present",
      location: "Veterans Affairs",
      description: "Specialized vocational rehabilitation services for veterans with service-connected disabilities.",
      responsibilities: [
        "Conduct Initial Evaluations (A-1) for veteran vocational rehabilitation",
        "Perform Vocational Evaluations (A-2) assessing functional capacity and barriers",
        "Collaborate with veterans to explore education, work history, and military experience",
        "Assess transferable skills, interests, aptitudes, and labor market conditions"
      ]
    }
  ];

  const pastExperience = [
    {
      title: "Vocational Case Manager",
      company: "Tempus Risk Solutions",
      period: "April 2021 - August 2022",
      focus: "Workers' Compensation Rehabilitation"
    },
    {
      title: "Social Security Vocational Expert",
      company: "Greylock Placement Services",
      period: "August 2020 - May 2022",
      focus: "Disability Evaluation Hearings"
    },
    {
      title: "Vocational Case Manager",
      company: "Mitchell/Genex/Coventry Workers Compensation Services",
      period: "March 2018 - April 2021",
      focus: "Multi-state Vocational Rehabilitation"
    },
    {
      title: "Vocational Rehabilitation Counselor I",
      company: "Massachusetts Rehabilitation Commission",
      period: "April 2017 - March 2018",
      focus: "State Vocational Rehabilitation Services"
    },
    {
      title: "Adjunct Professor",
      company: "University of New Haven",
      period: "April 2024 - June 2024",
      focus: "COUN 6634-85 Assessment in Counseling"
    }
  ];

  const caseStatistics = [
    { category: "Economic Loss Assessments", count: "500+", description: "Personal injury and wrongful death cases" },
    { category: "Vocational Evaluations", count: "1,000+", description: "OWCP, SSA, and rehabilitation assessments" },
    { category: "Life Care Plans", count: "300+", description: "Catastrophic injury future care planning" },
    { category: "Business Valuations", count: "200+", description: "Economic impact analyses" },
    { category: "Disability Evaluations", count: "800+", description: "Social Security and workers' compensation" }
  ];

  const presentations = [
    {
      title: "Bridging the Gap in Disability Employment",
      event: "TedX-BryantU",
      date: "February 2024",
      type: "Keynote"
    },
    {
      title: "Integrating Artificial Intelligence in Vocational Expert Work: A New Horizon",
      event: "American Board of Vocational Experts",
      date: "March 2024",
      type: "Conference Presentation"
    },
    {
      title: "The Intersection of Vocational Experts and Life Care Planners",
      event: "Florida Bar Association Trial Lawyer Section",
      date: "August 2023",
      type: "Educational Seminar"
    },
    {
      title: "Revolutionizing Rehabilitation: Counselors and Consumers with AI Breakthroughs",
      event: "International Association of Rehabilitation Professionals",
      date: "August 2023",
      type: "Conference Presentation"
    }
  ];

  const specializations = [
    {
      icon: Scale,
      title: "Forensic Economics",
      description: "Lost earnings, economic damages, and expert testimony",
      years: "5+"
    },
    {
      icon: Users,
      title: "Vocational Rehabilitation",
      description: "Disability evaluation and return-to-work planning",
      years: "8+"
    },
    {
      icon: FileText,
      title: "Life Care Planning",
      description: "Future medical and care cost projections",
      years: "3+"
    },
    {
      icon: Building,
      title: "Business Valuation",
      description: "Economic impact of injury on business operations",
      years: "4+"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-hero">
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center text-primary-foreground">
            <h1 className="text-5xl font-bold mb-6">
              Professional Experience
            </h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Over a decade of progressive experience in forensic economics, vocational rehabilitation, 
              and expert witness services across multiple jurisdictions and practice areas.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">10+</div>
                <div className="text-sm opacity-90">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">2,500+</div>
                <div className="text-sm opacity-90">Cases Handled</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">15+</div>
                <div className="text-sm opacity-90">Certifications</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">25+</div>
                <div className="text-sm opacity-90">Presentations</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Current Positions */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-foreground mb-12 text-center">Current Positions</h2>
          
          <div className="space-y-8">
            {currentPositions.map((position, index) => (
              <Card key={index} className="p-8 shadow-card border-0 bg-card">
                <div className="grid lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-1">
                    <div className="flex items-start mb-4">
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mr-4 flex-shrink-0">
                        <Briefcase className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-foreground mb-1">{position.title}</h3>
                        <p className="text-primary font-semibold mb-2">{position.company}</p>
                        <div className="flex items-center text-sm text-muted-foreground mb-1">
                          <Calendar className="h-4 w-4 mr-1" />
                          {position.period}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4 mr-1" />
                          {position.location}
                        </div>
                      </div>
                    </div>
                    <p className="text-muted-foreground text-sm">{position.description}</p>
                  </div>
                  
                  <div className="lg:col-span-2">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-foreground mb-3">Key Responsibilities:</h4>
                        <ul className="space-y-2">
                          {position.responsibilities.map((resp, respIndex) => (
                            <li key={respIndex} className="flex items-start text-sm text-muted-foreground">
                              <CheckCircle className="h-4 w-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                              {resp}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      {position.achievements && (
                        <div>
                          <h4 className="font-semibold text-foreground mb-3">Key Achievements:</h4>
                          <ul className="space-y-2">
                            {position.achievements.map((achievement, achIndex) => (
                              <li key={achIndex} className="flex items-start text-sm text-muted-foreground">
                                <Award className="h-4 w-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                                {achievement}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Case Statistics */}
      <section className="py-20 bg-gradient-subtle">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-6">Case Experience Overview</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive experience across multiple practice areas with demonstrated expertise 
              in complex economic analysis and vocational rehabilitation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseStatistics.map((stat, index) => (
              <Card key={index} className="p-6 text-center shadow-card border-0 bg-card">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-lg mb-4">
                  <TrendingUp className="h-8 w-8 text-primary" />
                </div>
                <div className="text-3xl font-bold text-primary mb-2">{stat.count}</div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{stat.category}</h3>
                <p className="text-sm text-muted-foreground">{stat.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Areas of Specialization */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-6">Areas of Specialization</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {specializations.map((spec, index) => (
              <Card key={index} className="p-6 text-center shadow-card border-0 bg-card">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-4">
                  <spec.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{spec.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{spec.description}</p>
                <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                  {spec.years} experience
                </Badge>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Professional Presentations */}
      <section className="py-20 bg-gradient-subtle">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-6">Professional Presentations</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Thought leadership through presentations at national conferences and professional organizations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {presentations.map((presentation, index) => (
              <Card key={index} className="p-6 shadow-card border-0 bg-card">
                <div className="flex items-start">
                  <div className="inline-flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg mr-4 flex-shrink-0">
                    <GraduationCap className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{presentation.title}</h3>
                    <p className="text-primary mb-2">{presentation.event}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {presentation.date}
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {presentation.type}
                      </Badge>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Career Timeline */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-6">Career Timeline</h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {pastExperience.map((exp, index) => (
                <Card key={index} className="p-6 shadow-card border-0 bg-card">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="inline-flex items-center justify-center w-8 h-8 bg-primary/10 rounded-full mr-4">
                        <Clock className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{exp.title}</h3>
                        <p className="text-primary">{exp.company}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">{exp.period}</p>
                      <Badge variant="outline" className="mt-1 text-xs">
                        {exp.focus}
                      </Badge>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Experience;