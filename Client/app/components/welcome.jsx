'use client'

import { useFormState } from "@/app/context/formContext"

export default function Welcome() {
    const { onHandleNext } = useFormState()
    return (
      <div className="flex min-h-screen flex-col items-center justify-between  bg-sapphire p-4">
       
       <h6  className="text-white mt-[360px] mx-[89px]  font-semibold text-3xl">Sapphire</h6>
       <p className="mt-[150px] text-center"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt neque rerum soluta sit, </p>
        <button className="bg-teal-600 text-white  rounded-lg w-full text-xs py-[17px] px-[75px]"onClick={onHandleNext}>Start Survey</button>
       
           
      </div>
      
    );
}