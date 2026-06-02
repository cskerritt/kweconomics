import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";
import { DISCLAIMER } from "@/data/calculatorRegistry";

interface Props {
  title: string;
  description: string;
  controls: ReactNode;
  results: ReactNode;
}

const CalculatorLayout = ({ title, description, controls, results }: Props) => (
  <section className="py-12 bg-background">
    <div className="container mx-auto px-6">
      <div className="max-w-2xl mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">{title}</h1>
        <p className="text-lg text-muted-foreground">{description}</p>
      </div>
      <div className="grid lg:grid-cols-2 gap-10 items-start">
        <div className="space-y-6">{controls}</div>
        <div className="space-y-6">{results}</div>
      </div>
      <Alert className="mt-10 max-w-4xl">
        <Info className="h-4 w-4" />
        <AlertDescription>{DISCLAIMER}</AlertDescription>
      </Alert>
      <div className="mt-6">
        <Link to="/schedule-consultation">
          <Button variant="default" size="lg">Request a case-specific analysis</Button>
        </Link>
      </div>
    </div>
  </section>
);

export default CalculatorLayout;
