import { useState, useRef } from 'react';
import { APIProvider } from "@vis.gl/react-google-maps";
import PlaceAutocomplete from './PlaceAutocomplete'; 

import SurveyBackButton from '@/app/components/surveyBackButton';
import { useFormState } from "@/app/context/formContext";

export default function LocationSelector() {
    const [selectedLocations, setSelectedLocations] = useState([]);
    const [currentPlace, setCurrentPlace] = useState(null);
    const placeInputRef = useRef(null);  // Ref to control the autocomplete input

    const { onHandleBack, setFormData, onHandleNext, formData } = useFormState();

    const MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY; // Use environment variable

    const handlePlaceSelect = (place) => {
        setCurrentPlace(place.name);
    };

    const resetAutocomplete = () => {
        if (placeInputRef.current) {
            placeInputRef.current.value = "";  // Reset the input value after adding
        }
    };

    const addToBucketList = () => {
        if (currentPlace && selectedLocations.length < 5) {
            setSelectedLocations(prevLocations => [...prevLocations, currentPlace]);
            setCurrentPlace(null);  // Reset currentPlace after adding to bucket list
            resetAutocomplete();    // Reset the autocomplete input
        }
    };

    const handleRemoveLocation = (location) => {
        setSelectedLocations(prevLocations => 
            prevLocations.filter(loc => loc !== location)
        );
    };

    const handleContinue = async () => {
        const updatedFormData = { ...formData, places: selectedLocations };

        setFormData(updatedFormData);

        try {
            // Make a POST request to your server
            console.log('Submitting form data:', updatedFormData);
            const response = await fetch(' http://localhost:4000/api/travel/recommendations', {
                method: 'POST',
                body: JSON.stringify(updatedFormData), 
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                console.log('Form data submitted successfully!');
                onHandleNext(); // Proceed to the next step
            } else {
                // Handle error
                console.error('Failed to submit form data:', await response.text());
            }
        } catch (error) {
            console.error('Error submitting form data:', error);
        }
    };

    return (
        <main className="bg-white min-h-screen flex flex-col justify-between text-black p-4">
            <SurveyBackButton onHandleBack={onHandleBack} />
            <div className="flex-grow">
                <h2 className="text-black text-[22px] font-semibold text-center mt-4">
                    Select Places
                </h2>
                <p className="text-gray-500 text-xs text-center mt-4 mb-8">
                    Select up to 5 places for your travel bucket list.
                </p>
                
                <div className="mb-4 relative">
                    <APIProvider apiKey={MAPS_API_KEY}>
                        <PlaceAutocomplete 
                            onPlaceSelect={handlePlaceSelect} 
                            ref={placeInputRef}  // Pass the ref to the input element
                        />
                    </APIProvider>
                    <button
                        onClick={addToBucketList}
                        disabled={!currentPlace || selectedLocations.length >= 5}
                        className="w-full bg-sapphire text-xs text-white py-[16px] px-[103px] rounded-md  focus:outline-none focus:ring-2  mt-[20px]"
                    >
                        Add to Bucket List
                    </button>
                </div>
                
                <h3 className="font-semibold mt-6 mb-2">Your Bucket List ({selectedLocations.length}/5):</h3>
                <ul className="mb-4">
                    {selectedLocations.map((location, index) => (
                        <li 
                            key={index} 
                            className="flex justify-between items-center mb-2 mt-4 pb-2 border-b border-gray-300"
                        >
                            <span className="text-xs">{location}</span>
                            <button
                                onClick={() => handleRemoveLocation(location)}
                                className="text-red-500 text-xs"
                            >
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            <button
                onClick={handleContinue}
                disabled={selectedLocations.length !== 5}
                className="w-full bg-sapphire text-xs text-white py-[16px] px-[103px] rounded-md focus:outline-none focus:ring-2mt-6"
            >
                Continue
            </button>
        </main>
    );
}
