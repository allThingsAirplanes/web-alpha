import {
    NextResponse
} from "next/server"

import { connectMongo } from "@/config/mongo"

import Project from "@/models/Project"

export const dynamic = "force-dynamic"

export const revalidate = 0

export async function GET(request) {
    try {
        await connectMongo(

        ) 
        const { searchParams } = new URL(request.url);
        const slug = searchParams.get('slug');
        const project = await Project.findOne({
            slug
            //if the key and the value match, then we can get rid of the 
            //value on the left (used to be slug: slug)  
        }).populate([{
            path: "collaborators"
        }]).sort({createdAt: -1})
        const resData = project
        return NextResponse.json(resData)
    } catch (error) {
        console.log("Error with getting project", error)
        const errorData = {
            success: false,
            error_code: 500,
            error_message: "Could not get project"
        }
        return NextResponse.json(errorData, {
            status: 500
        })
    }
}