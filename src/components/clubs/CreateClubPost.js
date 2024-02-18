"use client"
import {
    useRef,
    useState
} from "react"
export default (props) => {
    const mediaRef = useRef(null)
    const contentRef = useRef(null)
    const [showPostForm, setShowPostForm] = useState(false)
    const [mediaFile, setMediaFile] = useState(null)
    const [content, setContent] = useState("")
    const [showAddPost, setShowAddPost] = useState(true)
    const [announcement, setAnnouncement] = useState("")
    const handleShowPostForm = () => {
        setShowPostForm(!showPostForm)
        //this is a toggle - if it is true, we set it to false, if its false, we set it to true
    }
    const handleFileUpload = (event) => {
        console.log(event.target.files[0])
        setMediaFile(event.target.files[0])
    }
    const handleContentChange = (event) => {
        setContent(event.target.value)
    }
    const handleAnnouncementChange = (event) => {
        setAnnouncement(event.target.value)
    }
    const handleSelectPostType = (event) => {
        if (event.target.value === "new-post") {
            setShowAddPost(true)
        } else {
            setShowAddPost(false)
        }
    }
    const handlePostSubmit = async (event) => {
        try {
            event.preventDefault()
            const mediaRefFiles = mediaRef.current?.files
            const contentRefValue = contentRef.current?.value
            console.log("mediaRefFiles", mediaRefFiles)
            let mediaUploadURL = null
            //? -> if no files are uploaded - it is not going to throw an error
            if (mediaFile) {
                const res = await fetch(`/api/uploadPostMedia?filename=${mediaFile.name}`, {
                    method: "POST",
                    body: mediaFile
                })
                const resJson = await res.json()
                console.log("Post Media Upload resJson", resJson)
                //First thing we handle uplaoding image to the blob storage
                //We need to put the image into the blob, but now we have to 
                //save the image into the database with the url
                //When we upload the blob
                //We will get a URL that points to it. 
                mediaUploadURL = resJson.url
            }
            console.log("mediaUploadURL", mediaUploadURL)
            const newPostData = {
                content: content,
                media_url: mediaUploadURL
            }
            const submitData = {
                club: props.club,
                post: newPostData
            }
            const newPostRes = await fetch("/api/createClubPost", {
                method: "POST",
                headers: {
                    "content-type": "applications/json"
                },
                body: JSON.stringify(submitData)
                //we also need to send information about adding posts to when we call the API endpoint, that is
                //why we are switching from newPostData to submitData.  
            })
            const newPostResJson = await newPostRes.json()
            console.log("newPostResJson", newPostResJson)
            location.reload()
            //This is the easy way that we are going to change in the future. 
        } catch (error) {
            console.log("Error with handlePostSubmit", error)
        }
    }

    const handleAnnouncementSubmit = async (event) => {
        try {
            event.preventDefault()
            const mediaRefFiles = mediaRef.current?.files
            const contentRefValue = contentRef.current?.value
            console.log("mediaRefFiles", mediaRefFiles)
            let mediaUploadURL = null
            //? -> if no files are uploaded - it is not going to throw an error
            if (mediaFile) {
                const res = await fetch(`/api/uploadPostMedia?filename=${mediaFile.name}`, {
                    method: "POST",
                    body: mediaFile
                })
                const resJson = await res.json()
                console.log("Post Media Upload resJson", resJson)
                //First thing we handle uplaoding image to the blob storage
                //We need to put the image into the blob, but now we have to 
                //save the image into the database with the url
                //When we upload the blob
                //We will get a URL that points to it. 
                mediaUploadURL = resJson.url
            }
            console.log("mediaUploadURL", mediaUploadURL)
            const newAnnouncementData = {
                content: announcement,
                media_url: mediaUploadURL
            }
            const submitData = {
                club: props.club,
                announcement: newAnnouncementData
            }
            const newAnnouncementRes = await fetch("/api/createClubAnnouncement", {
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
            console.log("Error with handlePostSubmit", error)
        }
    }

    const renderPreviewImage = () => {
        if (mediaFile) {
            const previewImageURL = URL.createObjectURL(mediaFile)
            return (
                <div className="craete-project-preview-image">
                    <div>
                        <img src={previewImageURL} />
                    </div>
                </div>
            )
        }
    }

    const renderPostForm = () => {
        return (
            <div className="upload-post-form">
                <form onSubmit={showAddPost ? handlePostSubmit : handleAnnouncementSubmit}>
                    {
                        //This is an inline if statement - we are checking if the user
                        // is an organizer, but we are just setting it to true for now.  
                        true ?
                            <div>
                                <select onChange={handleSelectPostType}>
                                    {/*name here is not associated with css */}
                                    <option name="new-post" value="new-post">
                                        New Post
                                    </option>
                                    <option name="new-announcement" value="new-announcement">
                                        New Accouncement
                                    </option>
                                </select>
                                {
                                    showAddPost ?
                                        <textarea className="upload-post-form-textarea"
                                            onChange={
                                                handleContentChange
                                            }
                                            placeholder="Write Something"
                                        />
                                        :
                                        <textarea className="upload-post-form-textarea"
                                            onChange={
                                                handleAnnouncementChange
                                            }
                                            placeholder="Make an announcement"
                                        />
                                }
                            </div>
                            :
                            <div>
                                <label>
                                    New Post
                                </label>
                                <textarea className="upload-post-form-textarea"
                                    onChange={
                                        handleContentChange
                                    }
                                    placeholder="Write Something"
                                />
                            </div>
                    }
                    <div>
                        <label className="upload-post-form-label" htmlFor="media-upload-button">
                            <span className="upload-post-form-label-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                </svg>

                            </span>
                            <p>
                                Upload an Image
                            </p>
                        </label>
                        <input
                            id="media-upload-button"
                            type="file"
                            accept="image/*"
                            ref={
                                mediaRef
                            }
                            onChange={
                                handleFileUpload
                            }
                            hidden={true}
                        />
                    </div>
                    {renderPreviewImage()}
                    <div>
                        {
                            showAddPost ?
                                //Ternairy statement
                                <button className="upload-post-form-button" type="submit">
                                    Create New Post
                                </button>
                                :
                                <button className="upload-post-form-button" type="submit">
                                    Create New Announcement
                                </button>
                        }
                    </div>
                </form>
            </div>
        )
    }
    return (
        <div className="upload-post">
            {renderPostForm()}
        </div>
    )
}