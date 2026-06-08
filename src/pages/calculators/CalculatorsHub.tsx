import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Calculator, Info, ArrowRight } from "lucide-react";
import { calculators, DISCLAIMER } from "@/data/calculatorRegistry";

const CalculatorsHub = () => (
  <div className="min-h-screen">
    <SEOHead
      title="Economic Damages Calculators | Kincaid Wolstein Economics"
      description="Free interactive calculators for present value, lost earnings, life care costs, and household services losses."
      canonical="https://kweconomics.com/calculators"
    />
    <Header />
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-navy via-navy to-navy-dark text-white py-16">
      <div className="kw-aurora" aria-hidden="true" />
      <div className="kw-grid" aria-hidden="true" />
      <div className="container mx-auto px-6 relative z-10 text-center max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 font-serif kw-enter kw-enter-1">Economic Damages Calculators</h1>
        <p className="text-lg text-white/90 kw-enter kw-enter-2">
          Interactive tools to illustrate the present value of future economic losses.
        </p>
      </div>
    </section>
    <section className="py-16 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {calculators.map((c) => (
            <Link key={c.slug} to={`/calculators/${c.slug}`}>
              <Card className="p-6 h-full shadow-card border-0 hover:shadow-lg transition-shadow group">
                <Calculator className="h-8 w-8 text-primary mb-3" />
                <h2 className="text-xl font-semibold text-foreground mb-2 flex items-center">
                  {c.title}
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </h2>
                <p className="text-muted-foreground text-sm">{c.description}</p>
              </Card>
            </Link>
          ))}
        </div>
        <Alert className="mt-12 max-w-4xl mx-auto">
          <Info className="h-4 w-4" />
          <AlertDescription>{DISCLAIMER}</AlertDescription>
        </Alert>
      </div>
    </section>
    <Footer />
  </div>
);

export default CalculatorsHub;
