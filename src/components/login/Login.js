"use client"
import { useRef, useContext } from "react"
import { userContext } from "@/context"
import Link from "next/link"
//the order for these - context is actaully going to come before the refs
export default () => {
    const { user, setUser } = useContext(userContext)
    //a ref is a reference to something, usually an HTML element, on your page. You would attach a ref to a HTML element. There are more advanced uses, but this is good for now
    const usernameRef = useRef(null)
    const passwordRef = useRef(null)
    //Remember how there is an order that we have to write these things. The order now is (Context is actaully going to come first) Ref comes first, then state, and then useEffect, then functions, then HTML.
    const handleLoginSubmit = async (event) => {
        try {
            //this prevents the page from reloading - the event.preventDefault ().
            event.preventDefault()
            const usernameValue = usernameRef.current.value
            const passwordValue = passwordRef.current.value
            //current is always used with ref
            const submitData = {
                username: usernameValue,
                password: passwordValue
            }
            const submitRes = await fetch("/api/loginuser", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(submitData)
            })
            const submitJson = await submitRes.json()
            console.log(submitJson)
            setUser(submitJson)
            location.href = "/dashboard"
        } catch (error) {
            console.log("Error in handleLoginSubmit", error)
        }
    }
    return (
        <div>
            <h1>
                Login
            </h1>
            <div>
                <form onSubmit={handleLoginSubmit}>
                    <div>
                        <label>
                            Username:
                        </label>
                        <input
                            ref={
                                usernameRef
                            }
                            type="text"
                        />
                    </div>
                    <div>
                        <label>
                            Password:
                        </label>
                        <input
                            ref={
                                passwordRef
                            }
                            type="text"
                        />
                    </div>
                    <div>
                        <button type="submit">
                            Login
                        </button>
                    </div>
                    <div>
                        <p>
                            Don't have an account?
                            <span>
                                <Link href="/signup">
                                    Sign Up
                                </Link>
                            </span>
                        </p>
                    </div>
                </form>
                {/*Forms consists of inputs, labels, and buttons. Every input has a type - number, calendar, or text(the most basic). the button type = is called an HTML attribute */}
            </div>
        </div>
    )
}