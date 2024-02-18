"use client";

import Link from "next/link"
import { useContext, useState } from "react";

import { userContext } from "@/context";

export default () => {
    const { user, setUser } = useContext(userContext)
    const [showAddNewShortcut, setShowAddNewShortcut] = useState(false)
    const [avaliableShortcuts, setAvaliableShortcuts] = useState([])
    const [checkedShortcuts, setCheckedShortcuts] = useState({
        clubs: [],
        events: [],
        projects: []
    })
    const handleRemoveUserShortcut = async (shortcut) => {
        try {
            const submitData = {
                shortcut
            }
            const res = await fetch ("/api/deleteUserShortcut", {
                method: "DELETE",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(submitData)
            })
            const resJson = await res.json ()
            console.log(resJson)
            location.reload()
        } catch (error) {
            console.log("Error removing user", error)
        }
    }
    const renderUserShortcutsItems = () => {
        return user?.dashboard_shortcuts?.map((shortcut) => {
            return (
                <div className="sidebar-shortcuts-items-item-container">
                    <Link className="sidebar-shortcuts-items-item" href={shortcut.link}>
                        <div className="sidebar-shortcuts-items-item-image">
                            <img src={shortcut.picture} />
                        </div>
                        <div className="sidebar-shortcuts-items-item-name">
                            <p>
                                {
                                    shortcut.name
                                }
                            </p>
                        </div>
                    </Link>
                    <div onClick={() => handleRemoveUserShortcut(shortcut)} className="sidebar-shortcuts-items-item-remove">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>

                    </div>
                </div>
            )
        })
    }
    const handleAddNewShortcuts = async () => {
        try {
            const submitData = {
                clubs: checkedShortcuts.clubs.map((clubID) => {
                    return avaliableShortcuts.clubs.find((foundClub) => {
                        return foundClub._id === clubID
                    })
                }),
                events: checkedShortcuts.events.map((eventID) => {
                    return avaliableShortcuts.events.find((foundEvent) => {
                        return foundEvent._id === eventID
                    })

                }),
                projects: checkedShortcuts.projects.map((projectID) => {
                    return avaliableShortcuts.projects.find((foundProject) => {
                        return foundProject._id === projectID
                    })
                })
            }
            console.log(submitData)
            const res = await fetch("/api/addUserShortcuts", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(submitData)
            })
            const resJson = await res.json()
            console.log(resJson)
            location.reload()
        } catch (error) {
            console.log("Error with adding new shortcut", error)
        }
    }
    const handleAddCheckedShortcut = (section, id) => {
        if (checkedShortcuts[section].includes(id)) {
            setCheckedShortcuts({
                ...checkedShortcuts,
                [section]: checkedShortcuts[section].filter((item) => {
                    return item !== id
                })
            })
            return
        }
        setCheckedShortcuts({
            ...checkedShortcuts,
            [section]: [...checkedShortcuts[section], id]
            //making a list of all the checked items here
        })
    }
    const renderUserShortcutSection = (sectionType) => {
        switch (sectionType) {
            case "clubs": {
                return avaliableShortcuts?.clubs?.map((club, i) => {
                    return (
                        <div className="sidebar-modal-inner-options-section-items-item">
                            <div className="sidebar-modal-inner-options-section-items-item-left">
                                <div className="sidebar-modal-inner-options-section-items-item-left-image">
                                    <img src={club.club_picture} />
                                </div>
                                <div className="sidebar-modal-inner-options-section-items-item-left-name">
                                    <p>
                                        {
                                            club.name
                                        }
                                    </p>
                                </div>
                            </div>
                            <div className="sidebar-modal-inner-options-section-items-item-check">
                                <div className="sidebar-modal-inner-options-section-items-item-check-icon" onClick={() => handleAddCheckedShortcut("clubs", club._id)}>
                                    {
                                        checkedShortcuts.clubs.includes(club._id) ?
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="var(--color_btn_blue)" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                            </svg>
                                            :
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                <circle strokeLinecap="round" strokeLinejoin="round" cx="12" cy="12" r="6" />
                                            </svg>

                                    }
                                </div>
                            </div>
                        </div>
                    )
                })
            }
            case "events": {
                return avaliableShortcuts?.events?.map((event, i) => {
                    return (
                        <div className="sidebar-modal-inner-options-section-items-item">
                            <div className="sidebar-modal-inner-options-section-items-item-left">
                                <div className="sidebar-modal-inner-options-section-items-item-left-image">
                                    <img src={event.event_banner_picture} />
                                </div>
                                <div className="sidebar-modal-inner-options-section-items-item-left-name">
                                    <p>
                                        {
                                            event.name
                                        }
                                    </p>
                                </div>
                            </div>
                            <div className="sidebar-modal-inner-options-section-items-item-check">
                                <div className="sidebar-modal-inner-options-section-items-item-check-icon" onClick={() => handleAddCheckedShortcut("events", event._id)}>
                                    {
                                        checkedShortcuts.events.includes(event._id) ?
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="var(--color_btn_blue)" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                            </svg>
                                            :
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                <circle strokeLinecap="round" strokeLinejoin="round" cx="12" cy="12" r="6" />
                                            </svg>

                                    }
                                </div>
                            </div>
                        </div>
                    )
                })
            }
            case "projects": {
                return avaliableShortcuts?.projects?.map((project, i) => {
                    return (
                        <div className="sidebar-modal-inner-options-section-items-item">
                            <div className="sidebar-modal-inner-options-section-items-item-left">
                                <div className="sidebar-modal-inner-options-section-items-item-left-image">
                                    <img src={project.project_picture} />
                                </div>
                                <div className="sidebar-modal-inner-options-section-items-item-left-name">
                                    <p>
                                        {
                                            project.name
                                        }
                                    </p>
                                </div>
                            </div>
                            <div className="sidebar-modal-inner-options-section-items-item-check">
                                <div className="sidebar-modal-inner-options-section-items-item-check-icon" onClick={() => handleAddCheckedShortcut("projects", project._id)}>
                                    {
                                        checkedShortcuts.projects.includes(project._id) ?
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="var(--color_btn_blue)" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                            </svg>
                                            :
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                <circle strokeLinecap="round" strokeLinejoin="round" cx="12" cy="12" r="6" />
                                            </svg>

                                    }
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        }
    }

    const handleShowAddNewShortcut = async () => {
        setShowAddNewShortcut(true)
        try {
            const res = await fetch("/api/getUserAvaliableShortcuts")
            const resJson = await res.json()
            console.log(resJson)
            setAvaliableShortcuts(resJson)
        } catch (error) {
            console.log("Error with getting user shortcuts", error)
        }
    }
    const handleCloseAddNewShortcut = () => {
        setShowAddNewShortcut(false)
    }

    if (user) {
        return (
            <aside className="sidebar">
                <div className="sidebar-links">
                    <div className="sidebar-links-profile sidebar-links-link">
                        <div className="sidebar-links-link-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>

                        </div>
                        <div className="sidebar-links-link-text">
                            <Link href="/profile">
                                Profile
                            </Link>
                        </div>
                    </div>
                    <div className="sidebar-links-hangar sidebar-links-link">
                        <div className="sidebar-links-link-icon">
                            <img src="https://static.thenounproject.com/png/3980699-84.png" />
                        </div>
                        <div className="sidebar-links-link-text">
                            <Link href="/virtual-hangar">
                                Virtual Hangar
                            </Link>
                        </div>
                    </div>
                    <div className="sidebar-links-friends sidebar-links-link">
                        <div className="sidebar-links-link-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z" />
                            </svg>


                        </div>
                        <div className="sidebar-links-link-text">
                            <Link href="/friends">
                                Friends
                            </Link>
                        </div>
                    </div>
                    <div className="sidebar-links-clubs sidebar-links-link">
                        <div className="sidebar-links-link-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                            </svg>
                        </div>
                        <div className="sidebar-links-link-text">
                            <Link href="/clubs">
                                Clubs/Organizations
                            </Link>
                        </div>
                    </div>
                    <div className="sidebar-links-events sidebar-links-link">
                        <div className="sidebar-links-link-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                            </svg>

                        </div>
                        <div className="sidebar-links-link-text">
                            <Link href="/events">
                                Events
                            </Link>
                        </div>
                    </div>
                    <div className="sidebar-links-projects sidebar-links-link">
                        <div className="sidebar-links-link-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>

                        </div>
                        <div className="sidebar-links-link-text">
                            <Link href="/projects">
                                Projects
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="sidebar-shortcuts">
                    <div className="sidebar-shortcuts-title">
                        <h4>
                            My Shortcuts
                        </h4>
                    </div>
                    <div className="sidebar-shortcuts-items">
                        {
                            renderUserShortcutsItems()
                        }
                    </div>
                    <div className="sidebar-shortcuts-add">
                        <button onClick={handleShowAddNewShortcut} className="sidebar-shortcuts-add-button">
                            Add New
                        </button>
                    </div>
                </div>
                {
                    showAddNewShortcut &&
                    <div className="sidebar-modal">
                        <div className="sidebar-modal-inner">
                            <div className="sidebar-modal-inner-header">
                                <div className="side-modal-inner-header-title">
                                    <h3>
                                        Add New Shortcut
                                    </h3>
                                </div>
                                <div className="sidebar-modal-inner-header-close">
                                    <div onClick={handleCloseAddNewShortcut} className="sidebar-modal-inner-header-close-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                        </svg>

                                    </div>
                                </div>
                            </div>
                            <div className="sidebar-modal-inner-options">
                                <div className="sidebar-modal-inner-options-section">
                                    <div className="sidebar-modal-inner-options-section-header">
                                        <h4>
                                            Clubs
                                        </h4>
                                    </div>
                                    <div className="sidebar-modal-inner-options-section-items">
                                        {
                                            renderUserShortcutSection("clubs")
                                        }
                                    </div>
                                </div>
                                <div className="sidebar-modal-inner-options-section">
                                    <div className="sidebar-modal-inner-options-section-header">
                                        <h4>
                                            Events
                                        </h4>
                                    </div>
                                    <div className="sidebar-modal-inner-options-section-items">
                                        {
                                            renderUserShortcutSection("events")
                                        }
                                    </div>
                                </div>
                                <div className="sidebar-modal-inner-options-section">
                                    <div className="sidebar-modal-inner-options-section-header">
                                        <h4>
                                            Projects
                                        </h4>
                                    </div>
                                    <div className="sidebar-modal-inner-options-section-items">
                                        {
                                            renderUserShortcutSection("projects")
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="sidebar-modal-inner-buttons">
                                <div className="sidebar-modal-inner-buttons-button sidebar-modal-inner-buttons-button-cancel">
                                    <button onClick={handleCloseAddNewShortcut}>
                                        Cancel
                                    </button>
                                </div>
                                <div className="sidebar-modal-inner-buttons-button sidebar-modal-inner-buttons-button-confirm">
                                    <button onClick={handleAddNewShortcuts}>
                                        Confirm
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </aside>
        )
    }
}