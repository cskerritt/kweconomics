import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Scale, 
  TrendingDown, 
  Building2, 
  Users, 
  FileText, 
  PieChart,
  ArrowRight,
  BarChart3,
  LineChart,
  Landmark,
  ClipboardList,
  Database,
  Calculator
} from "lucide-react";

const services = [
  {
    icon: Scale,
    title: "Economic Loss Assessment",
    description: "Comprehensive economic analysis for personal injury, wrongful death, and disability cases.",
    features: ["Lost earnings calculations", "Economic damages assessment", "Expert testimony", "Life care cost analysis"],
    slug: "economic-loss-assessment"
  },
  {
    icon: Users,
    title: "Vocational Evaluation",
    description: "Professional assessment of work capacity, transferable skills, and employability.",
    features: ["Transferable skills analysis", "Labor market surveys", "Vocational testing", "Return-to-work planning"],
    slug: "vocational-evaluation"
  },
  {
    icon: FileText,
    title: "Life Care Planning",
    description: "Detailed planning for future medical and care needs in catastrophic injury cases.",
    features: ["Medical cost projections", "Equipment and supply needs", "Home modifications", "Attendant care planning"],
    slug: "life-care-planning"
  },
  {
    icon: PieChart,
    title: "Business Valuation",
    description: "Expert valuation services for closely held businesses in litigation contexts.",
    features: ["Fair market value determination", "Economic loss from injury", "Partnership disputes", "Financial modeling"],
    slug: "business-valuation"
  },
  {
    icon: Building2,
    title: "Disability Evaluation",
    description: "Social Security and workers' compensation disability assessments.",
    features: ["OWCP evaluations", "SSA testimony", "Functional capacity assessment", "Medical record analysis"],
    slug: "disability-evaluation"
  },
  {
    icon: TrendingDown,
    title: "Expert Testimony",
    description: "Qualified expert witness services for depositions and trial testimony.",
    features: ["Daubert-compliant reports", "Deposition testimony", "Trial presentation", "Cross-examination defense"],
    slug: "expert-testimony"
  }
];

const Services = () => {
  return (
    <section id="services" className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-6">
            Comprehensive Economic Analysis Services
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our expert economists provide precise analysis and testimony across a wide range of 
            practice areas, helping legal professionals and businesses make informed decisions.
          </p>
        </div>

        {/* Strategic Advisory Services */}
        <div className="max-w-5xl mx-auto mb-8">
          <div className="rounded-lg border bg-card p-5 md:p-6 shadow-card">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
              <h3 className="text-xl font-semibold text-foreground">Strategic Advisory Services</h3>
              <Link to="/advisory" className="text-primary hover:underline">View all Advisory</Link>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Link to="/services/market-analysis-forecasting" className="p-4 border rounded-lg hover:bg-primary/5 transition-colors group">
                <div className="flex items-center gap-3">
                  <div className="inline-flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <BarChart3 className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">Market Analysis</h4>
                    <p className="text-sm text-muted-foreground">Forecasting & Research</p>
                  </div>
                </div>
              </Link>
              <Link to="/services/pricing-strategy" className="p-4 border rounded-lg hover:bg-primary/5 transition-colors group">
                <div className="flex items-center gap-3">
                  <div className="inline-flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <LineChart className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">Pricing Strategy</h4>
                    <p className="text-sm text-muted-foreground">Optimization & Analysis</p>
                  </div>
                </div>
              </Link>
              <Link to="/services/cost-benefit-roi-analysis" className="p-4 border rounded-lg hover:bg-primary/5 transition-colors group">
                <div className="flex items-center gap-3">
                  <div className="inline-flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <Calculator className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">Cost‑Benefit & ROI</h4>
                    <p className="text-sm text-muted-foreground">Investment Analysis</p>
                  </div>
                </div>
              </Link>
              <Link to="/services/labor-economics-consulting" className="p-4 border rounded-lg hover:bg-primary/5 transition-colors group">
                <div className="flex items-center gap-3">
                  <div className="inline-flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">Labor Economics</h4>
                    <p className="text-sm text-muted-foreground">Workforce Consulting</p>
                  </div>
                </div>
              </Link>
              <Link to="/services/economic-impact-studies" className="p-4 border rounded-lg hover:bg-primary/5 transition-colors group">
                <div className="flex items-center gap-3">
                  <div className="inline-flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <Landmark className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">Economic Impact</h4>
                    <p className="text-sm text-muted-foreground">Regional Studies</p>
                  </div>
                </div>
              </Link>
              <Link to="/services/program-evaluation" className="p-4 border rounded-lg hover:bg-primary/5 transition-colors group">
                <div className="flex items-center gap-3">
                  <div className="inline-flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <ClipboardList className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">Program Evaluation</h4>
                    <p className="text-sm text-muted-foreground">Policy Assessment</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Core Litigation Support Services */}
        <div className="max-w-5xl mx-auto mb-8">
          <div className="rounded-lg border bg-card p-5 md:p-6 shadow-card">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
              <h3 className="text-xl font-semibold text-foreground">Core Litigation Support Services</h3>
              <Link to="/services" className="text-primary hover:underline">View all Services</Link>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {services.slice(0, 3).map((service, index) => (
                <Link key={index} to={`/services/${service.slug}`} className="p-4 border rounded-lg hover:bg-primary/5 transition-colors group">
                  <div className="flex items-center gap-3">
                    <div className="inline-flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                      <service.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">{service.title}</h4>
                      <p className="text-sm text-muted-foreground">{service.description}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Specialized Evaluation Services */}
        <div className="max-w-5xl mx-auto mb-8">
          <div className="rounded-lg border bg-card p-5 md:p-6 shadow-card">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
              <h3 className="text-xl font-semibold text-foreground">Specialized Evaluation Services</h3>
              <Link to="/services" className="text-primary hover:underline">View all Services</Link>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {services.slice(3, 6).map((service, index) => (
                <Link key={index} to={`/services/${service.slug}`} className="p-4 border rounded-lg hover:bg-primary/5 transition-colors group">
                  <div className="flex items-center gap-3">
                    <div className="inline-flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                      <service.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">{service.title}</h4>
                      <p className="text-sm text-muted-foreground">{service.description}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Data Analytics Services */}
        <div className="max-w-5xl mx-auto">
          <div className="rounded-lg border bg-card p-5 md:p-6 shadow-card">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
              <h3 className="text-xl font-semibold text-foreground">Data Analytics & Research</h3>
              <Link to="/services/econometrics-data-science" className="text-primary hover:underline">Learn more</Link>
            </div>
            <div className="grid md:grid-cols-1 gap-4">
              <Link to="/services/econometrics-data-science" className="p-4 border rounded-lg hover:bg-primary/5 transition-colors group">
                <div className="flex items-center gap-3">
                  <div className="inline-flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <Database className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">Econometrics & Data Science</h4>
                    <p className="text-sm text-muted-foreground">Advanced statistical analysis and predictive modeling for complex economic problems</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-6 mt-10 text-center">
        <Button variant="professional" size="lg" asChild>
          <Link to="/advisory">
            Explore Advisory Services
            <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default Services;
