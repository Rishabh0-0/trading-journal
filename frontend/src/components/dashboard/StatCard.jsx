import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

/**
 * Skeleton loader that matches StatCard dimensions.
 */
export function StatCardSkeleton() {
  return (
    <div className="card-base p-4 space-y-2 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="h-3 w-20 rounded bg-bg-tertiary" />
        <div className="h-7 w-7 rounded-lg bg-bg-tertiary" />
      </div>
      <div className="h-6 w-28 rounded bg-bg-tertiary" />
      <div className="h-3 w-16 rounded bg-bg-tertiary" />
    </div>
  );
}

/**
 * Reusable stat card with icon, value, change badge.
 * Uses flex-col + justify-between to fill grid row height.
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
      className="card-base group relative overflow-hidden p-4 h-full flex flex-col justify-between"
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

      {/* Top: Label + Icon */}
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-[10px] font-bold uppercase tracking-wider text-text-tertiary">
          {title}
        </span>
        <div className={cn('flex h-7 w-7 items-center justify-center rounded-lg', iconBg)}>
          <Icon size={14} className={iconColor} strokeWidth={2} />
        </div>
      </div>

      {/* Middle: Value */}
      <div className="mb-0.5">
        <span
          className={cn(
            'text-xl font-bold tracking-tight',
            sentiment === 'positive' && 'text-accent-green',
            sentiment === 'negative' && 'text-accent-red',
            sentiment === 'neutral' && 'text-text-primary',
          )}
        >
          {value}
        </span>
      </div>

      {/* Bottom: Change badge + subtitle */}
      <div className="flex items-center justify-between gap-2">
        {change != null && (
          <span
            className={cn(
              'inline-flex items-center gap-0.5 rounded-md px-1.5 py-0.5 text-[10px] font-bold',
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
          <span className="text-[10px] text-text-tertiary truncate">
            {subtitle || changePeriod}
          </span>
        )}
      </div>
    </motion.div>
  );
}
