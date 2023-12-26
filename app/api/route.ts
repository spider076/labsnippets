import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import { Server } from "socket.io";
import socketIO from 'socket.io';
import SnippetModel from "./SnippetsModel";

export async function GET(req: NextRequest) {


    const io = new socketIO.Server();

    const MONGODB_URL = "mongodb+srv://saad76:EKrYWkWPUSQHTLLn@cluster0.wgmqb0q.mongodb.net/";

    if (MONGODB_URL === undefined) {
        // window.alert("Invalid Mongodb url !");
        console.log("invalid mogodburl : ", MONGODB_URL);
    } else {
        mongoose.connect(MONGODB_URL, { dbName: "LabSnippets" });
    }

    console.log('sesrver is working !!!');

    io.on('connection', (socket) => {
        console.log('A user connected : ', socket.id);

        // Listen for chat snippets
        socket.on('snippets', async (snippet, room) => {
            // Broadcast the snippets to all connected members
            if (room == "") {
                const newSnippet = new SnippetModel({
                    snippet: snippet.snippet,
                    user: snippet.userId
                });

                try {
                    await newSnippet.save();
                    console.log("snippet succesfully saved in db !");
                } catch (err) {
                    console.log('Error saving Snippets to Database !', err);
                }


                io.emit('snippets', snippet);
            } else {
                // Broadcast the snippets to only room members
                socket.to(room).emit('snippets', snippet);
            }
        });

        // Handle disconnection
        socket.on('disconnect', () => {
            console.log('User disconnected');
        });
    });

    return NextResponse.json({
        message: "hiisdfsdfsdi",
    });
};
