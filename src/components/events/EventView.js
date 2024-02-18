"use client"
import { useEffect, useState, useContext } from "react"

import Link from "next/link"

import CreateEventAnnouncements from "./CreateEventAnnouncements"

import { formatDate } from "@/utils/dates"

import { userContext } from "@/context"

export default (props) => {
    const { user } = useContext(userContext)
    //props are a way to pass data between components
    //we have used context, which does it with the whole application, but props does it in a much more direct way
    //so if you just want to share data from one compoenent to another, props is a more direct way to do it.
    const [eventDetails, setEventDetails] = useState({})
    useEffect(() => {
        const getEvent = async () => {
            try {
                const res = await fetch(`/api/getEvent?slug=${props.slug}`)
                //a backtick is a string that you can put js in
                const resJson = await res.json()
                console.log(resJson)
                setEventDetails(resJson)
            } catch (error) {
                console.log("Error with getEvent", error)
            }
        }
        getEvent()
    }, [])
    const renderEventOrganizers = () => {
        console.log("eventDetails.", eventDetails.organizers)
        if (eventDetails.organizers) {
            return eventDetails?.organizers?.map((organizer) => {
                return (
                    <div>
                        {
                            organizer.user.username
                        }
                    </div>
                )
            })
        }
    }
    const renderEvent = () => {
        if (eventDetails) {
            return (
                <div className="event-info">
                    <div className="event-info-header">
                        <h1>
                            {
                                eventDetails.name
                            }
                        </h1>
                    </div>
                    <div className="event-info-content">
                        {/* <div className="event-info-content-details">
                            <div className="event-info-content-details-description">
                                {
                                    eventDetails.description
                                }
                            </div>
                            <div className="event-info-content-details-timestamps">
                                <div className="event-info-content-details-timestamps-creator">
                                    <p>
                                        Host:
                                        <span>
                                            {
                                                eventDetails?.event_host?.username
                                            }
                                        </span>
                                    </p>
                                </div>
                                <div>
                                    <div>
                                        <h4>
                                            Organizers:
                                        </h4>
                                    </div>
                                    <div>
                                        {
                                            renderEventOrganizers()
                                        }
                                    </div>
                                </div>
                                <div className="event-info-content-details-timestamps-item">
                                    Event Created <span className="event-info-content-details-timestamps-item-span">{formatDate(eventDetails.createdAt)}</span>
                                </div>
                                <div className="event-info-content-details-timestamps-item">
                                    Last Updated <span className="event-info-content-details-timestamps-item-span">{formatDate(eventDetails.updatedAt)}</span>
                                </div>
                            </div>
                        </div> */}
                        <div className="event-info-content-host-header">
                            <h3>
                                Event Host
                            </h3>
                        </div>
                        <div className="event-info-content-host">
                            <div className="event-info-content-host-image">
                                <img src={eventDetails?.event_host?.picture} />
                            </div>
                            <div className="event-info-content-host-username">
                                <p>
                                    {
                                        eventDetails?.event_host?.username
                                    }
                                </p>
                            </div>
                        </div>
                        <div className="event-info-content-date">
                            <div className="event-info-content-date-header">
                                <h4>
                                    Event Date:
                                </h4>
                            </div>
                            <div className="event-info-content-date-range">
                                <p>
                                    {
                                        !eventDetails?.date_start ? "No Date" :
                                            eventDetails?.date_end ? `${formatDate(eventDetails?.date_start)} - ${formatDate(eventDetails?.date_end)}` : formatDate(eventDetails?.date_start)
                                    }
                                    {/*if we have the end date, we will show the date range. Otherwise, we will just show the start date*/}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }

    const renderAnnouncementsDetails = () => {
        return eventDetails.announcements.map((announcement) => {
            return (
                <div>
                    <div>
                        <h3>
                            {
                                announcement.title
                            }
                        </h3>
                    </div>
                    <div>
                        <pre>
                            {/* allows you to render multi-line texts - multiline announcements - does not jam*/}
                            {
                                announcement.content
                            }
                        </pre>
                    </div>
                </div>
            )
        })
    }

    const renderAnnouncements = () => {
        if (
            eventDetails?.announcements
        ) {
            return (
                <>
                    <div className="events-announcements-container">
                        <div className="events-accouncements-container-header">
                            <h3>
                                Event Announcements
                            </h3>
                        </div>
                        <div>
                            {
                                renderAnnouncementsDetails()
                            }
                        </div>
                    </div>
                </>
            )
        }
    }
    return (
        <div className="event">
            <div className="event-banner">
                <div className="event-banner-image">
                    <img src={eventDetails.event_banner_picture || "https://images.unsplash.com/photo-1585347890782-6e1ddd365053?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} />
                </div>
                <div className="event-banner-content">
                    <div className="event-banner-content-info">
                        {
                            renderEvent()
                        }
                    </div>
                    <div className="event-banner-content-buttons">
                        <div className="event-banner-content-buttons-texts">
                            <p>
                                Click below to join event!
                            </p>
                        </div>
                        <div>
                            <button className="event-banner-content-buttons-register">
                                Register
                            </button>
                        </div>
                        <div>
                            <button className="event-banner-content-buttons-question">
                                Questions
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="event-information">
            <div className="event-information-tabs">
                <div className="event-information-tabs-inner">
                <div className="event-information-tabs-section">
                    <h5>
                        Description 
                    </h5>
                    <p>
                        {
                            eventDetails?.description || "No Description"
                        }
                    </p>
                </div>
                <div className="event-information-tabs-section">
                    <h5>
                        Organizers 
                    </h5>
                    <p>
                        {
                            eventDetails?.organizers?.length || "0"
                        }
                    </p>
                </div>
                <div className="event-information-tabs-section">
                    <h5>
                        Registrations
                    </h5>
                    <p>
                        {
                            eventDetails?.registrants?.length || "0"
                        }
                    </p>
                </div>
                <div className="event-information-tabs-section">
                    <h5>
                        Location 
                    </h5>
                    <p>
                        {
                            eventDetails?.location || "online"
                        }
                    </p>
                </div>
                </div>
            </div>
                <div className="event-announcements">
                    <div className="event-announcements-header">
                        <h1>
                            Announcements
                        </h1>
                    </div>
                    {
                        eventDetails?.event_host?._id === user?._id &&
                        <div>
                            <CreateEventAnnouncements event={eventDetails} />
                        </div>
                    }
                    <div className="event-announcements-container">
                        {
                            renderAnnouncements()
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}