import MealModel from "@/models/MealModel";
import Profile from "@/models/ProfileModel"
import connect from "@/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs"
export const POST = async (request) => {
    try {
        await connect();
        const {name,email,password} = await request.json();
        const hashedPassword = await bcrypt.hash(password,10);
        await Profile.create({name,email,password:hashedPassword})
              
            return new NextResponse("User registred !", { status: 200 });

    } catch (error) {
        return new NextResponse("Fail to register " + error, { status: 500 });
    }
};
