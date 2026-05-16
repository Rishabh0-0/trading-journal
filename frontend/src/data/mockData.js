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
    { id: 1, symbol: 'RELIANCE', date: 'May 16', pnl: 4500.00, status: 'PROFIT' },
    { id: 2, symbol: 'TCS', date: 'May 15', pnl: -1200.50, status: 'LOSS' },
    { id: 3, symbol: 'HDFC', date: 'May 15', pnl: 2800.00, status: 'PROFIT' },
    { id: 4, symbol: 'INFY', date: 'May 14', pnl: 850.00, status: 'PROFIT' },
    { id: 5, symbol: 'ZOMATO', date: 'May 14', pnl: -3400.00, status: 'LOSS' },
    { id: 6, symbol: 'WIPRO', date: 'May 13', pnl: 1100.25, status: 'PROFIT' },
    { id: 7, symbol: 'SBIN', date: 'May 13', pnl: 5200.00, status: 'PROFIT' },
    { id: 8, symbol: 'ADANIENT', date: 'May 12', pnl: -7800.00, status: 'LOSS' },
  ],
  // ── Phase 3 Charts Data ────────────────────────────────
  equityCurve: [
    { date: 'Jan', value: 500000 },
    { date: 'Feb', value: 520000 },
    { date: 'Mar', value: 495000 },
    { date: 'Apr', value: 580000 },
    { date: 'May', value: 650000 },
    { date: 'Jun', value: 710000 },
    { date: 'Jul', value: 748000 },
    { date: 'Aug', value: 842500 },
  ],
  strategyPerformance: [
    { name: 'Momentum Breakout', pnl: 45000, winRate: 65 },
    { name: 'Mean Reversion', pnl: 28000, winRate: 55 },
    { name: 'Trend Following', pnl: 85000, winRate: 42 },
    { name: 'Options Selling', pnl: 18000, winRate: 78 },
  ],
  // ── Phase 4 All Trades Data ────────────────────────────
  fullTradesList: [
    { id: 101, entryDate: '2024-05-15', exitDate: null, symbol: 'RELIANCE', status: 'ACTIVE', strategy: 'Momentum Breakout', size: 250, entryPrice: 2850.50, exitPrice: null, brokerage: 120.00, pnl: 4500.00 },
    { id: 102, entryDate: '2024-05-10', exitDate: '2024-05-14', symbol: 'TCS', status: 'CLOSED-LOSS', strategy: 'Mean Reversion', size: 100, entryPrice: 3950.00, exitPrice: 3935.00, brokerage: 250.50, pnl: -1750.50 },
    { id: 103, entryDate: '2024-05-02', exitDate: '2024-05-12', symbol: 'HDFC', status: 'CLOSED-PROFIT', strategy: 'Trend Following', size: 500, entryPrice: 1510.00, exitPrice: 1555.00, brokerage: 350.00, pnl: 22150.00 },
    { id: 104, entryDate: '2024-05-16', exitDate: null, symbol: 'INFY', status: 'ACTIVE', strategy: 'Mean Reversion', size: 150, entryPrice: 1420.25, exitPrice: null, brokerage: 75.00, pnl: -200.00 },
    { id: 105, entryDate: '2024-05-13', exitDate: '2024-05-14', symbol: 'ZOMATO', status: 'CLOSED-LOSS', strategy: 'Momentum Breakout', size: 2000, entryPrice: 195.50, exitPrice: 191.00, brokerage: 400.00, pnl: -9400.00 },
    { id: 106, entryDate: '2024-05-08', exitDate: '2024-05-13', symbol: 'WIPRO', status: 'CLOSED-PROFIT', strategy: 'Trend Following', size: 300, entryPrice: 460.00, exitPrice: 472.50, brokerage: 150.25, pnl: 3600.00 },
    { id: 107, entryDate: '2024-05-16', exitDate: null, symbol: 'SBIN', status: 'ACTIVE', strategy: 'Options Selling', size: 1500, entryPrice: 815.00, exitPrice: null, brokerage: 50.00, pnl: 5200.00 },
    { id: 108, entryDate: '2024-05-05', exitDate: '2024-05-12', symbol: 'ADANIENT', status: 'CLOSED-LOSS', strategy: 'Momentum Breakout', size: 200, entryPrice: 3200.00, exitPrice: 3150.00, brokerage: 220.00, pnl: -10220.00 },
    { id: 109, entryDate: '2024-05-01', exitDate: '2024-05-04', symbol: 'ITC', status: 'CLOSED-PROFIT', strategy: 'Mean Reversion', size: 1000, entryPrice: 435.00, exitPrice: 442.00, brokerage: 300.00, pnl: 6700.00 },
    { id: 110, entryDate: '2024-04-25', exitDate: '2024-05-02', symbol: 'ICICIBANK', status: 'CLOSED-PROFIT', strategy: 'Trend Following', size: 400, entryPrice: 1080.00, exitPrice: 1120.00, brokerage: 400.00, pnl: 15600.00 },
  ]
};
