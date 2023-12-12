import {
    NextResponse
} from "next/server"

import {
    cookies
} from "next/headers"

import {
    connectMongo
} from "@/config/mongo.js"

import Project from "@/models/Project"
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
        const randSlugNum = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1)
        const newProject = await new Project({
            name: reqjson.name,
            project_picture: reqjson.project_picture,
            description: reqjson.description,
            collaborators: [
                {
                    user: session.data.id,
                    role: "OWNER",
                    invite_status: "CONFIRMED"
                }
            ],
            project_creator: session.data.id,
            // members: [
            //     session.data.id
            // ],
            type: reqjson.type,
            invite_status: "PUBLIC",
            slug: slugify(`${reqjson.name.toLowerCase()} ${randSlugNum}`)
            //${} is how you inject js
            //Later on, the invite status will be dynamic, but for now, it will just be all public. 
        }).save()
        console.log("New Project", newProject)
        // const response = NextResponse.next()
        // response.cookies.set("auth", authToken, {})
        return NextResponse.json(newProject)
    } catch (error) {
        console.log("Error creating new project", error)
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