import Profile from "@/components/profile/Profile"

export const dynamic = "force-dynamic"

export const revalidate = 0

export default () => {
    return (
        <main>
            <Profile />
        </main>
    )
}