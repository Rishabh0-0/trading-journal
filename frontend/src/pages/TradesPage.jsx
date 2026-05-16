import React from 'react';
import TradesTable from '../components/history/TradesTable';
import { statsData } from '../data/mockData';

/**
 * Trades page — Full trade log and details.
 */
export default function TradesPage() {
  return (
    <div className="flex flex-col h-full gap-6 pb-6">
      <div className="flex-1 min-h-0">
        <TradesTable data={statsData.fullTradesList} />
      </div>
    </div>
  );
}
