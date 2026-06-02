import React, { useEffect, useState } from 'react';
import TradesTable from '../components/history/TradesTable';
import { statsData } from '../data/mockData';

/**
 * Trades page — Full trade log and details.
 */
export default function TradesPage() {

  const [trades, setTrades] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/trades")
      .then(response => response.json()).then(data => {
        setTrades(data)
      })
      .catch(error => console.error("Error fetching trades:", error));
  }, [])

  return (
    <div className="flex flex-col h-full gap-6 pb-6">
      <div className="flex-1 min-h-0">
        <TradesTable data={trades} />
      </div>
    </div>
  );
}
