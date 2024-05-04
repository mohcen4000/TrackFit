import React, { useState } from "react";
import styles from "./Coach.module.css";
import Button from "../Button";

const MainCoaches = ({ setSelectedCoach, coachData }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = () => {
    // Filter coaches based on search query
    const results = coachData.filter((coach) =>
      coach.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(results);
  };
  const handleGoBack = () => {
    setSelectedEvent(false);
    setSearchResults([]); // Clear search results when going back
    setSearchQuery(""); // Clear search query when going back
  };

  const Coaches = searchResults.length > 0 ? searchResults : coachData;

  // Define an array of objects representing each coach

  return (
    <div className={styles.Container}>
      {/* Search bar */}
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search coach by name"
          className={styles.searchInput}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className={styles.searchButton} onClick={handleSearch}>
          Search
        </button>
      </div>

      {/* Coach cards */}
      <div className={styles.picCont}>
        {Coaches.map((coach, index) => (
          <div key={index} className={styles.repCont}>
            <img
              src={coach.profilePic}
              alt="image"
              onClick={() => setSelectedCoach(coach.name)}
            />

            {/* Render a back button if an Coach is selected */}

            <div className={styles.DetailsRepCont}>
              <span className={styles.exerciceNumb}>{Coaches.name}</span>
              <p className={styles.workoutsInfo}>
                <span>{coach.name}</span>
              </p>
            </div>
          </div>
        ))}
        {searchResults.length > 0 && ( // Display back button only when there are search results
          <button className={styles.BackButton} onClick={handleGoBack}>
            {"< Back"}
          </button>
        )}
      </div>
    </div>
  );
};

export default MainCoaches;
