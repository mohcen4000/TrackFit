'use client'
import React, { useState } from 'react';
import logo from '@/public/images/logo.png'
import styles from './Inscription.module.css';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useRouter } from 'next/navigation';
import { validateName ,validateNumber} from '@/app/validation';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css'; // Import the CSS for styling



const inscription = () => {
  const routers = useRouter();
const {data:session} = useSession();

const [selectedDate, setSelectedDate] = useState(null);

const handleDateChange = (date) => {
  setSelectedDate(date);
};
    const [etape, setEtape] = useState(1);
    const [prenom, setPrenom] = useState('');
    const [nom, setNom] = useState('');
    const [selectedGoals, setSelectedGoals] = useState([]);
    const [activityLevel, setActivityLevel] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [gender, setGender] = useState('');
    const [dietPreference, setDietPreference] = useState('');
    const [errors, setErrors] = useState({});

    const handleNext = () => {
      if (etape === 2 && !validateForm()) {
          return; // If there are validation errors, prevent moving to the next step
      }
      setEtape(etape + 1);
  };
  const calculateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  
    const handlePrev = () => {
      setEtape(etape - 1);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      handleNext();
    };
  
    const handleCheckboxChange = (value) => {
      if (selectedGoals.includes(value)) {
        setSelectedGoals(selectedGoals.filter((goal) => goal !== value));
      } else {
        if (selectedGoals.length < 2) {
          setSelectedGoals([...selectedGoals, value]);
        }
      }
    };
  
    const handleActivityLevelChange = (level) => {
      setActivityLevel(level);
    };

    const handleDietPreferenceChange = (level) => {
      setDietPreference(level);
    };

    const validateForm = () => {
      let isValid = true;
      const newErrors = {};

      // Validate height
      if (!validateNumber(height)) {
          newErrors.height = 'Please enter a valid height.';
          isValid = false;
      }

      // Validate weight
      if (!validateNumber(weight)) {
          newErrors.weight = 'Please enter a valid weight.';
          isValid = false;
      }

      // Validate gender
      if (!gender) {
          newErrors.gender = 'Please select a gender.';
          isValid = false;
      }

      setErrors(newErrors);
      return isValid;
  };

  const handleSubmitdata = async (e) => {
    e.preventDefault();
  
    const formData = {
      height,
      weight,
      dateOfBirth: selectedDate ? selectedDate : null,
      gender,
      goal:selectedGoals,
      mealPreference:dietPreference
    };
  
    try {
      // Make a PATCH request to your backend route with the form data
      const response = await fetch('/api/inscreption', {
        method: 'PATCH', 
        headers: {
          'Content-Type': 'application/json' // Set content type to JSON
        },
        body: JSON.stringify({updatedFields:formData,email:session?.user?.email}) 
      });
  
      // Check if the request was successful
      if (response.ok) {
        routers.replace('/Home');
      } else {
        console.error('Failed to update profile');
      }
    } catch (error) {
      // Handle error if the request fails (e.g., show an error message)
      console.error('Error updating profile:', error);
    }
  };
  
  return (
    <main className={styles.main}>
    <div>
     

    {etape === 1 && (
        <div className={styles.container}> 
            <div className={styles.elements}>
            <div className="brand">
                <div className="logo">
                <img src={logo.src} alt="Logo" className="logo" />
                </div>
                <div className="project-name">
                <h3>TrackFit</h3>
                </div>
            </div>
                <div className={styles.text}>
                    <h1>Welcome! Let's customize TrackFit together based on your goals.</h1>
                </div>
                <div>
                    <button onClick={handleNext} className={styles.button}>Let's do it !</button>
                </div>
            </div>
        </div>
      )}

  {etape === 2 && (
                    <div className={styles.container}>
                        <form className={styles.form} onSubmit={handleSubmit}>
                            <div className={styles.text}>
                                <h1>Additional Information</h1>
                                <p>Let's gather some additional information about you.</p>
                            </div>
                            <div className={styles.inputBox}>
                                <span className={styles.details}>Height (Cm)</span>
                                <input
                                    type="text"
                                    placeholder="Enter your height"
                                    value={height}
                                    onChange={(e) => setHeight(e.target.value)}
                                />
                                {errors.height && <div className={styles.error}>{errors.height}</div>}
                            </div>
                            <div className={styles.inputBox}> 
                                <span className={styles.details}>Weight (Kg)</span>
                                <input
                                    type="text"
                                    placeholder="Enter your weight"
                                    value={weight}
                                    onChange={(e) => setWeight(e.target.value)}
                                    
                                />
                                {errors.weight && <div className={styles.error}>{errors.weight}</div>}
                            </div>
                            <div className={styles.inputBox}>
                                <span className={styles.details}>Date of Birth</span>
                                <Datetime
                                  value={selectedDate}
                                  onChange={handleDateChange}
                                  inputProps={{ placeholder: 'Select Date'}} // Customize input field size

                                  timeFormat={false}
                                />


                            </div>
                            <div className={styles.inputBox}>
                                <span className={styles.details}>Gender</span>
                                <div className={styles.radioGroup}>
                                    <label>
                                        <input
                                            type="radio"
                                            name="gender"
                                            value="Male"
                                            checked={gender === 'Male'}
                                            onChange={() => setGender('Male')}
                                        />
                                        Male
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            name="gender"
                                            value="Female"
                                            checked={gender === 'Female'}
                                            onChange={() => setGender('Female')}
                                        />
                                        Female
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            name="gender"
                                            value="other"
                                            checked={gender === 'other'}
                                            onChange={() => setGender('other')}
                                        />
                                        Other
                                    </label>
                                </div>
                                {errors.gender && <div className={styles.error}>{errors.gender}</div>}
                            </div>
                            <nav className={styles.nav}>
                                <button onClick={handlePrev}>Retour</button>
                                <button onClick={handleNext}>Suivant</button>
                            </nav>
                        </form>
                    </div>
                )}

      {etape === 3 && (
        <div className={styles.container}>
        <form className={styles.form}>
            <div className={styles.text}>
                <h1>Thank you, FirstName!</h1>
                <p>Let's now focus on your goals.</p>
            </div>
            <div className={styles.text}>
                <p>Select up to 2 elements that are important to you, including a weight-related goal.</p>
            </div>
            <div className={styles.checkboxGroup}>
                <label>
                    <input type="checkbox" name="goal" value="lose_weight" 
                    checked={selectedGoals.includes('lose_weight')}
                    onChange={() => handleCheckboxChange('lose_weight')}/>
                    Lose weight
                </label>
                <label>
                    <input type="checkbox" name="goal" value="maintain_weight" 
                    checked={selectedGoals.includes('maintain_weight')}
                    onChange={() => handleCheckboxChange('maintain_weight')}/>
                    Maintain weight
                </label>
                <label>
                    <input type="checkbox" name="goal" value="gain_weight" 
                    checked={selectedGoals.includes('gain_weight')}
                    onChange={() => handleCheckboxChange('gain_weight')}/>
                    Gain weight
                </label>
                <label>
                    <input type="checkbox" name="goal" value="build_muscle" 
                    checked={selectedGoals.includes('build_muscle')}
                    onChange={() => handleCheckboxChange('build_muscle')}/>
                    Build muscle
                </label>
                <label>
                    <input type="checkbox" name="goal" value="modify_diet" 
                    checked={selectedGoals.includes('modify_diet')}
                    onChange={() => handleCheckboxChange('modify_diet')}/>
                    Modify my diet
                </label>
                <label>
                    <input type="checkbox" name="goal" value="manage_stress" 
                    checked={selectedGoals.includes('manage_stress')}
                    onChange={() => handleCheckboxChange('manage_stress')}/>
                    Manage stress
                </label>
            </div>
            <nav className={styles.nav}>
                <button onClick={handlePrev}>Back</button>
                <button onClick={handleNext}>Next</button>
            </nav>
            </form>
        </div>
        
      )}{etape === 4 && (
        <div className={styles.container}>
      <form className={styles.form}>
        <div className={styles.text}>
          <h1>One more thing</h1>
          <p>What is your baseline activity level? Excluding workouts (they are calculated separately).</p>
        </div>
        
        <ToggleButtonGroup
        value={activityLevel}
        exclusive
        onChange={(event, newActivityLevel) => handleActivityLevelChange(newActivityLevel)}
        orientation="vertical"
        >
        <ToggleButton value="sedentary">
            <div>
            <p>Sedentary</p>
            <p>You spend most of the day in a seated position (e.g., office job, desk work).</p>
            </div>
        </ToggleButton>
        <ToggleButton value="lightly_active">
            <div>
            <p>Lightly Active</p>
            <p>Some exercise or sports 1 to 3 days per week.</p>
            </div>
        </ToggleButton>
        <ToggleButton value="moderately_active">
            <div>
            <p>Moderately Active</p>
            <p>Moderate exercise or sports 3 to 5 days per week.</p>
            </div>
        </ToggleButton>
        <ToggleButton value="very_active">
            <div>
            <p>Very Active</p>
            <p>Intense exercise or sports 6 to 7 days per week.</p>
            </div>
        </ToggleButton>
        </ToggleButtonGroup>

        <nav className={styles.nav}>
          <button onClick={handlePrev}>Back</button>
          <button onClick={handleNext}>Next</button>
        </nav>
      </form>
    </div>
        )
    }
     {etape === 5 && (
  <div className={styles.container}>
    <form className={styles.form}>
      <div className={styles.text}>
        <h1>One more thing</h1>
        <p>What is your preferred diet?</p>
      </div>
      
      <ToggleButtonGroup
        value={dietPreference}
        exclusive
        onChange={(event, newDietPreference) => handleDietPreferenceChange(newDietPreference)}
        orientation="vertical"
      >
        <ToggleButton value="balanced">
          <div>
            <p>Balanced</p>
            <p>A balanced mix of carbohydrates, proteins, and fats.</p>
          </div>
        </ToggleButton>
        <ToggleButton value="low_carb">
          <div>
            <p>Low Carb</p>
            <p>Emphasizes protein and healthy fats, with limited carbohydrates.</p>
          </div>
        </ToggleButton>
        <ToggleButton value="low_fat">
          <div>
            <p>Low Fat</p>
            <p>Focuses on reducing fat intake, with moderate carbohydrates and proteins.</p>
          </div>
        </ToggleButton>
        <ToggleButton value="vegetarian">
          <div>
            <p>Vegetarian</p>
            <p>Excludes meat and fish, but includes dairy and plant-based foods.</p>
          </div>
        </ToggleButton>
        <ToggleButton value="vegan">
          <div>
            <p>Vegan</p>
            <p>Excludes all animal products, including dairy and eggs, focusing solely on plant-based foods.</p>
          </div>
        </ToggleButton>
      </ToggleButtonGroup>

      <nav className={styles.nav}>
        <button onClick={handlePrev}>Back</button>
        <button onClick={handleNext}>Next</button>
      </nav>
    </form>
  </div>
)}

    
    
    {etape === 6 && (

      <div className={styles.container}>
        <form onSubmit={handleSubmitdata}>

        <div className={styles.text}>
          <h1>Thank you, {prenom} {nom}!</h1>
          <p>Your information has been successfully recorded.</p>
          <p>Press the button below to access your account.</p>
        </div>
        <div className={styles.nav}>
          <button type='submit'>Access My Account</button>
        </div>
        </form>

      </div>
    )}

    </div>
    </main>
  );
};
 
export default inscription;