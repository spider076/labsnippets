"use client"

import Image from 'next/image'
import MessagesDisplay from './MessagesDisplay'
import Messenger from './Messenger'
import { RecoilRoot } from 'recoil';

export default function Home() {
  return (
    <main className="bg-gray h-[100vh]">
      <RecoilRoot>
        <div className='flex flex-col gap-5 p-10 items-center justify-center m-auto'> Realtime-chats
          <MessagesDisplay />
          <Messenger />
        </div>
      </RecoilRoot>
    </main>
  )
}
