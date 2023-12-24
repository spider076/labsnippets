import type { NextApiRequest, NextApiResponse } from 'next'
import { NextRequest, NextResponse } from 'next/server';

type ResponseData = {
    message: string
}

export async function GET(
    req: NextRequest,
) {
    return NextResponse.json({
        message: "hiifsfsdi",
    })
}