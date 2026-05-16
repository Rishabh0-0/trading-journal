import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

/**
 * ModernStatCard — Simplified metric card that matches StatCard height.
 * Uses flex-col with justify-between so the content stretches to fill
 * the same row height as adjacent cards.
 */
export default function ModernStatCard({
  title,
  value,
  change,
  comparisonText,
  index = 0,
}) {
  const isPositive = change > 0;
  
  return (
    <motion.div
      className="card-base group flex flex-col justify-between p-4 h-full"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
    >
      {/* Top: Label */}
      <span className="text-[10px] font-bold uppercase tracking-wider text-text-tertiary mb-1.5">
        {title}
      </span>
      
      {/* Middle: Value + change inline */}
      <div className="flex items-baseline gap-2 mb-0.5">
        <span className="text-xl font-bold tracking-tight text-text-primary">
          {value}
        </span>
        {change != null && (
          <span className={cn(
            "text-[11px] font-bold flex items-center gap-0.5",
            isPositive ? "text-accent-green" : "text-accent-red"
          )}>
            {isPositive ? '↗' : '↘'} {Math.abs(change)}%
          </span>
        )}
      </div>

      {/* Bottom: Comparison */}
      <p className="text-[10px] text-text-tertiary truncate">
        {comparisonText}
      </p>
    </motion.div>
  );
}
