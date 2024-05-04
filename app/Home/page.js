'use client'
import React, { useState, useEffect,Suspense } from "react";
import { Chart, registerables } from "chart.js";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { GiSushis, GiMeal } from "react-icons/gi";
import { FaEgg } from "react-icons/fa6";
import { FaHeartbeat, FaFireAlt } from "react-icons/fa";
import { CgGym } from "react-icons/cg";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Sidebar from "@/app/Components/Sidebar";
import Title from "@/app/Components/Head";
Chart.register(...registerables);

function Home() {
  const [profile, setProfile] = useState(null);

  const [remainingExercises, setRemainingExercises] = useState(4);
  const [workoutsProgress, setWorkoutsProgress] = useState(0);
  const [workoutsCompleted, setWorkoutsCompleted] = useState([]);

  const [remainingMeals, setRemainingMeals] = useState(4);
  const [mealsProgress, setMealsProgress] = useState(0);
  const [mealsCompleted, setMealsCompleted] = useState([]);
  const [totalProteins, settotalProteins] = useState(0);
  const [totalWorkouts, settotalWorkouts] = useState(0);



  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("/api/userInfo", {
          method: "GET",
          headers: {},
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setProfile(data);
      } catch (error) {
        console.error("Failed to load profile: " + error.message);
      }
    };

    fetchProfile();
  }, []);

  const fetchWorkoutsCompleted = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/dailyWorkoutsCompleted");
      if (response.ok) {
        const data = await response.json();
        setWorkoutsCompleted(data);
        updateWorkoutsProgress(data);
      } else {
        throw new Error("Failed to fetch daily workouts completed");
      }
    } catch (error) {
      console.error("Error fetching daily workouts completed:", error.message);
    }
  };

  const updateWorkoutsProgress = (data) => {
    const completedExercisesCount = data.length;
    settotalWorkouts(completedExercisesCount)
    const totalExercisesCount = 4; 
    const newProgress = (completedExercisesCount / totalExercisesCount) * 100;
    setRemainingExercises(totalExercisesCount - completedExercisesCount);
    setWorkoutsProgress(newProgress);
  };

  const fetchMealsCompleted = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/dailyMealsCompleted");
      if (response.ok) {
        const data = await response.json();
        setMealsCompleted(data);
        updateMealsProgress(data);
        getTotalProteinsGained(data)

      } else {
        throw new Error("Failed to fetch daily meals completed");
      }
    } catch (error) {
      console.error("Error fetching daily meals completed:", error.message);
    }
  };

  const updateMealsProgress = (data) => {
    const completedMealsCount = data.length;
    const totalMealsCount = 4; // Assuming you have a total of 4 meals
    const newProgress = (completedMealsCount / totalMealsCount) * 100;
    setRemainingMeals(totalMealsCount - completedMealsCount);
    setMealsProgress(newProgress);
  };

  const extractProteinAmount = (proteinString) => {
    const match = proteinString.match(/\d+/); 
    return match ? parseInt(match[0]) : 0; 
  };

  const getTotalProteinsGained = async (mealsData) => {
    try {
      const mealIds = mealsData.map((meal) => meal.mealId); 
  
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ mealIds: mealIds })
      };
      
  
      const response = await fetch('http://localhost:3000/api/mealsId', requestOptions);
      
      if (response.ok) {
        const meals = await response.json();
        // Calculer les protéines totales à partir des repas récupérés
        const totalP = meals.reduce((total, meal) => total + extractProteinAmount(meal.protein), 0);
        settotalProteins(totalP);
      } else {
        throw new Error("Failed to fetch meals by IDs");
      }
    } catch (error) {
      console.error("Error fetching meals by IDs:", error.message);
    }
  };
  

  useEffect(() => {
    fetchWorkoutsCompleted();
    fetchMealsCompleted();
  }, []);


  const data = [
    { name: "Page A", uv: 4000, pv: 2400, amt: 2400 },
    { name: "Page B", uv: 3000, pv: 1398, amt: 2210 },
    { name: "Page C", uv: 2000, pv: 9800, amt: 2290 },
    { name: "Page D", uv: 2780, pv: 3908, amt: 2000 },
    { name: "Page E", uv: 1890, pv: 4800, amt: 2181 },
    { name: "Page F", uv: 2390, pv: 3800, amt: 2500 },
    { name: "Page G", uv: 3490, pv: 4300, amt: 2100 },
  ];

  return (
    <div className="splitter">
      <Title />
      <Sidebar profile={profile} />

      <main className="main-container">
        <div className="main-title">
          <h3>PANNEAU DE CONTRÔLE</h3> {/* Titre du panneau de contrôle */}
        </div>

        <div className="main-cards">
          <div className="card">
            <div className="card-inner">
              <div>
                <CgGym size={110} />
                <h2>{remainingExercises} Workouts</h2>
              </div>
              <div style={{ width: 140, height: 140, margin: 10 }}>
                <CircularProgressbar
                  value={workoutsProgress}
                  text={`${workoutsProgress}%`}
                  strokeWidth={11}
                  styles={buildStyles({
                    rotation: 0,
                    strokeLinecap: "butt",
                    textSize: "20px",
                    pathTransitionDuration: 0.5,
                    pathColor: `#10B3CB`,
                    textColor: "#fFFFFF",
                    trailColor: "#FFFFFF",
                    backgroundColor: "#C0C0C0",
                  })}
                />
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-inner">
              <div>
                <GiSushis size={110} />
                <h2>{remainingMeals} Meals</h2>
              </div>
              <div style={{ width: 140, height: 140, margin: 10 }}>
                <CircularProgressbar
                  value={mealsProgress}
                  text={`${mealsProgress}%`}
                  strokeWidth={11}
                  styles={buildStyles({
                    rotation: 0,
                    strokeLinecap: "butt",
                    textSize: "20px",
                    pathTransitionDuration: 0.5,
                    pathColor: `#FF527A`,
                    textColor: "#fFFFFF",
                    trailColor: "#FFFFFF",
                    backgroundColor: "#C0C0C0",
                  })}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="charts">
          <ResponsiveContainer width="100%" height="100%">

            <Suspense fallback={<p>Fetching data...</p>}>
            <LineChart
              width={500}
              height={300}
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="pv"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
              <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
            </LineChart>
            </Suspense>
           
          </ResponsiveContainer>
          <div className="main-cards-2">
            <div className="card cardb">
              <div className="card-inner">
                <h3>Total Calories Burned </h3> {/* Calories */}
                <FaFireAlt size={30} />
              </div>
              <h1>{profile?profile.workoutsCompleted.length*112:'-'}</h1>
            </div>
            <div className="card cardb">
              <div className="card-inner">
                <h3>Total Exercies done</h3> {/* Rythme Cardiaque */}
                <FaHeartbeat size={30} />
              </div>
              <h1>{totalWorkouts}</h1>
            </div>
            <div className="card cardb  ">
              <div className="card-inner">
                <h3>Meal frequency</h3> {/* Pas */}

                <GiMeal size={30} />
              </div>
              <h1>0.0</h1>
            </div>
            <div className="card cardb">
              <div className="card-inner">
                <h3>Total Protein Gained</h3> {/* Sommeil */}
                <FaEgg size={30} />
              </div>
              <h1>{totalProteins} </h1>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;
