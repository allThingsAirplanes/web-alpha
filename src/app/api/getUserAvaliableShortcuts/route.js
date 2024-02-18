import {
    NextResponse
} from "next/server"

import { connectMongo } from "@/config/mongo"

import Club from "@/models/Club"

import Event from "@/models/Event"

import Project from "@/models/Project"

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
        const clubs = await Club.find({
            members: session.data.id
            //this should only get the clubs where the user is the member
        }) 
        const events = await Event.find({
            $or: [
                {
                    event_host: session.data.id
                },
                {
                    registrants: session.data.id
                }
            ]
        })
        const projects = await Project.find({
            $or: [
                {
                    project_creator: session.data.id
                },
                {
                    collaborators: {
                        user: session.data.id
                    }
                }
            ]
        })
        const resData = {
            clubs, events, projects
        } 
        return NextResponse.json(resData)
    } catch (error) {
        console.log("Error with getting all clubs", error)
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