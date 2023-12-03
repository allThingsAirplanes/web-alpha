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

import { checkAuth } from "@/utils/auth"

export async function POST(req, res) {
    try {
        const reqCookies = cookies()
        const authCookie = reqCookies.get("auth")
        //IMPORTANT: only authenticated users can make posts
        console.log(authCookie)
        const reqjson = await req.json()
        console.log("Reqjson", reqjson)
        const verifiedJWT = await checkAuth(authCookie.value) 
        await connectMongo()
        const newPost = await new Post({
            content: reqjson.content,
            media_url: reqjson.media_url,
            author: verifiedJWT.data.id
            //only store the hash!!!!!!!!!!!!!!!!!!!!
        }).save()
        console.log("New Post", newPost)
        // const response = NextResponse.next()
        // response.cookies.set("auth", authToken, {})
        return NextResponse.json(newPost)
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