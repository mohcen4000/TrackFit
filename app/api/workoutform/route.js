import connect from "@/db"; // Assuming this connects to your MongoDB
import WorkoutModel from "@/models/WorkoutModel"; // The model for workouts
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs/promises'; // Correct import for fs with promise support
import path from 'path'; // Import the path module
export const POST = async (request) => {
  try {
    const formData = await request.formData();

    const title = formData.get('title');
    const reps = formData.get('reps');
    const sets = formData.get('sets');
    const targets = formData.getAll('targets');
    const level = formData.get('level');
    const description = formData.get('description');
    const goals = formData.getAll('goal');
    const activityLevels = formData.getAll('activityLevel');
    const image = formData.get('image'); // Handling the image is separate

    await connect();
    // Handle the image file
    const imageFile = formData.get('image');
    const imageFileE = formData.get('exerciseImages');
    let filePathE;
    let filePath;

    if (imageFile) {
      // Generate a unique filename for the image
      const uniqueFilename = `${uuidv4()}.jpg`; // You might want to adjust the file extension based on the actual file type

      // Specify the path where the image will be saved (e.g., 'public/images/workouts/')
      const savePath = path.join('public', 'images', 'workouts', uniqueFilename);

      // Convert the image file to a Buffer and write it to the filesystem
      const fileContent = await imageFile.arrayBuffer();
      await fs.writeFile(savePath, Buffer.from(fileContent));

      // Construct the filePath or URL to be stored in the database
      filePath = `/images/workouts/${uniqueFilename}`; // Adjust the base path as needed
    }

    if (imageFileE) {
        // Generate a unique filename for the image
        const uniqueFilenameE = `${uuidv4()}.jpg`; // You might want to adjust the file extension based on the actual file type
  
        // Specify the path where the image will be saved (e.g., 'public/images/workouts/')
        const savePathE = path.join('public', 'images', 'workouts', uniqueFilenameE);
  
        // Convert the image file to a Buffer and write it to the filesystem
        const fileContent = await imageFile.arrayBuffer();
        await fs.writeFile(savePathE, Buffer.from(fileContent));
  
        // Construct the filePath or URL to be stored in the database
        filePathE = `/images/workouts/${uniqueFilenameE}`; // Adjust the base path as needed
      }

    // Create and save the workout document, including the image filePath if available
    const workoutDocument = new WorkoutModel({
        title,
        reps,
        targets,
        level,
        description,
        goal:goals,
        activityLevels,
        exerciseImages:filePathE,
        image: filePath, // This is the path you'll store in the DB
    });

    const savedWorkout = await workoutDocument.save();

    return new NextResponse(JSON.stringify(savedWorkout), { status: 200, headers: { "Content-Type": "application/json" } });
  } catch (error) {
    console.error('API uploadWorkout: Error:', error);
    return new NextResponse("Internal Server Error: " + error, { status: 500 });
  }
};
