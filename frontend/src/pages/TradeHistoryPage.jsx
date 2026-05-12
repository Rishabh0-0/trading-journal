import React from 'react';
import { motion } from 'framer-motion';
import { History } from 'lucide-react';

/**
 * Trade History page — will contain filterable trade log.
 * Currently a placeholder for Phase 1.
 */
export default function TradeHistoryPage() {
  return (
    <div className="space-y-6">
      <motion.div
        className="card-base flex flex-col items-center justify-center gap-4 p-12"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-accent-purple/10">
          <History size={32} className="text-accent-purple" />
        </div>
        <h2 className="text-xl font-semibold text-text-primary">
          Trade History
        </h2>
        <p className="max-w-md text-center text-sm text-text-secondary">
          Your complete trade log with filtering, sorting, and detailed breakdowns
          will be built in a future phase.
        </p>
      </motion.div>
    </div>
  );
}
