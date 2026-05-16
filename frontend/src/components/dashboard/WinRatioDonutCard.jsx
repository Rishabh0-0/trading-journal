import React from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { cn } from '../../lib/utils';

/**
 * WinRatioDonutCard — Compact donut chart showing win/loss ratio.
 * Designed to match the height of adjacent StatCards in the grid.
 */
export default function WinRatioDonutCard({ data, index = 0 }) {
  const chartData = [
    { name: 'Winning', value: data.winning },
    { name: 'Losing', value: data.losing },
  ];

  const COLORS = ['var(--color-accent-green)', 'var(--color-border-default)'];

  return (
    <motion.div
      className="card-base flex flex-col p-4 h-full"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
    >
      <h3 className="text-[10px] font-bold uppercase tracking-wider text-text-tertiary mb-2">Win ratio</h3>

      {/* Donut + Stats side by side */}
      <div className="flex items-center gap-3 flex-1 min-h-0">
        <div className="relative h-16 w-16 shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                innerRadius={20}
                outerRadius={28}
                paddingAngle={0}
                dataKey="value"
                startAngle={90}
                endAngle={450}
                stroke="none"
              >
                {chartData.map((entry, i) => (
                  <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sm font-bold text-text-primary leading-none">
              {data.value}%
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-1 flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-bold uppercase tracking-widest text-text-tertiary">Wins</span>
            <span className="text-sm font-bold text-accent-green">{data.winning}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-bold uppercase tracking-widest text-text-tertiary">Losses</span>
            <span className="text-sm font-bold text-accent-red">{data.losing}</span>
          </div>
          {data.change != null && (
            <p className="text-[9px] text-text-tertiary mt-0.5">
              <span className="text-accent-green font-bold">+{data.change}%</span> vs {data.period}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
