import {
    NextResponse
} from "next/server"

import {
    connectMongo
} from "@/config/mongo.js"
import User from "@/models/User"
import Club from "@/models/Club"

import { checkSession } from "@/utils/auth"
import Project from "@/models/Project"

export const dynamic = "force-dynamic"

export const revalidate = 0

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url)
        console.log(searchParams)
        //these are going to be the search params that the user is going to give to us
        const session = await checkSession()
        if (!session) {
            return NextResponse.json({
                success: false,
                error_message: "Could not authenticate",
                data: null
            })
        }
        await connectMongo()
        const user = await User.findById(
            session.data.id
        )
        const userClubs = await Club.find({
            members: user._id
            //this should only get the clubs where the user is the member
        })
        const userProjects = await Project.find ({
            "collaborators.user": user._id
        })

        console.log("User", user)

        const successResponse = {
            success: true,
            data: {
                user,
                clubs: userClubs,
                projects: userProjects
            }
        }
        //because we set the username to be unique, we can now search for users by their username
        return NextResponse.json(successResponse)
    } catch (error) {
        console.log("Error getting the profile data", error)
        const errorResponse = {
            success: false,
            error_message: "Something went wrong"
        }
        return NextResponse.json(errorResponse)
    }
}

