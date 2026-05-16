import React from 'react';
import { motion } from 'framer-motion';
import useAppStore from '../../store/useAppStore';

/**
 * Top header bar — shows current page title and optional actions.
 * Adapts left padding based on sidebar collapsed state.
 */
export default function Header() {
  const { activePage } = useAppStore();

  const pageTitles = {
    dashboard: 'Dashboard',
    history: 'Trade History',
    addTrade: 'Add New Trade',
  };

  const pageDescriptions = {
    dashboard: 'Overview of your trading performance',
    history: 'Browse and filter your trade log',
    addTrade: 'Log a new trade entry',
  };

  return (
    <header className="flex h-16 items-center justify-between px-8 pt-4">
      <div>
        <motion.h2
          key={activePage}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="text-lg font-semibold text-text-primary"
        >
          {pageTitles[activePage] || 'Dashboard'}
        </motion.h2>
        <motion.p
          key={`desc-${activePage}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.05 }}
          className="text-xs text-text-tertiary"
        >
          {pageDescriptions[activePage] || ''}
        </motion.p>
      </div>

      {/* Right side — placeholder for future actions (notifications, profile, etc.) */}
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-accent-blue to-accent-green opacity-80" />
      </div>
    </header>
  );
}
