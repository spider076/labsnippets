"use client";

import React, { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { userState } from "./atoms/user";
import { io } from "socket.io-client/debug";
import { toast } from "sonner";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const socket = io("https://labsnippets.onrender.com/");
// const socket = io('http://localhost:3001/');

const InputContainer = () => {
    const [snippet, setSnippet] = useState<string>("");
    const [room, setRoom] = useState<string>("");

    const userId = useRecoilValue(userState);

    const snippetChange = (e: any) => {
        setSnippet(e.target.value);
    };

    const send = async (e: any) => {
        e.preventDefault();
        if (snippet === "")
            return alert("You want to populate the db with empty data ? u sure");
        const response = await fetch("/api/snippets", {
            method: "POST",
            body: JSON.stringify({
                snippet
            })
        });
        // const deletedSnippet = await response.json();

        if (response.status != 200) {
            toast("Error Deleting Snippet");
        } else {
            setTimeout(() => {
                return window.location.reload();
            }, 1000);

            toast("Snippet Pushed Succesfully ✅");
            window.location.reload();
        }
    };

    useEffect(() => {
        console.log("socket ::: ", socket);
    }, []);

    const formats = [
        "header",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "list",
        "bullet",
        "link",
        "indent",
        "image",
        "code-block",
        "color"
    ];

    return (
        <div className="mt-6 flex flex-col space-y-4 w-full">
            <form onSubmit={(e) => send(e)} className="w-full flex flex-col">
                {/* <label htmlFor="message">Message</label> */}
                <ReactQuill
                    className='w-full pb-4 bg-transparent !placeholder:text-gray-300'
                    placeholder="Write snippets here"
                    theme="snow"
                    value={snippet}
                    onChange={setSnippet}
                    modules={{ toolbar: ["bold"] }}
                    formats={formats}
                />
                <button
                    type="submit"
                    className="p-1 w-[140px] px-5 border text-black
                hover:-translate-x-2 transition-all ease-in-out  bg-[#21a9d3]
                 border-gray-700 font-semibold rounded-md"
                >
                    Send
                </button>
            </form>
        </div>
    );
};

export default InputContainer;
