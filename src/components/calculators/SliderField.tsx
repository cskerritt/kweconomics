import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { CalcField } from "@/data/calculatorRegistry";

interface Props {
  field: CalcField;
  value: number;
  onChange: (value: number) => void;
}

const prefix = (unit?: string) => (unit === "$" || unit === "$/hr" ? "$" : "");
const suffix = (unit?: string) =>
  unit && unit !== "$" && unit !== "$/hr" ? ` ${unit === "%" ? "%" : unit}` : "";

const SliderField = ({ field, value, onChange }: Props) => {
  if (field.options) {
    return (
      <div className="space-y-2">
        <Label>{field.label}</Label>
        <Select value={String(value)} onValueChange={(v) => onChange(Number(v))}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {field.options.map((o) => (
              <SelectItem key={o.value} value={String(o.value)}>
                {o.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label>{field.label}</Label>
        <div className="flex items-center gap-1 text-sm">
          <span className="text-muted-foreground">{prefix(field.unit)}</span>
          <Input
            type="number"
            value={value}
            min={field.min}
            max={field.max}
            step={field.step}
            onChange={(e) => onChange(Number(e.target.value))}
            className="h-8 w-28 text-right"
          />
          <span className="text-muted-foreground">{suffix(field.unit)}</span>
        </div>
      </div>
      <Slider
        value={[value]}
        min={field.min}
        max={field.max}
        step={field.step}
        onValueChange={(vals) => onChange(vals[0])}
      />
    </div>
  );
};

export default SliderField;
