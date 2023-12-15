"use client"
import { useEffect, useState } from "react"

import CreateProjectPost from "./CreateProjectPost"

import { formatDate } from "@/utils/dates"

export default (props) => {
    //props are a way to pass data between components
    //we have used context, which does it with the whole application, but props does it in a much more direct way
    //so if you just want to share data from one compoenent to another, props is a more direct way to do it.
    const [projectDetails, setProjectDetails] = useState({})
    useEffect(() => {
        const getProject = async () => {
            try {
                const res = await fetch(`/api/getProject?slug=${props.slug}`)
                //a backtick is a string that you can put js in
                const resJson = await res.json()
                console.log(resJson)
                setProjectDetails(resJson)
            } catch (error) {
                console.log("Error with getProject", error)
            }
        }
        getProject()
    }, [])
    const renderProject = () => {
        if (projectDetails) {
            return (
                <div className="project-info">
                    <div className="project-info-header">
                        <h1>
                            {
                                projectDetails.name
                            }
                        </h1>
                    </div>
                    <div className="project-info-content">
                        <div className="project-info-content-image">
                            <img src={projectDetails.project_picture} />
                        </div>
                        <div className="project-info-content-details">
                            <div className="project-info-content-details-description">
                                {
                                    projectDetails.description
                                }
                            </div>
                            <div className="project-info-content-details-timestamps">
                                <div className="project-info-content-details-timestamps-item">
                                    Project Created <span className="project-info-content-details-timestamps-item-span">{formatDate(projectDetails.createdAt)}</span>
                                </div>
                                <div className="project-info-content-details-timestamps-item">
                                    Last Updated <span className="project-info-content-details-timestamps-item-span">{formatDate(projectDetails.updatedAt)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }

    const renderProjectPostTimeline = (posts) => {
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
            projectDetails?.posts
        ) {
            return (
                <>
                    <div className="projects-posts-container">
                        <div className="projects-posts-container-header">
                            <h3>
                                Project Posts
                            </h3>
                        </div>
                        {
                            renderProjectPostTimeline(projectDetails.posts)
                        }
                    </div>
                </>
            )
        }
    }
    return (
        <div className="project">
            <div>
                {
                    renderProject()
                }
            </div>
            <div className="project-posts">
                <div className="project-posts-header">
                    <h1>
                        Posts
                    </h1>
                </div>
                <div>
                    <CreateProjectPost project={projectDetails} />
                </div>
                <div className="project-posts-container">
                    {
                        renderPosts()
                    }
                </div>
            </div>
        </div>
    )
}