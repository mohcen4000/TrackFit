import MealModel from "@/models/MealModel";
import ProfileModel from "@/models/ProfileModel";
import connect from "@/db";
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server";


export const GET = async (request) => {
    try {
        // Récupérer la session de l'utilisateur
        const session = await getServerSession({ req: request });
 
        if (!session) {
            return new NextResponse("Utilisateur non authentifié", { status: 401 });
        }
 
        // Récupérer l'userID à partir de la session
        const userEmail = session.user.email;

        // Établir la connexion à la base de données
        await connect();

        // Récupérer le profil de l'utilisateur dans la collection Profiles en utilisant l'userName
        const userProfile = await ProfileModel.findOne({ email: userEmail });

        // Récupérer la préférence alimentaire de l'utilisateur à partir du profil
        const mealPreference = userProfile ? userProfile.mealPreference : null;

        // Construire la requête en fonction de la préférence alimentaire de l'utilisateur
        const query = mealPreference ? { tags: mealPreference } : {};

        // Récupérer les repas de la base de données en fonction de la requête
        const meals = await MealModel.find(query);

        // Vérifier si des repas ont été trouvés
        if (meals.length > 0) {
            // Retourner les repas au format JSON avec le statut 200 s'ils sont trouvés
            return new NextResponse(JSON.stringify(meals), { status: 200 });
        } else {
            // Retourner un message indiquant qu'aucun repas n'a été trouvé avec le statut 404
            return new NextResponse("Aucun repas trouvé", { status: 404 });
        }
    } catch (error) {
        // Retourner une réponse d'erreur avec le statut 500 en cas d'erreur
        return new NextResponse("Erreur de récupération : " + error, { status: 500 });
    }
};