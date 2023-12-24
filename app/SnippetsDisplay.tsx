"use client";

import React, { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil';
import { userState } from './atoms/user';
import { io } from 'socket.io-client/debug';

const socket = io('http://localhost:3001');

const SnippetsDisplay = () => {
    const [snippets, setsnippets] = useState<any[]>([]);

    const [, setUserId] = useRecoilState(userState);


    const handleNewMessage = (snippet: any) => {
        setsnippets((prev: any) => [...prev, snippet]);
        token = true;
        console.log("reloading ");
    };

    let token = false;

    useEffect(() => {
        if (!token) {
            socket.on('snippets', handleNewMessage);
            console.log("socketid", socket.id);
            setUserId(socket.id);
        }

        return () => { socket.off('snippets', handleNewMessage) };
    }, []);

    console.log('snippets : ', snippets);

    // const snippets = useRecoilValue(snippetsState);

    return (
        <main className='w-full max-h-[80vh] bg-[#1b1b1b] h-[500px] '>
            <h1 className="p-2 text-lg ml-2">Snippets : </h1>
            {socket.connected && (
                <h1 className='text-blue-300 text-center py-2  sm:text-[1.2rem]'>You are connected with Id : {socket.id}</h1>
            )}
            <div className={`h-full text-black flex-1 border 
              rounded-md shadow-2xl shadow-gray-800 border-gray-800 ${snippets.length > 0 ? 'overflow-y-scroll' : ''}`}>
                {snippets.length > 0 && snippets.map((payload) => (
                    <div className='p-4 flex flex-col bg-[#3a3a3a] text-gray-100  border-b border-gray-300 gap-4'>
                        <span className="text-[1rem] font-semibold border-b w-max">UserId :
                            <span className="ml-2 text-orange-400">{payload.userId}</span> </span>
                        <p className="mr-3">{payload.snippet}</p>
                    </div>
                ))}
            </div>
        </main>
    )
}

export default SnippetsDisplay