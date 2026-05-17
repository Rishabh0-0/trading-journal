import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Cell } from 'recharts';
import { formatINR } from '../../lib/utils';



function StrategyTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;

  const data = payload[0].payload;

  return (
    <div className="rounded-lg border border-border-default bg-bg-secondary p-3 shadow-lg min-w-[140px]">
      <p className="text-[10px] font-bold text-text-secondary mb-2 uppercase tracking-wider">{data.name}</p>
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <span className="text-text-tertiary text-[10px] font-medium">PnL</span>
          <span className="font-bold text-accent-green text-[11px] tabular-nums">
            {formatINR(data.pnl)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-text-tertiary text-[10px] font-medium">Win Rate</span>
          <span className="font-bold text-text-primary text-[11px] tabular-nums">
            {data.winRate}%
          </span>
        </div>
      </div>
    </div>
  );
}

export default function StrategyPerformanceChart({ data, index = 0 }) {
  // Sort data by PnL descending
  const sortedData = [...data].sort((a, b) => b.pnl - a.pnl);

  return (
    <motion.div
      className="card-base flex flex-col p-5 h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-[11px] font-bold uppercase tracking-wider text-text-tertiary">Strategy Performance</h3>
      </div>

      <div className="flex-1 min-h-[220px] w-full mt-2" aria-hidden="true">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={sortedData} layout="vertical" barGap={0}>
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="var(--color-border-default)" opacity={0.4} />
            <XAxis
              type="number"
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'var(--color-text-tertiary)', fontSize: 10 }}
              tickFormatter={(val) => `${(val / 1000).toFixed(0)}k`}
            />
            <YAxis
              dataKey="name"
              type="category"
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'var(--color-text-primary)', fontSize: 10, fontWeight: 500 }}
              width={90}
            />
            <Tooltip content={<StrategyTooltip />} cursor={{ fill: 'var(--color-bg-hover)', radius: 4 }} />
            <Bar
              dataKey="pnl"
              radius={[0, 4, 4, 0]}
              barSize={20}
            >
              {sortedData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill="var(--color-accent-green)" fillOpacity={0.8 + (index * -0.15)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
