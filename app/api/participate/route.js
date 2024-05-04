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
  
      // Analyser le corps de la requête pour obtenir eventId
      const { eventId } = await request.json(); // Obtenez eventId à partir du corps de la requête
  
      // Rechercher l'événement dans la base de données
      const event = await EventModel.findById(eventId);
  
      if (!event) {
        return new NextResponse("Événement introuvable", { status: 404 });
      }
  
      // Mettre à jour l'événement avec le nouveau participant
      event.participants.push(userId);
      event.numberOfParticipants++;
  
      // Enregistrer l'événement mis à jour dans la base de données
      await event.save();
  
      // Retourner une réponse de succès
      return new NextResponse("Participation réussie", { status: 200 });
    } catch (error) {
      // Journaliser les erreurs survenues lors de la mise à jour de l'événement
      console.error("Erreur lors de la mise à jour de l'événement :", error);
  
      // Retourner une réponse d'erreur avec le statut 500
      return new NextResponse("Erreur de récupération " + error, { status: 500 });
    }
  };
  