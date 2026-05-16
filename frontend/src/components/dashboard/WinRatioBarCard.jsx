import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';
import { cn } from '../../lib/utils';

/**
 * Custom tooltip for the bar chart.
 */
function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-lg border border-border-default bg-bg-secondary p-2.5 shadow-lg">
      <p className="text-[10px] font-bold text-text-secondary mb-1">{label}</p>
      {payload.map((entry, i) => (
        <div key={i} className="flex items-center gap-2 text-[10px]">
          <div
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-text-tertiary capitalize">{entry.dataKey}:</span>
          <span className="font-bold text-text-primary">{entry.value}%</span>
        </div>
      ))}
    </div>
  );
}

/**
 * WinRatioBarCard — Monthly win/loss bar chart.
 * Renamed title to "Monthly Performance" to differentiate from the donut card.
 */
export default function WinRatioBarCard({ data, index = 0 }) {
  return (
    <motion.div
      className="card-base flex flex-col p-4"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {/* Header with legend */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-[10px] font-bold uppercase tracking-wider text-text-tertiary">Monthly Performance</h3>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <div className="h-2 w-2 rounded-full bg-accent-green" />
            <span className="text-[9px] text-text-tertiary font-medium">Wins</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-2 w-2 rounded-full bg-accent-red opacity-60" />
            <span className="text-[9px] text-text-tertiary font-medium">Losses</span>
          </div>
        </div>
      </div>

      <div className="h-40 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 4, right: 8, left: 0, bottom: 0 }} barGap={2}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border-default)" opacity={0.4} />
            <XAxis 
              dataKey="month" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: 'var(--color-text-tertiary)', fontSize: 10, fontWeight: 500 }} 
              dy={6}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: 'var(--color-text-tertiary)', fontSize: 10 }}
              tickFormatter={(value) => `${value}%`}
              width={44}
            />
            <Tooltip content={<ChartTooltip />} cursor={{ fill: 'var(--color-bg-hover)', radius: 4 }} />
            <Bar 
              dataKey="win" 
              fill="var(--color-accent-green)" 
              fillOpacity={0.85} 
              radius={[4, 4, 0, 0]} 
              barSize={14} 
            />
            <Bar 
              dataKey="loss" 
              fill="var(--color-accent-red)" 
              fillOpacity={0.55} 
              radius={[4, 4, 0, 0]} 
              barSize={14} 
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
