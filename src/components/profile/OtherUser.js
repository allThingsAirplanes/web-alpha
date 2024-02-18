"use client";
import {
    useEffect,
    useContext,
    useState
} from "react"

export default (props) => {
    const [user, setUser] = useState(null)
    useEffect(()=> {
        const getUserProfile = async () => {
            const res = await fetch (`/api/getOtherUserProfile?username=${props.username}`)
            const resJson = await res.json()
            console.log(resJson)
            if (resJson.success) {
                setUser(resJson.data[0])
            }
        }
        getUserProfile()
    }, [])
    const addFriend = async() => {
        try {
            const submitData = {
                user: {
                    username: props.username,
                    id: user._id
                }
            }
            const res = await fetch (`/api/addFriend`, {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                }, 
                body: JSON.stringify(submitData)
            })
            const resJson = await res.json()
            console.log(resJson)
        } catch(error) {
            console.log("error making friends", error)
        }
    }

    const renderUserProfile = () => {
        if (
            user
        ) {
            return (
                <div className="profile-user">
                    <div className="profile-user-image">
                        <img src={user.picture ||  "https://images.unsplash.com/photo-1525406820302-88d59afa0be7?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} />
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
            <div>
                <button onClick={addFriend}>
                    Add Friend
                </button>
            </div>
        </div>
    )
}