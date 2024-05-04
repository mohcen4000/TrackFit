import React, { useState } from "react";
import styles from "./Events.module.css";
import Button from "../Button";

const MainEvents = ({ setSelectedEvent, eventData }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = () => {
    const results = eventData.filter(coach =>
      coach.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(results);
  };

  const handleGoBack = () => {
    setSelectedEvent(false);
    setSearchResults([]); // Clear search results when going back
    setSearchQuery(""); // Clear search query when going back
  };

  const Events = searchResults.length > 0 ? searchResults : eventData;

  return (
    <div className={styles.Container}>
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search coach by name"
          className={styles.searchInput}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className={styles.searchButton} onClick={handleSearch}>Search</button>
      </div>

      <div className={styles.picCont}>
        {Events.map((Event, index) => (
          <div className={styles.MainNamesStyle}>
          <p > {Event.name}</p>
          <div key={index} className={styles.repCont}>
            <img
              src={Event.imageSrcM1}
              alt="image"
              onClick={() => setSelectedEvent(Event.name)}
            />
            <div className={styles.DetailsRepCont}>
              <span className={styles.exerciceNumb}>{Event.name}</span>
              <p className={styles.workoutsInfo}>
                <span>Click on the picture to see the details to join the "{Event.name}"</span>
              </p>
            </div>
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

export default MainEvents;
