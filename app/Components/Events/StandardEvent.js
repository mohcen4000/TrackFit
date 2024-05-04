import React, { useState, useEffect } from "react";
import styles from "./Events.module.css";
import { getSession } from "next-auth/react";


const StandardEvent = ({
  imageSrc,
  name,
  description,
  participantLimit,
  creator,
  eventAddress,
  eventDate,
  participants,
  numberOfParticipants,
  eventId, 
  updateEventsList,
}) => {
  const [isParticipating, setIsParticipating] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [session, setSession] = useState(null);

  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();
      setSession(session);
      
      if (session) {
        const userId = session.user.id;
        if (participants.includes(userId)) {
          setIsRegistered(true);
        }
      }
    };
  
    fetchSession();
  }, []);

  const handleParticipate = async () => {
    setIsParticipating(true);

  
    try {
      if (isRegistered) {
        const response = await fetch(
          `http://localhost:3000/api/removeParticipan`, 
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ 
              eventId,
             }),
          }
        );
        if (!response.ok) {
          throw new Error("Failed to remove participant");
        }
        setIsRegistered(false);
        // Vous devez définir la fonction setNumberOfParticipants
        setNumberOfParticipants(numberOfParticipants - 1);
        updateEventsList();
      } else {
        if (numberOfParticipants >= participantLimit) {
          alert("La limite de participants est atteinte.");
          return;
        }
  
        const response = await fetch(
          `http://localhost:3000/api/participate`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ 
              eventId,
             }),
          }
        );
        if (!response.ok) {
          throw new Error("Failed to participate");
        }
        setIsRegistered(true);
        setNumberOfParticipants(numberOfParticipants + 1);
        updateEventsList();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsParticipating(false);
    }
  };
  
  const handleWithdraw = async () => {
    setIsParticipating(true);
  
    try {
      const response = await fetch(
        `http://localhost:3000/api/removeParticipan`, 
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ eventId }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to remove participant");
      }
      setIsRegistered(false);
      setNumberOfParticipants(numberOfParticipants - 1);
    } catch (error) {
      console.error(error);
    } finally {
      setIsParticipating(false);
    }
  };

  return (
    <div className={styles.PictureAdvices}>
      <div className={styles.BodyDetailsExercice}>
        <div className={styles.PicturesWorkout}>
          {imageSrc.map((image, index) => (
            <img key={index} src={image} alt={`Image ${index + 1}`} />
          ))}
        </div>

        <div className={styles.WorkoutAdvices}>
          <span>What do you need to know about the event</span>
          <p>Name: {name}</p>
          <p>Date: {eventDate}</p>
          <p>Location: {eventAddress}</p>
          <p>Participant Limit: {participantLimit}</p>
          <p>Creator: {creator}</p>
          <p>Description: {description}</p>
          <p>Number of Participants: {numberOfParticipants}</p>
        </div>

        {isRegistered ? (
          <button
          className={isParticipating ? "profile-btn2" : "profile-btn1"}
          disabled={isParticipating}
            onClick={handleWithdraw}
          >
            {isParticipating ? "Withdrawing..." : "Withdraw"}
          </button>
        ) : (
          <button
          className={numberOfParticipants >= participantLimit ? "profile-btn2" : "profile-btn"}
          disabled={isParticipating || numberOfParticipants >= participantLimit}
            onClick={handleParticipate}
          >
            {isParticipating ? "Processing..." : "Participate"}
          </button>
        )}
      </div>
    </div>
  );
};

export default StandardEvent;
