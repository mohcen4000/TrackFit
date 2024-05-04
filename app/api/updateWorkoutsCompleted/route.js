import connect from "@/db";
import ProfileModel from "@/models/ProfileModel";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

// Endpoint GET pour récupérer les workoutsCompleted
export const GET = async (request) => {
    try {
        // Récupérer la session de l'utilisateur
        const session = await getServerSession({ req: request });

        if (!session) {
            return new NextResponse("Utilisateur non authentifié", { status: 401 });
        }

        // Récupérer l'email de l'utilisateur à partir de la session
        const userEmail = session.user.email;

        // Établir la connexion à la base de données
        await connect();

        // Récupérer le profil de l'utilisateur dans la collection Profiles en utilisant l'email
        const userProfile = await ProfileModel.findOne({ email: userEmail });

        // Vérifier si le profil de l'utilisateur existe
        if (!userProfile) {
            return new NextResponse("Profil non trouvé", { status: 404 });
        }

        // Récupérer les workoutsCompleted du profil utilisateur
        const workoutsCompleted = userProfile.workoutsCompleted;

        // Retourner les workoutsCompleted au format JSON avec le statut 200
        return new NextResponse(JSON.stringify(workoutsCompleted), { status: 200 });
    } catch (error) {
        // Retourner une réponse d'erreur avec le statut 500 en cas d'erreur
        return new NextResponse("Erreur lors de la récupération des workoutsCompleted : " + error, { status: 500 });
    }
};

// Endpoint POST pour ajouter ou supprimer un exercice de workoutsCompleted
export const POST = async (request) => {
    try {
        // Récupérer la session de l'utilisateur
        const session = await getServerSession({ req: request });

        if (!session) {
            return new NextResponse("Utilisateur non authentifié", { status: 401 });
        }

        // Récupérer l'email de l'utilisateur à partir de la session
        const userEmail = session.user.email;

        // Établir la connexion à la base de données
        await connect();

        // Récupérer le profil de l'utilisateur dans la collection Profiles en utilisant l'email
        const userProfile = await ProfileModel.findOne({ email: userEmail });

        // Vérifier si le profil de l'utilisateur existe
        if (!userProfile) {
            return new NextResponse("Profil non trouvé", { status: 404 });
        }

        // Récupérer les données envoyées dans la requête POST
        const { workoutId, completed } = await request.json();



        // Valider les données de la requête
        if (!workoutId) {
            return new NextResponse("ID de l'entraînement manquant", { status: 400 });
        }

        if (completed) {
            // Ajouter l'exercice à la collection workoutsCompleted du profil utilisateur
            userProfile.workoutsCompleted.push({ workoutId, date: new Date() });
        } else {
            // Supprimer l'exercice de la collection workoutsCompleted du profil utilisateur
            userProfile.workoutsCompleted = userProfile.workoutsCompleted.filter((exercise) => exercise.workoutId !== workoutId);
        }

        // Enregistrer les modifications du profil utilisateur
        await userProfile.save();

        // Retourner une réponse indiquant que l'exercice a été ajouté ou supprimé avec succès
        return new NextResponse("Exercice mis à jour avec succès", { status: 200 });
    } catch (error) {
        // Retourner une réponse d'erreur avec le statut 500 en cas d'erreur
        return new NextResponse("Erreur lors de la mise à jour de l'exercice : " + error, { status: 500 });
    }
};
