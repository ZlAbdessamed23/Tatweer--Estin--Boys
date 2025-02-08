"use client";

import React from 'react';
import { BaseRecord, DynamicTableProps } from './types';

const DEFAULT_STATUS_COLORS = {
  positive: ['working', 'active', 'available', 'completed', 'approved'],
  negative: ['absent', 'inactive', 'unavailable', 'pending', 'rejected']
};

function DynamicTable<T extends BaseRecord>({
  data,
  config,
  title,
  statusColors = DEFAULT_STATUS_COLORS,
  customFormatters
}: DynamicTableProps<T>) {
  if (!data || data.length === 0) {
    return <p className="text-gray-500">No data available</p>;
  }

  const headers = config || (Object.keys(data[0]) as (keyof T)[]);

  const renderCell = (item: T, header: keyof T): React.ReactNode => {
    const value = item[header];

    // Use custom formatter if provided
    if (customFormatters?.[header]) {
      return customFormatters[header]!(value);
    }

    // Handle status-like fields
    if (
      typeof value === 'string' &&
      (String(header).toLowerCase().includes('status') || String(header).toLowerCase().includes('state'))
    ) {
      const isPositive = statusColors.positive.includes(value.toLowerCase());
      const isNegative = statusColors.negative.includes(value.toLowerCase());

      if (isPositive || isNegative) {
        return (
          <span
            className={`px-2 py-1 rounded text-xs font-medium ${isPositive ? 'bg-pink-100 text-pink-600' : 'bg-red-100 text-red-600'
              }`}
          >
            {value}
          </span>
        );
      }
    }

    // Handle different types
    switch (typeof value) {
      case 'number':
        return value.toLocaleString();
      case 'boolean':
        return value ? 'Yes' : 'No';
      case 'object':
        return value === null ? '-' : JSON.stringify(value);
      case 'undefined':
        return '-';
      default:
        return value;
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      {title && <h2 className="text-xl font-semibold text-main-blue mb-4">{title}</h2>}
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-gray-200">
              {headers.map((header) => (
                <th key={String(header)} className="text-left py-3 px-4 font-semibold text-sm text-gray-600">
                  {String(header).toUpperCase()}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={item.id || index} className="border-b border-gray-100 hover:bg-gray-50">
                {headers.map((header) => (
                  <td key={`${item.id || index}-${String(header)}`} className="py-3 px-4 text-sm">
                    {renderCell(item, header)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DynamicTable;