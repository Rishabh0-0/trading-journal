import React, { useState, useEffect } from 'react';
import {
  TrendingUp,
  Target,
  Receipt,
  Activity,
} from 'lucide-react';
import StatCard, { StatCardSkeleton } from './StatCard';
import { statsData } from '../../data/mockData';

/**
 * Format currency with ₹ symbol and proper comma grouping.
 */
function formatCurrency(value) {
  const formatted = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Math.abs(value));

  return value < 0 ? `-${formatted}` : formatted;
}

/**
 * StatsGrid — Top metrics row on the Dashboard.
 * Renders four stat cards in a responsive grid with
 * a simulated loading state.
 */
export default function StatsGrid() {
  const [loading, setLoading] = useState(true);

  // Simulate API fetch delay
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <StatCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  const { totalPnl, winRate, totalBrokerage, activePositions } = statsData;

  const cards = [
    {
      title: 'Total P&L',
      value: formatCurrency(totalPnl.value),
      change: totalPnl.change,
      changePeriod: totalPnl.period,
      icon: TrendingUp,
      iconColor: 'text-accent-green',
      iconBg: 'bg-accent-green/10',
      sentiment: totalPnl.value >= 0 ? 'positive' : 'negative',
    },
    {
      title: 'Win Rate',
      value: `${winRate.value}%`,
      subtitle: `${winRate.totalWins} / ${winRate.totalTrades} trades`,
      icon: Target,
      iconColor: 'text-accent-blue',
      iconBg: 'bg-accent-blue/10',
      sentiment: 'neutral',
    },
    {
      title: 'Brokerage Paid',
      value: formatCurrency(totalBrokerage.value),
      change: totalBrokerage.change,
      changePeriod: totalBrokerage.period,
      icon: Receipt,
      iconColor: 'text-accent-amber',
      iconBg: 'bg-accent-amber/10',
      sentiment: 'negative',
    },
    {
      title: 'Active Positions',
      value: activePositions.value.toString(),
      subtitle: `${activePositions.long}L / ${activePositions.short}S`,
      icon: Activity,
      iconColor: 'text-accent-purple',
      iconBg: 'bg-accent-purple/10',
      sentiment: 'neutral',
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card, index) => (
        <StatCard key={card.title} {...card} index={index} />
      ))}
    </div>
  );
}
