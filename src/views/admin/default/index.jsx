import MonthlyUsage from "views/admin/default/components/MonthlyUsage";
import LiveReadings from "views/admin/default/components/LiveReadings";
import LightReadings from "views/admin/default/components/LightReadings";
import FanReadings from "views/admin/default/components/FanReadings";

const Dashboard = () => {
  return (
    <div>
      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
        <LiveReadings />
        <MonthlyUsage />
      </div>
      <h1 className="text-3xl mt-5 dark:text-white font-semibold">individual Usage</h1>

      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-2">
          <LightReadings/>
          <FanReadings/>
       </div>
    </div>
  );
};

export default Dashboard;
