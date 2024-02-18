import Events from "@/components/events/Events"

import CreateEvent from "@/components/events/CreateEvent"

export const dynamic = "force-dynamic"

export const revalidate = 0

export default () => {
    return(
        <div className="page_events">
            <CreateEvent />
            <Events />
        </div>
    )
}