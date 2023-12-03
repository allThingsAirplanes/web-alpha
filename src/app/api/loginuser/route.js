import {
    NextResponse
} from "next/server"

import {
    cookies
} from "next/headers"

import {
    connectMongo
} from "@/config/mongo.js"

import {
    compareUserPassword
} from "@/utils/auth.js"
import User from "@/models/User"
//where a GET request retrieves data from a server, a POST request sends data to the server
import { createJWT } from "@/utils/auth.js"
export async function POST(req, res) {
    try {
        const reqjson = await req.json () 
        console.log("Reqjson", reqjson)
        await connectMongo()
        const foundUser = await User.findOne({
            username: reqjson.username
        })
        console.log("Found User", foundUser) 
        if (foundUser) {
            const userPassword = foundUser.password
            const passwordMatch = await compareUserPassword(reqjson.password, userPassword)
            console.log("Passwords Match", passwordMatch)
            if (passwordMatch) {
                const safeFoundUser = {
                    ...foundUser._doc, 
                    password: undefined
                    //spread - copy everything in new user, and it is the three dots.
                    //override the password - so that it is undefined. 
                }
                const authToken = await createJWT({
                    id: safeFoundUser._id
                    //store the id in the user so that we know who it is
                })
                // const response = NextResponse.next()
                // response.cookies.set("auth", authToken, {})
                cookies().set({
                    name: "auth",
                    value: authToken,
                    maxAge: 60*60*24*7*2,
                    //this is 14 days
                    httpOnly: true
                    //httpOnly means that the cookie cannot be excessed from javascript 
                    //so if you don't have hpptOnly, js can erad all your cookies and you can stead and impersonate your users.
                })
                return NextResponse.json(safeFoundUser) 
            }
            //if we found the user, we are going to compare their password with whatever if stored in the database
            //only when the password matches are we going to return the user info here.
        } 
        return NextResponse.json({
            success: false,
            error_message: "Could not log in"
        })
    } catch (error) {
        console.log("Error logging in", error)
        res.status = 400
        //400 error code means user error - they put in an username that already exists. 500 error code means that the developers did something wrong. 
        const errorresponse = {
            success: false, 
            error_message: "Username and password not correct"
        }
        return NextResponse.json(errorresponse) 
    }
}

