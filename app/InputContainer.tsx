"use client";

import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { userState } from './atoms/user';
import { io } from 'socket.io-client';
import { nanoid } from 'nanoid';

const socket = io('http://localhost:3001');

const InputContainer = () => {
    const [snippet, setSnippet] = useState<string>("");
    const [room, setRoom] = useState<string>("");

    console.log('socket : ', socket);

    const userId = useRecoilValue(userState);

    const snippetChange = (e: any) => {
        setSnippet(e.target.value);
    };

    const roomChange = (e: any) => {
        setRoom(e.target.value);
    };

    const send = (e: any) => {
        e.preventDefault();
        console.log("message  :", snippet);
        if (snippet === "") return;
        console.log("room : ", room);
        socket.emit('snippets', { snippet: snippet, userId: String(userId) }, room); // params(socket-id, data, room)
        setSnippet('');
    }
    const join = (e: any) => {
        e.preventDefault();
        if (room === "") return;
        console.log("message : ", room);
    };

    return (
        <div className="mt-10 flex flex-col space-y-4 w-full">
            <form onSubmit={(e) => send(e)} className='w-full flex'>
                {/* <label htmlFor="message">Message</label> */}
                <input name='message' onChange={e => snippetChange(e)} value={snippet} className='p-1 outline-none flex-1 placeholder:text-gray-500
                     text-black' placeholder="Your-Snippets" type='text' />
                <button type="submit" className="p-1 px-5 border text-black
                hover:-translate-x-2 transition-all ease-in-out  bg-[#21a9d3]
                 border-gray-700 font-semibold rounded-r-md" >Send</button>
            </form>
            <form onSubmit={join} className="w-full flex">
                <input name='room' onChange={e => roomChange(e)} value={room}
                    className='p-1 outline-none flex-1 placeholder:text-gray-500
                     text-orange-900' type='text' placeholder="RoomId/UserId" />
                <button type="submit" className="p-1 px-5 border text-black bg-orange-400 border-gray-700 hover:-translate-x-2 transition-all ease-in-out
                rounded-r-md font-semibold" >Join</button>
            </form>
        </div>

    )
}

export default InputContainer