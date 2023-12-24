"use client";

import React, { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil';
import { messagesState } from './atoms/messsages';
import { io } from 'socket.io-client/debug';

const socket = io('http://localhost:3001');

const MessagesDisplay = () => {
    const [messages, setMessages] = useState<any[]>([]);

    useEffect(() => {
        socket.on('chat message', (message: any) => {
            setMessages((prev: any) => [...prev, message]);
        })

    }, []);

    console.log('messages : ', messages);

    // const messages = useRecoilValue(messagesState);

    return (
        <main className='w-[500px] h-[500px]'>
            <h1>Messages : </h1>
            <div className='h-full text-black flex-1 border border-black overflow-scroll'>
                {messages.length > 0 && messages.map((message) => (
                    <p className="border-b border-gray-300 p-2">{message}</p>
                ))}
            </div>
        </main>
    )
}

export default MessagesDisplay