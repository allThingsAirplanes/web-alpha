import Clubs from "@/components/clubs/Clubs"
import CreateClub from "@/components/clubs/CreateClub"
export default () => {
    return(
        <div className="page_clubs">
            <CreateClub />
            <Clubs />
        </div>
    )
}