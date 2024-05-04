import connect from "@/db";
import ProfileModel from "@/models/ProfileModel";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import fs from 'fs/promises';

export const POST = async (request) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new NextResponse("Utilisateur non authentifié", { status: 401 });
    }

    const userId = session.user.id;
    const formData = await request.formData();
    const profileImage = formData.get('image');
    
    if (!profileImage) {
      return new NextResponse("Aucune image sélectionnée", { status: 400 });
    }

    await connect();

    const filePath = `/images/profileImages/${userId}.jpg`;

    // Lire le contenu du fichier
    const fileContent = await profileImage.arrayBuffer();

    // Écrire le contenu du fichier dans un nouveau fichier sur le serveur
    await fs.writeFile(`public${filePath}`, Buffer.from(fileContent));
    const updatedProfile = await ProfileModel.findOneAndUpdate(
      { _id: userId },
      { profileImage: filePath },
      { new: true }
    );

    if (!updatedProfile) {
      return new NextResponse("Profil non trouvé", { status: 404 });
    }

    return new NextResponse(JSON.stringify(updatedProfile), { status: 200 });
  } catch (error) {
    console.error('API uploadProfileImage: Error:', error);
    return new NextResponse("Erreur lors de la mise à jour de l'image de profil : " + error, { status: 500 });
  }
};
