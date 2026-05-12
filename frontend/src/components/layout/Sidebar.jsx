import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  History,
  PlusCircle,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';
import useAppStore from '../../store/useAppStore';
import { cn } from '../../lib/utils';

const navItems = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
  },
  {
    id: 'history',
    label: 'Trade History',
    icon: History,
  },
];

function NavItem({ item, isActive, collapsed, onClick }) {
  const Icon = item.icon;

  return (
    <motion.button
      onClick={onClick}
      className={cn(
        'group relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 focus-ring cursor-pointer',
        collapsed && 'justify-center px-0',
        isActive
          ? 'bg-accent-blue/10 text-accent-blue'
          : 'text-text-secondary hover:bg-bg-hover hover:text-text-primary'
      )}
      whileHover={{ x: collapsed ? 0 : 2 }}
      whileTap={{ scale: 0.97 }}
    >
      {/* Active indicator bar */}
      {isActive && (
        <motion.div
          layoutId="activeNav"
          className="absolute left-0 top-1/2 h-6 w-[3px] -translate-y-1/2 rounded-r-full bg-accent-blue"
          style={{ boxShadow: '0 0 12px rgba(0, 212, 255, 0.5)' }}
          transition={{ type: 'spring', stiffness: 350, damping: 30 }}
        />
      )}

      <div className={cn('relative flex-shrink-0', isActive && 'glow-blue')}>
        <Icon size={20} strokeWidth={isActive ? 2 : 1.5} />
      </div>

      <AnimatePresence mode="wait">
        {!collapsed && (
          <motion.span
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: 'auto' }}
            exit={{ opacity: 0, width: 0 }}
            transition={{ duration: 0.2 }}
            className="whitespace-nowrap overflow-hidden"
          >
            {item.label}
          </motion.span>
        )}
      </AnimatePresence>

      {/* Tooltip for collapsed state */}
      {collapsed && (
        <div className="absolute left-full ml-3 hidden rounded-lg bg-bg-tertiary px-3 py-1.5 text-xs font-medium text-text-primary shadow-lg group-hover:block border border-border-default z-50">
          {item.label}
        </div>
      )}
    </motion.button>
  );
}

export default function Sidebar() {
  const { sidebarOpen, toggleSidebar, activePage, setActivePage } = useAppStore();

  return (
    <motion.aside
      className={cn(
        'relative z-40 flex h-screen flex-col border-r border-border-default bg-bg-sidebar',
        'transition-all duration-300 ease-in-out'
      )}
      animate={{ width: sidebarOpen ? 240 : 72 }}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {/* ── Logo Area ─────────────────────────────────── */}
      <div className="flex h-16 items-center gap-3 border-b border-border-default px-4">
        <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-accent-blue to-accent-green">
          <TrendingUp size={18} className="text-bg-primary" strokeWidth={2.5} />
        </div>
        <AnimatePresence mode="wait">
          {sidebarOpen && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <h1 className="text-base font-bold tracking-tight text-text-primary">
                Trade<span className="text-gradient">Vault</span>
              </h1>
              <p className="text-[10px] font-medium uppercase tracking-widest text-text-tertiary">
                Journal
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Navigation ────────────────────────────────── */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navItems.map((item) => (
          <NavItem
            key={item.id}
            item={item}
            isActive={activePage === item.id}
            collapsed={!sidebarOpen}
            onClick={() => setActivePage(item.id)}
          />
        ))}
      </nav>

      {/* ── Add Trade Button ──────────────────────────── */}
      <div className="px-3 pb-3">
        <motion.button
          onClick={() => setActivePage('addTrade')}
          className={cn(
            'group flex w-full items-center gap-2 rounded-xl bg-gradient-to-r from-accent-blue/20 to-accent-green/20 px-3 py-2.5 text-sm font-semibold text-accent-blue transition-all duration-200 hover:from-accent-blue/30 hover:to-accent-green/30 focus-ring cursor-pointer',
            !sidebarOpen && 'justify-center px-0'
          )}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          style={{
            border: '1px solid rgba(0, 212, 255, 0.15)',
            boxShadow: '0 0 20px rgba(0, 212, 255, 0.06)',
          }}
        >
          <PlusCircle size={20} className="flex-shrink-0 glow-blue" />
          <AnimatePresence mode="wait">
            {sidebarOpen && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2 }}
                className="whitespace-nowrap overflow-hidden"
              >
                Add New Trade
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* ── Collapse Toggle ───────────────────────────── */}
      <div className="border-t border-border-default px-3 py-3">
        <motion.button
          onClick={toggleSidebar}
          className="flex w-full items-center justify-center rounded-lg py-2 text-text-tertiary transition-colors hover:bg-bg-hover hover:text-text-secondary focus-ring cursor-pointer"
          whileTap={{ scale: 0.9 }}
          aria-label={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
        >
          {sidebarOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
        </motion.button>
      </div>
    </motion.aside>
  );
}
