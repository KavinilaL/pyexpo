import React, { useState, useEffect } from "react";
import Card from "components/card";
import LineChart from "components/charts/LineChart";

const TotalSpent = () => {
  const [weeklyData, setWeeklyData] = useState([]);
  
  // Generate synthetic data for current week
  useEffect(() => {
    const generateWeeklyData = () => {
      const days = [];
      const today = new Date();
      
      for (let i = 6; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        days.push({
          name: date.toLocaleDateString('en-US', { weekday: 'short' }),
          usage: Math.floor(Math.random() * (20 - 5) + 5) // Corrected line
        });
      }
      return days;
    };
  
    setWeeklyData(generateWeeklyData());
  }, []);

  const lineChartOptionsTotalSpent = {
    legend: { show: false },
    theme: { mode: "light" },
    chart: {
      type: "line",
      toolbar: { show: false },
      animations: { enabled: false }
    },
    dataLabels: { enabled: false },
    stroke: { curve: "smooth", width: 3 },
    tooltip: {
      theme: 'dark',
      style: {
        fontSize: "12px",
        fontFamily: undefined,
        backgroundColor: "#000000"
      },
      x: {
        formatter: (val) => {
          const date = new Date();
          date.setDate(date.getDate() - (6 - val));
          return date.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' });
        }
      }
    },
    grid: { show: false },
    xaxis: {
      categories: weeklyData.map(day => day.name),
      labels: {
        style: {
          colors: "#A3AED0",
          fontSize: "12px",
          fontWeight: "500",
        }
      },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      show: true,
      labels: {
        style: {
          colors: "#A3AED0",
          fontSize: "12px",
        },
        formatter: (value) => `${value} kWh`
      },
      min: 0,
      max: 25,
      tickAmount: 5
    }
  };

  const lineChartDataTotalSpent = [
    {
      name: "Current Usage",
      data: weeklyData.map(day => day.usage),
      color: "#4318FF",
    }
  ];

  return (
    <Card extra="!p-[20px] min-h-[400px] text-center">
      <h1 className="text-xl font-semibold">Weekly Usage</h1>
      <div className="h-full w-full">
        <LineChart
          options={lineChartOptionsTotalSpent}
          series={lineChartDataTotalSpent}
        />
      </div>
    </Card>
  );
};

export default TotalSpent;