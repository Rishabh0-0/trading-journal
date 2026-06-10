import React, { useState, useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, IndianRupee, LogOut, Hash } from 'lucide-react';
import useAppStore from '../../store/useAppStore';
import { cn } from '../../lib/utils';

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

export default function ExitTradeModal() {
  const { exitTradeModalOpen, exitTradeModalTrade, closeExitTradeModal, triggerRefresh } = useAppStore();

  const [exitDate, setExitDate] = useState('');
  const [exitPrice, setExitPrice] = useState('');
  const [exitQuantity, setExitQuantity] = useState('');
  const [brokerage, setBrokerage] = useState('');

  useEffect(() => {
    if (exitTradeModalOpen) {
      setExitDate(new Date().toISOString().split('T')[0]);
      setExitPrice('');
      setBrokerage('');
      setExitQuantity(exitTradeModalTrade?.positionSize?.toString() || '');
    }
  }, [exitTradeModalOpen, exitTradeModalTrade]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    
    const tradeData = {
      exitDate,
      exitPrice: parseFloat(exitPrice),
      brokerage: parseFloat(brokerage) || 0,
    };
    
    try {
      const response = await fetch(`http://localhost:8080/api/trades/${exitTradeModalTrade.id}/close`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(tradeData)
      });
      
      if (!response.ok) {
        throw new Error('Failed to close trade');
      }
      
      triggerRefresh();
      closeExitTradeModal();
    } catch (error) {
      console.error('Error closing trade:', error);
      alert('Error closing trade: ' + error.message);
    }
  };

  const inputClasses = "w-full rounded-xl border border-border-default bg-bg-input px-3.5 py-2.5 text-sm font-medium text-text-primary placeholder:text-text-tertiary/60 focus:outline-none focus:border-accent-blue focus:ring-2 focus:ring-accent-blue/10 transition-all";

  const currentQty = parseInt(exitQuantity, 10) || 0;
  const isPartial = exitTradeModalTrade && currentQty > 0 && currentQty < exitTradeModalTrade.positionSize;

  return (
    <Dialog.Root open={exitTradeModalOpen} onOpenChange={(open) => !open && closeExitTradeModal()}>
      <AnimatePresence>
        {exitTradeModalOpen && (
          <Dialog.Portal forceMount>
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

            <Dialog.Content asChild>
              <motion.div
                className="fixed left-1/2 top-1/2 z-50 w-full max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-border-default bg-bg-secondary shadow-2xl overflow-hidden"
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <div className="relative px-6 pt-6 pb-4">
                  <div className={cn(
                    "absolute top-0 left-0 right-0 h-1 rounded-t-2xl transition-colors duration-300",
                    isPartial ? "bg-gradient-to-r from-accent-amber to-accent-blue" : "bg-gradient-to-r from-accent-red to-accent-amber"
                  )} />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Dialog.Title className="text-lg font-bold text-text-primary">
                        Close Position
                      </Dialog.Title>
                      <Dialog.Description className="text-xs text-text-secondary mt-0.5">
                        Exit your {exitTradeModalTrade?.symbol} trade
                      </Dialog.Description>
                    </div>
                    
                    <Dialog.Close asChild>
                      <button className="flex h-8 w-8 items-center justify-center rounded-lg text-text-tertiary hover:bg-bg-tertiary hover:text-text-primary transition-colors cursor-pointer" aria-label="Close dialog">
                        <X size={18} />
                      </button>
                    </Dialog.Close>
                  </div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn(
                      "mt-3 flex items-center gap-2 rounded-lg px-3 py-2 transition-colors duration-300",
                      isPartial ? "bg-accent-amber-muted" : "bg-accent-red-muted"
                    )}
                  >
                    <LogOut size={14} className={isPartial ? "text-accent-amber" : "text-accent-red"} />
                    <span className={cn("text-[11px] font-semibold", isPartial ? "text-accent-amber" : "text-accent-red")}>
                      {isPartial 
                        ? `Partial Exit: Closing ${currentQty} of ${exitTradeModalTrade?.positionSize} units`
                        : `Full Exit: Closing all ${exitTradeModalTrade?.positionSize} units`
                      }
                    </span>
                  </motion.div>
                </div>

                <form onSubmit={handleSubmit} className="px-6 pb-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField icon={Hash} label="Exit Quantity">
                      <input
                        type="number"
                        value={exitQuantity}
                        onChange={(e) => setExitQuantity(e.target.value)}
                        placeholder={`Max ${exitTradeModalTrade?.positionSize}`}
                        className={inputClasses}
                        min="1"
                        max={exitTradeModalTrade?.positionSize}
                        required
                      />
                    </FormField>

                    <FormField icon={Calendar} label="Exit Date">
                      <input
                        type="date"
                        value={exitDate}
                        onChange={(e) => setExitDate(e.target.value)}
                        className={cn(inputClasses, "cursor-pointer")}
                        required
                      />
                    </FormField>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <FormField icon={IndianRupee} label="Exit Price">
                      <input
                        type="number"
                        value={exitPrice}
                        onChange={(e) => setExitPrice(e.target.value)}
                        placeholder="e.g. 2900.00"
                        className={inputClasses}
                        step="0.01"
                        min="0"
                        required
                        autoFocus
                      />
                    </FormField>

                    <FormField icon={IndianRupee} label="Exit Brokerage">
                      <input
                        type="number"
                        value={brokerage}
                        onChange={(e) => setBrokerage(e.target.value)}
                        placeholder="e.g. 150.00"
                        className={inputClasses}
                        step="0.01"
                        min="0"
                      />
                    </FormField>
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={closeExitTradeModal}
                      className="px-4 py-2.5 text-sm font-semibold text-text-secondary hover:text-text-primary hover:bg-bg-tertiary rounded-xl transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className={cn(
                        "px-6 py-2.5 text-sm font-bold text-white rounded-xl hover:shadow-lg transition-all cursor-pointer",
                        isPartial 
                          ? "bg-gradient-to-r from-accent-amber to-accent-blue hover:shadow-accent-amber/20" 
                          : "bg-gradient-to-r from-accent-red to-accent-amber hover:shadow-accent-red/20"
                      )}
                    >
                      {isPartial ? 'Partial Exit' : 'Full Exit'}
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
