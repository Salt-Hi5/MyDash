import { useContext, useEffect, useState } from "react";
import { UserContext } from '../Services/UserContext';
import { getWeather, patchLocations } from "../Services/ApiClient";
import { DateTime } from 'luxon';
import { LocationSearch } from "./LocationSearch";
import { UserLocation } from "../Types/Types";



export const WeatherWidget = () => {
    const { user, weatherArray, setWeatherArray } = useContext(UserContext);
    const [currentTime, setCurrentTime] = useState<DateTime>(DateTime.now());
    const [locationSearchTerm, setLocationSearchTerm] = useState<string>("");

    useEffect(() => {
        const updateWeather = async () => {
            const weatherResponse = await getWeather(user.userIdHash);
            setWeatherArray(weatherResponse.weatherArray);
        };
        updateWeather();
        const interval = setInterval(() => {
            updateWeather();
        }, 900000);
        return () => clearInterval(interval);
    }, [user.locations]); // 🔥🔥🔥💀💀💀🔥🔥🔥 Currently updates weather for all locations every time you delete one. Should be fixed later.

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(DateTime.now().toUTC());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const stillLoading = (): boolean => {
        return typeof (weatherArray) === 'undefined';
    }

    const deleteLocation = async (locationUrl: string) => {

        user.locations = user.locations.filter(location => location.url !== locationUrl); 

        const resultCode = await patchLocations(user.userIdHash, user.locations.map(location => location.url));
        if (resultCode !== 204) {
            console.log(`Server rejected the request to patch user locations with code ${resultCode}`);
            return;
        }
    }

    return stillLoading() ? <span>Loading...</span> :
        <section id="WeatherWidget" className="flex flex-col gap-4">

           

            {user.locations.map(location => {
                const currentWeather = weatherArray.find(weatherLocation => weatherLocation.url === location.url)?.currentWeather;

                return <article id="WeatherWidgetList" className="grow border border-gray rounded-3xl p-4" key={location.name}>
                    
                    <h2>{location.name}</h2>
                    <h3>{location.country}</h3>
                    <h2> {currentTime.setZone(location.timezone).toLocaleString(DateTime.TIME_24_WITH_SECONDS)} </h2>
                    <img src={currentWeather?.condition.icon}></img>
                    <p>
                        Condition: {currentWeather?.condition.text} <br />
                        Temperature: {currentWeather?.temp_c} °C <br />
                        Feels like: {currentWeather?.feelslike_c} °C <br />
                        Daynight: {currentWeather?.is_day ? <span>Day</span> : <span>Night</span>} <br />
                        Rainfall: {currentWeather?.precip_mm} mm <br />
                        Air pressure: {currentWeather?.pressure_mb} millibar <br />
                        Visibility: {currentWeather?.vis_km} km <br />
                        Wind speed: {currentWeather?.wind_kph} km/h <br />
                        
                    UV amount: {currentWeather?.uv} <br />
                    </p>
                    <button className="" onClick={(e) => deleteLocation(location.url)}>Delete</button>
                </article>
            })}

            <LocationSearch />
        </section>
}
