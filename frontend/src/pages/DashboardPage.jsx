import React from 'react';
import StatsGrid from '../components/dashboard/StatsGrid';

/**
 * Dashboard page — main overview of trading performance.
 */
export default function DashboardPage() {
  return (
    <div className="flex flex-col h-full gap-6">
      <StatsGrid />
    </div>
  );
}
