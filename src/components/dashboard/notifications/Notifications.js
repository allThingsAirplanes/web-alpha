"use client"
import {useState, useEffect} from "react"

export default () => {
    const [clubAnnouncements, setClubAnnouncements] = useState([])
    const [eventAnnouncements, setEventAnnouncements] = useState([])
    const [clubs, setClubs] = useState([])

    useEffect(() => {
        const getClubAnnouncements = async() => {
            try {
                const res = await fetch ("/api/getClubAnnouncements")
                const resJson = await res.json()
                console.log(resJson, "club announcements")
                if (resJson.length > 0) {
                    const announcements = []
                    resJson.forEach((club) => {
                        const newAnnouncements = club.announcements.map((announcement) => {
                            return {
                                ...announcement,
                                club_name: club.name,
                                club_picture: club.club_picture
                            }
                        })
                        announcements.push(...newAnnouncements)
                    })
                    setClubAnnouncements(announcements)
                }
            } catch (error) {
                console.log("getClubAnnouncement", error)
            }
        }
        const getEventAnnouncements = async() => {
            try {
                const res = await fetch ("/api/getEventAnnouncements")
                const resJson = await res.json()
                console.log(resJson, "event announcements")
                if (resJson.length > 0) {
                    const announcements = []
                    resJson.forEach((event) => {
                        const newAnnouncements = event.announcements.map((announcement) => {
                            return {
                                ...announcement,
                                event_name: event.name,
                                event_picture: event.event_banner_picture
                            }
                        })
                        announcements.push(...newAnnouncements)
                    })
                    setEventAnnouncements(announcements)
                }
            } catch (error) {
                console.log("getEventAnnouncement", error)
            }
        }
        getClubAnnouncements()
        getEventAnnouncements()
    }, [])
    //So that it only runs once - the square brackets at the end
    const renderClubAnnouncements = () => {
        return clubAnnouncements.map((announcement) => {
            return (
                <div className="dashboard-notifications-clubs-announcements-item">
                    <div className="dashboard-notifications-clubs-announcements-item-header">
                        <div className="dashboard-notifications-clubs-announcements-item-header-image">
                            <img src = {announcement.club_picture || "https://images.unsplash.com/photo-1525406820302-88d59afa0be7?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} />
                        </div>
                        <div className="dashboard-notifications-clubs-announcements-item-header-clubName">
                            <h6>
                                {
                                    announcement.club_name
                                }
                            </h6>
                        </div>
                        <div className="dashboard-notifications-clubs-announcements-item-header-username">
                            <h6>
                                {
                                    announcement.author.username
                                }
                            </h6>
                        </div>
                    </div>
                    <div className="dashboard-notifications-clubs-announcements-item-content">
                        <h5>
                            {
                                announcement.content
                            }
                        </h5>
                    </div>
                </div>
            )
        })
    }
    const renderEventAnnouncements = () => {
        return eventAnnouncements.map((announcement) => {
            return (
                <div className="dashboard-notifications-events-announcements-item">
                    <div className="dashboard-notifications-events-announcements-item-header">
                        <div className="dashboard-notifications-events-announcements-item-header-image">
                            <img src = {announcement.event_banner_picture || "https://images.unsplash.com/photo-1585347890782-6e1ddd365053?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} />
                        </div>
                        <div className="dashboard-notifications-events-announcements-item-header-eventName">
                            <h6>
                                {
                                    announcement.event_name
                                }
                            </h6>
                        </div>
                        <div className="dashboard-notifications-events-announcements-item-header-username">
                            <h6>
                                {
                                    announcement.author.username
                                }
                            </h6>
                        </div>
                    </div>
                    <div className="dashboard-notifications-events-announcements-item-content">
                        <h5>
                            {
                                announcement.title
                            }
                        </h5>
                    </div>
                </div>
            )
        })
    }
    return (
        <div className="dashboard-notifications">
            <div className="dashboard-notifications-clubs">
                <div className="dashboard-notifications-clubs-header">
                    <h4>
                        Your Club Announcements:
                    </h4>
                </div>
                <div className="dashboard-notifications-clubs-announcements">
                    {
                        renderClubAnnouncements()
                    }
                </div>
            </div>
            <div className="dashboard-notifications-events">
                <div className="dashboard-notifications-events-header">
                    <h4>
                        Your Event Announcements:
                    </h4>
                </div>
                <div className="dashboard-notifications-events-announcements">
                    {
                        renderEventAnnouncements()
                    }
                </div>
            </div>
        </div>
    )
}