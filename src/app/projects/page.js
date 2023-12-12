import Projects from "@/components/projects/Projects"
import CreateProject from "@/components/projects/CreateProject"

export const dynamic = "force-dynamic"

export const revalidate = 0

export default () => {
    return(
        <div className="page_projects">
            <CreateProject />
            <Projects />
        </div>
    )
}