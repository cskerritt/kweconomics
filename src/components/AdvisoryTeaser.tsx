import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  LineChart,
  Calculator,
  Users,
  Landmark,
  ClipboardList,
  Database,
  ArrowRight
} from "lucide-react";

const AdvisoryTeaser = () => {
  const items = [
    { icon: BarChart3, title: "Market Analysis", href: "/services/market-analysis-forecasting" },
    { icon: LineChart, title: "Pricing Strategy", href: "/services/pricing-strategy" },
    { icon: Calculator, title: "Cost‑Benefit & ROI", href: "/services/cost-benefit-roi-analysis" },
    { icon: Users, title: "Labor Economics", href: "/services/labor-economics-consulting" },
    { icon: Landmark, title: "Economic Impact", href: "/services/economic-impact-studies" },
    { icon: ClipboardList, title: "Program Evaluation", href: "/services/program-evaluation" },
    { icon: Database, title: "Econometrics & Data", href: "/services/econometrics-data-science" },
  ];

  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-6">
        <Card className="p-6 md:p-8 shadow-card border-0 bg-card">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <h2 className="text-2xl font-bold text-foreground">Strategic Advisory Services</h2>
            <Button asChild variant="professional">
              <Link to="/advisory" className="group">
                Explore All Advisory
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {items.map((item, i) => (
              <Link key={i} to={item.href} className="flex items-center gap-3 p-3 rounded-md border hover:bg-primary/5 transition-colors">
                <item.icon className="h-4 w-4 text-primary" />
                <span className="text-sm text-foreground">{item.title}</span>
              </Link>
            ))}
          </div>
        </Card>
      </div>
    </section>
  );
};

export default AdvisoryTeaser;

