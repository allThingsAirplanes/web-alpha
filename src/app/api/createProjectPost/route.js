import {
    NextResponse
} from "next/server"

import {
    cookies
} from "next/headers"

import {
    connectMongo
} from "@/config/mongo.js"
import Post from "@/models/Post"
//where a GET request retrieves data from a server, a POST request sends data to the server

import { checkSession } from "@/utils/auth"

import Project from "@/models/Project"

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
        // const newPost = await new Post({
        //     content: reqjson.content,
        //     media_url: reqjson.media_url,
        //     author: session.data.id
        //     //only store the hash!!!!!!!!!!!!!!!!!!!!
        // }).save()
        const updatedProject = await Project.findOneAndUpdate({
            _id: reqjson.project._id,
            collaborators: session.data.id
        }, {
            $push: {
                posts: {
                    $each: [
                        {
                            title: reqjson.post.title,
                            content: reqjson.post.content,
                            category: reqjson.post.category,
                            media_url: reqjson.post.media_url,
                            author: session.data.id
                        }
                    ],
                    $position: 0
                }
            }
        }
        )
        console.log("Updated Project Contribution", updatedProject)
        // const response = NextResponse.next()
        // response.cookies.set("auth", authToken, {})
        return NextResponse.json(updatedProject)
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