import {
    useContext
} from "react"

import {
    userContext
} from "@/context"
export default () => {
    const { user, setUser } = useContext(userContext)
    const handleLogOut = async () => {
        try {
            //fetch goes out and fetches some information from the server 
            //so we can either get inforamtion from the server or post
            // res(response) a server sends a response to the client
            // req (request) a client makes a request to a server
            const res = await fetch("/api/logout", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                }
            })
            //if sending a get request, only need to pass in the server endpoint
            //otherwise, you need to specify more information.   
            //so we are sending out the fetch request and get a response from the server and we store it in the res variable

            const resJson = await res.json()
            //we got the response, now we just have to format the json, which is what we are doing in the line above
            console.log("resJson", resJson)
            setUser(null)
            location.href = "/login"
            //this redirects you to another page
            console.log("CALLED LOGOUT")
        } catch (error) {
            console.log("handleLogOut", error)
        }
    }
    return (
        <div>
            <button onClick={handleLogOut}>
                Logout
            </button>
        </div>
    )
}