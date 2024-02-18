"use client"
import {
    useRef,
    useState
} from "react"
export default () => {
    const clubTypeOptions = {
        hobby: "HOBBY",
        professional: "PROFESSIONAL",
        civil_air_patrol: "CIVIL_AIR_PATROL",
        experimental_aircraft_association: "EXPERIMENTAL_AIRCRAFT_ASSOCIATION",
        aopa: "AOPA"
    }
    const mediaRef = useRef(null)
    const [mediaFile, setMediaFile] = useState(null)
    const [description, setdescription] = useState("")
    const [name, setName] = useState("")
    const [type, setType] = useState(clubTypeOptions.hobby)

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
    const handleClubSubmit = async (event) => {
        try {
            event.preventDefault()
            const mediaRefFiles = mediaRef.current?.files
            console.log("mediaRefFiles", mediaRefFiles)
            let mediaUploadURL = null
            //? -> if no files are uploaded - it is not going to throw an error
            if (mediaFile) {
                const res = await fetch(`/api/uploadClubMedia?filename=${mediaFile.name}`, {
                    method: "POST",
                    body: mediaFile
                })
                const resJson = await res.json()
                console.log("Club Media Upload resJson", resJson)
                //First thing we handle uplaoding image to the blob storage
                //We need to put the image into the blob, but now we have to 
                //save the image into the database with the url
                //When we upload the blob
                //We will get a URL that points to it. 
                mediaUploadURL = resJson.url
            }
            const newClubData = {
                description: description,
                club_picture: mediaUploadURL,
                name: name,
                type: type
            }
            const newClubRes = await fetch("/api/createClub", {
                method: "POST",
                headers: {
                    "content-type": "applications/json"
                },
                body: JSON.stringify(newClubData)
            })
            const newClubResJson = await newClubRes.json()
            console.log("newClubResJson", newClubResJson)
            //This is the easy way that we are going to change in the future. 
            location.reload();
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
            <div className="create-club-form">
                <form onSubmit={handleClubSubmit}>
                    <div>
                        <label>
                            Name
                        </label>
                        <input type="text" className="create-club-form-input"
                            onChange={
                                handleNameChange
                            }
                            placeholder="New Club Name"
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
                            <option value={clubTypeOptions.hobby}>
                                Hobby
                            </option>
                            <option value={clubTypeOptions.professional}>
                                Professional
                            </option>
                            <option value={clubTypeOptions.civil_air_patrol}>
                                Civil Air Patrol
                            </option>
                            <option value={clubTypeOptions.experimental_aircraft_association}>
                                Experimental Aircraft Association
                            </option>
                            <option value={clubTypeOptions.aopa}>
                                AOPA
                            </option>
                        </select>
                    </div>
                    <div>
                        <label>
                            Description
                        </label>
                        <textarea className="create-club-form-textarea"
                            onChange={
                                handleDescriptionChange
                            }
                            placeholder="Description"
                        />
                    </div>
                    <div>
                        <label className="create-club-form-label" htmlFor="media-upload-button">
                            <span className="create-club-form-label-icon">
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
                        <button className="create-club-form-button" type="submit">
                            Create New Club
                        </button>
                    </div>
                </form>
            </div>
        )
    }
    return (
        <div className="create-club">
            {renderPostForm()}
        </div>
    )
}