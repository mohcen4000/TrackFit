// File: pages/api/mealform.js
import connect from "@/db";
import MealModel from "@/models/MealModel"; // Ensure this path matches your actual model location
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs/promises';
import path from 'path';

export const config = {
  api: {
    bodyParser: false, // Important: This is needed to handle 'multipart/form-data' for file uploads
  },
};

export const POST = async (request) => {
  try {
    await connect(); // Establish database connection
    const formData = await request.formData();

    // Extract meal-specific data
    const name = formData.get('name');
    const protein = formData.get('protein');
    const carbs = formData.get('carbs');
    const fats = formData.get('fats');
    const ingredients = formData.getAll('ingredients');
    const seasoning = formData.get('seasoning');
    const cookingInstructions = formData.getAll('cookingInstructions');
    const tags = formData.getAll('tags');

    // Handle the main image upload
    const mainImageFile = formData.get('image');
    let mainImagePath = '';
    if (mainImageFile && mainImageFile instanceof File) {
      const uniqueFilename = `${uuidv4()}.jpg`; // Adjust file extension based on actual file type if necessary
      const savePath = path.join('public', 'images', 'Meals', uniqueFilename);
      const fileContent = await mainImageFile.arrayBuffer();
      await fs.writeFile(savePath, Buffer.from(fileContent));
      mainImagePath = `/images/Meals/${uniqueFilename}`;
    }

    // Handle multiple meal images upload
    const mealImageFiles = formData.getAll('mealImages');
    let mealImagePaths = [];
    for (const imageFile of mealImageFiles) {
      if (imageFile instanceof File) {
        const uniqueFilename = `${uuidv4()}.jpg`; // Adjust file extension based on actual file type if necessary
        const savePath = path.join('public', 'images', 'Meals', uniqueFilename);
        const fileContent = await imageFile.arrayBuffer();
        await fs.writeFile(savePath, Buffer.from(fileContent));
        mealImagePaths.push(`/images/Meals/${uniqueFilename}`);
      }
    }

    // Create and save the meal document in the database
    const mealDocument = new MealModel({
      name,
      image: mainImagePath, // Main image path
      mealImages: mealImagePaths, // Paths of additional meal images
      protein,
      carbs,
      fats,
      ingredients,
      seasoning,
      cookingInstructions,
      tags,
    });

    const savedMeal = await mealDocument.save();

    return new NextResponse(JSON.stringify(savedMeal), { status: 200, headers: { "Content-Type": "application/json" } });
  } catch (error) {
    console.error('API uploadMeal: Error:', error);
    return new NextResponse("Internal Server Error: " + error.message, { status: 500 });
  }
};
