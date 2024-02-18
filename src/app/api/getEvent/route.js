import {
    NextResponse
} from "next/server"

import { connectMongo } from "@/config/mongo"

import Event from "@/models/Event"

import { checkSession } from "@/utils/auth"

export const dynamic = "force-dynamic"

export const revalidate = 0

export async function GET(request) {
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
        const { searchParams } = new URL(request.url);
        const slug = searchParams.get('slug');
        const event = await Event.findOne({
            slug
            //if the key and the value match, then we can get rid of the 
            //value on the left (used to be slug: slug)  
        }).populate([{
            path: "organizers.user"
        }, {
            path: "event_host"
        }, {
            path: "announcements"
        }]).sort({ createdAt: -1 })
        const resData = event
        return NextResponse.json(resData)
    } catch (error) {
        console.log("Error with getting event", error)
        const errorData = {
            success: false,
            error_code: 500,
            error_message: "Could not get event"
        }
        return NextResponse.json(errorData, {
            status: 500
        })
    }
}