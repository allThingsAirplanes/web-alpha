"use client"
import {
    useRef,
    useState
} from "react"
export default () => {
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
    const handlePostSubmit = async(event) => {
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
            const newPostRes = await fetch ("/api/createPost", {
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
        } catch(error) {
            console.log("Error with handlePostSubmit", error)
        }
    }
    const renderPostForm = () => {
        if (showPostForm) {
            return (
                <div>
                <form onSubmit={handlePostSubmit}>
                    <div>
                        <label>
                            Upload an Image
                        </label>
                        <input 
                        type = "file"
                        accept = "image/*"
                        ref = {
                            mediaRef
                        } 
                        onChange = {
                            handleFileUpload
                        }
                        />
                    </div>
                    <div>
                        <label>
                            Content
                        </label>
                        <input 
                        type = "text"
                        ref = {
                            mediaRef
                        }
                        onChange = {
                            handleContentChange
                        }
                        />
                    </div>
                    <div>
                        <button type="submit">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
            )
        }
    }
    return (
        <div>
            <div>
                <button className="post-upload-btn" onClick = {handleShowPostForm}>
                    Create new post
                </button>
            </div>
            <div>
                <h1>
                    Create a new post
                </h1>
            </div>
            {renderPostForm()}
        </div>
    )
}