"use client"
import { useEffect, useState } from "react"

import CreateClubPost from "./CreateClubPost.js"

import Link from "next/link"

export default (props) => {
    //props are a way to pass data between components
    //we have used context, which does it with the whole application, but props does it in a much more direct way
    //so if you just want to share data from one compoenent to another, props is a more direct way to do it.
    const [clubDetails, setClubDetails] = useState({})
    useEffect(() => {
        const getClub = async () => {
            try {
                const res = await fetch(`/api/getClub?slug=${props.slug}`)
                //a backtick is a string that you can put js in
                const resJson = await res.json()
                console.log(resJson)
                setClubDetails(resJson)
            } catch (error) {
                console.log("Error with getClub", error)
            }
        }
        getClub()
    }, [])
    const renderClub = () => {
        if (clubDetails) {
            return (
                <div>
                    <div>
                        <h1>
                            {
                                clubDetails.name
                            }
                        </h1>
                    </div>
                    <div>
                        <div>
                            <img src={clubDetails.club_picture}/>
                        </div>
                    </div>
                    <div>
                        {
                            clubDetails.description
                        }
                    </div>
                    <div>
                       created {
                            clubDetails.createdAt
                        }
                    </div>
                    <div>
                        Last updated {
                            clubDetails.updatedAt
                        }
                    </div>
                </div>
            )
        }
    }

    const renderClubPostTimeline = (posts) => {
        if (posts) {
            return posts.map((post) => {
                return (
                    <div className="posts-container-friends-post">
                        <div className="posts-container-friends-post-author">
                            <div className="posts-container-friends-post-author-image">
                                <img src={post?.author?.picture || "https://images.unsplash.com/photo-1525406820302-88d59afa0be7?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} />
                            </div>
                            <div className="posts-container-friends-post-author-username">
                                <p>
                                    {
                                        post?.author?.username
                                        //get back
                                    }
                                </p>
                            </div>
                        </div>
                        <div className="posts-container-friends-post-content">
                            <pre>
                                {
                                    post.content || "No Post Content"
                                }
                            </pre>
                        </div>
                        <div className="posts-container-friends-post-media">
                            <img src={post.media_url} />
                        </div>
                        <div className="posts-container-friends-post-buttons">
                            <button>Like</button>
                            <button>Comment</button>
                            <button>Share</button>
                            <p>Comming Soon!</p>
                        </div>
                    </div>
                )
            })
        }
    }

    const renderPosts = () => {
        if (
            clubDetails.posts
        ) {
            return (
                <>
                    <div className="clubs-posts-container">
                        <div className="clubs-posts-container-header">
                            <h3>
                                Club Posts
                            </h3>
                        </div>
                        {
                            renderClubPostTimeline(clubDetails.posts)
                        }
                    </div>
                </>
            )
        }
    }
    return (
        <div className="club">
            <div>
                {
                    renderClub()
                }
            </div>
            <div className="club-posts">
                <div className="club-posts-header">
                    <h1>
                        Posts
                    </h1>
                </div>
                <div>
                    <CreateClubPost club={clubDetails}/>
                </div>
                <div className="club-posts-container">
                    {
                        renderPosts()
                    }
                </div>
            </div>
        </div>
    )
}