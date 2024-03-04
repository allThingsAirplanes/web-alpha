import {
    NextResponse
} from "next/server"

import { connectMongo } from "@/config/mongo"

import Event from "@/models/Event"

import { checkSession } from "@/utils/auth"

export const dynamic = "force-dynamic"

export const revalidate = 0

export async function GET() {
    try {
        const session = await checkSession()
        if (!session) {
            return NextResponse.json({
                success: false,
                error_message: "Could not authenticate",
                data: null
            })
        }
        await connectMongo(

        ) 
        console.log("session ID", session.data.id)
        const events = await Event.find({
            "registratns.user": session.data.id
            //this should only get the clubs where the user is the member
        }).populate("announcements.author")
        const resData = events
        return NextResponse.json(resData)
    } catch (error) {
        console.log("Error with getting event announcements", error)
        const errorData = {
            success: false,
            error_code: 500,
            error_message: "Could not get clubs"
        }
        return NextResponse.json(errorData, {
            status: 500
        })
    }
}