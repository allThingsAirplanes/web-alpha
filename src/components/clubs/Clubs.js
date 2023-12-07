"use client";
import {
    useEffect,
    useState
} from "react"
export default () => {
    const [clubs, setClubs] = useState(null) //this is the inital value of the state
    //a piece of state is something that you can read and write from
    //whenever you write to a piece of state, the application changes
    useEffect(
        () => {
            const getClubsData = async () => {
                const res = await fetch("/api/getclubs")
                const data = await res.json()
                console.log(data)
                // show us what data we get back - to the developer console

                setClubs(data)
                //get the data from the server, then set the clubs profile to whatever the data is
            }
            getClubsData()
            //calling the fuction
        }, []
    )
    const handleJoinClub = async (club) => {
        try {
            const res = await fetch("/api/joinClub", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(club)
            })
            const resJson = await res.json()
            console.log("resJson", resJson)
            alert("Successfully Joined Club")
        } catch (error) {
            console.log("Error with joining club", error)
            alert("error joining club")
        }
    }
    const renderClubMembers = (members) => {
        return members.map((member) => {
            return (
                <div>
                    <p>
                        member username: {
                            member.username
                        }
                    </p>
                    <p>
                        member id: {
                            member.id
                        }
                    </p>
                    <img src={
                        member.picture
                    } />
                </div>
            )
        })
    }
    const renderClubs = () => {
        if (
            clubs
        ) {
            //clubs is an array of objects, each object represents one single club 
            //the map method loops over an array and returns html for every single item in that array
            //club singular represents every single club, while clubs is the array of club
            return clubs.map((club) => {
                return (
                    <div className="clubs-container-club">
                        <div className="clubs-container-club-media">
                            <img src={club.club_picture} />
                        </div>
                        <div className="clubs-container-club-name">
                            <p>
                                 {
                                    club.name
                                }
                                {/* anything between curly braces is javascipt that gets filled in to the html */}
                            </p>
                        </div>
                        <pre>
                            description: {
                                club.description
                            }
                            {/* A pre preserves the lines that you put in here */}
                        </pre>
                        <div>
                            <p>
                                num club members:
                                {
                                    club.members.length
                                }
                            </p>
                            <div>
                                <button onClick={() => handleJoinClub(club)}>
                                    Join Club
                                </button>
                            </div>
                        </div>
                    </div>
                )
            })
        }
    }
    return (
        <div className="clubs">
            <div className="clubs-header">
                <h1>
                    Clubs
                </h1>
            </div>
            <div className="clubs-container">
                {
                    renderClubs()
                }
            </div>
        </div>
    )
}