import connect from "@/db";
import ProfileModel from "@/models/ProfileModel";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// Endpoint GET pour récupérer les détails du profil de l'utilisateur connecté
export const GET = async () => {
    try {
        // Récupérer la session de l'utilisateur en passant authOptions comme argument
        const session = await getServerSession(authOptions);

        if (!session) {
            return new NextResponse("Utilisateur non authentifié", { status: 401 });
        }

        // Récupérer l'ID de l'utilisateur à partir de la session
        const userId = session.user.id;

        // Établir la connexion à la base de données
        await connect();

        // Rechercher le profil de l'utilisateur dans la base de données
        const userProfile = await ProfileModel.findOne({ _id : userId });

        // Retourner le profil de l'utilisateur au format JSON avec le statut 200
        return new NextResponse(JSON.stringify(userProfile), { status: 200 });
    } catch (error) {
        // Retourner une réponse d'erreur avec le statut 500 en cas d'erreur
        return new NextResponse("Erreur lors de la récupération du profil : " + error, { status: 500 });
    }
};

// Endpoint POST pour mettre à jour les détails du profil de l'utilisateur
export const POST = async (request) => {
    try {
      const session = await getServerSession(authOptions);
  
      if (!session) {
        return new NextResponse("Utilisateur non authentifié", { status: 401 });
      }
  
      const userId = session.user.id;
      const {
        name,
        gender,
        height,
        weight,
        dateOfBirth,
      } = await request.json();
      
      await connect();  
      // Construct the update object
      const updateObj = {};
      if (name) updateObj.name = name;
      if (gender) updateObj.gender = gender;
      if (height) updateObj.height = height;
      if (weight) updateObj.weight = weight;
      if (dateOfBirth) updateObj.dateOfBirth = new Date(dateOfBirth); // Convert to Date object

      // Find the profile by user ID and update it
      const updatedProfile = await ProfileModel.findOneAndUpdate(
          { _id: userId },
          updateObj,
          { new: true }
      );
      
      if (!updatedProfile) {
        return new NextResponse("Profil non trouvé", { status: 404 });
      }
  
      return new NextResponse(JSON.stringify(updatedProfile), { status: 200 });
    } catch (error) {
      return new NextResponse(
        "Erreur lors de la mise à jour du profil : " + error,
        { status: 500 }
      );
    }
  };
