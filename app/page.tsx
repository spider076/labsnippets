"use client"

import Image from 'next/image'
import SnippetsDisplay from './SnippetsDisplay'
import InputContainer from './InputContainer'
import { RecoilRoot } from 'recoil';

export default function Home() {
  return (
    <main className="text-white bg-[#0F0F0F] w-[100vw] h-[100vh]">
      <RecoilRoot>
        <h1 className='text-2xl border-b border-dotted text-center p-4 font-semibold bg-black text-gray-100'>
          Lab-Snippets 💻</h1>
        <div className='flex flex-col mt-10 gap-5 max-h-[70vh] p-10 items-center 
        sm:w-[700px] w-full justify-center m-auto'> 
          <SnippetsDisplay />
          <InputContainer />
        </div>
      </RecoilRoot>
    </main>
  )
}
