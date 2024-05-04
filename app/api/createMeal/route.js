import WorkoutModel from "@/models/WorkoutModel"; // Adjust the path as necessary
import connect from "@/db";
import { NextResponse } from "next/server";

export const POST = async (request) => {
    try {
        await connect();
        const workoutData = await request.json();
        const workout = new WorkoutModel(workoutData);
        await workout.save();
        return new NextResponse("Workout added successfully", { status: 200 });
    } catch (error) {
        console.error("Failed to add workout:", error);
        return new NextResponse("Failed to add workout: " + error, { status: 500 });
    }
};
