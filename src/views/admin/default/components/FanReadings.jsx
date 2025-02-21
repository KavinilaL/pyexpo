import React from "react";
import Card from "components/card";
import LineChart from "components/charts/LineChart";

const TotalSpent = () => {
  const lineChartOptionsTotalSpent =  {
    legend: {
      show: false,
    },
  
    theme: {
      mode: "light",
    },
    chart: {
      type: "line",
  
      toolbar: {
        show: false,
      },
    },
  
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
  
    tooltip: {
      style: {
        fontSize: "12px",
        fontFamily: undefined,
        backgroundColor: "#000000"
      },
      theme: 'dark',
      x: {
        format: "dd/MM/yy HH:mm",
      },
    },
    grid: {
      show: false,
    },
    xaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          colors: "#A3AED0",
          fontSize: "12px",
          fontWeight: "500",
        },
      },
      type: "text",
      range: undefined,
      categories: ["SEP", "OCT", "NOV", "DEC", "JAN", "FEB"],
    },
  
    yaxis: {
      show: false,
    },
  }

  const lineChartDataTotalSpent = [
    {
      name: "Revenue",
      data: [50, 64, 48, 66, 49, 68],
      color: "#4318FF",
    },
    {
      name: "Profit",
      data: [30, 40, 24, 46, 20, 46],
      color: "#6AD2FF",
    },
  ]
  return (
    <Card extra="!p-[20px] min-h-[400px] text-center">
      <h1 className="text-xl font-semibold">Fan Readings</h1>
      <div className="flex h-full w-full flex-row justify-between sm:flex-wrap lg:flex-nowrap 2xl:overflow-hidden">
        <div className="flex flex-col">
          <div className="flex flex-col items-start">
            <div className="flex flex-row items-center justify-center">
            </div>
          </div>
        </div>
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
