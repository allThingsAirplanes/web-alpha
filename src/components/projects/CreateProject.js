"use client"
import {
    useRef,
    useState
} from "react"
export default () => {
    const projectTypeOptions = {
        commercial_aviation: "COMMERCIAL_AVIATION",
        military_aviation: "MILITARY_AVIATION",
        drones: "DRONES_AERIAL_PHOTOGRAPHY",
        homebuilding: "HOMEBUILDING",
        aerospace: "AEROSPACE",
        other: "OTHER"
    }
    //We should have types: homebuilding - programming - model building. 
    const mediaRef = useRef(null)
    const [mediaFile, setMediaFile] = useState(null)
    const [description, setdescription] = useState("")
    const [name, setName] = useState("")
    const [type, setType] = useState(projectTypeOptions.commerical_aviation)

    const MAX_NAME_CHARACTERS = 50

    const handleFileUpload = (event) => {
        console.log(event.target.files[0])
        setMediaFile(event.target.files[0])
    }
    const handleDescriptionChange = (event) => {
        setdescription(event.target.value)
    }
    const handleNameChange = (event) => {
        if (event.target.value.length <= MAX_NAME_CHARACTERS) {
            setName(event.target.value)
        }
    }
    const handleTypeChange = (event) => {
        setType(event.target.value)
    }
    const handleProjectSubmit = async (event) => {
        try {
            event.preventDefault()
            const mediaRefFiles = mediaRef.current?.files
            console.log("mediaRefFiles", mediaRefFiles)
            let mediaUploadURL = null
            //? -> if no files are uploaded - it is not going to throw an error
            if (mediaFile) {
                const res = await fetch(`/api/uploadProjectMedia?filename=${mediaFile.name}`, {
                    method: "POST",
                    body: mediaFile
                })
                const resJson = await res.json()
                console.log("Project Media Upload resJson", resJson)
                //First thing we handle uplaoding image to the blob storage
                //We need to put the image into the blob, but now we have to 
                //save the image into the database with the url
                //When we upload the blob
                //We will get a URL that points to it. 
                mediaUploadURL = resJson.url
            }
            const newProjectData = {
                description: description,
                project_picture: mediaUploadURL,
                name: name,
                type: type
            }
            const newProjectRes = await fetch("/api/createProject", {
                method: "POST",
                headers: {
                    "content-type": "applications/json"
                },
                body: JSON.stringify(newProjectData)
            })
            const newProjectResJson = await newProjectRes.json()
            console.log("newProjectResJson", newProjectResJson)
            //This is the easy way that we are going to change in the future. 
            location.reload();
        } catch (error) {
            console.log("Error with handleProjectSubmit", error)
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
    const renderProjectForm = () => {
        return (
            <div className="create-project-form">
                <form onSubmit={handleProjectSubmit}>
                    <div>
                        <label>
                            Name
                        </label>
                        <input type="text" className="create-project-form-input"
                            onChange={
                                handleNameChange
                            }
                            placeholder="New Project Name"
                            value={
                                name
                            }
                        />
                    </div>
                    <div>
                        {
                            name.length
                        }/
                        {
                            MAX_NAME_CHARACTERS
                        }
                    </div>
                    <div>
                        <label>
                            Type
                        </label>
                        <select
                            onChange={
                                handleTypeChange
                            }
                            value={
                                type
                            }
                        >
                            <option value={projectTypeOptions.commerical_aviation}>
                                Commerical Aviation
                            </option>
                            <option value={projectTypeOptions.military_aviation}>
                                Military Aviation
                            </option>
                            <option value={projectTypeOptions.homebuilding}>
                                Homebuilding
                            </option>
                            <option value={projectTypeOptions.drones}>
                                Drones
                            </option>
                            <option value={projectTypeOptions.aerospace}>
                                Aerospace
                            </option>
                            <option value={projectTypeOptions.other}>
                                Other
                            </option>
                        </select>
                    </div>
                    <div>
                        <label>
                            Description
                        </label>
                        <textarea className="create-project-form-textarea"
                            onChange={
                                handleDescriptionChange
                            }
                            placeholder="Description"
                        />
                    </div>
                    <div>
                        <label className="create-project-form-label" for="media-upload-button">
                            <span className="create-project-form-label-icon">
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
                    {
                        renderPreviewImage()
                    }
                    <div>
                        <button className="create-project-form-button" type="submit">
                            Create New Project
                        </button>
                    </div>
                </form>
            </div>
        )
    }
    return (
        <div className="create-project">
            {renderProjectForm()}
        </div>
    )
}