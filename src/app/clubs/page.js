import Clubs from "@/components/clubs/Clubs"
import CreateClub from "@/components/clubs/CreateClub"

export const dynamic = "force-dynamic"

export const revalidate = 0

export default () => {
    return(
        <div className="page_clubs">
            <CreateClub />
            <Clubs />
        </div>
    )
}