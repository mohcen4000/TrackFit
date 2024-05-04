import connect from "@/db";
import DailyMeal from "@/models/DailyMeal";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// Endpoint GET pour récupérer les dailyMeals du même jour pour un utilisateur connecté
export const GET = async () => {
    try {
        // Récupérer la session de l'utilisateur en passant authOptions comme argument
        const session = await getServerSession(authOptions);

        if (!session) {
            return new NextResponse("Utilisateur non authentifié", { status: 401 });
        }

        // Récupérer l'ID de l'utilisateur à partir de la session
        const userId = session.user.id;
        
        
        // Récupérer la date d'aujourd'hui
        const today = new Date();
        const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());

        // Établir la connexion à la base de données
        await connect();

        // Rechercher les dailyMeals du même jour pour l'utilisateur dans la base de données
        const dailyMeals = await DailyMeal.find({ userId: userId, date: { $gte: startOfDay, $lt: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1) } });

        // Retourner les dailyMeals au format JSON avec le statut 200
        return new NextResponse(JSON.stringify(dailyMeals), { status: 200 });
    } catch (error) {
        // Retourner une réponse d'erreur avec le statut 500 en cas d'erreur
        return new NextResponse("Erreur lors de la récupération des dailyMeals : " + error, { status: 500 });
    }
};

// Endpoint POST pour ajouter ou supprimer un dailyMeal
export const POST = async (request) => {
    try {
        // Récupérer la session de l'utilisateur
        const session = await getServerSession(authOptions);

        if (!session) {
            return new NextResponse("Utilisateur non authentifié", { status: 401 });
        }

        // Récupérer l'ID de l'utilisateur à partir de la session
        const userId = session.user.id;

        // Récupérer les données envoyées dans la requête POST
        const { mealId, completed } = await request.json();

        // Valider les données de la requête
        if (!mealId) {
            return new NextResponse("ID du repas manquant", { status: 400 });
        }

        // Établir la connexion à la base de données
        await connect();

        // Vérifier si le repas a déjà été consommé le même jour
        const today = new Date();
        const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
        const existingMeal = await DailyMeal.findOne({ userId: userId, mealId: mealId, date: { $gte: startOfDay, $lt: endOfDay } });

        if (existingMeal && completed) {
            // Le repas a déjà été consommé aujourd'hui, donc pas besoin d'ajouter à nouveau
            return new NextResponse("Le repas a déjà été consommé aujourd'hui", { status: 400 });
        }

        // Si le repas est à supprimer
        if (!completed && existingMeal) {
            await DailyMeal.deleteOne({ _id: existingMeal._id });
        } else if (completed && !existingMeal) {
            // Si le repas n'a pas été consommé aujourd'hui, l'ajouter à la base de données
            await DailyMeal.create({ userId: userId, mealId: mealId, date: new Date() });
        }

        // Retourner une réponse indiquant que le repas a été ajouté ou supprimé avec succès
        return new NextResponse("DailyMeal mis à jour avec succès", { status: 200 });
    } catch (error) {
        // Retourner une réponse d'erreur avec le statut 500 en cas d'erreur
        return new NextResponse("Erreur lors de la mise à jour du dailyMeal : " + error, { status: 500 });
    }
};
