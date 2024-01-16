"use client";

import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client/debug';
import spinner from './spinner.svg';
import Image from 'next/image';
import { MdDelete } from "react-icons/md";
import { Toaster, toast } from 'sonner';
import { useCopyToClipboard } from 'usehooks-ts';
import { FaRegCopy } from "react-icons/fa6";

const socket = io('https://labsnippets.onrender.com/');
// const socket = io('http://localhost:3001/');


const SnippetsDisplay = () => {
    const [snippets, setSnippets] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [userId, setUserID] = useState("");

    const [copied, setCopy] = useCopyToClipboard()

    const handleNewSnippets = async () => {
        // setsnippets((prev: any) => [...prev, snippet]);
        // token = true;
        setTimeout(() => {
            console.log("socketConnected : ", socket.connected);

            if (socket.connected) {
                localStorage.setItem("userId", socket.id);
                setUserID(socket.id);
            } else {
                localStorage.setItem("userId", null);
            }
        }, 2000);

        try {
            const response = await fetch('/api/snippets', {
                method: 'GET',
            });
            const newSnippets = await response.json();

            console.log("new snippets : ", newSnippets);
            setSnippets(newSnippets.data);
            setLoading(false);
            // token = true;
        } catch (err) {
            console.log("error : ", err);
            alert('Failed to get snippets');
        } finally {
            setLoading(false);
        }
    };

    const deleteHandler = async (id) => {
        const response = await fetch('/api/snippets', {
            method: 'DELETE',
            body: JSON.stringify({
                id,
            })
        });
        // const deletedSnippet = await response.json();

        if (response.status != 200) {
            toast("Error Deleting Snippet");
        } else {
            setTimeout(() => {
                return window.location.reload();
            }, 1000);

            toast("Snippet Deleted Succesfully 🚮");
        }
    }

    const copyHandler = (snippet) => {
        setCopy(String(snippet));
        toast("Snippet Copied 👍 !");
    }

    useEffect(() => {
        handleNewSnippets();
    }, []);

    console.log("snippets ; ", snippets);

    return (
        <main className='mb-10 w-full bg-[#1b1b1b] h-[500px] '>
            <Toaster />
            <h1 className="p-2 text-lg ml-2">Snippets : </h1>
            {userId != undefined && (
                <h1 className='text-blue-300 text-center py-2  sm:text-[1.2rem]'>You are connected with Id : {userId}</h1>
            )}

            {loading && <Image src={spinner} className="mx-auto" height={100} width={100} alt="loading..." />}
            <div className={`max-h-full  text-black flex-1 border 
              rounded-md shadow-2xl shadow-gray-800 border-gray-800 ${snippets.length > 0 ? 'overflow-y-scroll' : ''}`}>
                {snippets.length > 0 && snippets.map((payload) => (
                    <div key={payload._id} className='relative p-4 flex flex-col bg-[#3a3a3a] text-gray-100  border-b border-gray-300 gap-4'>
                        {/* upper part */}
                        <div className='flex items-center justify-between'>
                            <span className="text-[1rem] font-semibold border-b w-max">UserId :
                                <span className="ml-2 text-orange-400">{payload.userId}</span> </span>
                            <div className='flex gap-4 items-center'>
                                <FaRegCopy onClick={()=>copyHandler(payload.snippet)} className='hover:text-orange-500 cursor-pointer text-gray-100 text-[1.2rem]' />
                                <button onClick={() => deleteHandler(payload._id)} className='flex items-center right-3 bg-blac border-b border-orange-300 top-2 text-[0.9rem] bg-gray-900 hover:bg-black rounded-md px-2 '>Delete
                                    <span className='ml-1 m-auto'><MdDelete className='text-orange-400' /></span>
                                </button>
                            </div>
                        </div>

                        <p className="mr-3">{payload.snippet}</p>

                    </div>
                ))}
            </div>
        </main>
    )
}

export default SnippetsDisplay