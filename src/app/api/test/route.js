import {
    NextResponse
} from "next/server"

import {
    cookies
} from "next/headers"

import {
    connectMongo
} from "@/config/mongo.js"

import Event from "@/models/Event"
//where a GET request retrieves data from a server, a POST request sends data to the server

import { checkSession } from "@/utils/auth"

import slugify from "slugify"

export const dynamic = "force-dynamic"

export const revalidate = 0

export async function POST(req, res) {
    try {
        const reqjson = await req.json()
        //This will perfrom the authentication
        const session = await checkSession()
        //=========================================================
        //This is authentication - always copy it. 
        if (!session) {
            return NextResponse.json({
                success: false,
                error_message: "Could not authenticate",
                data: null
            }) 
        } 
        //===============================================================
        //This is database stuff - and this is where the custom stuff would come in
        await connectMongo()
        console.log("Testing API Route")
        const testResponse = {
            testing: "Testing Testing."
        }
        //===================================================================
        //This is where you send the response to the client
        return NextResponse.json(testResponse)
    } catch (error) {
        console.log("Error with testing API", error)
        const serverErrorResponse = {
            success: false,
            error_message: "Something went wrong",
            error_code: 500
        } 
        return NextResponse.json(serverErrorResponse, {status: 500})
    }
}