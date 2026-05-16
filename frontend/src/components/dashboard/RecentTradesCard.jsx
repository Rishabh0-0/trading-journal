import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight, History } from 'lucide-react';
import { cn } from '../../lib/utils';

const formatINR = (val) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(val);
};

/**
 * RecentTradesCard — Full-height right column card.
 * Stretches to match the combined height of all left-column rows.
 */
export default function RecentTradesCard({ trades, index = 0 }) {
  return (
    <motion.div
      className="card-base flex flex-col p-4 h-full"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-[10px] font-bold uppercase tracking-wider text-text-tertiary flex items-center gap-1.5">
          <History size={12} className="text-accent-blue" />
          Recent Trades
        </h3>
        <button className="text-[10px] font-bold text-accent-blue hover:underline cursor-pointer">
          View All
        </button>
      </div>

      {/* Trade list — flex-1 so it fills available space */}
      <div className="flex-1 flex flex-col gap-1 min-h-0 overflow-y-auto">
        {trades.map((trade, i) => (
          <motion.div
            key={trade.id}
            className="flex items-center justify-between rounded-xl px-2 py-2 transition-colors hover:bg-bg-hover group cursor-pointer"
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.5 + i * 0.04 }}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className={cn(
                "flex h-7 w-7 items-center justify-center rounded-lg shrink-0 transition-transform group-hover:scale-110",
                trade.status === 'PROFIT' ? "bg-accent-green/10 text-accent-green" : "bg-accent-red/10 text-accent-red"
              )}>
                {trade.status === 'PROFIT' ? <ArrowUpRight size={13} strokeWidth={2.5} /> : <ArrowDownRight size={13} strokeWidth={2.5} />}
              </div>
              <div className="min-w-0">
                <p className="text-[11px] font-bold text-text-primary truncate leading-tight">
                  {trade.symbol}
                </p>
                <p className="text-[9px] text-text-tertiary leading-tight">
                  {trade.date} · {trade.type}
                </p>
              </div>
            </div>
            <div className="text-right shrink-0 ml-2">
              <p className={cn(
                "text-[11px] font-bold tabular-nums",
                trade.status === 'PROFIT' ? "text-accent-green" : "text-accent-red"
              )}>
                {trade.pnl > 0 ? '+' : ''}{formatINR(trade.pnl)}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-3 pt-2.5 border-t border-border-default">
        <div className="flex items-center justify-between text-[10px]">
          <span className="text-text-tertiary font-medium">Daily Volume</span>
          <span className="font-bold text-text-primary">₹12.4L</span>
        </div>
      </div>
    </motion.div>
  );
}
