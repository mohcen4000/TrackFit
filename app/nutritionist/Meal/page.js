'use client'
import React, { useState } from 'react';
import Title from "@/app/Components/Head";
import Sidebar from '@/app/Components/Sidebar';
import Select from 'react-select';

function AddMeal() {

    const [name, setName] = useState('');
    const [image, setImage] = useState(null); 
    const [mealImages, setMealImages] = useState([]);
   const [protein, setProtein] = useState('');
   const [carbs, setCarbs] = useState('');
   const [fats, setFats] = useState('');
   const [ingredients, setIngredients] = useState([]);
   const [seasoning, setSeasoning] = useState('');
   const [cookingInstructions, setCookingInstructions] = useState('');
   const [tags, setTags] = useState([]); // This will now hold an array of objects
   const tagOptions = [
    { value: 'balanced', label: 'balanced' },
    { value: 'low-carb', label: 'low-carb' },
    { value: 'low-fat', label: 'low-fat' },
    { value: 'vegetarian', label: 'vegetarian' },
    { value: 'vegan', label: 'vegan' }
  ];
  

  const handleChange = (setter) => (e) => {
    setter(e.target.value);
};

const handleTagsChange = selectedOptions => {
  setTags(selectedOptions); // This already matches the expected format [{value, label}, ...]
};

  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // Assuming single file upload for main image
  };

  const handleMealImagesChange = (e) => {
    setMealImages(Array.from(e.target.files)); // For multiple file uploads
  };

 


  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    if (image) formData.append('image', image); 
    mealImages.forEach((file, index) => formData.append(`mealImages[${index}]`, file));
    formData.append('protein', protein);
    formData.append('carbs', carbs);
    formData.append('fats', fats);
    ingredients.forEach(ingredient => formData.append('ingredients', ingredient));
    formData.append('seasoning', seasoning);
    cookingInstructions.split('.').map(step => step.trim()).forEach((instruction, index) => formData.append(`cookingInstructions[${index}]`, instruction));
    const tagValues = tags.map(tag => tag.value); // Gets the value part of the tag object
    tagValues.forEach(tagValue => formData.append('tags', tagValue)); 

    try {
      const response = await fetch('/api/mealform', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        // Add any additional success handling here
      } else {
        console.error('Meal submission failed:', response.statusText);
        // Add any additional error handling here
      }
    } catch (error) {
      console.error('An error occurred:', error);
      // Add any additional error handling here
    }
  };

 

  return (
    <> 
    <div className="splitter">
      <Title />
      <Sidebar />
      <main>
        <div className="profile-container">
          <h1>Add New Meal</h1>
          <form onSubmit={handleSubmit} className="login-form">
            <div className="personal-info">
              <h2>Meal Details</h2>
              <div className="user-details">
              <div className="input-box">
  <span className="details">Meal Name</span>
  <input type="text" placeholder="Enter meal name" value={name} onChange={handleChange(setName)} />
</div>
                <div className="input-box">
                <span className="details">Main Image URL</span>
                <input type="file" onChange={handleImageChange} /> {/* Adjusted for file input */}
              </div>
              <div className="input-box">
                <span className="details">Meal Images URLs</span>
                <input type="file" multiple onChange={handleMealImagesChange} /> {/* Adjusted for multiple file input */}
              </div>
              <div className="input-box">
  <span className="details">Protein</span>
  <input type="text" placeholder="Protein content (g)" value={protein} onChange={handleChange(setProtein)} />
</div>
<div className="input-box">
  <span className="details">Carbs</span>
  <input type="text" placeholder="Carbs content (g)" value={carbs} onChange={handleChange(setCarbs)} />
</div>
<div className="input-box">
  <span className="details">Fats</span>
  <input type="text" placeholder="Fats content (g)" value={fats} onChange={handleChange(setFats)} />
</div>
<div className="input-box">
  <span className="details">Ingredients</span>
  <input type="text" placeholder="List ingredients, separated by commas" value={ingredients.join(', ')} onChange={(e) => setIngredients(e.target.value.split(',').map(ingredient => ingredient.trim()))} />
</div>
<div className="input-box">
  <span className="details">Cooking Instructions</span>
  <textarea placeholder="Enter cooking instructions, separated by periods" style={{ height: '120px', width: '100%' }} value={cookingInstructions} onChange={(e) => setCookingInstructions(e.target.value)}></textarea>
</div>
                <div className="input-box">
  <   span className="details">Seasoning</span>
  <input type="text" placeholder="Seasoning used" value={seasoning} onChange={handleChange(setSeasoning)} />
</div>
                
                <div className="input-box">
                  <span className="details">Tags</span>
                  <Select
                    value={tags}
                    onChange={handleTagsChange}
                    options={tagOptions}
                    isMulti
                    placeholder="Select tags"
                  />
                </div>
              </div>
            </div>
            <button className="profile-btn" type="submit">Add Meal</button>
          </form>
        </div>
      </main>
    </div>
  </>
  );
}

export default AddMeal;
