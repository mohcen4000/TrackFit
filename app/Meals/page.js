import Sidebar from "@/app/Components/Sidebar";
import Title from "@/app/Components/Head";
import React from "react";

import { HealthyMeals } from "@/app/Components/Meals/HealthyMeals";

const Meals = () => {
  return (
    <>
      <div className="splitter">
        <Title />
        <Sidebar />
        <main>
          <HealthyMeals />
        </main>
      </div>
    </>
  );
};

export default Meals;
