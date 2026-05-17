import React, { useState, useEffect } from 'react';
import {
  TrendingUp,
  Receipt,
  Activity,
} from 'lucide-react';
import StatCard, { StatCardSkeleton } from './StatCard';
import ModernStatCard from './ModernStatCard';
import WinRatioDonutCard from './WinRatioDonutCard';
import WinRatioBarCard from './WinRatioBarCard';
import RecentTradesCard from './RecentTradesCard';
import EquityCurveChart from './EquityCurveChart';
import StrategyPerformanceChart from './StrategyPerformanceChart';
import { statsData } from '../../data/mockData';
import { formatINR } from '../../lib/utils';

/**
 * Skeleton that mirrors the actual grid layout.
 */
function GridSkeleton() {
  return (
    <div className="flex flex-col h-full gap-6" role="status" aria-label="Loading dashboard">
      {/* Top Grid Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
        <div className="lg:col-span-3 grid grid-cols-3 gap-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <StatCardSkeleton key={i} />
          ))}
          <div className="col-span-3">
            <div className="card-base p-4 animate-pulse">
              <div className="h-3 w-24 rounded bg-bg-tertiary mb-3" />
              <div className="h-36 rounded bg-bg-tertiary" />
            </div>
          </div>
        </div>
        <div className="lg:col-span-1">
          <div className="card-base p-4 animate-pulse space-y-4 h-full">
            <div className="h-3 w-28 rounded bg-bg-tertiary" />
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-bg-tertiary flex-shrink-0" />
                <div className="flex-1 space-y-1">
                  <div className="h-3 w-16 rounded bg-bg-tertiary" />
                  <div className="h-2 w-10 rounded bg-bg-tertiary" />
                </div>
                <div className="h-3 w-14 rounded bg-bg-tertiary" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Charts Skeleton */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-0">
        <div className="lg:col-span-2 min-h-0">
          <div className="card-base p-5 h-full flex flex-col animate-pulse">
            <div className="h-3 w-24 rounded bg-bg-tertiary mb-6" />
            <div className="flex-1 rounded bg-bg-tertiary" />
          </div>
        </div>
        <div className="lg:col-span-1 min-h-0">
          <div className="card-base p-5 h-full flex flex-col animate-pulse">
            <div className="h-3 w-32 rounded bg-bg-tertiary mb-6" />
            <div className="flex-1 rounded bg-bg-tertiary" />
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * StatsGrid — Compressed single-screen dashboard layout.
 */
export default function StatsGrid() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <GridSkeleton />;
  }

  const {
    portfolioValue,
    totalTrades,
    totalPnl,
    totalBrokerage,
    activePositions,
    winRate,
    winRatioHistory,
    recentTrades,
    equityCurve,
    strategyPerformance
  } = statsData;

  return (
    <div className="flex flex-col h-full gap-3" role="region" aria-label="Dashboard statistics">
      {/* ── Top Dashboard Grid (Phase 2) ─────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
        {/* ── Left Area (3 Columns) ────────────────────────── */}
        <div className="lg:col-span-3 grid grid-cols-3 gap-3 auto-rows-min">
          {/* Row 1: Metric Cards — all same height via grid stretch */}
          <ModernStatCard
            title="Portfolio value"
            value={formatINR(portfolioValue.value)}
            change={portfolioValue.change}
            comparisonText={`Vs ${formatINR(portfolioValue.previousValue)}`}
            index={0}
          />

          <ModernStatCard
            title="Total trades"
            value={totalTrades.value}
            change={totalTrades.change}
            comparisonText={`Vs ${totalTrades.previousCount} trades`}
            index={1}
          />

          <StatCard
            title="Total P&L"
            value={formatINR(totalPnl.value)}
            change={totalPnl.change}
            changePeriod={totalPnl.period}
            icon={TrendingUp}
            iconColor="text-accent-green"
            iconBg="bg-accent-green/10"
            sentiment={totalPnl.value >= 0 ? 'positive' : 'negative'}
            index={2}
          />

          {/* Row 2: Secondary Metrics & Donut — equal heights */}
          <StatCard
            title="Brokerage"
            value={formatINR(totalBrokerage.value)}
            change={totalBrokerage.change}
            changePeriod={totalBrokerage.period}
            icon={Receipt}
            iconColor="text-accent-amber"
            iconBg="bg-accent-amber/10"
            sentiment="negative"
            index={3}
          />

          <StatCard
            title="Active Pos"
            value={activePositions.value.toString()}
            subtitle={`${activePositions.count} positions`}
            icon={Activity}
            iconColor="text-accent-purple"
            iconBg="bg-accent-purple/10"
            sentiment="neutral"
            index={4}
          />

          <WinRatioDonutCard
            data={winRate}
            index={5}
          />

          {/* Row 3: Wide Bar Chart */}
          <div className="col-span-3">
            <WinRatioBarCard
              data={winRatioHistory}
              index={6}
            />
          </div>
        </div>

        {/* ── Right Area (1 Column - Stretches full height) ─── */}
        <div className="lg:col-span-1 lg:row-span-1">
          <RecentTradesCard
            trades={recentTrades}
            index={7}
          />
        </div>
      </div>

      {/* ── Charts Row (Phase 3) ─────────────────────────── */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-3 min-h-0">
        {/* Equity Curve takes 2/3 width on large screens */}
        <div className="lg:col-span-2 min-h-0">
          <EquityCurveChart data={equityCurve} index={8} />
        </div>

        {/* Strategy Performance takes 1/3 width */}
        <div className="lg:col-span-1 min-h-0">
          <StrategyPerformanceChart data={strategyPerformance} index={9} />
        </div>
      </div>
    </div>
  );
}
