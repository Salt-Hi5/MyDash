import { useContext, useEffect, useState } from "react";
import { UserContext } from '../Services/UserContext';
import { getWeather, patchLocations } from "../Services/ApiClient";
import { DateTime } from 'luxon';
import { LocationSearch } from "./WeatherWidgetLocationSearch";
import { WeatherWidgetElement } from "./WeatherWidgetElement";


export const WeatherWidget = () => {
    const { user, weatherArray, setWeatherArray } = useContext(UserContext);
    const [currentTime, setCurrentTime] = useState<DateTime>(DateTime.now());
    // const [locationSearchTerm, setLocationSearchTerm] = useState<string>("");

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
        return typeof (weatherArray) === "undefined";
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

            {user.locations.map((location) => {
                const weather = weatherArray.find(weather => weather.url === location.url);
                return <WeatherWidgetElement key={location.url} location={location} timezone={weather?.timezone} currentWeather={weather?.currentWeather} currentTime={currentTime} deleteLocation={deleteLocation} />
            })}

            <LocationSearch />
        </section>
}
