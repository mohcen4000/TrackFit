import React, { useState } from "react";
import styles from "./Coach.module.css";

const StandardCoach = ({
  imageSrc,
  name,
  description,
  services,
  email,
  contactDetails,
  location,
  experience,
  id, // Add this prop to get the coach's ID
}) => {
  const [message, setMessage] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [messageSent, setMessageSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/addMessages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ recipientEmail, message }),
      });

      if (response.ok) {
        setMessageSent(true);
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.PictureAdvices}>
      <div className={styles.BodyDetailsExercice}>
        <div className={styles.PicturesWorkout}>
          {imageSrc.map((imageSrc, index) => (
            <img key={index} src={imageSrc} alt={`Image ${index + 1}`} />
          ))}
        </div>

        <div className={styles.WorkoutAdvices}>
          <span>What do you need to know about me</span>
          <p>Name: {name}</p>
          <p>Location: {location}</p>
          <p>Number: {contactDetails}</p>
          <p>Email: {email}</p>
          <p>Services: {services}</p>
          <p>Experience: {experience}</p>

          <p>Description: {description}</p>

          {messageSent ? (
            <div className={styles.MessageSent}>Message sent!</div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="input-box"></div>
              <div className="input-box">
                <span className="details">Connect with {name} </span>

                <input
                  type="email"
                  placeholder="Enter your reciever's Email"
                  value={recipientEmail}
                  onChange={(e) => setRecipientEmail(e.target.value)}
                  style={{
                    height: "40px",
                    width: "100%",
                    padding: "10px",
                    fontSize: "19px",
                  }}
                />
                <textarea
                  placeholder="Write your message here"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  style={{
                    height: "120px",
                    width: "100%",
                    padding: "10px",
                    fontSize: "19px",
                  }}
                ></textarea>
              </div>
              <button className="profile-btn" type="submit">
                Submit
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default StandardCoach;
