import OtherUser from "@/components/profile/OtherUser"

export const dynamic = "force-dynamic"

export const revalidate = 0

export default (props) => {
    const pageSlug = props.params.slug
    return (
        <main>
            <OtherUser username={pageSlug}/>
        </main>
    )
}