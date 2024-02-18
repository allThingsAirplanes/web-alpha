import Posts from "@/components/dashboard/Posts"
import UploadPost from "@/components/dashboard/UploadPost"
import Reccomendations from "@/components/dashboard/Reccomendations"
import Notifications from "@/components/dashboard/notifications/Notifications"

export const dynamic = "force-dynamic"

export const revalidate = 0

export default function Home() {
    return (
        <main className="dashboard">
            <div className="dashboard-feed">
                <div>
                    <Reccomendations />
                </div>
                <div>
                    <UploadPost />
                </div>
                <div>
                    <Posts />
                </div>
            </div>
            <div className="dashboard-notifications">
                <Notifications />
            </div>
        </main>
    )
}
