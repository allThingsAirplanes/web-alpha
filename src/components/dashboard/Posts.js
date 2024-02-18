"use client";

import { useRouter } from "next/navigation";

import Link from "next/link";

import Post from "./Post";

import {
    useEffect,
    useState,
    useContext
} from "react"

import { userContext } from "@/context";

export default () => {
    const router = useRouter();

    const { user, setUser } = useContext(userContext);

    const [posts, setPosts] = useState([]) //this is the inital value of the state
    //a piece of state is something that you can read and write from
    //whenever you write to a piece of state, the application changes
    const [showPostComments, setShowPostComments] = useState([])
    useEffect(
        () => {
            const getPostsData = async () => {
                const res = await fetch("/api/getUserDashboard")
                const data = await res.json()
                console.log(data)
                // show us what data we get back - to the developer console

                if (!data.error_message && !data.error_code) {
                    if (data.posts) {
                        setPosts(data.posts)
                    }
                    //get the data from the server, then set the posts profile to whatever the data is
                }
            }

            getPostsData()
            //calling the fuction
        }, []
    )

    useEffect(() => {
        if (user === false) {
            router.push("/login")
        }
    }, [user])

    const renderFriendsAndClubPosts = (posts) => {
        if (posts) {
            return posts.map((post, post_index) => {
                return (
                    <Post post={post} />
                )
            })
        }
    }
    const renderOtherPosts = (posts) => {
        return posts.map((post) => {
            return (
                <div>
                    <img src={post.picture} />
                    <p>
                        {
                            post.posttitle
                        }
                        {/* anything between curly braces is javascipt that gets filled in to the html */}
                    </p>
                    <div>
                        <p>
                            Author: {
                                post.author.username
                            }
                        </p>
                    </div>
                </div>
            )
        })
    }
    const renderPosts = () => {
        if (
            posts
        ) {
            //posts is an array of objects, each object represents one single post 
            //the map method loops over an array and returns html for every single item in that array
            //post singular represents every single post, while posts is the array of post
            //    const friendsAndClubsPosts = posts.filter((post) => {
            //     return post.reccomendation_type === "FRIENDS" || post.reccomendation_type === "CLUB" || post.reccomendation_type === "INTEREST"
            //    })
            //    const otherPosts = posts.filter((post) => {
            //     return post.reccomendation_type === "OTHER"
            //    })

            return (
                <>
                    <div className="posts-container-friends">
                        {/* <div className="posts-container-friends-header">
                            <h3>
                                Friends and Clubs Posts
                            </h3>
                        </div> */}
                        {
                            renderFriendsAndClubPosts(posts)
                        }
                    </div>
                    {/* <div>
                <h3>
                    Other Posts
                </h3>
                {
                    renderOtherPosts (otherPosts)
                }
            </div> */}
                </>
            )
        }
    }
    return (
        <div className="posts">
            <div className="posts-header">
                <h1>
                    My Feed
                </h1>
            </div>
            <div className="posts-container">
                {
                    renderPosts()
                }
            </div>
        </div>
    )
}