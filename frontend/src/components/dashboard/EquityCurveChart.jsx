import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';
import { cn } from '../../lib/utils';
import { formatINR } from '../../lib/utils';



function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-lg border border-border-default bg-bg-secondary p-3 shadow-lg min-w-[120px]">
      <p className="text-[10px] font-bold text-text-secondary mb-1.5 uppercase tracking-wider">{label}</p>
      <div className="flex items-center gap-2">
        <div className="h-2 w-2 rounded-full bg-accent-blue" />
        <span className="text-text-tertiary text-[11px] font-medium">Value:</span>
        <span className="font-bold text-text-primary text-[11px] tabular-nums ml-auto">
          {formatINR(payload[0].value)}
        </span>
      </div>
    </div>
  );
}

export default function EquityCurveChart({ data, index = 0 }) {
  const [period, setPeriod] = useState('ALL');
  const periods = ['1M', '3M', '6M', '1Y', 'ALL'];

  return (
    <motion.div
      className="card-base flex flex-col p-5 h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-[11px] font-bold uppercase tracking-wider text-text-tertiary">Equity Curve</h3>
          <p className="text-2xl font-bold text-text-primary mt-1 tabular-nums tracking-tight">
            {formatINR(data[data.length - 1]?.value || 0)}
          </p>
        </div>

        {/* Period Toggles */}
        <div className="flex bg-bg-tertiary p-1 rounded-lg" role="tablist" aria-label="Time period">
          {periods.map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={cn(
                "px-2.5 py-1 text-[10px] font-bold rounded-md transition-all cursor-pointer",
                period === p
                  ? "bg-bg-secondary text-text-primary shadow-sm"
                  : "text-text-tertiary hover:text-text-secondary"
              )}
              role="tab"
              aria-selected={period === p}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Chart Area */}
      <div className="flex-1 min-h-[220px] w-full mt-2" aria-hidden="true">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-accent-blue)" stopOpacity={0.15} />
                <stop offset="95%" stopColor="var(--color-accent-blue)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border-default)" opacity={0.4} />
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'var(--color-text-tertiary)', fontSize: 10, fontWeight: 500 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'var(--color-text-tertiary)', fontSize: 10 }}
              tickFormatter={(val) => `₹${(val / 1000).toFixed(0)}k`}
              width={45}
            />
            <Tooltip content={<ChartTooltip />} cursor={{ stroke: 'var(--color-border-hover)', strokeWidth: 1, strokeDasharray: '3 3' }} />
            <Area
              type="monotone"
              dataKey="value"
              stroke="var(--color-accent-blue)"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#colorValue)"
              activeDot={{ r: 5, strokeWidth: 0, fill: 'var(--color-accent-blue)' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
