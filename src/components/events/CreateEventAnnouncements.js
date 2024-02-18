"use client"
import {
    useRef,
    useState
} from "react"
export default (props) => {
    const contentRef = useRef(null)
    const [showAnnouncementForm, setShowAnnouncementForm] = useState(false)
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const handleShowAnnouncementForm = () => {
        setShowAnnouncementForm(!showAnnouncementForm)
        //this is a toggle - if it is true, we set it to false, if its false, we set it to true
    }
    const handleContentChange = (event) => {
        setContent(event.target.value)
    }

    const handleTitleChange = (event) => {
        setTitle(event.target.value)
    }

    const handleAnnouncementSubmit = async (event) => {
        try {
            event.preventDefault()
            const contentRefValue = contentRef.current?.value
            //? -> if no files are uploaded - it is not going to throw an error
            const newAnnouncementData = {
                title, 
                content
            }
            const submitData = {
                event: props.event, 
                announcement: newAnnouncementData
            }
            const newAnnouncementRes = await fetch("/api/createEventAnnouncement", {
                method: "POST",
                headers: {
                    "content-type": "applications/json"
                },
                body: JSON.stringify(submitData)
                //we also need to send information about adding posts to when we call the API endpoint, that is
                //why we are switching from newPostData to submitData.  
            })
            const newAnnouncementResJson = await newAnnouncementRes.json()
            console.log("newAnnouncementResJson", newAnnouncementResJson)
            location.reload()
            //This is the easy way that we are going to change in the future. 
        } catch (error) {
            console.log("Error with handleAnnouncementSubmit", error)
        }
    }

    const renderAnnouncementForm = () => {
        return (
            <div className="upload-announcement-form">
                <form onSubmit={handleAnnouncementSubmit}>
                    <div>
                        <label>
                            New Announcements
                        </label>
                        <input className="upload-announcement-form-input" type="text"
                            onChange={
                                handleTitleChange
                            }
                            placeholder="Enter the title"
                        />
                    </div>
                    <div>
                        <label>
                            Desciption
                        </label>
                        <textarea className="upload-post-form-textarea"
                            onChange={
                                handleContentChange
                            }
                            placeholder="Describe your progress"
                        />
                    </div>
                    <div>
                        <button className="upload-announcement-form-button" type="submit">
                            Create New Announcement
                        </button>
                    </div>
                </form>
            </div>
        )
    }
    return (
        <div className="upload-announcement">
            {renderAnnouncementForm()}
        </div>
    )
}