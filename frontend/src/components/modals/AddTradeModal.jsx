import React, { useState, useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { motion, AnimatePresence } from 'framer-motion';
import { X, TrendingUp, Calendar, Hash, IndianRupee, BarChart3, Layers } from 'lucide-react';
import useAppStore from '../../store/useAppStore';
import { cn } from '../../lib/utils';
import { calculateDhanEquityDeliveryCharges } from '../../lib/calculator';

const STRATEGY_MAP = {
  'Trendline Breakout': 'TRENDINE_BREAKOUT',
  'Mean Reversion': 'MEAN_REVERSION',
  'Trend Following': 'TREND_FOLLOWING',
  'Option Buying': 'OPTION_BUYING',
};

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const contentVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: { 
    opacity: 1, scale: 1, y: 0,
    transition: { type: 'spring', stiffness: 350, damping: 30, mass: 0.8 }
  },
  exit: { opacity: 0, scale: 0.97, y: 10, transition: { duration: 0.15 } },
};

/**
 * FormField — Reusable input row with icon, label, and input.
 */
function FormField({ icon: Icon, label, children, className }) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <label className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-text-tertiary">
        <Icon size={12} />
        {label}
      </label>
      {children}
    </div>
  );
}

/**
 * AddTradeModal — Premium slide-up modal for creating a new trade or adding to a position.
 */
