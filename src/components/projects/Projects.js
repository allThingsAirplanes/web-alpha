"use client";

import Link from "next/link";

import { useRouter } from "next/navigation";

import {
    useEffect,
    useState,
    useContext
} from "react"

import { userContext } from "@/context";

export default () => {
    const router = useRouter();

    const { user, setUser } = useContext(userContext)

    const [projects, setProjects] = useState(null) //this is the inital value of the state
    //a piece of state is something that you can read and write from
    //whenever you write to a piece of state, the application changes
    useEffect(
        () => {
            const getProjectsData = async () => {
                const res = await fetch("/api/getprojects")
                const data = await res.json()
                console.log(data)
                // show us what data we get back - to the developer console

                if (!data.error_message && !data.error_code) {
                    setProjects(data)
                    //get the data from the server, then set the projects profile to whatever the data is
                }
            }
            getProjectsData()
            //calling the fuction
        }, []
    )

    useEffect(() => {
        if (user === false) {
            router.push("/login")
        }
    }, [user])


    const handleJoinProject = async (project) => {
        try {
            const res = await fetch("/api/joinProject", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(project)
            })
            const resJson = await res.json()
            console.log("resJson", resJson)
            alert("Successfully Joined Project")
        } catch (error) {
            console.log("Error with joining project", error)
            alert("error joining project")
        }
    }
    const renderProjeCollaborators = (collaborators) => {
        return collaborators.map((collaborator) => {
            return (
                <div>
                    <p>
                        collaborators username: {
                            collaborator.username
                        }
                    </p>
                    <p>
                        collaborators id: {
                            collaborator.id
                        }
                    </p>
                    <img src={
                        collaborator.picture
                    } />
                </div>
            )
        })
    } 
    const renderProjects = () => {
        if (
            projects
        ) {
            //projects is an array of objects, each object represents one single project 
            //the map method loops over an array and returns html for every single item in that array
            //project singular represents every single project, while projects is the array of project
            return projects.map((project) => {
                return (
                    <div className="projects-container-project">
                        <div className="projects-container-project-media">
                            <img src={project.project_picture||"https://images.unsplash.com/photo-1585347890782-6e1ddd365053?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}/>
                        </div>
                        <div className="projects-container-project-name">
                            <p>
                                {
                                    project.name
                                }
                                {/* anything between curly braces is javascipt that gets filled in to the html */}
                            </p>
                        </div>
                        <pre>
                            {
                                project.description
                            }
                            {/* A pre preserves the lines that you put in here */}
                        </pre>
                        <div>
                            <p>
                                Project collaborators:
                                {
                                    project.collaborators.length
                                }
                            </p>
                            <div>
                                <button className="projects-container-project-join-button" onClick={() => handleJoinProject(project)}>
                                    Join Project
                                </button>
                                <Link href={`/projects/${project.slug}`}>
                                    <button className="projects-container-project-join-button" >
                                        View Project
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                )
            })
        }
    }
    return (
        <div className="projects">
            <div className="projects-header">
                <h1>
                    Projects
                </h1>
            </div>
            <div className="projects-container">
                {
                    renderProjects()
                }
            </div>
        </div>
    )
}