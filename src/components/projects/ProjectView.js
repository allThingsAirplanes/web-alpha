"use client"
import { useEffect, useState, useContext } from "react"

import CreateProjectPost from "./CreateProjectPost"

import Link from "next/link"

import { formatDate } from "@/utils/dates"

import Project from "./Project"

import { userContext } from "@/context"

export default (props) => {
    const { user } = useContext(userContext)
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
    const checkUserCollaborator = () => {
        const foundUser = projectDetails?.collaborators?.find((collaborator) => {
            return collaborator.user._id === user?._id
        })
        return foundUser
    }
    const renderProjectCollaborators = () => {
        console.log("projectDetails", projectDetails.collaborators)
        if (projectDetails.collaborators) {
            return projectDetails?.collaborators?.map((collaborator) => {
                return (
                    <div>
                        {
                            collaborator.user.username
                        }
                    </div>
                )
            })
        }
    }
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
                            <img src={projectDetails.project_picture || "https://images.unsplash.com/photo-1585347890782-6e1ddd365053?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} />
                        </div>
                        <div className="project-info-content-details">
                            <div className="project-info-content-details-description">
                                {
                                    projectDetails.description
                                }
                            </div>
                            <div className="project-info-content-details-timestamps">
                                <div className="project-info-content-details-timestamps-creator">
                                    <p>
                                        Creator:
                                        <span>
                                            {
                                                projectDetails?.project_creator?.username
                                            }
                                        </span>
                                    </p>
                                </div>
                                <div>
                                    <div>
                                        <h4>
                                            Collaborators:
                                        </h4>
                                    </div>
                                    <div>
                                        {
                                            renderProjectCollaborators()
                                        }
                                    </div>
                                </div>
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
                    <Project post={post} project={projectDetails} />
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
                                Project Log Entries
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
                        Log
                    </h1>
                </div>
                {
                    checkUserCollaborator() &&
                    <div>
                        <CreateProjectPost project={projectDetails} />
                    </div>
                }
                <div className="project-posts-container">
                    {
                        renderPosts()
                    }
                </div>
            </div>
        </div>
    )
}