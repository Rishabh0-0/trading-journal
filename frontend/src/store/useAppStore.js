import { create } from 'zustand';

/**
 * Global application store using Zustand.
 * Keeps sidebar state, active navigation, and modal state.
 */
const useAppStore = create((set) => ({
  // Sidebar
  sidebarOpen: false,
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),

  // Active page / route
  activePage: 'dashboard',
  setActivePage: (page) => set({ activePage: page }),

  // Trade Modal
  tradeModalOpen: false,
  tradeModalPrefill: null, // { symbol, strategy, entryPrice, size } for averaging
  openTradeModal: (prefill = null) => set({ tradeModalOpen: true, tradeModalPrefill: prefill }),
  closeTradeModal: () => set({ tradeModalOpen: false, tradeModalPrefill: null }),
}));

export default useAppStore;
