'use client'

import { useFormState } from "@/app/context/formContext"
import { Italianno, Inter } from "next/font/google"

const italianno = Italianno({ subsets: ['latin'], weight: '400' })
const inter = Inter({ subsets: ['latin'] })

export default function Welcome() {
    const { onHandleNext } = useFormState()
    return (
      <div className={`flex min-h-screen flex-col items-center justify-between bg-gradient-to-b from-sapphire to-teal-700 p-6 text-white ${inter.className}`}>
        <div className="flex-1 flex flex-col items-center justify-center">
          <h1 className={`text-7xl mb-6 ${italianno.className}`}>Sapphire</h1>
          {/* <p className="text-center text-sm font-light mb-8 max-w-xs">
            Discover your perfect Sri Lankan adventure with our personalized survey
          </p> */}
        </div>
        
        <div className="w-full max-w-xs">
          <button 
            className="bg-white text-sapphire rounded-full w-full py-4 text-sm font-semibold transition-all hover:bg-opacity-90"
            onClick={onHandleNext}
          >
            Begin Your Journey
          </button>
          <p className="text-xs text-center mt-4 text-white/70">
            We collect and process your data to enhance your experience. 
            <br />
            <a href="#" className="underline">Learn more</a>
          </p>
        </div>
      </div>
    );
}

