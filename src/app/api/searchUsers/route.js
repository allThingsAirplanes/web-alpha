import {
    NextResponse
} from "next/server"

import {
    connectMongo
} from "@/config/mongo.js"

import User from "@/models/User"
//where a GET request retrieves data from a server, a POST request sends data to the server

import { checkSession } from "@/utils/auth"

export const dynamic = "force-dynamic"

export const revalidate = 0

export async function GET(req, res) {
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
        const {searchParams} = new URL (req.url)
        console.log(searchParams)
        const searchTerm = searchParams.get("q")
        const foundUsers = await User.find({
            // $text: {
            //     $search: searchTerm,
            //     $caseSensitive: false
            // }
            username: {
                $regex: `^${searchTerm}`, 
                $options: "i"
            }
        })
        console.log("Updated User", foundUsers)
        // const response = NextResponse.next()
        // response.cookies.set("auth", authToken, {})
        return NextResponse.json(foundUsers)
    } catch (error) {
        console.log("Error adding new friend", error)
        //11000 is the MongoDB error for when there is a unique issue
        //400 error code means user error - they put in an username that already exists. 500 error code means that the developers did something wrong. 
        const serverErrorResponse = {
            success: false,
            error_message: "Something went wrong",
            error_code: 500
        } 
        return NextResponse.json(serverErrorResponse, {status: 500})
    }
}