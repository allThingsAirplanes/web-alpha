"use client";
import {
    useEffect,
    useContext,
    useState,
    useRef
} from "react"
import { userContext } from "@/context";

export default () => {
    const { user, setUser } = useContext(userContext) //(We are not using the piece of state anymore. It is like state but just different context. The reason is that we want a global author)this is the inital value of the state
    //a piece of state is something that you can read and write from
    //whenever you write to a piece of state, the application changes

    const profileDescriptionRef = useRef(null)
    const [editingProfileDescription, setEditingProfileDescription] = useState(false)

    useEffect(() => {
        const getUserProfile = async () => {
            try {
                const res = await fetch("/api/getprofile")
                const resJson = await res.json()
                console.log("user profile data", resJson)
                console.log("This is the user", user)
                if (resJson.success) {
                    setUser({
                        ...resJson.data.user,
                        clubs: resJson.data.clubs,
                        projects: resJson.data.projects
                    })
                }
            } catch (error) {
                console.log("getUserProfile error", error)
            }
        }
        getUserProfile()
    }, [])

    const handleChangeProfileDescription = (event) => {
        console.log(profileDescriptionRef.current.value)
    }

    const handleClickProfileDescription = (event) => {
        setEditingProfileDescription(true)
    }

    const handleSaveProfileDescription = async () => {
        try {
            console.log(profileDescriptionRef.current.value)
            const submitData = {
                description: profileDescriptionRef.current.value
            }
            const res = await fetch ("/api/updateUserProfileDescription", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(submitData)
            })
            const resJson = await res.json()
            console.log("Updated profile description", resJson)
        } catch (error) {
            console.log("error with handleSaveProfile", error)
        }
    }

    const renderUserClubs = () => {
        if (user.clubs) {
            return user.clubs.map((club) => {
                return (
                    <div>
                        <h4>
                            {
                                club.name
                            }
                        </h4>
                    </div>
                )
            })
        }
    }
    const renderUserProjects = () => {
        if (user.projects) {
            return user.projects.map((project) => {
                return (
                    <div>
                        <h4>
                            {
                                project.name
                            }
                        </h4>
                    </div>
                )
            })
        }
    }
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
                    <div>
                        <textarea
                            ref={profileDescriptionRef}
                            onChange={handleChangeProfileDescription}
                            onClick={handleClickProfileDescription}
                            placeholder="Edit your description"
                            defaultValue={user.profile_description || ""}
                        />
                        {
                            editingProfileDescription &&
                            <button onClick={handleSaveProfileDescription}>
                                Save
                            </button>
                        }

                    </div>
                    <div>
                        <div>
                            <h3>
                                Numnber of Clubs:
                                <span>
                                    {
                                        user?.clubs?.length
                                    }
                                </span>
                            </h3>
                        </div>
                        <div>
                            {
                                renderUserClubs()
                            }
                        </div>
                    </div>
                    <div>
                        <div>
                            <h3>
                                Number of Projects:
                                <span>
                                    {
                                        user?.projects?.length
                                    }
                                </span>
                            </h3>
                        </div>
                        <div>
                            {
                                renderUserProjects()
                            }
                        </div>
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