import {
    NextResponse
} from "next/server"

import { connectMongo } from "@/config/mongo"

import Club from "@/models/Club"

export const dynamic = "force-dynamic"

export const revalidate = 0

export async function GET(request) {
    try {
        await connectMongo() 
        const { searchParams } = new URL(request.url);
        const slug = searchParams.get('slug');
        const club = await Club.findOne({
            slug
            //if the key and the value match, then we can get rid of the 
            //value on the left (used to be slug: slug)  
        }).populate([{
            path: "members"
        }, {
            path: "posts.author"
        }, {
            path: "posts.comments.author"
        }]).sort({createdAt: -1})
        const resData = club
        return NextResponse.json(resData)
    } catch (error) {
        console.log("Error with getting club", error)
        const errorData = {
            success: false,
            error_code: 500,
            error_message: "Could not get club"
        }
        return NextResponse.json(errorData, {
            status: 500
        })
    }
}