"use client";
import React, { useState } from "react";
import StandardCoaches from "./StandardCoach";
import MainCoaches from "./MainCoaches";
import styles from "./Coach.module.css";
import CoachesList from "./CoachesList";

export const CoachScheduel = () => {
  const [selectedCoach, setSelectedCoach] = useState(false);

  const handleGoBack = () => {
    setSelectedCoach(false);
  };
  const coachesData = CoachesList();
  if (coachesData.length === 0) {
    return <div>Loading...</div>;
  }
  // Define an array of objects representing different Coaches
  const Coaches = coachesData;

  let coachdata = [];
  coachesData.forEach((element) => {
    coachdata.push({
      id: element._id,
      name: element.name,
      imageSrc: element.image,
      description: element.description,
      services: element.services,
      email: element.email,
      number: element.number,
      location: element.location,
      experience: element.experience,
      contactDetails: element.contactDetails,
      picturedetails: element.picturedetails,
    });
  });

  return (
    <div>
      <div className={styles.MainWorkoutSheduel}>
        {!selectedCoach && (
          <MainCoaches
            setSelectedCoach={setSelectedCoach}
            coachData={coachesData}
          />
        )}

        {/* Map over the array of Coaches and render StandardCoaches component for each */}
        {Coaches.map(
          (Coach) =>
            selectedCoach === Coach.name && (
              <StandardCoaches
                key={Coach._id}
                id={Coach._id}
                imageSrc={[...Coach.picturedetails]}
                name={Coach.name}
                description={Coach.description}
                services={Coach.services}
                email={Coach.email}
                contactDetails={Coach.contactDetails}
                location={Coach.location}
                experience={Coach.experience}
              />
            )
        )}

        {/* Render a back button if an Coach is selected */}
        {selectedCoach && (
          <button className={styles.BackButton} onClick={handleGoBack}>
            {"< Back"}
          </button>
        )}
      </div>
    </div>
  );
};
