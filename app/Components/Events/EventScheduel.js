import React, { useState, useEffect } from "react";
import MainEvents from "./MainEvents";
import styles from "./Events.module.css";
import StandardEvent from "./StandardEvent";
import EventsList from "./EventsList";

export const EventScheduel = () => {
  const [selectedEvent, setSelectedEvent] = useState(false);
  
  const handleGoBack = () => {
    setSelectedEvent(false);
  };
const eventsData=EventsList();

  // Return null or handle loading state until events data is fetched
  if (eventsData.length === 0) {
    return <div>Loading...</div>;
  }

  const Events = eventsData;

  let eventdata = [];
  eventsData.forEach(element => {
    eventdata.push({
      id:element._id,
      name:element.name,
      imageSrc:element.image,
      description:element.description,
      participantLimit:element.participantLimit,
      creator: element.creator,
      eventAddress: element.eventAddress,
      eventDate:element.eventDate,
      participants : element.participants,
      numberOfParticipants : element.numberOfParticipants,
      
  
    })
  });

  return (
    <div>
      <div className={styles.MainWorkoutSheduel}>
        {!selectedEvent && (
          <MainEvents
            setSelectedEvent={setSelectedEvent}
            eventData={eventsData}
          />
        )}

        {/* Map over the array of events and render StandardEvent component for each */}
        {Events.map(
          (event) =>
            selectedEvent === event.name && (
              <StandardEvent
                key={event.id}
                imageSrc={[event.imagedetails]}
                eventId={event._id}
                name={event.name}
                description={event.description}
                participantLimit={event.participantLimit}
                creator={event.creator}
                eventAddress={event.eventAddress}
                eventDate={event.eventDate}
                participants={event.participants} 
                numberOfParticipants={event.numberOfParticipants}
              />
            )
        )}

        {/* Render a back button if an event is selected */}
        {selectedEvent && (
          <button className={styles.BackButton} onClick={handleGoBack}>
            {"< Back"}
          </button>
        )}
      </div>
    </div>
  );
};

export default EventScheduel;
