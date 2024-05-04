'use client'
import React, { useState } from 'react';
import Title from "@/app/Components/Head";
import Sidebar from '@/app/Components/Sidebar';

function AddMeal() {

    const [name, setName] = useState('');
   const [image, setImage] = useState('');
   const [mealImages, setMealImages] = useState([]);
   const [protein, setProtein] = useState('');
   const [carbs, setCarbs] = useState('');
   const [fats, setFats] = useState('');
   const [ingredients, setIngredients] = useState([]);
   const [seasoning, setSeasoning] = useState('');
   const [cookingInstructions, setCookingInstructions] = useState('');
   const [tags, setTags] = useState([]);
 
   const handleMealImagesChange = (e) => {
     setMealImages(Array.from(e.target.files));
   };
 
   const handleIngredientsChange = (e) => {
     setIngredients(e.target.value.split(',').map(item => item.trim()));
   };
 
   const handleTagsChange = (e) => {
     setTags(e.target.value.split(',').map(tag => tag.trim()));
   };
 
   const handleSubmit = (e) => {
     e.preventDefault();
 
     const formData = {
       name,
       image,
       mealImages, 
       protein,
       carbs,
       fats,
       ingredients,
       seasoning,
       cookingInstructions: cookingInstructions.split('.').map(step => step.trim()), 
       tags,
     };
 
    
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
                  <input type="text" placeholder="Enter meal name" />
                </div>
                <div className="input-box">
                  <span className="details">Main Image URL</span>
                  <input type="text" placeholder="Enter main image URL" />
                </div>
                <div className="input-box">
                  <span className="details">Meal Images URLs</span>
                  <input type="text" placeholder="Enter meal images URLs, separated by commas" />
                </div>
                <div className="input-box">
                  <span className="details">Protein</span>
                  <input type="text" placeholder="Protein content (g)" />
                </div>
                <div className="input-box">
                  <span className="details">Carbs</span>
                  <input type="text" placeholder="Carbs content (g)" />
                </div>
                <div className="input-box">
                  <span className="details">Fats</span>
                  <input type="text" placeholder="Fats content (g)" />
                </div>
                <div className="input-box">
                  <span className="details">Ingredients</span>
                  <input type="text" placeholder="List ingredients, separated by commas" />
                </div>
                <div className="input-box">
                  <span className="details">Seasoning</span>
                  <input type="text" placeholder="Seasoning used" />
                </div>
                <div className="input-box">
                  <span className="details">Cooking Instructions</span>
                  <textarea placeholder="Enter cooking instructions, separated by periods" style={{ height: '120px', width: '100%' }}></textarea>
                </div>
                <div className="input-box">
                  <span className="details">Tags</span>
                  <input type="text" placeholder="Enter tags, separated by commas" />
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
