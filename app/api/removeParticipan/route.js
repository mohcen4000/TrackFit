import EventModel from "@/models/EventModel";
import connect from "@/db";
import { NextResponse } from "next/server"; 
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const POST = async (request) => {
  
    try {
      const session = await getServerSession(authOptions);
      if (!session) {
        return new NextResponse("Utilisateur non authentifié", { status: 401 });
      }
  
      const userId = session.user.id;
  
      await connect();
  
      const { eventId } = await request.json();
  
      const event = await EventModel.findById(eventId);
  
      if (!event) {
        return new NextResponse("Événement introuvable", { status: 404 });
      }
  
      if (event.participants.includes(userId)) {
        // Remove participant from event
        event.participants = event.participants.filter(
          (participant) => participant !== userId
        );
        event.numberOfParticipants--;
  
        await event.save();
    
        return new NextResponse("Participant retiré avec succès", { status: 200 });
      } else {
        return new NextResponse("L'utilisateur n'est pas inscrit à l'événement", { status: 400 });
      }
    } catch (error) {
      console.error("Erreur lors de la suppression du participant :", error);
      return new NextResponse("Erreur de récupération " + error, { status: 500 });
    }
  };
  