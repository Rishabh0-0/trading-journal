import React from 'react';
import { motion } from 'framer-motion';
import StatsGrid from '../components/dashboard/StatsGrid';

/**
 * Dashboard page — main overview of trading performance.
 * Phase 2: Stats cards row at the top.
 * Phase 3+: Charts and tables below.
 */
export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* ── Top Stats Row ────────────────────────────────── */}
      <StatsGrid />

      {/* Placeholder for upcoming sections */}
      <motion.div
        className="card-base flex items-center justify-center p-12"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.35 }}
      >
        <p className="text-sm text-text-tertiary">
          Charts & tables coming in Phase 3 & 4…
        </p>
      </motion.div>
    </div>
  );
}
