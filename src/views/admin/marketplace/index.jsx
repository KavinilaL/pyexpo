import Card from "components/card";
import React from "react";

const General = () => {
  return (
    <Card extra={"w-full p-3"}>
      {/* Header */}
      <div className="mt-2 mb-8 w-full">
        <h4 className="px-2 text-xl font-bold text-navy-700 dark:text-white">
          Emission Information
        </h4>
       
      </div>
      {/* Cards */}
      <div className="grid grid-cols-1 gap-4 px-2 ">
        <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm mb-20 text-center text-gray-600">Emission</p>
          <p className="text-xl/10 text-center font-medium  text-navy-700 mb-20 dark:text-white">
          Excessive current consumption and energy emissions pose a silent yet significant challenge in modern electronics, leading to inefficiency, overheating, and unnecessary environmental strain. As Nikola Tesla once said, "If you want to find the secrets of the universe, think in terms of energy, frequency, and vibration." This principle extends to power management—where every unnecessary milliampere drained translates into wasted energy and increased emissions. Implementing intelligent power optimization techniques, such as dynamic voltage scaling, efficient power routing, and low-power sleep states, can drastically cut down on excess current draw. Additionally, reducing electromagnetic noise through proper circuit design, shielding, and frequency modulation ensures minimal interference while enhancing overall efficiency. Adopting eco-conscious power solutions, such as renewable energy integration and intelligent load balancing, not only conserves electricity but also aligns with a sustainable technological future. In the grand scheme, every watt saved today is a step toward a greener and more energy-efficient tomorrow.
          </p>
        </div>

        
      </div>
    </Card>
  );
};

export default General;
