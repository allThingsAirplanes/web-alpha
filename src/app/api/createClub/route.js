import {
    NextResponse
} from "next/server"

import {
    cookies
} from "next/headers"

import {
    connectMongo
} from "@/config/mongo.js"

import Club from "@/models/Club"
//where a GET request retrieves data from a server, a POST request sends data to the server

import { checkSession } from "@/utils/auth"

export const dynamic = "force-dynamic"

export const revalidate = 0

export async function POST(req, res) {
    try {
        const reqjson = await req.json()
        const session = await checkSession()
        if (!session) {
            return NextResponse.json({
                success: false,
                error_message: "Could not authenticate",
                data: null
            }) 
        } 
        await connectMongo()
        const newClub = await new Club({
            name: reqjson.name,
            club_picture: reqjson.club_picture,
            description: reqjson.description,
            members: [
                session.data.id
            ],
            type: reqjson.type,
            invite_status: "PUBLIC",
            //Later on, the invite status will be dynamic, but for now, it will just be all public. 
        }).save()
        console.log("New Club", newClub)
        // const response = NextResponse.next()
        // response.cookies.set("auth", authToken, {})
        return NextResponse.json(newClub)
    } catch (error) {
        console.log("Error creating new club", error)
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