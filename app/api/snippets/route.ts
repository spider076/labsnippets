import SnippetModel from "../SnippetsModel";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

const MONGODB_URL =
    "mongodb+srv://saad76:EKrYWkWPUSQHTLLn@cluster0.wgmqb0q.mongodb.net/";

if (MONGODB_URL === undefined) {
    // window.alert("Invalid Mongodb url !");
    console.log("invalid mogodburl : ", MONGODB_URL);
} else {
    mongoose.connect(MONGODB_URL, { dbName: "LabSnippets" });
    console.log("connection established to database");
}

export async function GET(req: NextRequest) {
    try {
        const snippets = await SnippetModel.find({});
        return NextResponse.json({
            data: snippets
        });
    } catch (err) {
        console.log(err);
        return NextResponse.json({ error: "server error" });
    }
}

export async function POST(req) {
    try {
        const { snippet } = await req.json(); // Parse the request body

        const res = await SnippetModel.create({ snippet });

        return NextResponse.json({
            data: res // Return the created snippet object
        });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    const { id } = await req.json();

    const snippetId = new mongoose.Types.ObjectId(id);

    try {
        await SnippetModel.findByIdAndDelete(snippetId);
        return NextResponse.json(
            { message: "Snippet deleted successfully" },
            { status: 200 }
        );
    } catch (err) {
        console.log(err);
        return NextResponse.json(
            { error: "Failed to delete snippet" },
            { status: 400 }
        );
    }
}
