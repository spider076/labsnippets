import { NextRequest, NextResponse } from "next/server";
import { Server } from "socket.io";

export async function GET(req: NextRequest) {
    return NextResponse.json({
        message: "hiisdfsdfsdi",
    });
}