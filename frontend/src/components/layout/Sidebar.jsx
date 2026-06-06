import React, { useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChartCandlestick,
  PlusCircle,
  CircleDollarSign,
} from 'lucide-react';
import useAppStore from '../../store/useAppStore';
import { cn } from '../../lib/utils';

const navItems = [
  {
    id: 'trades',
    label: 'Trades',
    icon: ChartCandlestick,
  },
];

/* ── Shared spring configs ────────────────────────────── */
const sidebarSpring = { type: 'spring', stiffness: 300, damping: 30, mass: 0.8 };
const labelSpring = { type: 'spring', stiffness: 400, damping: 32 };
const fadeConfig = { duration: 0.18, ease: 'easeOut' };

/* ── NavItem ──────────────────────────────────────────── */
function NavItem({ item, isActive, collapsed, onClick, index }) {
  const Icon = item.icon;

  return (
    <motion.button
      onClick={onClick}
      className={cn(
        'group relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium focus-ring cursor-pointer',
        isActive
          ? 'bg-accent-blue/10 text-accent-blue'
          : 'text-text-secondary hover:bg-bg-hover hover:text-text-primary'
      )}
      whileHover={{ x: collapsed ? 0 : 4, transition: { type: 'spring', stiffness: 500, damping: 25 } }}
      whileTap={{ scale: 0.96 }}
      transition={{ duration: 0.15 }}
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

      {/* Icon with smooth scale on expand/collapse */}
      <div className={cn('relative flex-shrink-0', isActive && 'glow-blue')}>
        <Icon size={20} strokeWidth={isActive ? 2 : 1.5} />
      </div>

      {/* Label — slides and fades in with staggered delay */}
      <AnimatePresence mode="wait">
        {!collapsed && (
          <motion.span
            initial={{ opacity: 0, x: -8, filter: 'blur(4px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, x: -8, filter: 'blur(4px)' }}
            transition={{
              ...labelSpring,
              delay: 0.04 + index * 0.03,
              opacity: { ...fadeConfig, delay: 0.04 + index * 0.03 },
              filter: { duration: 0.25, delay: 0.04 + index * 0.03 },
            }}
            className="whitespace-nowrap overflow-hidden"
          >
            {item.label}
          </motion.span>
        )}
      </AnimatePresence>

      {/* Tooltip for collapsed state — animated */}
      <AnimatePresence>
        {collapsed && (
          <motion.div
            initial={{ opacity: 0, x: -4, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -4, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="pointer-events-none absolute left-full ml-3 rounded-lg bg-bg-tertiary px-3 py-1.5 text-xs font-medium text-text-primary shadow-lg border border-border-default z-50 hidden group-hover:block"
          >
            {item.label}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

/* ── Sidebar ──────────────────────────────────────────── */
export default function Sidebar() {
  const { sidebarOpen, setSidebarOpen, activePage, setActivePage, openTradeModal } = useAppStore();
  const hoverTimeout = useRef(null);

  /* Debounced hover handlers to prevent flicker */
  const handleMouseEnter = useCallback(() => {
    clearTimeout(hoverTimeout.current);
    hoverTimeout.current = setTimeout(() => setSidebarOpen(true), 60);
  }, [setSidebarOpen]);

  const handleMouseLeave = useCallback(() => {
    clearTimeout(hoverTimeout.current);
    hoverTimeout.current = setTimeout(() => setSidebarOpen(false), 200);
  }, [setSidebarOpen]);

  return (
    <motion.aside
      className={cn(
        'relative z-40 flex h-full flex-col border border-border-default bg-bg-sidebar overflow-hidden rounded-3xl shadow-sm'
      )}
      animate={{ width: sidebarOpen ? 240 : 72 }}
      transition={sidebarSpring}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Subtle glow edge on expanded sidebar */}
      <motion.div
        className="pointer-events-none absolute inset-y-0 right-0 w-px"
        animate={{
          boxShadow: sidebarOpen
            ? '0 0 20px 2px rgba(0, 212, 255, 0.08)'
            : '0 0 0px 0px rgba(0, 212, 255, 0)',
        }}
        transition={{ duration: 0.5 }}
      />

      {/* ── Logo Area ─────────────────────────────────── */}
      <div className="flex h-16 items-center gap-3 px-4">
        <motion.div
          className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl"
          animate={{ rotate: sidebarOpen ? 0 : 0, scale: sidebarOpen ? 1 : 1.05 }}
          transition={labelSpring}
        >
          <CircleDollarSign size={28} strokeWidth={2.5} />
        </motion.div>
        <AnimatePresence mode="wait">
          {sidebarOpen && (
            <motion.div
              initial={{ opacity: 0, x: -12, filter: 'blur(6px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, x: -12, filter: 'blur(6px)' }}
              transition={{
                ...labelSpring,
                opacity: { ...fadeConfig, delay: 0.02 },
                filter: { duration: 0.3, delay: 0.02 },
              }}
              className="overflow-hidden"
            >
              <h1 className="text-base font-bold tracking-tight text-text-primary">
                Trade<span className="text-gradient">Vault</span>
              </h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.12, duration: 0.2 }}
                className="text-[10px] font-medium uppercase tracking-widest text-text-tertiary"
              >
                Journal
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Divider with fade */}
      <motion.div
        className="mx-6 h-px bg-border-default"
        animate={{ opacity: sidebarOpen ? 1 : 0.4, scaleX: sidebarOpen ? 1 : 0.5 }}
        transition={{ duration: 0.3 }}
      />

      {/* ── Navigation ────────────────────────────────── */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navItems.map((item, index) => (
          <NavItem
            key={item.id}
            item={item}
            isActive={activePage === item.id}
            collapsed={!sidebarOpen}
            onClick={() => setActivePage(item.id)}
            index={index}
          />
        ))}
      </nav>

      {/* ── Add Trade Button ──────────────────────────── */}
      <div className="px-3 pb-3">
        <motion.button
          onClick={() => openTradeModal()}
          aria-label="Add new trade"
          className={cn(
            'group flex w-full items-center gap-2 rounded-xl bg-gradient-to-r from-accent-blue/20 to-accent-green/20 px-3 py-2.5 text-sm font-semibold text-accent-blue hover:from-accent-blue/30 hover:to-accent-green/30 focus-ring cursor-pointer'
          )}
          whileHover={{ scale: 1.03, transition: { type: 'spring', stiffness: 400, damping: 20 } }}
          whileTap={{ scale: 0.96 }}
          style={{
            border: '1px solid rgba(0, 212, 255, 0.15)',
            boxShadow: '0 0 20px rgba(0, 212, 255, 0.06)',
          }}
        >
          <motion.div
            animate={{ rotate: sidebarOpen ? 0 : 90 }}
            transition={labelSpring}
            className="flex-shrink-0"
          >
            <PlusCircle size={20} className="glow-blue" />
          </motion.div>
          <AnimatePresence mode="wait">
            {sidebarOpen && (
              <motion.span
                initial={{ opacity: 0, x: -8, filter: 'blur(4px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: -8, filter: 'blur(4px)' }}
                transition={{
                  ...labelSpring,
                  delay: 0.08,
                  opacity: { ...fadeConfig, delay: 0.08 },
                  filter: { duration: 0.25, delay: 0.08 },
                }}
                className="whitespace-nowrap overflow-hidden"
              >
                Add New Trade
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

    </motion.aside>
  );
}
