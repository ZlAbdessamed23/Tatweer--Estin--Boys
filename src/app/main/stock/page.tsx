/* eslint-disable */

"use client"

import { useEffect, useState } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import DynamicTable from "./component/DynamicTable"
import { FaChevronDown } from 'react-icons/fa';

interface ChartData {
  year: string
  value1: number
  value2: number
}

interface StockData {
  id: string
  name: string
  left: string
  need: string
  number: string
  status: string
}

// Transform the API data into the required format
const transformStockData = (apiData: any[]): StockData[] => {
  return apiData.map(stock => ({
    id: stock.stock_id.toString() + ".",
    name: stock.ticker,
    left: stock.open_price,
    need: stock.close_price,
    number: stock.volume,
    status: parseFloat(stock.close_price) > parseFloat(stock.open_price) ? "working" : "Absent"
  }))
}

const employeeData = [
  {
    id: "00001",
    name: "Christine Brooks",
    address: "089 Kutch Green Apt. 448",
    email: "christine@example.com",
    phone: "555-0123",
    status: "Absent",
  },
  {
    id: "00002",
    name: "Rosie Pearson",
    address: "979 Immanuel Ferry Suite 526",
    email: "rosie@example.com",
    phone: "555-0124",
    status: "Working",
  },
]

const chartData: ChartData[] = [
  { year: "2016", value1: 10000, value2: 15000 },
  { year: "2017", value1: 25000, value2: 20000 },
  { year: "2018", value1: 15000, value2: 30000 },
]

const generateConfig = <T extends Record<string, any>>(data: T[]): Array<keyof T> => {
  return data.length > 0 ? (Object.keys(data[0]) as Array<keyof T>) : []
}

export default function StockDashboard() {
  const [SupaUrl, setSupaUrl] = useState('');
  const [tableName, setTableName] = useState('');
  const [dataFromDatabase, setDataFromDatabase] = useState<any[]>([]);
  const [stockData, setStockData] = useState<StockData[]>([]);
  
  const [stockConfig, setStockConfig] = useState<(keyof StockData)[]>([])
  const [employeeConfig, setEmployeeConfig] = useState<(keyof (typeof employeeData)[0])[]>(generateConfig(employeeData))
  const [stockDropdownOpen, setStockDropdownOpen] = useState(false)
  const [employeeDropdownOpen, setEmployeeDropdownOpen] = useState(false)

  useEffect(() => {
    const fetchDepartmentData = async () => {
      try {
        const response = await fetch("/api/main/departments/marketing");

        if (!response.ok) {
          throw new Error("Failed to fetch department data");
        }

        const data = await response.json();
        const connectionString = data.Department.departmentConnections[0].databaseConnectionConnectionString;
        const lastSlashIndex = connectionString.lastIndexOf("/");
        const databaseUrl = connectionString.substring(0, lastSlashIndex);
        const extractedTableName = connectionString.substring(lastSlashIndex + 1);

        setSupaUrl(databaseUrl);
        setTableName(extractedTableName);

        await fetchDatabaseData(databaseUrl, extractedTableName);
      } catch (error: any) {
        console.error("Error fetching department data:", error.message);
      }
    };

    const fetchDatabaseData = async (databaseUrl: string, tableName: string) => {
      try {
        const requestData = { databaseUrl, tableName };
        const response = await fetch("/api/main/externConnection/extractDataBase", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data from the database");
        }

        const data = await response.json();
        setDataFromDatabase(data.data);
        const transformedData = transformStockData(data.data);
        setStockData(transformedData);
        setStockConfig(generateConfig(transformedData));
      } catch (error: any) {
        console.error("Error fetching data from database:", error.message);
      }
    };

    fetchDepartmentData();
  }, []);

  const stockFormatters = {
    number: (value: string) => <span className="font-mono">{value}</span>,
  }

  const handleStockConfigChange = (column: keyof StockData) => {
    setStockConfig((prevConfig) =>
      prevConfig.includes(column) ? prevConfig.filter((item) => item !== column) : [...prevConfig, column],
    )
  }

  const handleEmployeeConfigChange = (column: keyof (typeof employeeData)[0]) => {
    setEmployeeConfig((prevConfig) =>
      prevConfig.includes(column) ? prevConfig.filter((item) => item !== column) : [...prevConfig, column],
    )
  }

  const DropdownCheckbox = ({
    label,
    checked,
    onChange,
  }: {
    label: string
    checked: boolean
    onChange: () => void
  }) => (
    <label className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="form-checkbox h-5 w-5 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
      />
      <span className="text-sm text-gray-700">{label}</span>
    </label>
  )

  return (
    <div className="p-6 max-w-full mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Stock Dashboard</h1>
      </div>

      {/* Stock Table Config Dropdown */}
      <div className="mb-4 relative">
        <button
          onClick={() => setStockDropdownOpen(!stockDropdownOpen)}
          className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Select Stock Table Columns
          <FaChevronDown className={`ml-2 h-5 w-5 text-gray-400 ${stockDropdownOpen ? "transform rotate-180" : ""}`} />
        </button>
        {stockDropdownOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg">
            <div className="py-1">
              {generateConfig(stockData).map((key) => (
                <DropdownCheckbox
                  key={key}
                  label={key}
                  checked={stockConfig.includes(key)}
                  onChange={() => handleStockConfigChange(key)}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <DynamicTable
          data={stockData}
          title="Stock Statistics"
          config={stockConfig}
          customFormatters={stockFormatters}
        />

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Stock Predictions</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis tickFormatter={(value) => `$${value.toLocaleString()}`} />
                <Line type="monotone" dataKey="value1" stroke="#9333ea" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="value2" stroke="#2dd4bf" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Employee Table Config Dropdown */}
      <div className="mb-4 relative">
        <button
          onClick={() => setEmployeeDropdownOpen(!employeeDropdownOpen)}
          className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Select Employee Table Columns
          <FaChevronDown className={`ml-2 h-5 w-5 text-gray-400 ${employeeDropdownOpen ? "transform rotate-180" : ""}`} />
        </button>
        {employeeDropdownOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg">
            <div className="py-1">
              {generateConfig(employeeData).map((key) => (
                <DropdownCheckbox
                  key={key}
                  label={key}
                  checked={employeeConfig.includes(key)}
                  onChange={() => handleEmployeeConfigChange(key)}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <DynamicTable
        data={employeeData}
        title="Employee Information"
        config={employeeConfig}
        statusColors={{ positive: ["working", "active"], negative: ["absent", "inactive"] }}
      />
    </div>
  )
}

