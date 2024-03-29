"use client"
import {
    useRef,
    useState
} from "react"

export default () => {
    const categoriesMap = {
        commercial_aviation: "COMMERCIAL_AVIATION",
        military_aviation: "MILITARY_AVIATION",
        drones: "DRONES_AERIAL_PHOTOGRAPHY",
        homebuilding: "HOMEBUILDING",
        aerospace: "AEROSPACE",
        other: "OTHER"
    }
    //the user interests are determining which post get reccomended. 

    const mediaRef = useRef(null)
    const contentRef = useRef(null)
    const [showPostForm, setShowPostForm] = useState(false)
    const [mediaFile, setMediaFile] = useState(null)
    const [content, setContent] = useState("")
    const [category, setCategory] = useState(Object.values(categoriesMap)[0])
    
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

    const handleCategoryChange = (event) => {
        setCategory(event.target.value)
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
            const newPostData = {
                content: content,
                media_url: mediaUploadURL,
                category: category
            }
            const newPostRes = await fetch("/api/createPost", {
                method: "POST",
                headers: {
                    "content-type": "applications/json"
                },
                body: JSON.stringify(newPostData)
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
                            New Post
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
                    <div className="upload-post-form-section">
                        <label className="upload-post-form-label">
                            Category
                        </label>
                        <select className="upload-post-form-select" onChange={handleCategoryChange}>
                            <option value={categoriesMap.commercial_aviation}>Commerical Aviation</option>
                            <option value={categoriesMap.military_aviation}>Military Aviation</option>
                            <option value={categoriesMap.drones}>Drones / Aerial Photography</option>
                            <option value={categoriesMap.homebuilding}>Homebuilding</option>
                            <option value={categoriesMap.aerospace}>Aerospace Engineering</option>
                            <option value={categoriesMap.other}>Other</option>
                        </select>
                    </div>
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