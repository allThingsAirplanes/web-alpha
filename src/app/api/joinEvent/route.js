import {
    NextResponse
} from "next/server"

import {
    cookies
} from "next/headers"

import {
    connectMongo
} from "@/config/mongo.js"

import Event from "@/models/Event"
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
        const updatedEvent = await Event.findOneAndUpdate({
            _id: reqjson._id
        }, {
            $push: {
                registratns: {
                    user: session.data.id,
                    invite_status: "REGISTERED"
                }
            }
        }, {
            returnOriginal: false
        })
        console.log("Updated Event", updatedEvent)
        // const response = NextResponse.next()
        // response.cookies.set("auth", authToken, {})
        const resData={
            ...reqjson.event,

        }
        return NextResponse.json(updatedEvent)
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