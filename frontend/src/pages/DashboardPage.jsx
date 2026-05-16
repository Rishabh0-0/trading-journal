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
    <div>
      {/* ── Dashboard Grid ───────────────────────────────── */}
      <StatsGrid />
    </div>
  );
}
