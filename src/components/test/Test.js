"use client"

export default () => {
    const testAPI = async() => {
        const res = await fetch ("/api/test", {
            //You only need to put this part if you are making a POST/DELETE, 
            //or anything that is not a GET request. 
            method: "POST",
            headers: {
                "content-type": "application/json"
            }
        })
        const resJson = await res.json ()
        alert ("got_data")
    }
    return(
        <div className="test" onClick={testAPI}>
            This is a cool thing
        </div>
    )
}