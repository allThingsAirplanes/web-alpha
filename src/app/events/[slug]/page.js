import EventView from "@/components/events/EventView"
export default ({params}) => {
const pageSlug = params.slug
    return (
        <div>
            <EventView slug={pageSlug}/>
        </div>
    )
}