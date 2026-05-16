import React from 'react';
import { motion } from 'framer-motion';
import useAppStore from '../../store/useAppStore';
import Sidebar from './Sidebar';
import Header from './Header';

/**
 * AppLayout — Root layout shell.
 * Contains the sidebar, header, and main content area.
 * Main content area adjusts its left margin based on sidebar state.
 */
export default function AppLayout({ children }) {
  const { sidebarOpen } = useAppStore();

  return (
    <div className="flex h-screen bg-bg-primary bg-grid-pattern p-3 gap-3 overflow-hidden">
      <Sidebar />

      <motion.div
        className="flex flex-1 flex-col overflow-hidden rounded-3xl border border-border-default bg-bg-secondary/50 backdrop-blur-sm shadow-sm"
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <Header />

        <main className="flex-1 overflow-y-auto p-6">
          <motion.div
            className="h-full flex flex-col"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            {children}
          </motion.div>
        </main>
      </motion.div>
    </div>
  );
}
