'use client'

import{ useState,useEffect } from 'react';
import SurveyBackButton from '@/app/components/surveyBackButton'
import { useFormState } from "@/app/context/formContext"

// const interests = [
//   'Adventure', 'Nature', 'Food', 'Photography', 'Bird Watching', 'Beaches',
//   'Ayurveda and Wellness', 'Cityscapes', 'Aquariums and Zoos', 'Architecture',
//   'Cycling', 'Culture', 'Hot Springs', 'Night Life', 'Hiking', 'History',
//   'Festivals', 'Eco-Tourism', 'Safari and Wildlife', 'Whale Watching',
//   'Surfing', 'Diving', 'Sailing'
// ];

export default function InterestSelection() {
  const [selectedInterests, setSelectedInterests] = useState([])
  const { onHandleBack,setFormData, onHandleNext } = useFormState()
  const[interests,setInterests] = useState([])

  useEffect(() => {

    const fetchInterests = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/interests');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setInterests(data);
      } catch (error) {
        console.error('Error fetching interests:', error.message);
        setInterests([]);
      }
    };
    fetchInterests();
  }, []);

  const toggleInterest = (interest) => {
    setSelectedInterests(prevInterests =>
      prevInterests.includes(interest)
        ? prevInterests.filter(i => i !== interest)
        : [...prevInterests, interest]
    );
  };
  const handleClick = () => {
    setFormData({
      interests: selectedInterests
    });
    onHandleNext();
  }

  return (
    <div className="bg-white min-h-screen p-4">
      {/* Back button */}
      <SurveyBackButton onHandleBack={onHandleBack}/>
      <div className="mb-6">
        <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </div>

      <h1 className="text-2xl font-bold mb-2">Select your interests</h1>
      <p className="text-gray-600 mb-6">
        Help us tailor your Sri Lankan experience towards your passions and preferences.
      </p>

      <div className="flex flex-wrap gap-2 mb-8">
        {interests && interests.map((interest) => (
          <button
            key={interest}
            onClick={() => toggleInterest(interest)}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              selectedInterests.includes(interest)
                ? 'bg-teal-500 text-white'
                : 'bg-gray-200 text-gray-800'
            }`}
          >
            {interest}
          </button>
        ))}
      </div>

      <button className="w-full bg-teal-100 text-teal-700 py-3 rounded-lg font-medium" onClick={handleClick}>
        Continue
      </button>
    </div>
  );
}