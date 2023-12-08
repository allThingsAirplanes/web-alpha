//This wrapper is going to be responsible for containing a global state for the application. - This is a global user that we can have access to everywhere. This is going to hold the user piece of state. 

"use client"
import { useRouter } from "next/navigation"

import {
    useState,
    useEffect
} from "react"
import {
    userContext,
    UserProvider
} from "@/context"
export default ({ children }) => {
    const router = useRouter();

    const [user, setUser] = useState(null)
    //Piece of state always comes in two parts, what we read from and what we write to
    //This, or const [] or const {}, is called destructuring. What it does is that it pulls off smaller pieces from a larger object. 
    //So we take a strcture and we break off the piece that we want
    useEffect(() => {
        const checkUserAuth = async () => {
            const res = await fetch("/api/checkAuth", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                }
            })
            const resJson = await res.json()
            console.log("resJson", resJson)
            const resUser = resJson.data

            if(resUser) {
                if(!resUser.picture) {
                    resUser.picture = "https://images.unsplash.com/photo-1525406820302-88d59afa0be7?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                }

                setUser(resUser)
            } else {
                setUser(false)
            }
        }

        checkUserAuth()
    },
        []
        //this prevents calling the useEffect more than once
    )
    return (
        <UserProvider value={
            {
                user, setUser
            }
        }>
            <div className="app">
                {children}
            </div>
        </UserProvider>
    )
}
//So now, all the children have access to the same state (because the provider provides the state through the value) 