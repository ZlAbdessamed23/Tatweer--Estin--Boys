"use client";

import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { FaLaptop, FaMobileAlt, FaClock } from "react-icons/fa";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";

interface Product {
  name: string;
  price: number;
  change: number;
  // These may or may not be returned from your API.
  bgColor?: string;
  iconColor?: string;
}

interface SalesData {
  month: string;
  amount: number;
}

interface LocationMarker {
  lng: number;
  lat: number;
  name: string;
  sales : number;
  growth : number;
}

// Helper function to normalize API responses into an array
function normalizeResponse<T>(response: unknown): T[] {
  if (Array.isArray(response)) {
    return response as T[];
  }
  if (response && Array.isArray((response as { data: unknown }).data)) {
    return (response as { data: unknown[] }).data as T[];
  }
  return [];
}

export default function SalesDashboard() {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [salesData, setSalesData] = useState<SalesData[]>([]);
  const [productsData, setProductsData] = useState<Product[]>([]);
  const [locationMarkers, setLocationMarkers] = useState<LocationMarker[]>([]);

  // Define a mapping from product names (or IDs) to icon components.
  const iconMapping: { [key: string]: React.ElementType } = {
    "iPhone 15 Pro": FaMobileAlt,
    "MacBook Air M2": FaLaptop,
    "Apple Watch Series 9": FaClock,
    "MacBook Pro 5": FaLaptop,
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const [productsResponse, salesPredictionResponse, wilayaSalesResponse] =
          await Promise.all([
            fetch("/api/sales/products").then((res) => res.json()),
            fetch("/api/sales/sales-prediction").then((res) => res.json()),
            fetch("/api/sales/wilaya-sales").then((res) => res.json()),
          ]);

        // Normalize each response to ensure we have arrays
        const products = normalizeResponse<Product>(productsResponse);
        const salesPrediction = normalizeResponse<SalesData>(salesPredictionResponse);
        const wilayaSales = normalizeResponse<LocationMarker>(wilayaSalesResponse);

        setProductsData(products);
        setSalesData(salesPrediction);
        setLocationMarkers(wilayaSales);
      } catch (error) {
        console.error("Failed to fetch sales data:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (!mapContainer.current) return;
  
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/navigation-day-v1",
      center: [4.16, 34.75],
      zoom: 2, // Start with a low zoom level
    });
  
    map.on("load", () => {
      map.flyTo({ zoom: 5.5, duration: 2000 }); // Animate zoom-in
    });
  
    locationMarkers.forEach(({ lng, lat, name, sales, growth }) => {
      const lngNum = typeof lng === "number" ? lng : parseFloat(lng);
      const latNum = typeof lat === "number" ? lat : parseFloat(lat);
  
      if (isNaN(lngNum) || isNaN(latNum)) {
        console.error(
          `Invalid coordinates for marker "${name}": lng=${lng}, lat=${lat}`
        );
        return;
      }
  
      // Create a popup with more details
      const popupContent = `
        <div style="font-size: 14px; font-family: Arial, sans-serif;">
          <strong>${name}</strong><br/>
          <span>📈 Sales: $${sales.toLocaleString()}</span><br/>
          <span>📊 Growth: ${growth}%</span>
        </div>
      `;
  
      new mapboxgl.Marker()
        .setLngLat([lngNum, latNum])
        .setPopup(new mapboxgl.Popup().setHTML(popupContent))
        .addTo(map);
    });
  
    return () => map.remove();
  }, [locationMarkers]);
  
  

  return (
    <div className="w-full flex flex-col gap-8">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-semibold text-gray-900"
      >
        Sales
      </motion.h1>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Sales Prediction Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-lg shadow-sm"
        >
          <h2 className="text-lg font-semibold mb-4">Sales Prediction</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(value) => `$${value.toLocaleString()}`}
                />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke="#FFB020"
                  strokeWidth={2}
                  dot={{ fill: "#FFB020", strokeWidth: 2 }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Products Sales List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-lg shadow-sm"
        >
          <h2 className="text-lg font-semibold mb-4">Products Sales</h2>
          <div className="space-y-4 overflow-y-scroll">
            {productsData.map((product, index) => {
              // Use the icon mapping to get the corresponding icon component.
              // If no mapping exists, fallback to FaLaptop.
              const IconComponent = iconMapping[product.name] || FaLaptop;
              return (
                <motion.div
                  key={product.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * (index + 1) }}
                  className="flex items-center gap-4"
                >
                  <div className={`p-2 rounded-lg ${product.bgColor || "bg-gray-50"}`}>
                    <IconComponent className={`w-6 h-6 ${product.iconColor || "text-gray-500"}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{product.name}</h3>
                    <p className="text-gray-500">${product.price.toLocaleString()}</p>
                  </div>
                  <span
                    className={`${
                      product.change > 0 ? "text-green-500" : "text-red-500"
                    } font-medium`}
                  >
                    {product.change > 0 ? "+" : ""}
                    {product.change}%
                  </span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Sales Locations Map */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white p-6 rounded-lg shadow-sm"
      >
        <h2 className="text-lg font-semibold mb-4">Sales Locations</h2>
        <div className="relative">
          <div ref={mapContainer} className="h-[400px] rounded-lg" />
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80">
              <FaClock className="w-8 h-8 animate-spin text-gray-500" />
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
