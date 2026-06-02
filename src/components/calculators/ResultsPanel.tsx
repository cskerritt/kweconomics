import { Card } from "@/components/ui/card";
import type { CalcOutput } from "@/data/calculatorRegistry";

const fmt = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

const ResultsPanel = ({ output }: { output: CalcOutput }) => (
  <Card className="p-6 bg-gradient-subtle border-0 shadow-card">
    <p className="text-sm text-muted-foreground mb-1">Estimated Present Value</p>
    <p className="text-4xl font-bold text-primary mb-4">{fmt(output.totalPV)}</p>
    {output.extras && output.extras.length > 0 && (
      <div className="grid grid-cols-2 gap-3">
        {output.extras.map((e) => (
          <div key={e.label} className="bg-background rounded-lg p-3 text-center shadow-soft">
            <div className="text-lg font-semibold text-foreground">{e.value}</div>
            <div className="text-xs text-muted-foreground">{e.label}</div>
          </div>
        ))}
      </div>
    )}
  </Card>
);

export default ResultsPanel;
