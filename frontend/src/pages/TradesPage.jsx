import React, { useEffect, useState } from 'react';
import TradesTable from '../components/history/TradesTable';

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

  return <TradesTable data={trades} />;
}
