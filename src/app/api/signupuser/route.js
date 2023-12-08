import {
    NextResponse
} from "next/server"

import {
    cookies
} from "next/headers"

import {
    connectMongo
} from "@/config/mongo.js"
import User from "@/models/User"
//where a GET request retrieves data from a server, a POST request sends data to the server

import { Resend } from 'resend';

import { hashUserPassword } from "@/utils/auth.js"

import { createJWT } from "@/utils/auth.js";

export const dynamic = "force-dynamic"

export const revalidate = 0

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req, res) {
    try {
        const reqjson = await req.json()
        console.log("Reqjson", reqjson)
        if (!reqjson.password) {
            return NextResponse.json({
                success: false,
                error_message: "Must provide a password"
            })
        }
        const hashedPassword = await hashUserPassword(reqjson.password)
        console.log("hasedPassword", hashedPassword)
        await connectMongo()
        const newUser = await new User({
            username: reqjson.username,
            picture: reqjson.picture,
            password: hashedPassword
            //only store the hash!!!!!!!!!!!!!!!!!!!!
        }).save()
        console.log("New User", newUser)
        // resend.emails.send({
        //     from: 'onboarding@resend.dev',
        //     //create an email server later and change it
        //     to: 'garygao333@gmail.com',
        //     subject: 'Welcome to All Things Airplanes',
        //     //GET READY TO TAKE OFF
        //     html: '<p>Welcome to All Things Airplanes, where you can connect to the broader and local aviation community</p>'
        // });
        const safeNewUser = {
            ...newUser._doc,
            password: undefined
            //spread - copy everything in new user, and it is the three dots.
            //override the password - so that it is undefined. 
        }
        const authToken = await createJWT({
            id: safeNewUser._id
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
        return NextResponse.json(safeNewUser)
    } catch (error) {
        console.log("Error signing up new user", error, error.code)
        if (error?.code === 11000) {
            const errorresponse = {
                success: false,
                error_message: "Username already exists. Please choose another username",
                error_code: 11000
            }
            return NextResponse.json(errorresponse, {status: 400})
        }
        //11000 is the MongoDB error for when there is a unique issue
        //400 error code means user error - they put in an username that already exists. 500 error code means that the developers did something wrong. 
        const serverErrorResponse = {
            success: false,
            error_message: "Something went wrong",
            error_code: 500
        } 
        return NextResponse.json(serverErrorResponse, {status: 500})
    }
}