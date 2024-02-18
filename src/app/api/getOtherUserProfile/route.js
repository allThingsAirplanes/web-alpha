import {
    NextResponse
} from "next/server"

import {
    connectMongo
} from "@/config/mongo.js"
import User from "@/models/User"

export const dynamic = "force-dynamic"

export const revalidate = 0

export async function GET(req) {
    try {
        const {searchParams} = new URL (req.url)
        console.log(searchParams)
        //these are going to be the search params that the user is going to give to us
        await connectMongo()
        const user = await User.find ({
            username: searchParams.get("username") || "" 
            //|| is an or. We are going to check if the searchParams has a username, and if they don't pass it in, we are going to pass it as an empty username
        }) 
        console.log("User", user)
        const successResponse = {
            success: true,
            data: user
        }
        //because we set the username to be unique, we can now search for users by their username
        return NextResponse.json(successResponse)
    } catch (error) {
        console.log("Error getting the profile data", error) 
        const errorResponse = {
            success: false,
            error_message: "Something went wrong" 
        }
        return NextResponse.json(errorResponse) 
    }
}

