import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Plus, SearchX } from 'lucide-react';
import { cn, formatINR } from '../../lib/utils';
import useAppStore from '../../store/useAppStore';

/**
 * Calculate how many days a trade has been held.
 * For active trades, calculates up to a mock "today" date.
 */
const calculateDaysHeld = (entryDate, exitDate) => {
  const start = new Date(entryDate);
  const end = exitDate ? new Date(exitDate) : new Date('2024-05-16');
  const diffTime = Math.abs(end - start);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays === 0 ? 1 : diffDays;
};

const FILTERS = ['ALL', 'ACTIVE', 'PROFIT', 'LOSS'];

/**
 * TradesTable — Full data table for the Trades page.
 * Features: filtering tabs with count badges, averaging action, accessible markup.
 */
export default function TradesTable({ data }) {
  const [filter, setFilter] = useState('ALL');
  const { openTradeModal } = useAppStore();

  // Precompute counts for filter badges
  const counts = useMemo(() => ({
    ALL: data.length,
    ACTIVE: data.filter(t => t.status === 'ACTIVE').length,
    PROFIT: data.filter(t => t.status === 'CLOSED-PROFIT').length,
    LOSS: data.filter(t => t.status === 'CLOSED-LOSS').length,
  }), [data]);

  const filteredData = useMemo(() => data.filter(trade => {
    if (filter === 'ACTIVE') return trade.status === 'ACTIVE';
    if (filter === 'PROFIT') return trade.status === 'CLOSED-PROFIT';
    if (filter === 'LOSS') return trade.status === 'CLOSED-LOSS';
    return true;
  }), [data, filter]);

  return (
    <div className="card-base flex flex-col h-full overflow-hidden">
      {/* Table Header / Toolbar */}
      <div className="flex items-center justify-between p-5 border-b border-border-default">
        <h3 className="text-sm font-bold text-text-primary">All Trades</h3>
        
        {/* Filter Tabs */}
        <div className="flex bg-bg-tertiary p-1 rounded-lg" role="tablist" aria-label="Trade status filter">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              role="tab"
              aria-selected={filter === f}
              className={cn(
                "px-3 py-1.5 text-[11px] font-bold rounded-md transition-all cursor-pointer inline-flex items-center gap-1.5",
                filter === f 
                  ? "bg-bg-secondary text-text-primary shadow-sm" 
                  : "text-text-tertiary hover:text-text-secondary"
              )}
            >
              {f}
              <span className={cn(
                "text-[9px] font-bold rounded-full px-1.5 py-0.5 min-w-[18px] text-center tabular-nums",
                filter === f ? "bg-accent-blue/10 text-accent-blue" : "bg-border-default/50 text-text-tertiary"
              )}>
                {counts[f]}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Table Container */}
      <div className="flex-1 overflow-auto" role="tabpanel">
        <table className="w-full text-left border-collapse min-w-[1000px]">
          <thead className="sticky top-0 bg-bg-secondary border-b border-border-default shadow-sm z-10">
            <tr>
              <th className="p-4 text-[10px] font-bold uppercase tracking-wider text-text-tertiary whitespace-nowrap">Symbol</th>
              <th className="p-4 text-[10px] font-bold uppercase tracking-wider text-text-tertiary whitespace-nowrap">Status</th>
              <th className="p-4 text-[10px] font-bold uppercase tracking-wider text-text-tertiary whitespace-nowrap">Strategy</th>
              <th className="p-4 text-[10px] font-bold uppercase tracking-wider text-text-tertiary whitespace-nowrap">Days Held</th>
              <th className="p-4 text-[10px] font-bold uppercase tracking-wider text-text-tertiary text-right whitespace-nowrap">Size</th>
              <th className="p-4 text-[10px] font-bold uppercase tracking-wider text-text-tertiary text-right whitespace-nowrap">Entry Price</th>
              <th className="p-4 text-[10px] font-bold uppercase tracking-wider text-text-tertiary text-right whitespace-nowrap">Exit Price</th>
              <th className="p-4 text-[10px] font-bold uppercase tracking-wider text-text-tertiary text-right whitespace-nowrap">Brokerage</th>
              <th className="p-4 text-[10px] font-bold uppercase tracking-wider text-text-tertiary text-right whitespace-nowrap">Net P&L</th>
              <th className="p-4 text-[10px] font-bold uppercase tracking-wider text-text-tertiary text-center whitespace-nowrap">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((trade, index) => {
              const daysHeld = calculateDaysHeld(trade.entryDate, trade.exitDate);
              return (
                <motion.tr 
                  key={trade.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="border-b border-border-default/50 hover:bg-bg-hover transition-colors group"
                >
                  {/* Symbol */}
                  <td className="p-4">
                    <span className="font-bold text-sm text-text-primary">{trade.symbol}</span>
                  </td>
                  
                  {/* Status */}
                  <td className="p-4">
                    <span className={cn(
                      "text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wide",
                      trade.status === 'ACTIVE' && "bg-accent-blue-muted text-accent-blue",
                      trade.status === 'CLOSED-PROFIT' && "bg-accent-green-muted text-accent-green",
                      trade.status === 'CLOSED-LOSS' && "bg-accent-red-muted text-accent-red"
                    )}>
                      {trade.status.replace('-', ' ')}
                    </span>
                  </td>

                  {/* Strategy */}
                  <td className="p-4">
                    <span className="text-xs font-medium text-text-secondary">{trade.strategy}</span>
                  </td>

                  {/* Days Held */}
                  <td className="p-4">
                    <span className="text-xs font-medium text-text-secondary tabular-nums">
                      {daysHeld} {daysHeld === 1 ? 'Day' : 'Days'}
                    </span>
                  </td>

                  {/* Size */}
                  <td className="p-4 text-right">
                    <span className="text-sm font-semibold text-text-primary tabular-nums">{trade.size}</span>
                  </td>

                  {/* Entry Price */}
                  <td className="p-4 text-right">
                    <span className="text-sm font-medium text-text-secondary tabular-nums">{formatINR(trade.entryPrice, 2)}</span>
                  </td>

                  {/* Exit Price */}
                  <td className="p-4 text-right">
                    <span className="text-sm font-medium text-text-secondary tabular-nums">{formatINR(trade.exitPrice, 2)}</span>
                  </td>

                  {/* Brokerage */}
                  <td className="p-4 text-right">
                    <span className="text-xs font-medium text-accent-amber tabular-nums">-{formatINR(trade.brokerage, 2)}</span>
                  </td>

                  {/* Net P&L */}
                  <td className="p-4 text-right">
                    <span className={cn(
                      "text-sm font-bold tabular-nums",
                      trade.pnl > 0 ? "text-accent-green" : trade.pnl < 0 ? "text-accent-red" : "text-text-secondary"
                    )}>
                      {trade.pnl > 0 ? '+' : ''}{formatINR(trade.pnl, 2)}
                    </span>
                  </td>

                  {/* Action (Add Position) */}
                  <td className="p-4 text-center">
                    {trade.status === 'ACTIVE' ? (
                      <button 
                        className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-accent-blue-muted text-accent-blue hover:bg-accent-blue hover:text-white transition-colors cursor-pointer"
                        aria-label={`Add position to ${trade.symbol}`}
                        title="Add Position (Average)"
                        onClick={() => openTradeModal({
                          symbol: trade.symbol,
                          strategy: trade.strategy,
                          entryPrice: trade.entryPrice,
                          size: trade.size,
                        })}
                      >
                        <Plus size={16} strokeWidth={2.5} />
                      </button>
                    ) : (
                      <span className="text-text-tertiary" aria-hidden="true">—</span>
                    )}
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
        
        {/* Empty State */}
        {filteredData.length === 0 && (
          <div className="flex flex-col items-center justify-center p-16 text-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-bg-tertiary text-text-tertiary">
              <SearchX size={24} strokeWidth={1.5} />
            </div>
            <p className="text-sm font-semibold text-text-secondary">No trades found</p>
            <p className="text-xs text-text-tertiary max-w-[240px]">
              There are no trades matching the "{filter}" filter. Try selecting a different category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
