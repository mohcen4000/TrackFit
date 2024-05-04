import connect from "@/db";
import MealModel from "@/models/MealModel";
import { NextResponse } from "next/server";

export const POST = async (request) => {
    try {
        // Récupérer les données de la requête
        const { mealIds } = await request.json();

        // Vérifier si mealIds est un tableau
        if (!Array.isArray(mealIds)) {
            return new NextResponse("mealIds doit être un tableau", { status: 400 });
        }

        // Établir la connexion à la base de données
        await connect();

        // Rechercher les repas dans la base de données en fonction des IDs
        const meals = await MealModel.find({ _id: { $in: mealIds } });

        // Vérifier si des repas ont été trouvés
        if (meals.length > 0) {
            // Retourner les repas au format JSON avec le statut 200
            return new NextResponse(JSON.stringify(meals), { status: 200 });
        } else {
            // Retourner un message indiquant qu'aucun repas n'a été trouvé avec le statut 404
            return new NextResponse("Aucun repas trouvé pour ces IDs", { status: 404 });
        }
    } catch (error) {
        // Retourner une réponse d'erreur avec le statut 500 en cas d'erreur
        return new NextResponse("Erreur de récupération : " + error, { status: 500 });
    }
};
