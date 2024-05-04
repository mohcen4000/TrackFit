'use client'
import React, { useState, useEffect } from "react";
import { redirect } from 'next/navigation'
import Link from 'next/link';

import { GiWhistle } from "react-icons/gi";
import { MdEmojiEvents } from "react-icons/md";
import { FaHome, FaDumbbell, FaCalendar, FaBullseye, FaSignOutAlt,FaEnvelope } from 'react-icons/fa';
import { useRouter ,usePathname} from 'next/navigation';
import styles from './Sidebar.module.css';
import { FaBowlFood } from "react-icons/fa6";
import { signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';
const Sidebar = () => {
  const [loading, setLoading] = useState(true);

  const [MessageCount, setMessageCount] = useState(0);
    const routers = useRouter();
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState('');
  const [activeItem, setActiveItem] = useState('');
  const router = usePathname(); 
  const {data:session} = useSession();
  const showUSerTabs = session?.user?.role === 1;
  const showAdminTabs = session?.user?.role === 2;
  const showCoachTabs = session?.user?.role === 3;
  const showNutritionistTabs = session?.user?.role === 4;

const handleSignOut = async () => {
  try {
      // Attempt to sign out
      const signOutResponse = await signOut({
          redirect: true, 
          callbackUrl: '/Login'  
      });
      redirect('/Login')

  } catch (error) {
      console.error('Sign out failed:', error);
  }
};
const calculateAge = (dob) => {
  if (!dob) return ''; // return empty if dob is not available
  const birthday = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthday.getFullYear();
  const m = today.getMonth() - birthday.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthday.getDate())) {
    age--;
  }
  return age;
};

useEffect(() => {

  const fetchProfile = async () => {
    setLoading(true);
    try {
      // Adjust the URL below to match your API route
      const response = await fetch("/api/userInfo", {
        method: "GET",
        headers: {
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setProfile(data);
      setMessageCount(data?.Messages?.length || 0);
    } catch (error) {
      setError("Failed to load profile: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  fetchProfile();
}, []);
useEffect(() => {
}, [MessageCount]);


  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        // Adjust the URL below to match your API route
        const response = await fetch('/api/userInfo', {
          method: 'GET',
          headers: {
            // Include headers as necessary, for example, for authorization
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setProfile(data);
      } catch (error) {
        setError('Failed to load profile: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [])

  // Check if the current route is the profile page
 const isProfilePage = router === '/Profile';
  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <button className={styles.menuBtn} id="menu-close">
          <i><FaHome size={30} /></i>
        </button>
        <img className={styles.img} src="/images/logo.png" alt="Logo" />
        <a href="#" className={styles.a}>TrackFit</a>
      </div>

      {/* Render the profile section only if not on the profile page */}
      {!isProfilePage && (
        <div className={styles.profile}>
          <Link href="/Profile">
          <img src={profile?.profileImage || "/images/profileImages/profile.png"} alt="Profile" className={styles.profileImage} />
          </Link>



          <div className={styles.data}>
          <div style={{ display: "flex", alignItems: "center" }}>
              <h3 style={{ marginRight: "auto" }}>{session?.user?.name}</h3>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Link href="/MessagePage">
                  <FaEnvelope className={styles.letterIcon} />
                </Link>
                <span
                  style={{
                    color: "red",
                    marginLeft: "0.5rem",
                    fontWeight: "bold",
                  }}
                >
                   {loading ? "Loading..." : MessageCount}
                </span>
              </div>
            </div>

         
            <div className={styles.age}>Age: {profile ? calculateAge(profile.dateOfBirth) : "Loading..."} years</div>
          <hr className={styles.hr} />
          <div className={styles.details}>
            <div>
              <div className={styles.detailsLabel}>HEIGHT</div>
              <div className={styles.valeur}>{profile?profile.height:null} cm</div>
            </div>
            <div className={styles.verticalLine}></div>
            <div>
              <div className={styles.detailsLabel}>WEIGHT</div>
              <div className={styles.valeur}>{profile?profile.weight:null} kg</div>
            </div>
          </div>
          </div>
        </div>
      )}
      <hr className={styles.hr} />
      
      
      <div className={styles.tabs}>
      {showUSerTabs?<div><div id='item' className={`${styles.item} ${activeItem === 'overview' ? styles.active : ''}`}>
          <Link href="/Home">
            <i><FaHome size={30} /></i>
            <p>Overview</p>
          </Link>
        </div>
        <div id='item' className={`${styles.item} ${activeItem === 'workouts' ? styles.active : ''}`}>
          <Link href="/Workouts">
            <i><FaDumbbell size={30} /></i>
            <p>Workouts</p>
          </Link>
        </div>
        <div id='item' className={`${styles.item} ${activeItem === 'Meals' ? styles.active : ''}`}>
          <Link href="/Meals">
            <i><FaBowlFood  size={30} /></i>
            <p>Meals</p>
          </Link>
        </div>
      

        <div id='item' className={`${styles.item} ${activeItem === 'Coaches' ? styles.active : ''}`}>
          <Link href="/Coaches">
            <i><GiWhistle  size={30} /></i>
            <p>Coaches</p>
            
          </Link>
        </div>
        <div id='item' className={`${styles.item} ${activeItem === 'Events' ? styles.active : ''}`}>
          <Link href="/Events">
            <i><MdEmojiEvents size={30} /></i>
            <p>Events</p>
            
          </Link>
        </div>
      </div> :null}
        
 
       
        {showCoachTabs? <div>


        <div id='item' className={`${styles.item} ${activeItem === 'Home' ? styles.active : ''}`}>
        <Link href="/coach/Home">
            <i><GiWhistle  size={30} /></i>
            <p>Home</p>
            
          </Link>
      
        </div>

        <div id='item' className={`${styles.item} ${activeItem === 'workout' ? styles.active : ''}`}>
        <Link href="/coach/Workout">
            <i><GiWhistle  size={30} /></i>
            <p>Create Workout</p>
            
          </Link>
      
        </div>
        <div id='item' className={`${styles.item} ${activeItem === 'workout' ? styles.active : ''}`}>
        <Link href="/coach">
            <i><GiWhistle  size={30} /></i>
            <p>Create Event</p>
            
          </Link>
      
        </div>

       
          
        </div> :null 
        }

        {showNutritionistTabs? <div > 
        
          <div id='item' className={`${styles.item} ${activeItem === 'Home' ? styles.active : ''}`}>
        <Link href="/nutritionist/Home">
            <i><GiWhistle  size={30} /></i>
            <p>Home</p>
            
          </Link>
      
        </div>

        <div id='item' className={`${styles.item} ${activeItem === 'Coaches' ? styles.active : ''}`}>
        <Link href="/nutritionist/Meal">
            <i><GiWhistle  size={30} /></i>
            <p>Create Meal</p>
            
          </Link>
      
        </div>




     
        </div> :null }



       
      </div>


      <div className={styles.logoutButton}>
    
        <button className={styles.menuBtn} onClick={handleSignOut}>
          <i><FaSignOutAlt /></i>
          <p >Logout</p>
        </button>
   
    </div>
    </aside>
  );
};

export default Sidebar;
