"use client"
import { useRef, useContext } from "react"
import { userContext } from "@/context"
//the order for these - context is actaully going to come before the refs
export default () => {
    const { user, setUser } = useContext(userContext)
    console.log("contextSignupUser", user)
    //a ref is a reference to something, usually an HTML element, on your page. You would attach a ref to a HTML element. There are more advanced uses, but this is good for now
    const usernameRef = useRef(null)
    const pictureRef = useRef(null)
    const passwordRef = useRef(null)
    //Remember how there is an order that we have to write these things. The order now is (Context is actaully going to come first) Ref comes first, then state, and then useEffect, then functions, then HTML.
    const handleSignupSubmit = async (event) => {
        try {
            //this prevents the page from reloading - the event.preventDefault ().
            event.preventDefault()
            const usernameValue = usernameRef.current.value
            const pictureValue = pictureRef.current.value
            const passwordValue = passwordRef.current.value
            //current is always used with ref
            const submitData = {
                username: usernameValue,
                picture: pictureValue,
                password: passwordValue
            }
            const submitRes = await fetch("/api/signupuser", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(submitData)
            })
            const submitJson = await submitRes.json()
            if (submitJson?.error_code === 11000) {
                //the ? checks if it exists. If it does not exist, it will just go to null. 
                alert("Username already exists")
                return
            }
            if (submitJson?.error_code || submitJson?.error_message) {
                alert ("Something went wrong signing in");
                return
            }
            console.log(submitJson)
            setUser(submitJson)
            location.href = "/welcome"
        } catch (error) {
            console.log("Error in handleSignupSubmit", error)
        }
    }
    return (
        <div className="signup">
            <div className="signup-header">
            </div>
            <div className="signup-form">
                <form onSubmit={handleSignupSubmit}>
                    <div className="signup-form-section">
                        <label className="signup-form-section-label">
                            Username
                        </label>
                        <input
                        className="signup-form-section-input"
                            ref={
                                usernameRef
                            }
                            type="text"
                            placeholder = "Enter Your Username" 
                        />
                    </div>
                    <div className="signup-form-section">
                        <label className="signup-form-section-label">
                            Profile Picture
                        </label>
                        <input
                        className="signup-form-section-input"
                            ref={
                                pictureRef
                            }
                            type="text"
                            placeholder = "Enter Your Profile Picture" 
                        />
                    </div>
                    <div className="signup-form-section">
                        <label className="signup-form-section-label"> 
                            Password
                        </label>
                        <input
                        className="signup-form-section-input"
                            ref={
                                passwordRef
                            }
                            type="text"
                            placeholder = "Enter Your Password" 
                        />
                        {/* The light gray letters in the textbox */}
                    </div>
                    <div className="signup-form-section">
                        <button type="submit" className="signup-form-section-button">
                            Signup
                        </button>
                    </div>
                </form>
                {/*Forms consists of inputs, labels, and buttons. Every input has a type - number, calendar, or text(the most basic). the button type = is called an HTML attribute */}
                <div className="signup-form-windows">
                    <div className="signup-form-windows-image signup-form-windows-image-01">
                        <img src="https://i.pinimg.com/736x/97/c4/99/97c4990d53437cf2c2c9e1663ac172fd.jpg"/>
                    </div>
                    <div className="signup-form-windows-image signup-form-windows-image-02">
                        <img src="https://global.discourse-cdn.com/infiniteflight/original/4X/e/f/c/efc5a4d26879bbd64e7933943af857283a897fd5.jpeg"/>
                    </div>
                    <div className="signup-form-windows-image signup-form-windows-image-03">
                        <img src="https://images.pexels.com/photos/4004016/pexels-photo-4004016.jpeg?auto=compress&cs=tinysrgb&w=1600"/>
                    </div>
                    <div className="signup-form-windows-image signup-form-windows-image-04">
                        <img src="https://images.pexels.com/photos/1815385/pexels-photo-1815385.jpeg?auto=compress&cs=tinysrgb&w=1600"/>
                    </div >
                    <div className="signup-form-windows-image signup-form-windows-image-05">
                        <img src="https://i.pinimg.com/originals/d2/f1/24/d2f12405b955b64abc99915b246ecb80.jpg"/>
                    </div>
                </div>
            </div>
        </div>
    )
}