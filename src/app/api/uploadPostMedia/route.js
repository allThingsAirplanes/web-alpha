import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const { searchParams } = new URL(request.url);
        const filename = searchParams.get('filename');
        console.log("filename", filename)

        // ⚠️ The below code is for App Router Route Handlers only
        const blob = await put(filename, request.body, {
            access: 'public',
        });

        // Here's the code for Pages API Routes:
        // const blob = await put(filename, request, {
        //   access: 'public',
        // });

        return NextResponse.json(blob);
    } catch (error) {
        console.log("Error with upload post media")
    }
}

// The next lines are required for Pages API Routes only
// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };
