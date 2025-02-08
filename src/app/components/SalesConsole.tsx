// app/sales-console/SalesConsole.tsx
"use client";

import { useEffect, useState } from "react";

type Sale = {
  id: number;
  item: string;
  quantity: number;
  price: string;
  timestamp: string;
};

const SalesConsole = () => {
  const [sales, setSales] = useState<Sale[]>([]);

  useEffect(() => {
    // Connect to the SSE endpoint
    const eventSource = new EventSource("/api/socket");

    eventSource.onmessage = (event) => {
      try {
        const sale: Sale = JSON.parse(event.data);
        // Prepend the new sale and keep only the latest 5 records
        setSales((prevSales) => [sale, ...prevSales].slice(0, 5));
      } catch (error) {
        console.error("Error parsing sale data:", error);
      }
    };

    eventSource.onerror = (error) => {
      console.error("EventSource failed:", error);
      eventSource.close();
    };

    // Clean up the connection when the component unmounts
    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div className="p-4 bg-gray-900 text-white rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-3">Live Sales Console</h2>
      <div className="overflow-auto h-60 border border-gray-700 p-2">
        {sales.length === 0 ? (
          <p className="text-gray-400">Waiting for sales data...</p>
        ) : (
          sales.map((sale) => (
            <div key={sale.id} className="p-2 bg-gray-800 mb-2 rounded">
              <p>
                <span className="text-green-400">#{sale.id}</span> - {sale.item} ({sale.quantity}) - 
                <span className="text-yellow-400"> ${sale.price}</span>
              </p>
              <p className="text-sm text-gray-500">{sale.timestamp}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SalesConsole;
