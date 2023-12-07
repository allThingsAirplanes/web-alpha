import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { connectMongo } from "@/config/mongo"
import User from "@/models/User"
import { checkSession } from "@/utils/auth"
export const POST = async() => {
    try {
        const session = await checkSession()
        if (!session) {
            return NextResponse.json({
                success: false,
                error_message: "Could not authenticate",
                data: null
            })
        } 
        await connectMongo()
        const foundUser = await User.findOne({
            _id: session.data.id
        })
        const safeFoundUser = {
            ...foundUser._doc,
            password: undefined
        }
        return NextResponse.json({
            success: true,
            data: safeFoundUser
        })
        //this will return the user if they have a valid cookie adn we are able to find their id in Mongo
    } catch(error) {
        console.log("Error checking user authentication", error)
    }
}