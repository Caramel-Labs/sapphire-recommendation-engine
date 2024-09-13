'use client'

import { useState } from 'react';
import { useFormState } from "@/app/context/formContext"
import SurveyBackButton from '@/app/components/surveyBackButton';

export default function Details() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('')

  const { onHandleNext, onHandleBack, setFormData, formData } = useFormState();


  const handleSubmit = () => {
    setFormData({
      ...formData,
     userName: name,
     email
    });
    onHandleNext();
  };

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen pb-10 ">

      {/* Back Button */}
      <SurveyBackButton onHandleBack={onHandleBack} />

      {/* Heading */}
      <h2 className="text-black text-[22px] font-semibold text-center mt-4"></h2>
      <p className="text-gray-500 text-xs text-center mt-4 mb-8">
        Share your details to make your vacation enjoyable and your experience more personalized.
      </p>

      {/* Father's Full Name */}
      <div className="mb-4">
        <label className="block text-xs font-medium text-gray-700">First name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your first name"
          className="mt-2 block w-full border border-gray-300 rounded-[8px] shadow-sm p-2 text-xs h-[48px] text-black"
          required
        />
      </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-xs font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="mt-2 block w-full border border-gray-300 rounded-[8px] shadow-sm p-2 text-xs h-[48px] text-black"
            required
          />

      {/* Continue Button */}
      <div className="text-center">
        <button
          className="w-full bg-sapphire text-xs text-white py-[16px] px-[103px] rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400  mt-[100px]"
          onClick={handleSubmit}
        >
          Continue
        </button>
      </div>
    </div>
    </div>
  );
}
