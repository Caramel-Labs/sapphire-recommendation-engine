'use client'

import { useState } from 'react'
import BackButton from '@/app/components/backButton';
import { useFormState } from "@/app/context/formContext"
// Load API key from environment variable
const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

export default function LocationSelector() {
    const [searchTerm, setSearchTerm] = useState('')
    const { setFormData, onHandleBack,onHandleNext } = useFormState()

    const handleContinue = async () => {
        try {
            // Step 2: Send the search term to the Google API to get lat and long
            const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
                searchTerm
            )}&key=${API_KEY}`;
            const response = await fetch(url);
            const data = await response.json();

            if (data.status === 'OK') {
                const { lat, lng } = data.results[0].geometry.location;

                // Step 3: Create JSON object
                const payload = {
                    latitude: lat,
                    longitude: lng,
                    userId: userId,
                };

                // Step 4: Send the payload to your API
                const apiResponse = await fetch(
                    'http://localhost:4000/api/experiences/ai/create',
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(payload),
                    }
                );

                // Get the result from the response
                const result = await apiResponse.json();
                console.log('API Response:', result);

                // Step 5: Extract the _id and navigate to the experience page
                const experienceId = result.aiExperience._id;
                router.push(`/experience/${experienceId}`);
            } else {
                console.error(
                    'Error fetching location data:',
                    data.status,
                    data.error_message
                );
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <main className="bg-white h-screen text-black p-4">
            {/* Back Button */}
            <BackButton onHandleBack={onHandleBack}/>

            {/* Heading */}
            <h2 className="text-black text-[22px] font-semibold text-center mt-4">
                Select Region
            </h2>
            <p className="text-gray-500 text-xs text-center mt-4 mb-8">
                Share your details to make your visa processing smoother and
                your experience more personalized.
            </p>

            {/* Searchbar */}
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Where do you want to go?"
                    className="mt-2 block w-full border border-gray-300 rounded-[8px] shadow-sm p-2 text-xs h-[48px] text-black"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)} // Capture the input
                    required
                />
            </div>

            {/* Continue button */}
            <button
                onClick={handleContinue} // Attach handler
                className="w-full mt-[260px] py-2 px-4 bg-sapphire text-white rounded-lg text-xs hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 h-[48px]"
            >
                Continue
            </button>
        </main>
    );
}
