// Function to validate email format
export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  // Function to validate password format 
  //(at least 8 characters, at least one uppercase letter, one lowercase letter, and one number)
  export const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return passwordRegex.test(password);
  };
  
  // Function to validate name format (letters only)
  export const validateName = (name) => {
    const nameRegex = /^[a-zA-Z]+$/;
    return nameRegex.test(name);
  };
  
  // Function to validate number format (positive integers only)
export const validateNumber = (number) => {
  const numberRegex = /^[1-9]\d*$/;
  return numberRegex.test(number);
};
