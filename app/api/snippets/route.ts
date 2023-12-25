import SnippetModel from '@/backend/SnippetsModel';
import mongoose from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next'
import { NextRequest, NextResponse } from 'next/server';

type ResponseData = {
    message: string
}

const MONGODB_URL = "mongodb+srv://saad76:EKrYWkWPUSQHTLLn@cluster0.wgmqb0q.mongodb.net/";

if (MONGODB_URL === undefined) {
    // window.alert("Invalid Mongodb url !");
    console.log("invalid mogodburl : ", MONGODB_URL);
} else {
    mongoose.connect(MONGODB_URL, { dbName: "LabSnippets" });
    console.log("connection established to database");
}

export async function GET(
    req: NextRequest,
) {
    try {
        const snippets = await SnippetModel.find({});

        return NextResponse.json({
            data: snippets,
            count: snippets.length,
        })

    } catch (err) {
        console.log(err);
        return NextResponse.json({ error: 'server error' });
   }
}