import { useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import CalculatorLayout from "@/components/calculators/CalculatorLayout";
import SliderField from "@/components/calculators/SliderField";
import ResultsPanel from "@/components/calculators/ResultsPanel";
import PVChart from "@/components/calculators/PVChart";
import LeadCaptureDialog from "@/components/calculators/LeadCaptureDialog";
import { getCalculator, type CalcConfig } from "@/data/calculatorRegistry";

const CalculatorView = ({ config }: { config: CalcConfig }) => {
  const [values, setValues] = useState<Record<string, number>>(() => {
    const v: Record<string, number> = {};
    config.fields.forEach((f) => (v[f.key] = f.default));
    return v;
  });

  const output = config.compute(values);

  return (
    <div className="min-h-screen">
      <SEOHead
        title={`${config.title} | Kincaid Wolstein Economics`}
        description={config.description}
        canonical={`https://kweconomics.com/calculators/${config.slug}`}
      />
      <Header />
      <CalculatorLayout
        title={config.title}
        description={config.description}
        controls={config.fields.map((f) => (
          <SliderField
            key={f.key}
            field={f}
            value={values[f.key]}
            onChange={(val) => setValues((prev) => ({ ...prev, [f.key]: val }))}
          />
        ))}
        results={
          <>
            <ResultsPanel output={output} />
            <PVChart schedule={output.schedule} />
            <LeadCaptureDialog
              calculatorTitle={config.title}
              calculatorSlug={config.slug}
              inputs={values}
              totalPV={output.totalPV}
            />
          </>
        }
      />
      <Footer />
    </div>
  );
};

const CalculatorPage = () => {
  const { calcSlug } = useParams();
  const config = calcSlug ? getCalculator(calcSlug) : undefined;
  if (!config) return <Navigate to="/calculators" replace />;
  return <CalculatorView key={config.slug} config={config} />;
};

export default CalculatorPage;
