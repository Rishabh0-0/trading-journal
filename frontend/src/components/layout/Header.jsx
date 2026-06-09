import React, { useState, useRef, useEffect } from 'react';
import { User, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import useAppStore from '../../store/useAppStore';

export default function Header() {
  const { logout } = useAppStore();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="flex h-14 shrink-0 items-center justify-end border-b border-border-default px-6">
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-bg-tertiary text-text-secondary transition-colors hover:bg-border-default hover:text-text-primary focus:outline-none"
          aria-label="Profile menu"
        >
          <User size={18} strokeWidth={2.5} />
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute right-0 top-full z-50 mt-2 w-48 origin-top-right rounded-xl border border-border-default bg-bg-secondary p-1.5 shadow-lg shadow-black/5"
            >
              <div className="px-2.5 py-2 text-[11px] font-bold uppercase tracking-wider text-text-tertiary">
                My Account
              </div>
              <div className="my-1 h-px w-full bg-border-default" />
              <button
                onClick={() => {
                  setIsOpen(false);
                  logout();
                }}
                className="flex w-full cursor-pointer items-center gap-2 rounded-lg px-2.5 py-2 text-sm font-semibold text-red-500 transition-colors hover:bg-red-500/10 focus:outline-none"
              >
                <LogOut size={16} />
                Sign Out
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
