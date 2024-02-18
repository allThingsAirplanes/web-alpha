import {
    NextResponse
} from "next/server"

import {
    cookies
} from "next/headers"

import {
    connectMongo
} from "@/config/mongo.js"
//where a GET request retrieves data from a server, a POST request sends data to the server

import { checkSession } from "@/utils/auth"

import Event from "@/models/Event"

export const dynamic = "force-dynamic"

export const revalidate = 0

export async function POST(req, res) {
    try {
        const session = await checkSession()
        if (!session) {
            return NextResponse.json({
                success: false,
                error_message: "Could not authenticate",
                data: null
            })
        }
        const reqjson = await req.json()
        await connectMongo()
        const updatedEvent = await Event.findOneAndUpdate({
            _id: reqjson.event._id, 
            event_host: session.data.id
            //it will only find the event update if it matches the specified ID of the event
            // and the user is the host of the event. 
        }, {
            $push: {
                announcements: {
                    $each: [
                        {
                            title: reqjson.announcement.title,
                            content: reqjson.announcement.content,
                            author: session.data.id
                        }
                    ],
                    $position: 0
                }
            }
        }
        )
        console.log("Updated Event Contribution", updatedEvent)
        // const response = NextResponse.next()
        // response.cookies.set("auth", authToken, {})
        return NextResponse.json(updatedEvent)
    } catch (error) {
        console.log("Error creating new post", error)
        //11000 is the MongoDB error for when there is a unique issue
        //400 error code means user error - they put in an username that already exists. 500 error code means that the developers did something wrong. 
        const serverErrorResponse = {
            success: false,
            error_message: "Something went wrong",
            error_code: 500
        }
        return NextResponse.json(serverErrorResponse, { status: 500 })
    }
}