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
        getClubAnnouncements()
    }, [])
    //So that it only runs once - the square brackets at the end
    const renderClubAnnouncements = () => {
        return clubAnnouncements.map((announcement) => {
            return (
                <div>
                    <div>
                        <div>
                            <img src = {announcement.club_picture || "https://images.unsplash.com/photo-1525406820302-88d59afa0be7?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} />
                        </div>
                        <div>
                            <h6>
                                {
                                    announcement.club_name
                                }
                            </h6>
                        </div>
                        <div>
                            <h6>
                                {
                                    announcement.author.username
                                }
                            </h6>
                        </div>
                    </div>
                    <div>
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
    return (
        <div className="dashboard-notifications">
            <div className="dashboard-notifications-clubs">
                <div className="dashboard-notifications-clubs-header">
                    <h4>
                        Your Club Announcements:
                    </h4>
                </div>
                <div className="dashboard-notifications-clubs-announcement">
                    {
                        renderClubAnnouncements()
                    }
                </div>
            </div>
            <div className="dashboard-notifications-events">
                <div className="dashboard-notifications-event-header">
                    <h4>
                        Your Events:
                    </h4>
                </div>
            </div>
        </div>
    )
}