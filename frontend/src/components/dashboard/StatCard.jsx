import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

/**
 * Skeleton loader that matches StatCard dimensions.
 * Shows a pulsing placeholder while data loads.
 */
export function StatCardSkeleton() {
  return (
    <div className="card-base p-5 space-y-3 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="h-4 w-24 rounded-md bg-bg-tertiary" />
        <div className="h-9 w-9 rounded-xl bg-bg-tertiary" />
      </div>
      <div className="h-8 w-32 rounded-md bg-bg-tertiary" />
      <div className="h-3 w-20 rounded-md bg-bg-tertiary" />
    </div>
  );
}

/**
 * Reusable stat card component.
 *
 * @param {string}  title       - Card title label
 * @param {string}  value       - Main display value (pre-formatted)
 * @param {string}  subtitle    - Small text below value (optional)
 * @param {number}  change      - Percentage change (+/-), null to hide
 * @param {string}  changePeriod - Period label for change (e.g. "vs last month")
 * @param {React.ElementType} icon - Lucide icon component
 * @param {string}  iconColor   - Tailwind text color class for icon
 * @param {string}  iconBg      - Tailwind bg color class for icon container
 * @param {'positive'|'negative'|'neutral'} sentiment - Controls value color
 * @param {number}  index       - Index for staggered animation
 */
export default function StatCard({
  title,
  value,
  subtitle,
  change,
  changePeriod,
  icon: Icon,
  iconColor = 'text-accent-blue',
  iconBg = 'bg-accent-blue/10',
  sentiment = 'neutral',
  index = 0,
}) {
  const isPositive = change > 0;
  const isNegative = change < 0;

  return (
    <motion.div
      className="card-base group relative overflow-hidden p-5"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: index * 0.08,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
    >
      {/* Subtle gradient overlay on hover */}
      <div
        className={cn(
          'pointer-events-none absolute inset-0 rounded-[16px] opacity-0 transition-opacity duration-300 group-hover:opacity-100',
          sentiment === 'positive' && 'bg-gradient-to-br from-accent-green/[0.03] to-transparent',
          sentiment === 'negative' && 'bg-gradient-to-br from-accent-red/[0.03] to-transparent',
          sentiment === 'neutral' && 'bg-gradient-to-br from-accent-blue/[0.03] to-transparent',
        )}
      />

      {/* Top row: label + icon */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-medium uppercase tracking-wider text-text-tertiary">
          {title}
        </span>
        <div className={cn('flex h-9 w-9 items-center justify-center rounded-xl', iconBg)}>
          <Icon size={18} className={iconColor} strokeWidth={1.8} />
        </div>
      </div>

      {/* Main value */}
      <div className="mb-1">
        <span
          className={cn(
            'text-2xl font-bold tracking-tight',
            sentiment === 'positive' && 'text-accent-green',
            sentiment === 'negative' && 'text-accent-red',
            sentiment === 'neutral' && 'text-text-primary',
          )}
        >
          {value}
        </span>
      </div>

      {/* Change badge + subtitle */}
      <div className="flex items-center gap-2">
        {change != null && (
          <span
            className={cn(
              'inline-flex items-center gap-0.5 rounded-md px-1.5 py-0.5 text-[11px] font-semibold',
              isPositive && 'bg-accent-green/10 text-accent-green',
              isNegative && 'bg-accent-red/10 text-accent-red',
              !isPositive && !isNegative && 'bg-bg-tertiary text-text-tertiary',
            )}
          >
            {isPositive ? '↑' : isNegative ? '↓' : '—'}
            {Math.abs(change).toFixed(1)}%
          </span>
        )}
        {(subtitle || changePeriod) && (
          <span className="text-[11px] text-text-tertiary">
            {subtitle || changePeriod}
          </span>
        )}
      </div>
    </motion.div>
  );
}
