import React from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard } from 'lucide-react';

/**
 * Dashboard page — will contain stats cards, charts, and tables.
 * Currently a placeholder for Phase 1.
 */
export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Placeholder hero area */}
      <motion.div
        className="card-base flex flex-col items-center justify-center gap-4 p-12"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-accent-blue/10">
          <LayoutDashboard size={32} className="text-accent-blue glow-blue" />
        </div>
        <h2 className="text-xl font-semibold text-text-primary">
          Dashboard
        </h2>
        <p className="max-w-md text-center text-sm text-text-secondary">
          Your trading performance overview will appear here. Stats cards, equity curves,
          strategy charts, and trade tables are coming in the next phases.
        </p>
        <div className="mt-2 flex gap-2">
          {['Stats Cards', 'Equity Curve', 'Strategy Chart', 'Trade Tables'].map((label) => (
            <span
              key={label}
              className="rounded-lg bg-bg-tertiary px-3 py-1 text-xs font-medium text-text-tertiary border border-border-default"
            >
              {label}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
