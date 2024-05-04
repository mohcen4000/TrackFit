import ProfileModel from "@/models/ProfileModel";
import connect from "@/db";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth"

export const GET = async (request) => {
    try {
        const session = await getServerSession({ req: request });
 
        if (!session) {
            return new NextResponse("Utilisateur non authentifié", { status: 401 });
        }
 
        // Récupérer l'userID à partir de la session
        const userEmail = session.user.email;
        await connect();
        const profile = await ProfileModel.findOne({ email:userEmail });
        if (!profile) {
            return new NextResponse(JSON.stringify({ error: "Profile not found." }), { status: 404 });
        }

        const isGenderNull = profile.gender === null || profile.gender === undefined;
        return new NextResponse(JSON.stringify({ isGenderNull }), { status: 200 });
    } catch (error) {
        return new NextResponse(JSON.stringify({ error: "Error: " + error.message }), { status: 500 });
    }
};
