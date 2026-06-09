import React from 'react';
import useAppStore from './store/useAppStore';
import AppLayout from './components/layout/AppLayout';
import TradesPage from './pages/TradesPage';
import LoginPage from './pages/LoginPage';
import AddTradeModal from './components/modals/AddTradeModal';
import ExitTradeModal from './components/modals/ExitTradeModal';

/**
 * Root App component.
 * Uses Zustand-based page switching (will migrate to react-router if needed later).
 */
export default function App() {
  const { activePage, isAuthenticated } = useAppStore();

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  const renderPage = () => {
    switch (activePage) {
      case 'trades':
        return <TradesPage />;
      default:
        return <TradesPage />;
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