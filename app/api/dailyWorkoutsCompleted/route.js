import connect from "@/db";
import DailyWorkout from "@/models/DailyWorkout";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

// Endpoint GET pour récupérer les dailyWorkouts du même jour pour un utilisateur connecté
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

        // Rechercher les dailyWorkouts du même jour pour l'utilisateur dans la base de données
        const dailyWorkouts = await DailyWorkout.find({ userId: userId, date: { $gte: startOfDay, $lt: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1) } });

        // Retourner les dailyWorkouts au format JSON avec le statut 200
        return new NextResponse(JSON.stringify(dailyWorkouts), { status: 200 });
    } catch (error) {
        // Retourner une réponse d'erreur avec le statut 500 en cas d'erreur
        return new NextResponse("Erreur lors de la récupération des dailyWorkouts : " + error, { status: 500 });
    }
};


// Endpoint POST pour ajouter ou supprimer un dailyWorkout
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
        const { workoutId, completed } = await request.json();

        // Valider les données de la requête
        if (!workoutId) {
            return new NextResponse("ID de l'entraînement manquant", { status: 400 });
        }

        // Établir la connexion à la base de données
        await connect();

        // Vérifier si l'exercice a déjà été effectué le même jour
        const today = new Date();
        const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
        const existingWorkout = await DailyWorkout.findOne({ userId: userId, workoutId: workoutId, date: { $gte: startOfDay, $lt: endOfDay } });
        if (existingWorkout && completed) {
            // L'exercice a déjà été effectué aujourd'hui, donc pas besoin d'ajouter à nouveau
            return new NextResponse("L'exercice a déjà été effectué aujourd'hui", { status: 400 });
        }

        // Si l'exercice est à supprimer
        if (!completed && existingWorkout) {
            await DailyWorkout.deleteOne({ _id: existingWorkout._id });
        } else if (completed && !existingWorkout) {
            // Si l'exercice n'a pas été effectué aujourd'hui, l'ajouter à la base de données
            const newDailyWorkout = await DailyWorkout.create({ userId: userId, workoutId: workoutId, date: new Date() });
        }

        // Retourner une réponse indiquant que l'exercice a été ajouté ou supprimé avec succès
        return new NextResponse("DailyWorkout mis à jour avec succès", { status: 200 });
    } catch (error) {
        // Retourner une réponse d'erreur avec le statut 500 en cas d'erreur
        return new NextResponse("Erreur lors de la mise à jour du dailyWorkout : " + error, { status: 500 });
    }
};
