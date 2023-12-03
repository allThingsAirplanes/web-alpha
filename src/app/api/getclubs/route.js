import {
    NextResponse
} from "next/server"

export async function GET() {
    const clubsdata = [
        {
            id: 2,
            clubname: "club1",
            picture: "https://img.freepik.com/premium-vector/light-small-airplane-design-airplane-club-travel-logo-design_498574-443.jpg",
            members: [
                {
                    id: 9,
                    username: "user9", 
                    picture: "https://media.istockphoto.com/id/902377958/vector/commercial-airplane-silhouette.jpg?s=612x612&w=0&k=20&c=iHaXFu2C05MhNnq9-LwLsYeEMr03qqhXsAPzc_yrDnM="
                }
            ]
        },
        {
            id: 3,
            clubname: "club2",
            picture: "https://img.freepik.com/premium-vector/vintage-plane-aviation-badge-logo-design-vector-template_441059-571.jpg?w=2000",
            members: [
                
            ]
        }
    ]
    return NextResponse.json(clubsdata)
}