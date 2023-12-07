import Signup from "@/components/signup/Signup"

export const dynamic = "force-dynamic"

export const revalidate = 0

export default () => {
    return (
        <div>
            <Signup />
        </div>
    )
}