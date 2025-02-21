import BarChart from "components/charts/BarChart";
import { MdArrowDropUp, MdArrowDropDown } from "react-icons/md";
import Card from "components/card";
import { useEffect, useState } from "react";

const MonthlyUsage = () => {
  const [chartData, setChartData] = useState({
    months: Array(12).fill(0),
    current: 0,
    difference: 0,
    currentMonthIndex: new Date().getMonth()
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/monthly_usage');
        const data = await response.json();
        
        if (!data.current_month || !data.monthly_usage) return;

        const currentMonthIndex = data.current_month.month - 1;
        const months = data.monthly_usage.map(val => Number(val.toFixed(2)));

        setChartData({
          months: months,
          current: data.current_month.total_kwh,
          difference: data.difference,
          currentMonthIndex: currentMonthIndex
        });

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, []);

  const maxValue = Math.max(...chartData.months);
  const yAxisMax = maxValue > 0 ? maxValue * 1.5 : 20;

  const barChartOptionsDailyTraffic = {
    chart: {
      toolbar: { show: false },
      animations: { enabled: false }
    },
    tooltip: {
      style: {
        fontSize: "12px",
        fontFamily: undefined,
        backgroundColor: "#000000"
      },
      theme: "dark",
      y: {
        formatter: (value) => `${value.toFixed(2)} kWh`
      }
    },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
                  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      labels: {
        show: true,
        style: {
          colors: "#A3AED0",
          fontSize: "14px",
          fontWeight: "500",
        },
        formatter: (value, index) => 
          index === chartData.currentMonthIndex ? 
          `${value}*` : value
      },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      show: true,
      labels: {
        show: true,
        formatter: (value) => `${value.toFixed(1)} kWh`
      },
      min: 0,
      max: yAxisMax,
      tickAmount: 5,
      forceNiceScale: true
    },
    plotOptions: {
      bar: {
        columnWidth: '70%',
        borderRadius: 4,
        distributed: true
      }
    },
    colors: ['#4318FF']
  };

  return (
    <Card extra="pb-7 p-[20px]">
      <div className="flex flex-row justify-between">
        <div className="ml-1 pt-2">
          <p className="text-sm font-medium leading-4 text-gray-600">
            {new Date().getFullYear()} Usage
          </p>
          <p className="text-[34px] font-bold text-navy-700 dark:text-white">
            {chartData.current.toFixed(2)}{" "}
            <span className="text-sm font-medium leading-6 text-gray-600">
              kWh
            </span>
          </p>
        </div>
        <div className="mt-2 flex items-start">
          <div className={`flex items-center text-sm ${
            chartData.difference >= 0 ? 'text-green-500' : 'text-red-500'
          }`}>
            {chartData.difference >= 0 ? (
              <MdArrowDropUp className="h-5 w-5" />
            ) : (
              <MdArrowDropDown className="h-5 w-5" />
            )}
            <p className="font-bold">
              {Math.abs(chartData.difference).toFixed(2)} kWh
            </p>
          </div>
        </div>
      </div>

      <div className="h-[300px] w-full pt-10 pb-0">
        <BarChart
          chartData={[{
            name: "Electricity Usage",
            data: chartData.months
          }]}
          chartOptions={barChartOptionsDailyTraffic}
        />
      </div>
    </Card>
  );
};

export default MonthlyUsage;