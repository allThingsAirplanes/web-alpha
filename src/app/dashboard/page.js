import Posts from "@/components/dashboard/Posts"
import UploadPost from "@/components/dashboard/UploadPost"
import Sidebar from "@/components/dashboard/sidebar/Sidebar"

export default function Home() {
    return (
        <main className="page dashboard">
            <div>
              <Sidebar />
            </div>
            <div className="dashboard-feed">
                <div>
                    <UploadPost />
                </div>
                <div>
                    <Posts />
                </div>
            </div>
        </main>
    )
}
