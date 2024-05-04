// In your API route file (e.g., addMessages.js)
import connect from "@/db";
import Profiles from "@/models/ProfileModel"; // Assuming you have ProfileModel exported from your profile model file
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

export const POST = async (request) => {
  try {
    // Extract recipient's email and message from request body
    const { recipientEmail, message } = await request.json();
    // Establish connection to the database
    await connect();
    const session = await getServerSession({ req: request });

    if (!session) {
      return new NextResponse("Utilisateur non authentifié", { status: 401 });
    }

    // Retrieve the userID from the session
    const userEmail = session.user.email;
    // Find the profile by email
    const profile = await Profiles.findOne({ email: recipientEmail });
    // Check if the profile exists
    if (!profile) {
      return new NextResponse("Profile not found", { status: 404 });
    }

    // Push an object containing both sender's email and message to the Messages array
    profile.Messages.push({ sender: userEmail, message: message });

    // Update the message count
    profile.messageCount = profile.Messages.length;

    // Save the updated profile object
    await profile.save();

    // Return success response
    return new NextResponse("Message added successfully", { status: 200 });
  } catch (error) {
    // Return error response
    return new NextResponse("Error adding message: " + error.message, {
      status: 500,
    });
  }
};
