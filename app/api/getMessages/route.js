// pages/api/getAllMessages.js
import ProfileModel from "@/models/ProfileModel";
import connect from "@/db";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

export const GET = async (request) => {
  try {
    const session = await getServerSession({ req: request });

    if (!session) {
      return new NextResponse("Utilisateur non authentifié", { status: 401 });
    }

    // Retrieve the userID from the session
    const userEmail = session.user.email;

    // Ensure database connection is established
    await connect();

    // Fetch the user's profile using their email
    const profile = await ProfileModel.findOne({ email: userEmail });

    if (!profile) {
      return new NextResponse(JSON.stringify({ error: "Profile not found." }), {
        status: 404,
      });
    }

    // Access the Messages property directly
    const allMessages = profile.Messages || [];

    // Return all messages
    return new NextResponse(JSON.stringify(allMessages), { status: 200 });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Error: " + error.message }),
      { status: 500 }
    );
  }
};
