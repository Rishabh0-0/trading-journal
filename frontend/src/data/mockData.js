/**
 * Mock trading data for development.
 * Will be replaced by API calls when backend is integrated.
 */

// ── Top Stats ────────────────────────────────────────────
export const statsData = {
  totalPnl: {
    value: 24850.75,
    change: 12.4,        // percentage change
    period: 'vs last month',
  },
  winRate: {
    value: 68.5,          // percentage
    totalWins: 137,
    totalTrades: 200,
  },
  totalBrokerage: {
    value: 3420.50,
    change: -5.2,
    period: 'vs last month',
  },
  activePositions: {
    value: 7,
    long: 5,
    short: 2,
  },
};
