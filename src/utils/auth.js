import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
//hash: One way encryption - there is no decryption. 
//A user creates a password - gets hased. A user enters the password - hased again.
//Because you can't decrypt it - the user types 123, that 123 is turned into something
//When the user logs in, whatever the user types in the password box,
//we hash it again, and if the hash for whatever they types in whatevery is in the databse,
//then it is the correct password - as it is not random.
//If you have 123, everytime you hash it, you will get the same thing. 
import { cookies } from "next/headers"

export const hashUserPassword = async(plainTextPassword) => {
    try {
        const passwordHash = await bcrypt.hash(plainTextPassword, 14)
        //the second parameter is called the work function of the hash
        //it determines how many rounds of hashing are going to happen
        //and the more rounds, the more secure it will be - too many rounds will slow it down to a crawl.
        return passwordHash
    } catch(error) {
        console.log("Error with user password", error)
    }
}

export const compareUserPassword = async(plainTextPassword, hashedPassword) => {
    try {
        const passwordMatch = await bcrypt.compare(plainTextPassword, hashedPassword)
        return passwordMatch
    } catch(error) {
        console.log("compareUserPassword Error", error)
    }
}

//A cookie stays in the user's browser for however long the expiration is set for 
//or until the user clears the cookies. But the maximum is however long we set the expiration for
//Meaning that after the expiration, the user will be logged out (defacto two weeks)
//Inside of the cookie, in order to verify that the cookie came from us, 
//we are going to put a secure token inside of the cookie. 
//The token will have a signature, and the signature can only be signed by our application. 

export const createJWT = async(claims) => {
    const token = await jwt.sign ({
        data: claims
    }, 
    process.env.JWT_SECRET,
    //process env is where we get the secrets loaded in from the env file
    {expiresIn: "14d"}
    )
    return token
}

export const checkAuth = async(token) => {
    const verified = await jwt.verify(token, process.env.JWT_SECRET)
    return verified
    //its going to check the signature
    //and if the signature matches, then it is going to be okay
    //but it also has to be unexpired, so if it is expried, this jwt is not going to be verified
    //jwt is the json web token - that is our secure token
    //jwts are the most common
}

export const checkSession = async() => {
    const reqCookies = cookies()
    const authCookie = reqCookies.get("auth")
    console.log(authCookie)
    if (!authCookie || !authCookie.value) {
        return false
    }
    //IMPORTANT: only authenticated users can make posts
    const verifiedJWT = await checkAuth(authCookie.value) 
    return verifiedJWT
}