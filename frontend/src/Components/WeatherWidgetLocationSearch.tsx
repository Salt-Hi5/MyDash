import { useContext, useEffect, useState } from "react";
import { UserContext } from '../Services/UserContext';
import { getWeatherLocations, patchLocations } from "../Services/ApiClient";
import { UserLocation } from "../Types/Types";



export const LocationSearch = () => {
    const { user, setWeatherArray } = useContext(UserContext);
    const [locationSearchTerm, setLocationSearchTerm] = useState<string>(""); // Used for the text input that the user writes when adding a new location. 
    const [locationSearchResults, setLocationSearchResults] = useState<UserLocation[]>([]); // Used for the current available results from the backend for the current search. 
    const [showLocationSearchResults, setShowLocationSearchResults] = useState(false);

    useEffect(() => {
        setLocationSearchResults([]);
        const interval = setInterval(() => {
            if (locationSearchTerm === "") {
                setShowLocationSearchResults(false);
                return;
            }
            getWeatherLocations(locationSearchTerm).then(result => setLocationSearchResults(result));
            setShowLocationSearchResults(true);
        }, 500);
        return () => clearInterval(interval);
    }, [locationSearchTerm])

    const handleKeyDown = async (event: React.KeyboardEvent) => {
        if (event.key === 'Escape') {
            setLocationSearchTerm("");
            setShowLocationSearchResults(false);
        }
    };

    const submitNewLocation = async (location: UserLocation) => {

        const allLocations = [...user.locations, location];
        const resultCode = await patchLocations(user.userIdHash, allLocations.map(location => location.url));
        if (resultCode !== 204) {
            return;
        }
        user.locations = allLocations;
        setShowLocationSearchResults(false);
        setLocationSearchTerm("");
    }


    return <div>
        <input id="AddLocation" className="w-full py-2 px-6 rounded-3xl opacity-90" type="text" value={locationSearchTerm} placeholder="Add Location" autoComplete="off"
            onChange={(event) => setLocationSearchTerm(event.target.value)} // The search term is a state that is used so that the drop-down is continiously updated based on what the user writes in the search bar. 
            onKeyDown={handleKeyDown}
        />
        {
            showLocationSearchResults ?
                <ul className="w-full p-2  rounded-3xl cursor-pointer opacity-90 bg-white ">
                    <label className="text-xs px-6">Select the correct location:</label>
                    {
                        locationSearchResults.map(location => <li key={location.name} className=" px-8 rounded-3xl hover:bg-slate-600 hover:text-white" value={location.url} onClick={(e) => submitNewLocation(location)} >{location.name}, {location.country}</li>)
                    }
                </ul>
                : null
        }


    </div>
}
