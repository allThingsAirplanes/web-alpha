//This wrapper is going to be responsible for containing a global state for the application. - This is a global user that we can have access to everywhere. This is going to hold the user piece of state. 

"use client"
import {
    useState,
    useEffect
} from "react"
import {
    userContext,
    UserProvider
} from "@/context"
export default ({ children }) => {
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
            setUser(resUser)
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