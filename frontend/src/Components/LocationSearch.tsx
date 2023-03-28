import { useContext, useState } from "react";
import { UserContext } from '../Services/UserContext';
import { getWeatherLocations, patchLocations } from "../Services/ApiClient";
import { UserLocation } from "../Types/Types";



export const LocationSearch = () => {
    const { user, setWeatherArray } = useContext(UserContext);
    const [locationSearchTerm, setLocationSearchTerm] = useState<string>("");
    const [locationSearchResults, setLocationSearchResults] = useState<UserLocation[]>([]);


    const handleKeyDown = async (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            const searchResults = await getWeatherLocations(locationSearchTerm);
            setLocationSearchResults(searchResults);
            console.log(searchResults);
        }
    };

    const submitNewLocation = async (location: UserLocation) => {
        const allLocations = [...user.locations, location];
        console.log(allLocations);
        const resultCode = await patchLocations(user.userIdHash, allLocations.map(location => location.url));
        if (resultCode !== 204) {
            console.log(`Server rejected the request to patch user locations with code ${resultCode}`);
            return;
        }
        user.locations = allLocations;
        setLocationSearchResults([]);
    }

    return <div>
        <input id="AddLocation" className="w-full p-2 border border-gray rounded-3xl" type="text" placeholder="Add Location"
            onChange={(event) => setLocationSearchTerm(event.target.value)} // The search term is a state that is used so that the drop-down is continiously updated based on what the user writes in the search bar. 
            onKeyDown={handleKeyDown}
        />
        <ul>
            {
                locationSearchResults.map(location => <li value={location.url} onClick={(e) => submitNewLocation(location)} >{location.name}, {location.country}</li>)
            }
        </ul>
    </div>
}
