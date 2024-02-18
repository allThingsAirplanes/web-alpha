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

    const [events, setEvents] = useState(null) //this is the inital value of the state
    //a piece of state is something that you can read and write from
    //whenever you write to a piece of state, the application changes
    useEffect(
        () => {
            const getEventsData = async () => {
                const res = await fetch("/api/getevents")
                const data = await res.json()
                console.log(data)
                // show us what data we get back - to the developer console

                if (!data.error_message && !data.error_code) {
                    setEvents(data)
                    //get the data from the server, then set the events profile to whatever the data is
                }
            }
            getEventsData()
            //calling the fuction
        }, []
    )

    useEffect(() => {
        if (user === false) {
            router.push("/login")
        }
    }, [user])


    const handleJoinEvent = async (event) => {
        try {
            const res = await fetch("/api/joinEvent", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(event)
            })
            const resJson = await res.json()
            console.log("resJson", resJson)
            alert("Successfully Joined Event")
        } catch (error) {
            console.log("Error with joining event", error)
            alert("error joining event")
        }
    }
    const renderEvents = () => {
        if (
            events
        ) {
            //events is an array of objects, each object represents one single event 
            //the map method loops over an array and returns html for every single item in that array
            //event singular represents every single event, while events is the array of event
            return events.map((event) => {
                return (
                    <div className="events-container-event">
                        <div className="events-container-event-media">
                            <img src={event.event_banner_picture || "https://images.unsplash.com/photo-1585347890782-6e1ddd365053?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} />
                        </div>
                        <div className="events-container-event-name">
                            <p>
                                {
                                    event.name
                                }
                                {/* anything between curly braces is javascipt that gets filled in to the html */}
                            </p>
                        </div>
                        <pre className="events-container-event-description">
                            {
                                event.description
                            }
                            {/* A pre preserves the lines that you put in here */}
                        </pre>
                        <div className="events-container-event-organizers">
                            <p>
                                Event Organizers:
                                <span className="events-container-event-organizers-count">
                                    {
                                        event.organizers.length
                                    }
                                </span>
                            </p>
                            <div>
                                <button className="events-container-event-join-button" onClick={() => handleJoinEvent(event)}>
                                    Register
                                </button>
                                <Link href={`/events/${event.slug}`}>
                                    <button className="events-container-event-join-button" >
                                        View Event
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
        <div className="events">
            <div className="events-header">
                <h1>
                    Events
                </h1>
            </div>
            <div className="events-container">
                {
                    renderEvents()
                }
            </div>
        </div>
    )
}