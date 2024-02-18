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
    const mediaRef = useRef(null)
    const [mediaFile, setMediaFile] = useState(null)
    const [description, setdescription] = useState("")
    const [name, setName] = useState("")
    const [dateStart, setDateStart] = useState(null)
    const [dateEnd, setDateEnd] = useState(null)
    const [catchphrase, setCatchphrase] = useState("")
    const [eventLink, setEventLink] = useState("")
    const [category, setCategory] = useState(Object.values(categoriesMap)[0])

    const MAX_NAME_CHARACTERS = 50

    const handleFileUpload = (event) => {
        console.log(event.target.files[0])
        setMediaFile(event.target.files[0])
    }
    const handleDescriptionChange = (event) => {
        setdescription(event.target.value)
    }
    const handleDateStartChange = (event) => {
        setDateStart(event.target.value)
    }
    const handleDateEndChange = (event) => {
        setDateEnd(event.target.value)
    }
    const handleCatchphraseChange = (event) => {
        setCatchphrase(event.target.value)
    }
    const handleEventLinkChange = (event) => {
        setEventLink(event.target.value)
    }
    const handleNameChange = (event) => {
        if (event.target.value.length <= MAX_NAME_CHARACTERS) {
            setName(event.target.value)
        }
    }
    const handleCategoryChange = (event) => {
        setCategory(event.target.value)
    }
    const handleEventSubmit = async (event) => {
        try {
            event.preventDefault()
            const mediaRefFiles = mediaRef.current?.files
            console.log("mediaRefFiles", mediaRefFiles)
            let mediaUploadURL = null
            //? -> if no files are uploaded - it is not going to throw an error
            if (mediaFile) {
                const res = await fetch(`/api/uploadEventMedia?filename=${mediaFile.name}`, {
                    method: "POST",
                    body: mediaFile
                })
                const resJson = await res.json()
                console.log("Event Media Upload resJson", resJson)
                //First thing we handle uplaoding image to the blob storage
                //We need to put the image into the blob, but now we have to 
                //save the image into the database with the url
                //When we upload the blob
                //We will get a URL that points to it. 
                mediaUploadURL = resJson.url
            }
            const newEventData = {
                description: description,
                event_banner_picture: mediaUploadURL,
                name: name,
                date_start: dateStart,
                date_end: dateEnd,
                catchphrase: catchphrase,
                event_link: eventLink,
                category
            }
            const newEventRes = await fetch("/api/createEvent", {
                method: "POST",
                headers: {
                    "content-type": "applications/json"
                },
                body: JSON.stringify(newEventData)
            })
            const newEventResJson = await newEventRes.json()
            console.log("newEventResJson", newEventResJson)
            //This is the easy way that we are going to change in the future. 
            location.reload();
        } catch (error) {
            console.log("Error with handleEventSubmit", error)
        }
    }
    const renderPreviewImage = () => {
        if (mediaFile) {
            const previewImageURL = URL.createObjectURL(mediaFile)
            return (
                <div className="craete-event-preview-image">
                    <div>
                        <img src={previewImageURL} />
                    </div>
                </div>
            )
        }
    }
    const renderEventForm = () => {
        return (
            <div className="create-event-form">
                <form onSubmit={handleEventSubmit}>
                    <div>
                        <label>
                            Name
                        </label>
                        <input type="text" className="create-event-form-input"
                            onChange={
                                handleNameChange
                            }
                            placeholder="New Event Name"
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
                            Description
                        </label>
                        <textarea className="create-event-form-textarea"
                            onChange={
                                handleDescriptionChange
                            }
                            placeholder="Description"
                        />
                    </div>
                    <div>
                        <label className="create-event-form-label create-event-form-label-image" for="media-upload-button">
                            <span className="create-event-form-label-icon">
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
                        <label>
                            Event Date Start:
                        </label>
                        <input type="date" className="create-event-form-input" onChange={handleDateStartChange} />
                    </div>
                    <div>
                        <label>
                            Event Date End:
                        </label>
                        <input type="date" className="create-event-form-input create-event-form-input-small" onChange={handleDateEndChange} />
                    </div>
                    <div>
                        <label className="create-event-form-input-label create-event-form-input-label-italic">
                            Catchphrase:
                        </label>
                        <input type="text" placeholder="Take off!" className="create-event-form-input create-event-form-input-small" onChange={handleCatchphraseChange} />
                    </div>
                    <div>
                        <label className="create-event-form-input-label">
                            Event Link:
                        </label>
                        <input type="text" placeholder="Enter link eg. zoom, google meet" className="create-event-form-input create-event-form-input-small" onChange={handleEventLinkChange} />
                    </div>
                    <div>
                        <button className="create-event-form-button" type="submit">
                            Create New Event
                        </button>
                    </div>
                </form>
            </div>
        )
    }
    return (
        <div className="create-event">
            {renderEventForm()}
        </div>
    )
}