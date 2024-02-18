"use client"

import Link from "next/link"

import {
    useContext,
    useEffect,
    useState,
} from "react"


export default () => {
    const [reccomendedEvents, setReccomendedEvents] = useState([])
    const [reccomendedProjects, setReccomendedProjects] = useState([])
    useEffect(
        () => {
            const getReccomendationsData = async () => {
                const res = await fetch("/api/getUserDashboard")
                const data = await res.json()
                console.log(data, "Reccomendation Data")
                // show us what data we get back - to the developer console

                if (!data.error_message && !data.error_code) {
                    if (data.reccomendedEvents) {
                        setReccomendedEvents(data.reccomendedEvents)
                    }
                    if (data.reccomendedProjects) {
                        setReccomendedProjects(data.reccomendedProjects)
                    }
                    //get the data from the server, then set the posts profile to whatever the data is
                }
            }

            getReccomendationsData()
            //calling the fuction
        }, []
    )
    const renderReccomendedEvents = () => {
        return reccomendedEvents?.map((event) => {
            return (
                <div className="reccomendations-section-cards-card">
                    <div className="reccomendations-section-cards-card-image">
                        <img src={event.event_banner_picture || "https://images.unsplash.com/photo-1585347890782-6e1ddd365053?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} />
                    </div>
                </div>
            )
        })
    }

    const renderReccomendedProjects = () => {
        return reccomendedProjects?.map((project) => {
            return (
                <div className="reccomendations-section-cards-card"> 
                    <div className="reccomendations-section-cards-card-image">
                        <img src={project.project_picture || "https://images.unsplash.com/photo-1585347890782-6e1ddd365053?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} />
                    </div>
                </div>
            )
        })
    }
    return (
        <div className="reccomendations">
            <div className="reccomendations-section">
                <div className="reccomendations-section-header">
                    <div className="reccomendations-section-header-text">
                        <h2>
                            Events Right Now:
                        </h2>
                    </div>
                    <div className="reccomendations-section-header-link">
                        <Link href="/events">
                            Host
                        </Link>
                    </div>
                </div>
                <div className="reccomendations-section-cards">
                    {
                        renderReccomendedEvents()
                    }
                </div>
            </div>
            <div className="reccomendations-section">
                <div className="reccomendations-section-header">
                    <div className="reccomendations-section-header-text"> 
                        <h2>
                            Projects You'll Love:
                        </h2>
                    </div>
                    <div className="reccomendations-section-header-link">
                        <Link href="/projects">
                            Create
                        </Link>
                    </div>
                </div>
                <div className="reccomendations-section-cards">
                    {
                        renderReccomendedProjects()
                    }
                </div>
            </div>
        </div>
    )
}