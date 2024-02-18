import {
    NextResponse
} from "next/server"

import {
    connectMongo
} from "@/config/mongo.js"
import Post from "@/models/Post"
//where a GET request retrieves data from a server, a POST request sends data to the server

import { checkSession } from "@/utils/auth"

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
        const reqjson=await req.json()
        await connectMongo()
        const updatedPost = await Post.findOneAndUpdate({
            _id: reqjson.post._id
        }, {
            $push: {
                comments: {
                    $each: [
                        //Mongo just decided to make their variables a dollar sign
                        {
                            content: reqjson.comment, 
                            author: session.data.id
                        }
                    ],
                    $position: 0
                }
            }
        })
        // const response = NextResponse.next()
        // response.cookies.set("auth", authToken, {})
        return NextResponse.json({success: true})
    } catch (error) {
        console.log("Error creating new post", error)
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