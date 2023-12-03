import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { connectMongo } from "@/config/mongo"
import User from "@/models/User"
import { checkAuth } from "@/utils/auth"
export const POST = async() => {
    try {
        const userCookies = cookies()
        const authCookie = userCookies.get("auth")
        console.log("authCookie", authCookie)
        if (!authCookie || !authCookie.value) {
            return NextResponse.json({
                success: false,
                error_message: "Could not authenticate",
                data: null
            })
        }
        const verifiedJWT = await checkAuth(authCookie.value) 
        if (!verifiedJWT) {
            return NextResponse.json({
                success: false,
                error_message: "Could not authenticate",
                data: null
            })
        } 
        await connectMongo()
        const foundUser = await User.findOne({
            _id: verifiedJWT.data.id
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