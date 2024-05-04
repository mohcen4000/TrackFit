// Profile.js
"use client"
import React, { useState, useEffect, useRef } from 'react';
import Title from "@/app/Components/Head";
import Sidebar from '@/app/Components/Sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';

function Profile() {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('****');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isNewPassword, setIsNewPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showError, setShowError] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [profileImage, setProfileImage] = useState("/images/profileImages/profile.jpg");
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/profileDetails");

        if (response.ok) {
          const data = await response.json();

          setName(data.name);
          setGender(data.gender);
          setEmail(data.email);
          setHeight(data.height);
          setWeight(data.weight);
          setDateOfBirth(new Date(data.dateOfBirth).toLocaleDateString('en-GB'));
          if (data.profileImage) {
            setProfileImage(data.profileImage);
          }
        } else {
          throw new Error("Failed to fetch profile data");
        }
      } catch (error) {
        console.error("Error fetching profile data:", error.message);
      }
    };

    fetchProfileData();
  }, []);

  useEffect(() => {
    if (selectedImage) {
      handleUploadImage(selectedImage);
    }
  }, [selectedImage]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const handleUploadImage = async (imageFile) => {
    const formData = new FormData();
    formData.append('image', imageFile);

    try {
      const response = await fetch('http://localhost:3000/api/uploadProfileImage', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Failed to upload image');
      }

    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };


  const handleImageUploadButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleUpdateDetails = () => {
    setIsEditing(true);
  };

  const convertToDatabaseFormat = (dob) => {
    const parts = dob.split('/');
    if (parts.length === 3) {
      const [day, month, year] = parts;
      return `${year}-${month}-${day}T00:00:00.000Z`; 
    }
    return dob; 
  };
  
  const handleChangePassword = () => {
    setIsNewPassword(true);
    setEmail('New Password');
    setPassword('Confirm Password');
  };

  const displayError = (message) => {
    setErrorMessage(message);
    setShowError(true);

    setTimeout(() => {
      setShowError(false);
    }, 5000); // Adjust the duration as needed
  };


    const handleConfirmChanges = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/profileDetails", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name,
            gender,
            height,
            weight,
            dateOfBirth : convertToDatabaseFormat(dateOfBirth),
          })
        });
        if (response.ok) {
          setIsEditing(false);
        } else {
          throw new Error("Failed to update profile");
        }
      } catch (error) {
        console.error("Error updating profile:", error.message);
      }
    };
  
    const handleConfirmPasswordChange = async () => {
      try {
        // Check if passwords match and meet minimum length requirement
        if (newPassword !== confirmPassword || newPassword.length < 8) {
          // If passwords don't match, display error message
          if (newPassword !== confirmPassword) {
            displayError("Passwords do not match");
          } else {
            // If password length is less than 8, display error message
            displayError("Password must be at least 8 characters long");
          }
          // Return early or handle the error accordingly
          return;
        }
    
        // Proceed with changing the password
        const response = await fetch("http://localhost:3000/api/changePassword", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            newPassword,
            confirmPassword,
          })
        });
        if (response.ok) {
          setIsNewPassword(false);
        } else {
          throw new Error("Failed to change password");
        }
      } catch (error) {
        console.error("Error changing password:", error.message);
      }
    };

  return (
    <> 
      <div className="splitter">
        <Title />
        <Sidebar />
        <main>
          <div className="profile-container">
            <div className="profile-header">
            <img src={profileImage ? profileImage : '/images/profileImages/profile.png'} alt="Profile" className="profile-picture" />
              <button onClick={handleImageUploadButtonClick}><FontAwesomeIcon icon={faPen} style={{ color: 'white', fontSize: '1em' }}/></button>
              <input type="file" accept="image/*" ref={fileInputRef} style={{ display: 'none' }} onChange={handleImageChange} />            </div>
            <h1>Profile Page</h1>
            <form onSubmit={handleConfirmChanges} className="login-form">
              <div className="personal-info">
                <h2>Personal Data</h2>
                <div className="user-details">
                  <div className="input-box">
                    <span className="details">Name</span>
                    <input type="text" value={name} disabled={!isEditing} onChange={(e) => setName(e.target.value)} />
                  </div>
                  <div className="input-box">
                    <span className="details">Gender</span>
                    <input type="text" value={gender} disabled={!isEditing} onChange={(e) => setGender(e.target.value)} />
                  </div>
                  <div className="input-box">
                    <span className="details">Height</span>
                    <input type="text" value={height} disabled={!isEditing} onChange={(e) => setHeight(e.target.value)} />
                  </div>
                  <div className="input-box">
                    <span className="details">Weight</span>
                    <input type="text" value={weight} disabled={!isEditing} onChange={(e) => setWeight(e.target.value)} />
                  </div>
                  <div className="input-box">
                    <span className="details">Date of Birth</span>
                    <input type="text" value={dateOfBirth} disabled={!isEditing} onChange={(e) => setDateOfBirth(e.target.value)} />
                  </div>
                </div>
                <br />
                <button className="profile-btn" type="button" onClick={isEditing ? handleConfirmChanges : handleUpdateDetails}>
                  {isEditing ? 'Confirm Changes' : 'Update Details'}
                </button>
              </div>
              <div className="login-info">
                <h2>Connection Information</h2>
                <div className="user-details">
                <div className="input-box">
                    <span className="details">{isNewPassword ? 'New Password' : 'Email'}</span>
                    <input
                      type={isNewPassword ? 'password' : 'text'}
                      value={isNewPassword ? newPassword : email}
                      disabled={!isNewPassword}
                      onChange={(e) => (isNewPassword ? setNewPassword(e.target.value) : setEmail(e.target.value))}
                    />                 
                     </div>
                  <div className="input-box">
                    <span className="details">{isNewPassword ? 'Confirm Password' : 'Password'}</span>
                    <input type="password" value={isNewPassword ? confirmPassword : password} disabled={!isNewPassword} onChange={(e) => setIsNewPassword ? setConfirmPassword(e.target.value) : setPassword(e.target.value)} />
                  </div>
                </div>
                {showError && <div style={{ color: "red" }} className="error-message">{errorMessage}</div>}
                <br />
                <button className="profile-btn" type="button" onClick={isNewPassword ? handleConfirmPasswordChange : handleChangePassword}>
                  {isNewPassword ? 'Confirm Password Change' : 'Change Password'}
                </button>             
              </div>
            </form>
          </div>
        </main>
      </div>
    </>
  );
}

export default Profile;