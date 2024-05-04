import React, { useState, useEffect } from "react";
import styles from "../Components/Meals/Meals.module.css";
const Button = () => {
  const [isResponsive, setIsResponsive] = useState(false);
  const [buttonContent, setButtonContent] = useState("Check");

  useEffect(() => {
    const handleResize = () => {
      setIsResponsive(window.innerWidth <= 768); // Adjust threshold as needed
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Initial check on component mount
    handleResize();

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Update button content based on window size
  useEffect(() => {
    setButtonContent(isResponsive ? "✔" : "Check");
  }, [isResponsive]);

  return (
    // Render button with dynamic content and styles based on window size
    <button
      className={`${styles.button} ${
        isResponsive ? styles.responsiveButton : ""
      }`}
    >
      {buttonContent}
    </button>
  );
};

export default Button;
