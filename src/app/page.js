import Posts from "@/components/dashboard/Posts"
import UploadPost from "@/components/dashboard/UploadPost"

export default function Home() {
  return (
    <main>
        <div>
            <UploadPost />
        </div>
      <div>
        <Posts />
      </div>
    </main>
  )
}
