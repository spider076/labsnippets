"use client";

import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { messagesState } from './atoms/messsages';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3001');

const Messenger = () => {
    const [message, setMessage] = useState<string>("");
    const [room, setRoom] = useState<string>("");

    const [,setMessageState] = useRecoilState(messagesState);

    const messageChange = (e: any) => {
        setMessage(e.target.value);
    };

    const roomChange = (e: any) => {
        setRoom(e.target.value);
    };

    const send = (e: any) => {
        e.preventDefault();
        console.log("message  :", message);
        setMessageState((prev) => [...prev, message]);
        socket.emit('chat message', message);
        setMessage('');
    }
    const join = (e: any) => {
        e.preventDefault();
        console.log("message : ", room);
    };

    return (
        <div className="mt-10 flex flex-col gap-4 ">
            <form onSubmit={(e) => send(e)}>
                <label htmlFor="message">Message</label>
                <input name='message' onChange={e => messageChange(e)} value={message} className='ml-2 p-1 border border-gray-700 w-[500px]' type='text' />
                <button type="submit" className="p-1 ml-1 px-5 border border-gray-700 rounded-md" >Send</button>
            </form>
            <form onSubmit={join}>
                <label htmlFor="room">Room</label>
                <input name='room' onChange={e => roomChange(e)} value={room}
                    className='ml-2 p-1 border border-gray-700 w-[500px]' type='text' />
                <button type="submit" className="p-1 ml-1 px-5 border border-gray-700 rounded-md" >Join</button>
            </form>
        </div>

    )
}

export default Messenger