import {
    NextResponse
} from "next/server"

import { connectMongo } from "@/config/mongo"

import Club from "@/models/Club"

export const dynamic = "force-dynamic"

export const revalidate = 0

export async function GET() {
    try {
        await connectMongo(

        ) 
        const clubs = await Club.find({

        }).populate([{
            path: "members"
        }]).sort({createdAt: -1})
        const resData = clubs 
        return NextResponse.json(resData)
    } catch (error) {
        console.log("Error with getting all clubs", error)
        const errorData = {
            success: false,
            error_code: 500,
            error_message: "Could not get clubs"
        }
        return NextResponse.json(errorData, {
            status: 500
        })
    }
}