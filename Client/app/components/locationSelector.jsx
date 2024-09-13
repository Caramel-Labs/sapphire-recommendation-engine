import  { useState } from 'react';
import { APIProvider } from "@vis.gl/react-google-maps";
import PlaceAutocomplete from './PlaceAutocomplete'; // Adjust the import path as needed

const MAPS_API_KEY = process.env.MAPS_API_KEY; // Make sure this is set in your .env file

export default function LocationSelector() {
    const [selectedLocations, setSelectedLocations] = useState([]);
    const [currentPlace, setCurrentPlace] = useState(null);

    const handlePlaceSelect = (place) => {
        setCurrentPlace(place);
    };

    const addToBucketList = () => {
        if (currentPlace && selectedLocations.length < 5 && !selectedLocations.some(loc => loc.place_id === currentPlace.place_id)) {
            setSelectedLocations([...selectedLocations, currentPlace]);
            setCurrentPlace(null);
        }
    };

    const handleRemoveLocation = (location) => {
        setSelectedLocations(selectedLocations.filter(loc => loc.place_id !== location.place_id));
    };

    return (
        <main className="bg-white min-h-screen text-black p-4">
            <h2 className="text-black text-[22px] font-semibold text-center mt-4">
                Select Regions
            </h2>
            <p className="text-gray-500 text-xs text-center mt-4 mb-8">
                Select up to 5 locations for your travel bucket list.
            </p>
            
            <div className="mb-4 relative">
                <APIProvider apiKey={MAPS_API_KEY}>
                    <PlaceAutocomplete onPlaceSelect={handlePlaceSelect} />
                </APIProvider>
                <button
                    onClick={addToBucketList}
                    disabled={!currentPlace || selectedLocations.length >= 5}
                    className="w-full mt-2 py-2 px-4 bg-sapphire text-white rounded-lg text-xs hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 h-[48px] disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                    Add to Bucket List
                </button>
            </div>
            
            <h3 className="font-semibold mt-4 mb-2">Your Bucket List ({selectedLocations.length}/5):</h3>
            <ul className="mb-4">
                {selectedLocations.map((location) => (
                    <li key={location.place_id} className="flex justify-between items-center mb-2">
                        <span className="text-xs">{location.formatted_address || location.name}</span>
                        <button
                            onClick={() => handleRemoveLocation(location)}
                            className="text-red-500 text-xs"
                        >
                            Remove
                        </button>
                    </li>
                ))}
            </ul>
        </main>
    );
}