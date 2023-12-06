"use client";
import {
    useEffect,
    useContext
} from "react"
import { userContext } from "@/context";

export default () => {
    const { user, setUser } = useContext(userContext) //(We are not using the piece of state anymore. It is like state but just different context. The reason is that we want a global author)this is the inital value of the state
    //a piece of state is something that you can read and write from
    //whenever you write to a piece of state, the application changes
    const renderUserProfile = () => {
        if (
            user
        ) {
            return (
                <div className="profile-user">
                    <div className="profile-user-image">
                        <img src={user.picture} />
                    </div>
                    <div className="profile-user-username">
                        <p>
                            username: {
                                user.username
                            }
                            {/* anything between curly braces is javascipt that gets filled in to the html */}
                        </p>
                    </div>
                </div>
            )
        }
    }
    return (
        <div className="profile">
            <div className="profile-header">
                <h1>
                    Profile
                </h1>
            </div>
            <>
                {
                    renderUserProfile()
                }
            </>
        </div>
    )
}