import {
    NextResponse
} from "next/server"

import { connectMongo } from "@/config/mongo"

import Project from "@/models/Project"

export const dynamic = "force-dynamic"

export const revalidate = 0

export async function GET() {
    try {
        await connectMongo(

        ) 
        const projects = await Project.find({

        }).populate(
            [{
                path: "collaborators"
            }, {
                path: "posts",
                populate: {
                    path: "author",
                    model: "User"
                }
            }]
        ).sort({createdAt: -1})
        const resData = projects 
        return NextResponse.json(resData)
    } catch (error) {
        console.log("Error with getting all projects", error)
        const errorData = {
            success: false,
            error_code: 500,
            error_message: "Could not get projects"
        }
        return NextResponse.json(errorData, {
            status: 500
        })
    }
}