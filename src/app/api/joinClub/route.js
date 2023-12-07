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
        const updatedClub = await Club.findOneAndUpdate({
            _id: reqjson._id
        }, {
            $push: {
                members: session.data.id
            }
        }, {
            returnOriginal: false
        })
        console.log("Updated Club", updatedClub)
        // const response = NextResponse.next()
        // response.cookies.set("auth", authToken, {})
        const resData={
            ...reqjson.club,

        }
        return NextResponse.json(updatedClub)
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