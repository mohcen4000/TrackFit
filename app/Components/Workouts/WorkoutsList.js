import React, { useState, useEffect } from 'react';

function WorkoutsList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/workouts");
        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }
        
        const jsonData = await res.json();
        setData(jsonData);
        
      } catch (error) {
        console.error(error);
        // Handle error, e.g., display an error message
      }
    };

    fetchData();

  }, []);

  // Return the array of data
 
  return data;
}

export default WorkoutsList;
