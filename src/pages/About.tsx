import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  GraduationCap, 
  Award, 
  BookOpen, 
  Users2,
  ArrowRight,
  CheckCircle,
  Building,
  Calendar,
  Globe,
  TrendingUp
} from "lucide-react";

const About = () => {
  const qualifications = [
    "Master of Business Administration - Healthcare Leadership, Bryant University (2024)",
    "Master of Education in Rehabilitation Counseling, Springfield College (2016)",
    "Bachelor of Science in Communication Disorders and Sciences, Springfield College (2015)",
    "Certified Rehabilitation Counselor (CRC)",
    "Licensed Rehabilitation Counselor (LRC)",
    "Fellow of Vocational Experts (FVE)",
    "Certified Life Care Planner (CLCP)",
    "Fellow of the American Board of Vocational Experts (ABVE/F)",
    "Certified Vocational Evaluator (CVE)"
  ];

  const certifications = [
    { title: "CRC", desc: "Certified Rehabilitation Counselor", year: "2017" },
    { title: "CVE", desc: "Certified Vocational Evaluator", year: "2021" },
    { title: "IPEC", desc: "International Psychometric Evaluation Certification", year: "2021" },
    { title: "ABVE/F", desc: "Fellow of the American Board of Vocational Experts", year: "2021" },
    { title: "CLCP", desc: "Certified Life Care Planner", year: "2022" },
    { title: "MSCC", desc: "Medicare Set Aside Certified Consultant", year: "2023" },
    { title: "CEAS", desc: "Certified Ergonomic Assessment Specialist", year: "2022" },
    { title: "CPRW", desc: "Certified Professional Resume Writer", year: "2023" }
  ];

  const expertise = [
    { area: "Economic Loss Assessments", cases: "500+", description: "Personal injury, wrongful death, and disability cases" },
    { area: "Vocational Evaluations", cases: "1000+", description: "OWCP, SSA, and rehabilitation assessments" },
    { area: "Life Care Planning", cases: "300+", description: "Catastrophic injury future care costs" },
    { area: "Business Valuations", cases: "200+", description: "Economic impact of injury on businesses" },
    { area: "Expert Testimony", cases: "150+", description: "Federal and state court proceedings" },
    { area: "Disability Evaluations", cases: "800+", description: "Social Security and workers' compensation" }
  ];

  const leadership = [
    { position: "President", organization: "American Rehabilitation Economics Association", term: "2025-2026" },
    { position: "President-Elect", organization: "American Rehabilitation Economics Association", term: "2024-2025" },
    { position: "Past-Chair", organization: "Vocational and Rehabilitation Transition Services, IARP", term: "2023-2024" },
    { position: "At-Large Member", organization: "Education Committee, American Board of Vocational Experts", term: "2022-2024" },
    { position: "Secretary", organization: "International Association of Rehabilitation Professionals, New England Chapter", term: "2022-2023" }
  ];

  const publications = [
    {
      title: "Use of artificial intelligence to enhance case management and job development practices in rehabilitation counseling",
      authors: "Skerritt, C., & Wolstein, D.",
      journal: "The Rehabilitation Professional",
      year: "2023",
      volume: "31(2), pp. 19-26"
    },
    {
      title: "Ethical Implications of Artificial Intelligence on Vocational Rehabilitation",
      authors: "Skerritt, C.",
      journal: "Journal of Forensic Vocational Analysis",
      year: "2023",
      volume: "23(1), pp. 35-42"
    },
    {
      title: "Harnessing Artificial Intelligence for Enhanced Life Care Planning: Innovations, Challenges, and Ethical Considerations",
      authors: "Bourgeois, P., Allison, A., & Skerritt, C.",
      journal: "Journal of Life Care Planning",
      year: "2024",
      volume: "22(1), pp. 25-37"
    }
  ];

  const currentUrl = "https://kweconomics.com/about";
  
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Christopher Skerritt",
    "alternateName": "Chris Skerritt",
    "jobTitle": "Principal Economist & Expert Witness",
    "description": "Forensic economist specializing in economic loss assessment, vocational rehabilitation, and life care planning with 10+ years experience.",
    "url": currentUrl,
    "worksFor": {
      "@type": "Organization",
      "name": "Kincaid Wolstein Economics"
    },
    "hasCredential": qualifications,
    "alumniOf": [
      {
        "@type": "CollegeOrUniversity",
        "name": "Bryant University",
        "description": "Master of Business Administration - Healthcare Leadership"
      },
      {
        "@type": "CollegeOrUniversity", 
        "name": "Springfield College",
        "description": "Master of Education in Rehabilitation Counseling"
      }
    ],
    "memberOf": [
      {
        "@type": "Organization",
        "name": "American Rehabilitation Economics Association"
      },
      {
        "@type": "Organization",
        "name": "National Association of Forensic Economics"
      },
      {
        "@type": "Organization",
        "name": "International Association of Rehabilitation Professionals"
      }
    ],
    "hasOccupation": {
      "@type": "Occupation",
      "name": "Forensic Economist",
      "occupationLocation": {
        "@type": "Country",
        "name": "United States"
      },
      "description": "Expert witness providing economic analysis for litigation, including personal injury, wrongful death, and business valuation cases"
    },
    "knowsAbout": [
      "Forensic Economics",
      "Economic Loss Assessment", 
      "Vocational Rehabilitation",
      "Life Care Planning",
      "Expert Witness Testimony",
      "Business Valuation",
      "Disability Evaluation"
    ]
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="About Christopher Skerritt, M.Ed., MBA - Expert Forensic Economist"
        description="Learn about Christopher Skerritt, Principal Economist with 10+ years experience in forensic economic analysis, vocational rehabilitation, and expert testimony. M.Ed., MBA, CRC, CLCP, ABVE/F credentials."
        canonical={currentUrl}
        keywords={["Christopher Skerritt", "forensic economist", "expert witness", "economic analysis", "vocational rehabilitation", "life care planning", "CRC", "CLCP", "MBA", "credentials", "expert testimony"]}
        schema={structuredData}
      />
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-hero">
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center text-primary-foreground">
            <h1 className="text-5xl font-bold mb-6">
              Christopher Skerritt, M.Ed., MBA
            </h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Principal Economist specializing in forensic economic analysis, vocational rehabilitation, 
              and life care planning. Recognized leader in the field with extensive credentials and experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="hero" 
                size="lg" 
                className="group"
                onClick={() => document.getElementById('publications')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <BookOpen className="h-5 w-5 mr-2" />
                View Publications
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                onClick={() => document.getElementById('credentials')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Award className="h-5 w-5 mr-2" />
                Professional Credentials
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left Column - Biography and Education */}
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">Professional Background</h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Christopher Skerritt is a distinguished forensic economist and vocational rehabilitation specialist 
                with over a decade of experience providing expert analysis and testimony. As Principal Economist 
                at Kincaid Wolstein Economics, he has established himself as a leading authority in economic 
                loss assessment, vocational evaluation, and life care planning.
              </p>
              <div className="p-4 rounded-md bg-primary/5 text-sm text-muted-foreground mb-8">
                Kincaid Wolstein Economics operates in association with
                {" "}
                <a
                  href="https://kwvrs.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-foreground underline hover:text-primary"
                >
                  Kincaid Wolstein Vocational & Rehabilitation Services
                </a>
                , delivering integrated vocational and economic expertise.
              </div>

              <p className="text-muted-foreground mb-8 leading-relaxed">
                His expertise spans personal injury and wrongful death cases, workers' compensation evaluations, 
                Social Security disability assessments, and business valuation in litigation contexts. 
                Christopher's unique combination of educational background, professional certifications, 
                and practical experience makes him a sought-after expert witness in both federal and state courts.
              </p>

              <div className="mb-8">
                <h3 className="text-2xl font-semibold text-foreground mb-4 flex items-center">
                  <GraduationCap className="h-6 w-6 text-primary mr-2" />
                  Education & Qualifications
                </h3>
                <div className="space-y-3">
                  {qualifications.map((qual, index) => (
                    <div key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-foreground">{qual}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Stats and Certifications */}
            <div className="space-y-8">
              <Card className="p-8 shadow-card border-0 bg-gradient-subtle">
                <h3 className="text-2xl font-semibold text-foreground mb-6 flex items-center">
                  <TrendingUp className="h-6 w-6 text-primary mr-2" />
                  Experience by Practice Area
                </h3>
                <div className="grid grid-cols-1 gap-4">
                  {expertise.map((item, index) => (
                    <div key={index} className="p-4 bg-background rounded-lg shadow-soft">
                      <div className="flex justify-between items-center mb-2">
                        <div className="font-semibold text-foreground">{item.area}</div>
                        <div className="text-2xl font-bold text-primary">{item.cases}</div>
                      </div>
                      <div className="text-sm text-muted-foreground">{item.description}</div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card id="credentials" className="p-8 shadow-card border-0 bg-card">
                <h3 className="text-xl font-semibold text-foreground mb-6">Professional Certifications</h3>
                <div className="grid grid-cols-2 gap-4">
                  {certifications.map((cert, index) => (
                    <div key={index} className="text-center p-3 bg-primary/5 rounded-lg border border-primary/10">
                      <div className="font-bold text-primary text-lg">{cert.title}</div>
                      <div className="text-xs text-muted-foreground mb-1">{cert.desc}</div>
                      <div className="text-xs text-primary">{cert.year}</div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership & Professional Roles */}
      <section className="py-20 bg-gradient-subtle">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-6">Leadership & Professional Roles</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Active leadership in professional organizations and contributions to the advancement 
              of forensic economics and vocational rehabilitation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {leadership.map((role, index) => (
              <Card key={index} className="p-6 shadow-card border-0 bg-card">
                <div className="flex items-start">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mr-4 flex-shrink-0">
                    <Building className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{role.position}</h3>
                    <p className="text-primary mb-2">{role.organization}</p>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-1" />
                      {role.term}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Publications & Research */}
      <section id="publications" className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-6">Publications & Research</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Contributing to the advancement of forensic economics and vocational rehabilitation 
              through peer-reviewed research and professional publications.
            </p>
          </div>

          <div className="space-y-6 max-w-4xl mx-auto">
            {publications.map((pub, index) => (
              <Card key={index} className="p-6 shadow-card border-0 bg-card">
                <h3 className="font-semibold text-foreground mb-2">{pub.title}</h3>
                <p className="text-muted-foreground mb-2">{pub.authors}</p>
                <div className="flex items-center text-sm text-primary">
                  <BookOpen className="h-4 w-4 mr-1" />
                  <span className="italic">{pub.journal}</span>
                  <span className="mx-2">•</span>
                  <span>{pub.year}</span>
                  <span className="mx-2">•</span>
                  <span>{pub.volume}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Professional Memberships */}
      <section className="py-20 bg-gradient-subtle">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-6">Professional Memberships</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 text-sm py-2 px-4">
                American Rehabilitation Economics Association
              </Badge>
            </div>
            <div className="text-center">
              <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 text-sm py-2 px-4">
                National Association of Forensic Economics
              </Badge>
            </div>
            <div className="text-center">
              <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 text-sm py-2 px-4">
                International Association of Rehabilitation Professionals
              </Badge>
            </div>
            <div className="text-center">
              <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 text-sm py-2 px-4">
                National Association of Certified Valuators and Analysts
              </Badge>
            </div>
            <div className="text-center">
              <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 text-sm py-2 px-4">
                American Board of Vocational Experts
              </Badge>
            </div>
            <div className="text-center">
              <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 text-sm py-2 px-4">
                American Academy of Economic and Financial Experts
              </Badge>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
