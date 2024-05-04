import EventModel from "@/models/EventModel";
import connect from "@/db";
import { NextResponse } from "next/server";


export const GET = async (request) => {
    try {
        // Establish database connection
        await connect();

        // Retrieve events from the database
        const events = await EventModel.find({}); // Use lean() to convert mongoose documents to plain JavaScript objects

        // Check if events were found
        if (events.length > 0) {
            // Return the events as JSON with status 200
            return new NextResponse(JSON.stringify(events), { status: 200 });
        } else {
            // Return a message indicating no events found with status 404
            return new NextResponse("No events found", { status: 404 });
        }
    } catch (error) {
        // Return an error response with status 500
        return new NextResponse("fetch error " + error, { status: 500 });
    }

    
};
