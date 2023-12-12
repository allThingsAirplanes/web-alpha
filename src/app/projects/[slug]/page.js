import Project from "@/components/projects/ProjectView"
export default ({params}) => {
const pageSlug = params.slug
    return (
        <div>
            <Project slug={pageSlug}/>
        </div>
    )
}