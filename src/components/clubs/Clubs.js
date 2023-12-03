"use client"; 
import {
    useEffect,
    useState
} from "react"
export default () => {
    const [clubs, setClubs] = useState (null) //this is the inital value of the state
    //a piece of state is something that you can read and write from
    //whenever you write to a piece of state, the application changes
    useEffect (
        () => {
            const getClubsData = async () => {
                const res = await fetch ("/api/getclubs")
                const data = await res.json ()
                console.log(data)
                // show us what data we get back - to the developer console

                setClubs (data) 
                //get the data from the server, then set the clubs profile to whatever the data is
            }
            getClubsData()
            //calling the fuction
        }, []
    )
    const renderClubMembers = (members) => {
        return members.map ((member) => {
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
                    }/>
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
            return clubs.map ((club) => {
                return (
                    <div>
                        <img src={club.picture} /> 
                        <p>
                            club: {
                                club.clubname
                            } 
                            {/* anything between curly braces is javascipt that gets filled in to the html */}
                        </p>
                        <div>
                            <p>
                                club members
                            </p>
                            <p>
                                num club members: 
                                {
                                    club.members.length
                                }
                            </p>
                            <div> 
                                {
                                    renderClubMembers (club.members)
                                }
                            </div>
                        </div>
                    </div>
                )
            })
        }
    }
    return (
        <div>
            <h1>
                Clubs
            </h1>
            <div>
                {
                    renderClubs ()
                }
            </div>
        </div>
    )
}