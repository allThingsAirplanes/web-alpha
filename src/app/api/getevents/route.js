import {
    NextResponse
} from "next/server"

import { connectMongo } from "@/config/mongo"

import Event from "@/models/Event"

export const dynamic = "force-dynamic"

export const revalidate = 0

export async function GET() {
    try {
        await connectMongo(

        ) 
        const events = await Event.find({

        }).populate(
            
        ).sort({createdAt: -1})
        const resData = events 
        return NextResponse.json(resData)
    } catch (error) {
        console.log("Error with getting all events", error)
        const errorData = {
            success: false,
            error_code: 500,
            error_message: "Could not get events"
        }
        return NextResponse.json(errorData, {
            status: 500
        })
    }
}