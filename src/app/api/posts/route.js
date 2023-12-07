import Post from "@/models/Post"
import { connectMongo } from "@/config/mongo"
import {NextResponse} from "next/server"

export const dynamic = "force-dynamic"

export const revalidate = 0

export async function GET() {
    try {
        await connectMongo ()
        const posts = await Post.find({}).populate([{
            path: "author"
        }]).sort({createdAt: "descending"})
        console.log("The Post", posts)
        return NextResponse.json (posts)
    } catch (error) {
        console.log("Error retrieving post", error)
        const errorresponse = {
            success: false,
            error_code: 500,
            error_message: "Could not retrieve post"
        }
        return NextResponse.json(errorresponse, {
            status: 500
        })
    }
}