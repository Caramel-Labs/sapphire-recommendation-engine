'use client'

import { useState, useEffect } from 'react';
import SurveyBackButton from '@/app/components/surveyBackButton'
import { useFormState } from "@/app/context/formContext"

const interestTypes = [
  "Tours and Sightseeing",
  "Wildlife and Nature",
  "Cultural and Historical Experiences",
  "Arts and Crafts",
  "Relaxation and Wellness",
  "Water Activities",
  "Adventure and Outdoor Activities",
  "Sports and Recreation"
];

export default function InterestSelection() {
  const [selectedInterests, setSelectedInterests] = useState([])
  const { onHandleBack, setFormData, onHandleNext ,formData} = useFormState()
  const [interestsByType, setInterestsByType] = useState({})

  useEffect(() => {
    const fetchInterests = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/interests');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        // Group interests by type
        const grouped = data.reduce((acc, interest) => {
          if (!acc[interest.type]) {
            acc[interest.type] = [];
          }
          acc[interest.type].push(interest.interestName);
          return acc;
        }, {});
        
        setInterestsByType(grouped);
      } catch (error) {
        console.error('Error fetching interests:', error.message);
        setInterestsByType({});
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
      ...formData,
      interests: selectedInterests
    });
    onHandleNext();
  }

  return (
    <div className="bg-white min-h-screen p-4">
      <SurveyBackButton onHandleBack={onHandleBack}/>
      
      <h1 className="text-black text-[22px] font-semibold text-center mt-4">Select your interests</h1>
      <p className="text-gray-500 text-xs text-center mt-4 mb-8">
        Help us tailor your Sri Lankan experience towards your passions and preferences.
      </p>

      {interestTypes.map((type) => (
        <div key={type} className="mb-6">
          <h2 className="text-lg font-semibold mb-2 text-black ">{type}</h2>
          <div className="flex flex-wrap gap-2 mb-4">
            {interestsByType[type]?.map((interest) => (
              <button
                key={interest}
                onClick={() => toggleInterest(interest)}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  selectedInterests.includes(interest)
                    ? 'bg-sapphire text-white'
                    : 'bg-gray-200 text-gray-800'
                }`}
              >
                {interest}
              </button>
            ))}
          </div>
        </div>
      ))}

      <button 
        className="w-full bg-sapphire text-xs text-white py-[16px] px-[103px] rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400" 
        onClick={handleClick}
      >
        Continue
      </button>
    </div>
  );
}