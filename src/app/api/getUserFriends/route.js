import User from "@/models/User"
import { connectMongo } from "@/config/mongo"
import {NextResponse} from "next/server"
import { checkSession } from "@/utils/auth" 
export const dynamic = "force-dynamic"

export const revalidate = 0

export async function GET() {
    try {
        const session = await checkSession()
        if (!session) {
            return NextResponse.json({
                success: false,
                error_message: "Could not authenticate",
                data: null
            }) 
        } 
        await connectMongo ()
        const userData = await User.findById(session.data.id).populate([{
            path: "friends"
        }])
        const friends = userData.toObject().friends
        console.log("Friends", friends)
        return NextResponse.json (friends)
    } catch (error) {
        console.log("Error making friends", error)
        const errorresponse = {
            success: false,
            error_code: 500,
            error_message: "Cannot find friend"
        }
        return NextResponse.json(errorresponse, {
            status: 500
        })
    }
}