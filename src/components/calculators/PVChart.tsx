import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";
import type { PVScheduleRow } from "@/lib/finance";

const compact = (n: number) =>
  n.toLocaleString("en-US", { notation: "compact", maximumFractionDigits: 1 });

const PVChart = ({ schedule }: { schedule: PVScheduleRow[] }) => (
  <div className="w-full h-72">
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart data={schedule} margin={{ top: 10, right: 10, bottom: 0, left: 0 }}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
        <XAxis dataKey="year" tick={{ fontSize: 12 }} />
        <YAxis tickFormatter={compact} tick={{ fontSize: 12 }} width={48} />
        <Tooltip
          formatter={(value: number) => `$${Math.round(value).toLocaleString()}`}
          labelFormatter={(l) => `Year ${l}`}
        />
        <Legend />
        <Bar dataKey="nominal" name="Nominal" fill="hsl(var(--muted-foreground))" opacity={0.4} />
        <Bar dataKey="discounted" name="Discounted (PV)" fill="hsl(var(--primary))" />
        <Line type="monotone" dataKey="cumulativePV" name="Cumulative PV" stroke="hsl(var(--primary))" dot={false} strokeWidth={2} />
      </ComposedChart>
    </ResponsiveContainer>
  </div>
);

export default PVChart;
