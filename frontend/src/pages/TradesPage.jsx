import React, { useEffect, useState } from 'react';
import TradesTable from '../components/history/TradesTable';
import useAppStore from '../store/useAppStore';

/**
 * Trades page — Full trade log and details.
 */
export default function TradesPage() {
  const { logout } = useAppStore();
  const [trades, setTrades] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    fetch("http://localhost:8080/api/trades", {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        if (response.status === 401) {
          logout();
          throw new Error('Unauthorized');
        }
        return response.json();
      })
      .then(data => {
        if (data && Array.isArray(data.content)) {
          setTrades(data.content);
        } else if (Array.isArray(data)) {
          setTrades(data);
        } else {
          setTrades([]);
        }
      })
      .catch(error => console.error("Error fetching trades:", error));
  }, [logout])

  return <TradesTable data={trades} />;
}
