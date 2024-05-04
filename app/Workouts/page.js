import Sidebar from "@/app/Components/Sidebar";
import Title from "@/app/Components/Head";
import React from "react";
import { BodyWorkouts } from "@/app/Components/Workouts/BodyWorkouts";

const Workouts = () => {
  return (
    <>
      <div className="splitter">
        <Title />
        <Sidebar />
        <main>
          <BodyWorkouts />
        </main>
      </div>
    </>
  );
};

export default Workouts;
