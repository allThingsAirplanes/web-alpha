"use client";

import { useState } from "react";

export default () => {
    const interestsAndConnectionsMap = {
        commercial_aviation: "COMMERCIAL_AVIATION",
        military_aviation: "MILITARY_AVIATION",
        drones: "DRONES_AERIAL_PHOTOGRAPHY",
        homebuilding: "HOMEBUILDING",
        aerospace: "AEROSPACE",
        other: "OTHER",

        friends: "FRIENDS",
        clubs: "CLUBS",
        projects: "PROJECTS"
    }

    const initialItemsSelectedState = {
        interests: [],
        connections: []
    }

    const [itemsSelected, setItemsSelected] = useState(initialItemsSelectedState)

    const handleExitOnboarding = async () => {
        console.log("Items Selected: ", itemsSelected)

        const submitData = {
            interests: itemsSelected.interests
        }

        const res = await fetch("/api/userCompleteOnboarding", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(submitData)
        })

        const resJSON = await res.json();

        console.log(resJSON)

        location.href = "/dashboard"
    }

    const handleAddItem = (category, key, itemIdx) => {
        const itemEl = document.getElementsByClassName(`onboarding-${category}-grid-item`)[itemIdx]
        if(itemsSelected[category].includes(key)) {
            const newItemsSelected = itemsSelected;
            newItemsSelected[category] = newItemsSelected[category].filter((item) => item !== key)

            setItemsSelected(newItemsSelected)

            itemEl.classList.remove(`onboarding-${category}-grid-item-selected`)

        } else {
            const newItemsSelected = itemsSelected;
            itemsSelected[category].push(key)

            setItemsSelected(newItemsSelected)

            itemEl.classList.add(`onboarding-${category}-grid-item-selected`)
        }
    }

    return (
        <div className="onboarding">
            <header className="onboarding-header">
                <h1>Welcome Aboard</h1>
            </header>
            <div className="onboarding-interests">
                <header className="onboarding-interests-header">
                    <h2>What are you interested in most?</h2>
                </header>
                <div className="onboarding-interests-grid">
                    <div className={`onboarding-interests-grid-item ${itemsSelected.interests.includes(interestsAndConnectionsMap.commercial_aviation) && "onboarding-interests-grid-item-selected"}`} onClick={() => handleAddItem("interests", interestsAndConnectionsMap.commercial_aviation, 0)}>
                        <header className="onboarding-interests-grid-item-header">
                            <h4>Commercial Aviation</h4>
                        </header>
                        <div className={`onboarding-interests-grid-item-image`}>
                            <img src="https://images.unsplash.com/photo-1556388158-158ea5ccacbd?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
                        </div>
                    </div>
                    <div className={`onboarding-interests-grid-item ${itemsSelected.interests.includes(interestsAndConnectionsMap.military_aviation) ? "onboarding-interests-grid-item-selected" : ""}`} onClick={() => handleAddItem("interests", interestsAndConnectionsMap.military_aviation, 1)}>
                        <header className="onboarding-interests-grid-item-header">
                            <h4>Military Aviation</h4>
                        </header>
                        <div className="onboarding-interests-grid-item-image">
                            <img src="https://images.unsplash.com/photo-1519074031893-210d39bd3885?q=80&w=3124&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
                        </div>
                    </div>
                    <div className={`onboarding-interests-grid-item ${itemsSelected.interests.includes(interestsAndConnectionsMap.drones) ? "onboarding-interests-grid-item-selected" : ""}`} onClick={() => handleAddItem("interests", interestsAndConnectionsMap.drones, 2)}>
                        <header className="onboarding-interests-grid-item-header">
                            <h4>Drones / Aerial Photography</h4>
                        </header>
                        <div className="onboarding-interests-grid-item-image">
                            <img src="https://images.unsplash.com/photo-1508444845599-5c89863b1c44?q=80&w=2969&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
                        </div>
                    </div>
                    <div className={`onboarding-interests-grid-item ${itemsSelected.interests.includes(interestsAndConnectionsMap.homebuilding) ? "onboarding-interests-grid-item-selected" : ""}`} onClick={() => handleAddItem("interests", interestsAndConnectionsMap.homebuilding, 3)}>
                        <header className="onboarding-interests-grid-item-header">
                            <h4>Homebuilding</h4>
                        </header>
                        <div className="onboarding-interests-grid-item-image">
                            <img src="https://images.unsplash.com/photo-1508444845599-5c89863b1c44?q=80&w=2969&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
                        </div>
                    </div>
                    <div className={`onboarding-interests-grid-item ${itemsSelected.interests.includes(interestsAndConnectionsMap.aerospace) ? "onboarding-interests-grid-item-selected" : ""}`} onClick={() => handleAddItem("interests", interestsAndConnectionsMap.aerospace, 4)}>
                        <header className="onboarding-interests-grid-item-header">
                            <h4>Aerospace Engineering</h4>
                        </header>
                        <div className="onboarding-interests-grid-item-image">
                            <img src="https://images.unsplash.com/photo-1508444845599-5c89863b1c44?q=80&w=2969&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
                        </div>
                    </div>
                    <div className={`onboarding-interests-grid-item ${itemsSelected.interests.includes(interestsAndConnectionsMap.other) ? "onboarding-interests-grid-item-selected" : ""}`} onClick={() => handleAddItem("interests", interestsAndConnectionsMap.other, 5)}>
                        <header className="onboarding-interests-grid-item-header">
                            <h4>Other</h4>
                        </header>
                        <div className="onboarding-interests-grid-item-image">
                            <img src="https://images.unsplash.com/photo-1508444845599-5c89863b1c44?q=80&w=2969&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="onboarding-connections">
                <header className="onboarding-connections-header">
                    <h2>Who Do You Want To Connect With Most?</h2>
                </header>
                <div className="onboarding-connections-grid">
                    <div className={`onboarding-connections-grid-item ${itemsSelected.connections.includes(interestsAndConnectionsMap.friends) ? "onboarding-connections-grid-item-selected" : ""}`} onClick={() => handleAddItem("connections", interestsAndConnectionsMap.friends, 0)}>
                        <header className="onboarding-connections-grid-item-header">
                            <h4>My Friends</h4>
                        </header>
                        <div className="onboarding-connections-grid-item-image">
                            <img src="https://images.unsplash.com/photo-1527819569483-f188a16975af?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
                        </div>
                    </div>
                    <div className={`onboarding-connections-grid-item ${itemsSelected.connections.includes(interestsAndConnectionsMap.clubs) ? "onboarding-connections-grid-item-selected" : ""}`} onClick={() => handleAddItem("connections", interestsAndConnectionsMap.clubs, 1)}>
                        <header className="onboarding-connections-grid-item-header">
                            <h4>Clubs / Organizations</h4>
                        </header>
                        <div className="onboarding-connections-grid-item-image">
                            <img src="https://images.unsplash.com/photo-1512289936724-932f30b2ea41?q=80&w=3024&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
                        </div>
                    </div>
                    <div className={`onboarding-connections-grid-item ${itemsSelected.connections.includes(interestsAndConnectionsMap.projects) ? "onboarding-connections-grid-item-selected" : ""}`} onClick={() => handleAddItem("connections", interestsAndConnectionsMap.projects, 2)}>
                        <header className="onboarding-connections-grid-item-header">
                            <h4>Project Starters</h4>
                        </header>
                        <div className="onboarding-connections-grid-item-image">
                            <img src="https://images.unsplash.com/photo-1580285198593-af9f402c676a?q=80&w=3027&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
                        </div>
                    </div>
                </div>
            </div> */}
            <div className="onboarding-actions">
                <div>
                    <button onClick={handleExitOnboarding} className="onboarding-actions-button">Let's Go!</button>
                </div>
            </div>
        </div>
    )
}