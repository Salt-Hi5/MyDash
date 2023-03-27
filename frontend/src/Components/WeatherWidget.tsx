import { useContext, useEffect, useState } from "react";
import { UserContext } from '../Services/UserContext';
import { getWeather } from "../Services/ApiClient";
import { DateTime } from 'luxon';


export const WeatherWidget = () => {
    const { user, weatherArray, setWeatherArray } = useContext(UserContext);
    const [currentTime, setCurrentTime] = useState<DateTime>(DateTime.now());

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
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(DateTime.now().toUTC());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const stillLoading = (): boolean => {
        return typeof (weatherArray) === 'undefined';
    }

    return stillLoading() ? <span>Loading...</span> :
        <section className="WeatherWidgetList">
            {user.locations.map(location => {
                const currentWeather = weatherArray.find(weatherLocation => weatherLocation.url === location.url)?.currentWeather;
                return <article className={`WeatherWidgetList--WeatherCard WeatherCondition__${currentWeather?.condition.text} Time__${currentWeather?.is_day ? "Day" : "Night"}`} key={location.name}>
                    <br />
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
                </article>
            })}
        </section>
}
