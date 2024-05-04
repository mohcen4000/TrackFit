import connect from "@/db";
import ProfileModel from "@/models/ProfileModel";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import bcrypt from "bcryptjs";

// Endpoint POST pour changer le mot de passe de l'utilisateur
export const POST = async (request) => {
  try {
    // Récupérer la session de l'utilisateur en passant authOptions comme argument
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("Utilisateur non authentifié", { status: 401 });
    }

    // Récupérer l'ID de l'utilisateur à partir de la session
    const userId = session.user.id;

    // Extraire les nouveaux mots de passe du corps de la requête
    const { newPassword, confirmPassword } = await request.json();

    // Vérifier si les mots de passe sont identiques
    if (newPassword !== confirmPassword) {
      return new NextResponse("Les mots de passe ne correspondent pas", { status: 400 });
    }

    // Hacher le nouveau mot de passe
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Établir la connexion à la base de données
    await connect();

    // Mettre à jour le mot de passe dans le profil de l'utilisateur
    const updatedProfile = await ProfileModel.findByIdAndUpdate(
      {_id : userId},
      { password: hashedPassword },
      { new: true }
    );

    if (!updatedProfile) {
      return new NextResponse("Profil non trouvé", { status: 404 });
    }

    // Retourner une réponse réussie avec le statut 200
    return new NextResponse(JSON.stringify(updatedProfile), { status: 200 });
  } catch (error) {
    // Retourner une réponse d'erreur avec le statut 500 en cas d'erreur
    return new NextResponse("Erreur lors du changement de mot de passe : " + error, { status: 500 });
  }
};
