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
    const handlePostSubmit = async (event) => {
        try {
            event.preventDefault()
            const mediaRefFiles = mediaRef.current?.files
            const contentRefValue = contentRef.current?.value
            console.log("mediaRefFiles", mediaRefFiles)
            //? -> if no files are uploaded - it is not going to throw an error
            if (!mediaFile) {
                alert("You must upload a file")
                return
            }
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
            const mediaUploadURL = resJson.url
            const newPostData = {
                content: content,
                media_url: mediaUploadURL
            }
            const submitData = {
                project: props.project, 
                post: newPostData
            }
            const newPostRes = await fetch("/api/createProjectPost", {
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
                <form onSubmit={handlePostSubmit}>
                    <div>
                        <label>
                            New Project Post
                        </label>
                        <textarea className="upload-post-form-textarea"
                            onChange={
                                handleContentChange
                            }
                            placeholder="Write Something"
                        />
                    </div>
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
                        <button className="upload-post-form-button" type="submit">
                            Create New Post
                        </button>
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