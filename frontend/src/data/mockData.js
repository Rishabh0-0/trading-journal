/**
 * Mock trading data for development.
 * Will be replaced by API calls when backend is integrated.
 */

// ── Top Stats ────────────────────────────────────────────
export const statsData = {
  portfolioValue: {
    value: 842500.00,
    change: 12.5,
    previousValue: 748000.00,
    period: 'past month',
  },
  totalTrades: {
    value: 74,
    change: -8.0,
    previousCount: 80,
    period: 'past month',
  },
  totalPnl: {
    value: 124850.75,
    change: 18.4,        
    period: 'vs last month',
  },
  winRate: {
    value: 58,
    winning: 43,
    losing: 29,
    change: 8.0,
    period: 'past month',
  },
  totalBrokerage: {
    value: 8420.50,
    change: -5.2,
    period: 'vs last month',
  },
  activePositions: {
    value: 5,
    long: 3,
    short: 2,
  },
  // Data for Win Ratio Bar Chart
  winRatioHistory: [
    { month: 'Jan', win: 45, loss: 72 },
    { month: 'Feb', win: 65, loss: 42 },
    { month: 'Mar', win: 55, loss: 55 },
    { month: 'Apr', win: 72, loss: 38 },
    { month: 'May', win: 68, loss: 42 },
    { month: 'Jun', win: 62, loss: 48 },
    { month: 'Jul', win: 70, loss: 36 },
  ],
  // Recent Trades List
  recentTrades: [
    { id: 1, symbol: 'RELIANCE', date: 'May 16', type: 'BUY', pnl: 4500.00, status: 'PROFIT' },
    { id: 2, symbol: 'TCS', date: 'May 15', type: 'SELL', pnl: -1200.50, status: 'LOSS' },
    { id: 3, symbol: 'HDFC', date: 'May 15', type: 'BUY', pnl: 2800.00, status: 'PROFIT' },
    { id: 4, symbol: 'INFY', date: 'May 14', type: 'BUY', pnl: 850.00, status: 'PROFIT' },
    { id: 5, symbol: 'ZOMATO', date: 'May 14', type: 'SELL', pnl: -3400.00, status: 'LOSS' },
    { id: 6, symbol: 'WIPRO', date: 'May 13', type: 'BUY', pnl: 1100.25, status: 'PROFIT' },
    { id: 7, symbol: 'SBIN', date: 'May 13', type: 'BUY', pnl: 5200.00, status: 'PROFIT' },
    { id: 8, symbol: 'ADANIENT', date: 'May 12', type: 'SELL', pnl: -7800.00, status: 'LOSS' },
  ]
};
