import React from 'react';
import useAppStore from './store/useAppStore';
import AppLayout from './components/layout/AppLayout';
import DashboardPage from './pages/DashboardPage';
import TradeHistoryPage from './pages/TradeHistoryPage';

/**
 * Root App component.
 * Uses Zustand-based page switching (will migrate to react-router if needed later).
 */
export default function App() {
  const { activePage } = useAppStore();

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <DashboardPage />;
      case 'history':
        return <TradeHistoryPage />;
      case 'addTrade':
        // Will be a modal in Phase 5, placeholder for now
        return <DashboardPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <AppLayout >
      {renderPage()}
    </AppLayout>
  );
}