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
  activePage: 'trades',
  setActivePage: (page) => set({ activePage: page }),

  // Data refresh trigger
  refreshTrigger: 0,
  triggerRefresh: () => set((state) => ({ refreshTrigger: state.refreshTrigger + 1 })),

  // Trade Modal
  tradeModalOpen: false,
  tradeModalPrefill: null, // { symbol, strategy, entryPrice, size } for averaging
  openTradeModal: (prefill = null) => set({ tradeModalOpen: true, tradeModalPrefill: prefill }),
  closeTradeModal: () => set({ tradeModalOpen: false, tradeModalPrefill: null }),

  // Exit Trade Modal
  exitTradeModalOpen: false,
  exitTradeModalTrade: null,
  openExitTradeModal: (trade) => set({ exitTradeModalOpen: true, exitTradeModalTrade: trade }),
  closeExitTradeModal: () => set({ exitTradeModalOpen: false, exitTradeModalTrade: null }),

  // Auth State
  isAuthenticated: !!localStorage.getItem('token'),
  login: (token) => {
    localStorage.setItem('token', token);
    set({ isAuthenticated: true });
  },
  logout: () => {
    localStorage.removeItem('token');
    set({ isAuthenticated: false, activePage: 'trades' });
  },
}));

export default useAppStore;
