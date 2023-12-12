import ClubView from "@/components/clubs/ClubView"
export default ({params}) => {
const pageSlug = params.slug
    return (
        <div>
            <ClubView slug={pageSlug}/>
        </div>
    )
}