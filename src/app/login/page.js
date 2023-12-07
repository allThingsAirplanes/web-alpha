import Login from "@/components/login/Login"

export const dynamic = "force-dynamic"

export const revalidate = 0

export default () => {
    return (
        <div>
            <Login />
        </div>
    )
}