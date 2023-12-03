"use client"; 
import {
    useEffect,
    useState
} from "react"
export default () => {
    const [userProfile, setUserProfile] = useState (null) //this is the inital value of the state
    //a piece of state is something that you can read and write from
    //whenever you write to a piece of state, the application changes
    useEffect (
        () => {
            const getProfileData = async () => {
                const res = await fetch ("/api/getprofile")
                const data = await res.json ()
                console.log(data)
                // show us what data we get back - to the developer console

                setUserProfile (data) 
                //get the data from the server, then set the user profile to whatever the data is
            }
            getProfileData()
            //calling the fuction
        }, []
    )
    const renderUserProfile = () => {
        if (
            userProfile
        ) {
            return (
                <div>
                    <img src={userProfile.picture} /> 
                    <p>
                        username: {
                            userProfile.username
                        } 
                        {/* anything between curly braces is javascipt that gets filled in to the html */}
                    </p>
                </div>
            )
        }
    }
    return (
        <div>
            <h1>
                Profile
            </h1>
            <div>
                {
                    renderUserProfile ()
                }
            </div>
        </div>
    )
}