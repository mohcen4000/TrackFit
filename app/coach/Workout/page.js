'use client'
import React, { useState } from 'react';
import Title from "@/app/Components/Head";
import Sidebar from '@/app/Components/Sidebar';
import Select from 'react-select';

function AddWorkout() {
  const [title, setTitle] = useState('');
  const [reps, setReps] = useState('');
  const [sets, setSets] = useState('');
  const [targets, setTargets] = useState([]);
  const [level, setLevel] = useState('');
  const [description, setDescription] = useState('');
  const [activityLevel, setActivityLevel] = useState([]);
  const [goal, setGoal] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileE, setImageFileE] = useState(null);

  const handleGoalChange = selectedOptions => {
    setGoal(selectedOptions);
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };
  const handleImageChangeE = (e) => {
    setImageFileE(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('reps', reps);
    formData.append('sets', sets);
    formData.append('exerciseImages', imageFileE);
    targets.forEach(target => formData.append('targets', target));
    formData.append('level', level);
    formData.append('description', description);
    goal.forEach(g => formData.append('goal', g.value));
    activityLevel.forEach(level => formData.append('activityLevel', level));
    if (imageFile) formData.append('image', imageFile);

    try {
      const response = await fetch('/api/workoutform', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Form submitted successfully:', result);
      } else {
        console.error('Form submission failed:', response.statusText);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const goalOptions = [
    { value: 'lose-weight', label: 'Lose weight' },
    { value: 'maintain-weight', label: 'Maintain weight' },
    { value: 'gain-weight', label: 'Gain weight' },
    { value: 'build-muscle', label: 'Build muscle' },
    { value: 'modify-my-diet', label: 'Modify my diet' },
    { value: 'manage-stress', label: 'Manage stress' },
    { value: 'back', label: 'Back' }
  ];

  return (
    <> 
      <div className="splitter">
        <Title />
        <Sidebar />
        <main>
          <div className="profile-container">
            <h1>Add New Workout</h1>
            <form onSubmit={handleSubmit} className="login-form">
              <div className="personal-info">
                <div className="user-details">
                  <div className="input-box">
                    <span className="details">Title</span>
                    <input type="text" placeholder="Enter title" value={title} onChange={(e) => setTitle(e.target.value)} />
                  </div>
                  <div className="input-box">
                    <span className="details">Main Image</span>
                    <input type="file" onChange={handleImageChange} />
                  </div>
                  <div className="input-box">
                    <span className="details">Exercice image</span>
                    <input type="file" onChange={handleImageChangeE} />
                  </div>
                  <div className="input-box">
                    <span className="details">Reps</span>
                    <input type="text" placeholder="Enter reps" value={reps} onChange={(e) => setReps(e.target.value)} />
                  </div>
                  <div className="input-box">
                    <span className="details">Sets</span>
                    <input type="number" placeholder="Enter sets" value={sets} onChange={(e) => setSets(e.target.value)} />
                  </div>
                  <div className="input-box">
                    <span className="details">Targets</span>
                    <input type="text" placeholder="Enter targets, separated by commas" value={targets.join(', ')} onChange={(e) => setTargets(e.target.value.split(',').map(item => item.trim()))} />
                  </div>
                  <div className="input-box">
                    <span className="details">Level</span>
                    <input type="text" placeholder="Enter level" value={level} onChange={(e) => setLevel(e.target.value)} />
                  </div>
                  <div className="input-box">
                    <span className="details">Goal</span>
                    <Select
                      value={goal}
                      onChange={handleGoalChange}
                      options={goalOptions}
                      isMulti 
                    />
                  </div>
                  <div className="input-box">
                    <span className="details">Description</span>
                    <textarea placeholder="Enter description" value={description} style={{ height: '120px', width: '100%' }} onChange={(e) => setDescription(e.target.value)}></textarea>
                  </div>
                  <div className="input-box">
                    <span className="details">Activity Level</span>
                    <input type="text" placeholder="Enter activity level, separated by commas" value={activityLevel.join(', ')} onChange={(e) => setActivityLevel(e.target.value.split(',').map(item => item.trim()))} />
                  </div>
                </div>
              </div>
              <button className="profile-btn" type="submit">Add Workout</button>
            </form>
          </div>
        </main>
      </div>
    </>
  );
}

export default AddWorkout;
