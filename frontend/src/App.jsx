import React from 'react';
import useAppStore from './store/useAppStore';
import AppLayout from './components/layout/AppLayout';
import DashboardPage from './pages/DashboardPage';
import TradesPage from './pages/TradesPage';
import AddTradeModal from './components/modals/AddTradeModal';
import ExitTradeModal from './components/modals/ExitTradeModal';

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
      case 'trades':
        return <TradesPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <>
      <AppLayout>
        {renderPage()}
      </AppLayout>
      <AddTradeModal />
      <ExitTradeModal />
    </>
  );
}