import {
    NextResponse
} from "next/server"

import {
    cookies
} from "next/headers"

import {
    connectMongo
} from "@/config/mongo.js"

import User from "@/models/User"
//where a GET request retrieves data from a server, a POST request sends data to the server

import { checkSession } from "@/utils/auth"

import slugify from "slugify"

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
        const {clubs, events, projects} = reqjson
        const newShortcuts = []
        clubs.forEach((club) => {
            newShortcuts.push({
                picture: club.club_picture,
                name: club.name,
                link: `/clubs/${club.slug}`
            })
        })
        events.forEach((event) => {
            newShortcuts.push({
                picture: event.event_banner_picture,
                name: event.name,
                link: `/events/${event.slug}`
            })
        })
        projects.forEach((project) => {
            newShortcuts.push({
                picture: project.project_picture,
                name: project.name,
                link: `/projects/${project.slug}`
            })
        })
        console.log("New Shortcuts", newShortcuts)
        const updatedUser = await User.findOneAndUpdate({
            _id: session.data.id
        }, {
            $push: {
                dashboard_shortcuts: {
                    $each: newShortcuts
                }
            }
        }, {
            new: true
        })
        console.log("Updated user shortcuts", updatedUser)
        // const response = NextResponse.next()
        // response.cookies.set("auth", authToken, {}) 
        return NextResponse.json({success: true})
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