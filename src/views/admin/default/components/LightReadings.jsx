import React, { useEffect, useState } from "react";
import Card from "components/card";
import LineChart from "components/charts/LineChart";

const TotalSpent = () => {
  const [chartData, setChartData] = useState({
    current: [],
    voltage: []
  });

  useEffect(() => {
    const eventSource = new EventSource('http://localhost:5000/stream');
    
    eventSource.onmessage = (event) => {
      const newData = JSON.parse(event.data);
      const timestamp = new Date(newData.timestamp).getTime();
      
      setChartData(prev => ({
        current: [...prev.current.slice(-20), { x: timestamp, y: newData.current }],
        voltage: [...prev.voltage.slice(-20), { x: timestamp, y: newData.voltage }]
      }));
    };

    return () => eventSource.close();
  }, []);

  const lineChartOptionsTotalSpent = {
    legend: {
      show: false,
    },
    theme: {
      mode: "light",
    },
    chart: {
      type: "line",
      toolbar: { show: false },
      animations: { enabled: false }
    },
    dataLabels: { enabled: false },
    stroke: { curve: "smooth" },
    tooltip: {
      style: {
        fontSize: "12px",
        fontFamily: undefined,
        backgroundColor: "#000000"
      },
      theme: 'dark',
      x: { format: "dd/MM/yy HH:mm:ss" },
    },
    grid: { show: false },
    xaxis: {
      type: "datetime",
      labels: {
        style: {
          colors: "#A3AED0",
          fontSize: "12px",
          fontWeight: "500",
        },
        format: "HH:mm:ss",
      }
    },
    yaxis: [
      {
        seriesName: 'Current',
        show: true,
        title: { text: "Current (A)" },
        min: 0,
        max: 30
      },
      {
        seriesName: 'Voltage',
        show: true,
        opposite: true,
        title: { text: "Voltage (V)" },
        min: 220,
        max: 240
      }
    ]
  };

  const lineChartDataTotalSpent = [
    {
      name: "Current (A)",
      data: chartData.current,
      color: "#4318FF",
    },
    {
      name: "Voltage (V)",
      data: chartData.voltage,
      color: "#6AD2FF",
    }
  ];

  return (
    <Card extra="!p-[20px] min-h-[400px] text-center">
      <h1 className="text-xl font-semibold">Light Readings</h1>
      <div className="flex h-full w-full flex-row justify-between sm:flex-wrap lg:flex-nowrap 2xl:overflow-hidden">
        <div className="h-full w-full">
          <LineChart
            options={lineChartOptionsTotalSpent}
            series={lineChartDataTotalSpent}
          />
        </div>
      </div>
    </Card>
  );
};

export default TotalSpent;