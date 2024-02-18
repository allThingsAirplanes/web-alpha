"use client";

import { useRouter } from "next/navigation";

import {
    useEffect,
    useState,
    useContext
} from "react"

import Link from "next/link";

import { userContext } from "@/context";

export default () => {
    const router = useRouter();

    const { user, setUser } = useContext(userContext);

    const [searchFriends, setSearchFriends] = useState([])

    const [isSearching, setIsSearching] = useState(false)

    const [friends, setFriends] = useState([]) //this is the inital value of the state
    //a piece of state is something that you can read and write from
    //whenever you write to a piece of state, the application changes
    useEffect(
        () => {
            const getFriendsData = async () => {
                const res = await fetch("/api/getUserFriends")
                const data = await res.json()
                console.log(data)
                // show us what data we get back - to the developer console

                if (!data.error_message && !data.error_code) {
                    setFriends(data)
                    //get the data from the server, then set the friends profile to whatever the data is
                }
            }

            getFriendsData()
            //calling the fuction
        }, []
    )

    useEffect(() => {
        if (user === false) {
            router.push("/login")
        }
    }, [user])

    const handleRemoveFriend = async (friend) => {
        try {
            const submitData = {
                user: friend
            }
            const res = await fetch("/api/removeFriend", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(submitData)
            })
            const resJson = await res.json()
            console.log(resJson)
            location.reload()
        } catch (error) {
            console.log("error removing friend", error)
        }
    }
    const handleAddFriend = async (friend) => {
        try {
            const submitData = {
                user: {
                    username: friend.username,
                    id: friend._id
                }
            }
            const res = await fetch(`/api/addFriend`, {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(submitData)
            })
            const resJson = await res.json()
            console.log(resJson)
            location.reload()
        } catch (error) {
            console.log("Error with handleAddFriend", error)
        }
    }

    const handleSearchFriends = async (event) => {
        if (!event.target.value) {
            setSearchFriends([])
            return
        }
        try {
            const res = await fetch(`/api/searchUsers?q=${event.target.value}`)
            const resJson = await res.json()
            console.log("found friends", resJson)
            setSearchFriends(resJson)
        } catch (error) {
            console.log("error searching friends", error)
        }
    }
    const renderFoundFriends = () => {
        return searchFriends.map((searchFriend) => {
            return (
                <div className="friends-search-bar-results-user">
                    <div className="friends-search-bar-results-user-left">
                        <div className="friends-search-bar-results-user-left-image">
                            <img src={searchFriend.picture} />
                        </div>
                        <div className="friends-search-bar-results-user-left-username">
                            <p>
                                {searchFriend.username}
                            </p>
                        </div>
                    </div>
                    <div className="friends-search-bar-results-user-right">
                        <div>
                            <button 
                            onClick={()=> handleAddFriend(searchFriend)}
                            className="friends-search-bar-results-user-right-button">
                                Add Friend
                            </button>
                        </div>
                    </div>
                </div>
            )
        })
    }

    const renderFriends = () => {
        if (friends) {
            return friends.map((friend) => {
                return (
                    <div className="friends-container-friends-friend" key={friend._id}>
                        <div className="friends-container-friends-friend-author">
                            <Link href={`/profile/${friend?.username}`}>
                                <div className="friends-container-friends-friend-author-image">
                                    <img src={friend?.picture || "https://images.unsplash.com/photo-1525406820302-88d59afa0be7?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} />
                                </div>
                            </Link>
                        </div>
                        <div className="friends-container-friends-friend-info">
                            <div className="friends-container-friends-friend-info-username">
                                <p>
                                    {
                                        friend.username
                                        //get back
                                    }
                                </p>
                            </div>
                            <button className="friends-container-friends-friend-info-remove" onClick={() => handleRemoveFriend(friend)}>
                                Remove Friend
                            </button>
                        </div>
                    </div>
                )
            })
        }
    }
    return (
        <div className="friends">
            <div className="friends-header">
                <h1>
                    My Friends
                </h1>
            </div>
            <div className="friends-search">
                <div className="friends-search-bar">
                    <input className="friends-search-bar-input" type="search" onChange={handleSearchFriends} />
                </div>
                {
                    searchFriends.length > 0 &&
                    <div className="friends-search-bar-results">
                        {
                            renderFoundFriends()
                        }
                    </div>
                }
            </div>
            <div className="friends-container">
                <div className="friends-container-friends">
                    {
                        renderFriends()
                    }
                </div>
            </div>
        </div>
    )
}