import {
    NextResponse
} from "next/server"

import {
    cookies
} from "next/headers"

export async function POST(req, res) {
    try {
        cookies().set("auth", "")
        console.log("Cleared Cookies")
        return NextResponse.json({
            success: true,
        })
    } catch (error) {
        console.log("Error logging in", error)
        //400 error code means user error - they put in an username that already exists. 500 error code means that the developers did something wrong. 
        const errorresponse = {
            success: false, 
            error_message: "Error logging out"
        }
        return NextResponse.json(errorresponse) 
    }
}

