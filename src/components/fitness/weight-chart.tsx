"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import { useMounted } from "@/lib/use-mounted";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { cn } from "@/lib/utils";

interface Point {
  date: string;
  weight: number;
}

function ChartTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass glass-dense rounded-md px-3 py-2 text-xs shadow-lg">
      <p className="font-semibold text-muted">{label}</p>
      <p className="tnum mt-0.5 text-sm font-bold text-ink">
        {payload[0].value.toFixed(1)} kg
      </p>
    </div>
  );
}

/**
 * Theme-aware body-weight trend. The line draws once the chart scrolls into
 * view; colours track the current theme via CSS variables.
 */
export function WeightChart({
  data,
  height = 240,
  className,
}: {
  data: Point[];
  height?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const mounted = useMounted();

  const show = mounted && inView;

  return (
    <div ref={ref} className={cn("w-full", className)} style={{ height }}>
      {show ? (
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: -18 }}>
            <defs>
              <linearGradient id="weightFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--chart-line)" stopOpacity={0.24} />
                <stop offset="100%" stopColor="var(--chart-line)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="var(--chart-grid)" vertical={false} />
            <XAxis
              dataKey="date"
              tick={{ fill: "var(--muted)", fontSize: 11 }}
              tickLine={false}
              axisLine={false}
              minTickGap={16}
            />
            <YAxis
              domain={["dataMin - 1", "dataMax + 1"]}
              tick={{ fill: "var(--muted)", fontSize: 11 }}
              tickLine={false}
              axisLine={false}
              width={44}
              tickFormatter={(v: number) => `${v}`}
            />
            <Tooltip content={<ChartTooltip />} cursor={{ stroke: "var(--line-strong)" }} />
            <Area
              type="monotone"
              dataKey="weight"
              stroke="var(--chart-line)"
              strokeWidth={2.4}
              fill="url(#weightFill)"
              dot={{ r: 2.5, fill: "var(--chart-line)", strokeWidth: 0 }}
              activeDot={{ r: 4.5, fill: "var(--chart-line)" }}
              animationDuration={1400}
              animationEasing="ease-out"
            />
          </AreaChart>
        </ResponsiveContainer>
      ) : (
        <div className="size-full animate-pulse rounded-md bg-ink/5" />
      )}
    </div>
  );
}