export default function AddTradeModal() {
  const { tradeModalOpen, tradeModalPrefill, closeTradeModal, triggerRefresh } = useAppStore();

  // Form state
  const [symbol, setSymbol] = useState('');
  const [strategy, setStrategy] = useState('');
  const [entryDate, setEntryDate] = useState('');
  const [size, setSize] = useState('');
  const [entryPrice, setEntryPrice] = useState('');
  const [charges, setCharges] = useState('');
  const [notes, setNotes] = useState('');

  // Determine mode
  const isAveraging = tradeModalPrefill !== null;

  // Reset / prefill form when modal opens
  useEffect(() => {
    if (tradeModalOpen) {
      if (tradeModalPrefill) {
        setSymbol(tradeModalPrefill.symbol || '');
        setStrategy(tradeModalPrefill.strategy || '');
        setEntryPrice('');
        setSize('');
        setCharges('');
        setNotes('');
        // Default to today
        setEntryDate(new Date().toISOString().split('T')[0]);
      } else {
        setSymbol('');
        setStrategy('');
        setEntryPrice('');
        setSize('');
        setCharges('');
        setNotes('');
        setEntryDate(new Date().toISOString().split('T')[0]);
      }
    }
  }, [tradeModalOpen, tradeModalPrefill]);

  // Auto-calculate charges when price or size changes
  useEffect(() => {
    if (entryPrice && size) {
      const p = parseFloat(entryPrice);
      const q = parseInt(size, 10);
      if (!isNaN(p) && !isNaN(q)) {
        const calc = calculateDhanEquityDeliveryCharges(p, q, 'BUY');
        setCharges(calc.toString());
      }
    }
  }, [entryPrice, size]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    
    // Map the selected display strategy to the backend enum
    const backendStrategy = STRATEGY_MAP[strategy] || 'TREND_FOLLOWING';

    const tradeData = {
      symbol: symbol.toUpperCase(),
      strategy: backendStrategy,
      entryDate,
      positionSize: parseInt(size, 10),
      entryPrice: parseFloat(entryPrice),
      charges: parseFloat(charges) || 0,
      // notes and isAveraging are omitted as they are not currently in TradeRequestDTO
    };
    
    try {
      const response = await fetch('http://localhost:8080/api/trades', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(tradeData)
      });
      
      if (!response.ok) {
        throw new Error('Failed to add trade');
      }
      
      triggerRefresh();
      closeTradeModal();
    } catch (error) {
      console.error('Error adding trade:', error);
      alert('Error adding trade: ' + error.message);
    }
  };

  const inputClasses = "w-full rounded-xl border border-border-default bg-bg-input px-3.5 py-2.5 text-sm font-medium text-text-primary placeholder:text-text-tertiary/60 focus:outline-none focus:border-accent-blue focus:ring-2 focus:ring-accent-blue/10 transition-all";

  return (
    <Dialog.Root open={tradeModalOpen} onOpenChange={(open) => !open && closeTradeModal()}>
      <AnimatePresence>
        {tradeModalOpen && (
          <Dialog.Portal forceMount>
            {/* Overlay */}
            <Dialog.Overlay asChild>
              <motion.div
                className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm"
                variants={overlayVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                transition={{ duration: 0.2 }}
              />
            </Dialog.Overlay>

            {/* Content */}
            <Dialog.Content asChild>
              <motion.div
                className="fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-border-default bg-bg-secondary shadow-2xl overflow-hidden"
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {/* Header with gradient accent */}
                <div className="relative px-6 pt-6 pb-4">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent-blue to-accent-green rounded-t-2xl" />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Dialog.Title className="text-lg font-bold text-text-primary">
                        {isAveraging ? `Add to ${tradeModalPrefill?.symbol}` : 'New Trade'}
                      </Dialog.Title>
                      <Dialog.Description className="text-xs text-text-secondary mt-0.5">
                        {isAveraging 
                          ? `Average into your existing ${tradeModalPrefill?.symbol} position`
                          : 'Log a new cash trade to your journal'
                        }
                      </Dialog.Description>
                    </div>
                    
                    <Dialog.Close asChild>
                      <button className="flex h-8 w-8 items-center justify-center rounded-lg text-text-tertiary hover:bg-bg-tertiary hover:text-text-primary transition-colors cursor-pointer" aria-label="Close dialog">
                        <X size={18} />
                      </button>
                    </Dialog.Close>
                  </div>

                  {/* Averaging badge */}
                  {isAveraging && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-3 flex items-center gap-2 rounded-lg bg-accent-blue-muted px-3 py-2"
                    >
                      <Layers size={14} className="text-accent-blue" />
                      <span className="text-[11px] font-semibold text-accent-blue">
                        Adding position to existing {tradeModalPrefill?.strategy} trade
                      </span>
                    </motion.div>
                  )}
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="px-6 pb-6 space-y-4">
                  {/* Row 1: Symbol & Strategy */}
                  <div className="grid grid-cols-2 gap-4">
                    <FormField icon={TrendingUp} label="Symbol">
                      <input
                        type="text"
                        value={symbol}
                        onChange={(e) => setSymbol(e.target.value)}
                        placeholder="e.g. RELIANCE"
                        className={cn(inputClasses, "uppercase")}
                        required
                        disabled={isAveraging}
                        autoFocus={!isAveraging}
                      />
                    </FormField>

                    <FormField icon={BarChart3} label="Strategy">
                      <select
                        value={strategy}
                        onChange={(e) => setStrategy(e.target.value)}
                        className={cn(inputClasses, "cursor-pointer appearance-none")}
                        required
                        disabled={isAveraging}
                      >
                        <option value="" disabled>Select strategy</option>
                        {Object.keys(STRATEGY_MAP).map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </FormField>
                  </div>

                  {/* Row 2: Entry Date & Position Size */}
                  <div className="grid grid-cols-2 gap-4">
                    <FormField icon={Calendar} label="Entry Date">
                      <input
                        type="date"
                        value={entryDate}
                        onChange={(e) => setEntryDate(e.target.value)}
                        className={cn(inputClasses, "cursor-pointer")}
                        required
                      />
                    </FormField>

                    <FormField icon={Hash} label="Position Size (Qty)">
                      <input
                        type="number"
                        value={size}
                        onChange={(e) => setSize(e.target.value)}
                        placeholder="e.g. 100"
                        className={inputClasses}
                        min="1"
                        required
                        autoFocus={isAveraging}
                      />
                    </FormField>
                  </div>

                  {/* Row 3: Entry Price & Brokerage */}
                  <div className="grid grid-cols-2 gap-4">
                    <FormField icon={IndianRupee} label="Entry Price">
                      <input
                        type="number"
                        value={entryPrice}
                        onChange={(e) => setEntryPrice(e.target.value)}
                        placeholder="e.g. 2850.50"
                        className={inputClasses}
                        step="0.01"
                        min="0"
                        required
                      />
                    </FormField>

                    <FormField icon={IndianRupee} label="Charges">
                      <input
                        type="number"
                        value={charges}
                        onChange={(e) => setCharges(e.target.value)}
                        placeholder="e.g. 120.00"
                        className={inputClasses}
                        step="0.01"
                        min="0"
                      />
                    </FormField>
                  </div>

                  {/* Notes */}
                  <FormField icon={BarChart3} label="Notes (optional)">
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Reason for entry, target, stop loss..."
                      className={cn(inputClasses, "resize-none h-20")}
                      rows={3}
                    />
                  </FormField>

                  {/* Actions */}
                  <div className="flex items-center justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={closeTradeModal}
                      className="px-4 py-2.5 text-sm font-semibold text-text-secondary hover:text-text-primary hover:bg-bg-tertiary rounded-xl transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 text-sm font-bold text-white rounded-xl bg-gradient-to-r from-accent-blue to-accent-green hover:shadow-lg hover:shadow-accent-blue/20 transition-all cursor-pointer"
                    >
                      {isAveraging ? 'Add Position' : 'Log Trade'}
                    </button>
                  </div>
                </form>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
