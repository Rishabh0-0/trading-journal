import { create } from 'zustand';

/**
 * Global application store using Zustand.
 * Keeps sidebar state and active navigation.
 */
const useAppStore = create((set) => ({
  // Sidebar
  sidebarOpen: true,
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),

  // Active page / route
  activePage: 'dashboard',
  setActivePage: (page) => set({ activePage: page }),
}));

export default useAppStore;
