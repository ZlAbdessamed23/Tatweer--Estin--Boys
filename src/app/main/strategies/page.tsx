"use client";

import { useEffect, useState } from "react";
import { BsLightningCharge } from "react-icons/bs";
import StrategyCard from "./componenets/strategy-card";


interface Department {
  departmentId: string;
  departmentName: string;
  departmentType: string;
}


export default function StrategiesPage() {
  const [departments, setDepartments] = useState<Department[]>([]);


  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        console.log("Fetching departments...");

        const response = await fetch("/api/main/departments"); // Relative URL
        if (!response.ok) {
          throw new Error(`Failed to fetch departments. Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched data:", data); // Log full response

        if (data.Departments) {
          setDepartments(data.Departments); // Set only the array
        } else {
          console.warn("No Departments found in response");
        }
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };

    fetchDepartments();
  }, []);

  return (
    <main className="p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Strategies</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {departments.length > 0 ? (
            departments.map((dept, index) => (
              <StrategyCard
                key={dept.departmentId || index} // Use unique ID if available
                title={dept.departmentName}
                date={"N/A"} // No date in your data
                description={`Type: ${dept.departmentType}`} // Using departmentType as description
                icon={BsLightningCharge}
                iconColor="#FFB800"
                backgroundColor="#FFFBF2"
              />
            ))
          ) : (
            <StrategyCard
              key={0}
              title="You have no departments"
              date=""
              description="No strategy available"
              icon={BsLightningCharge}
              iconColor="#FFB800"
              backgroundColor="#FFFBF2"
            />
          )}
        </div>
      </div>
    </main>
  );
}
