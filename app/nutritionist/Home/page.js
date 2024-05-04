'use client'

import React, { useState, useEffect } from "react";
import Sidebar from "@/app/Components/Sidebar";
import { useSession } from 'next-auth/react';
import Title from "@/app/Components/Head";

function Home() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');
  const {data:session} = useSession();

useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Adjust the URL below to match your API route
        const response = await fetch('/api/userInfo', {
          method: 'GET',
          headers: {
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setProfile(data);
      } catch (error) {
        setError('Failed to load profile: ' + error.message);
      } 
    };

    fetchProfile();
  }, [])

  return (
    <div className="splitter">
      <Title />
      <Sidebar profile={profile} />

      <main className="main-container">
      <h2 style={{ color: 'black', textAlign: 'center' }}>Welcome Nutritionste {session?.user?.name} </h2>
      </main>
    </div>
  );
}

export default Home;
