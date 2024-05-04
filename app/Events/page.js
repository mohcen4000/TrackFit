'use client'
import Sidebar from "@/app/Components/Sidebar";
import Title from "@/app/Components/Head";
import React from "react";

import { HealthyEvents } from "@/app/Components/Events/HealthyEvents";

const Events = () => {
  return (
    <>
      <div class="splitter">
        <Title />
        <Sidebar />
        <main>
          <HealthyEvents />
        </main>
      </div>
    </>
  );
};
export default Events;


