'use client'
import React from "react";
import Sidebar from "@/app/Components/Sidebar";
import Title from "@/app/Components/Head";


import HealthyCoaches from "@/app/Components/Coaches/HealthyCoaches";

const Coaches = () => {
  return (
    <>
      <div class="splitter">
        <Title />
        <Sidebar />
        <main>
          <HealthyCoaches />
        </main>
      </div>
    </>
  );
};
export default Coaches;

