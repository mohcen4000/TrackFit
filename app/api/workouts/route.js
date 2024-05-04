import connect from "@/db";
import ProfileModel from "@/models/ProfileModel";
import WorkoutModel from "@/models/WorkoutModel";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

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

        // Récupérer les objectifs et le niveau d'activité de l'utilisateur depuis le profil
        const { goal, activityLevel } = userProfile;




        // Construire la requête en fonction des objectifs et du niveau d'activité de l'utilisateur
        const query = {};

        // Si des objectifs sont définis, les ajouter à la requête
        if (goal && goal.length > 0) {
            query.goal = { $in: goal };
        }

        // Si un niveau d'activité est défini, l'ajouter à la requête
        if (activityLevel) {
            query.activityLevel = activityLevel;
        }

        // Récupérer les entraînements de la base de données en fonction de la requête
        const workouts = await WorkoutModel.find(query);


        // Vérifier si des entraînements ont été trouvés
        if (workouts.length > 0) {
            // Retourner les entraînements au format JSON avec le statut 200
            return new NextResponse(JSON.stringify(workouts), { status: 200 });
        } else {
            // Retourner un message indiquant qu'aucun entraînement n'a été trouvé avec le statut 404
            return new NextResponse("Aucun entraînement trouvé", { status: 404 });
        }
    } catch (error) {
        // Retourner une réponse d'erreur avec le statut 500 en cas d'erreur
        return new NextResponse("Erreur de récupération : " + error, { status: 500 });
    }
};
