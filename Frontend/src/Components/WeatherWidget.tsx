import { useContext, useEffect, useState } from "react";
import { UserContext } from '../Services/UserContext';
import { getWeather } from "../Services/ApiClient";
import { DateTime } from "luxon";


export const WeatherWidget = () => {
    const { user, weatherLocations, setWeatherLocations } = useContext(UserContext);
    const [ currentTime, setCurrentTime ] = useState<DateTime>(DateTime.now());

    useEffect(() => {
        const updateWeather = async () => {
          const weatherResponse = await getWeather(user.emailHash);
          setWeatherLocations(weatherResponse.weatherArray);
        }
        const interval = setInterval(() => {
            updateWeather();
        }, 600000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(DateTime.now().toUTC());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return <section className="WeatherWidgetList">

        {user.locations.map(location => {
            const currentWeather = weatherLocations.find(weatherLocation => weatherLocation.url === location.url)?.currentWeather;
            return <article className={`WeatherWidgetList--WeatherCard WeatherCondition__${currentWeather?.condition.text} Time__${currentWeather?.is_day ? "Day" : "Night"}`} key={location.name}>
                <br />
                <h2>{location.name}</h2>
                <h3>{location.country}</h3>
                <h1> {currentTime.setZone(location.timezone).toLocaleString(DateTime.TIME_24_WITH_SECONDS)} </h1> 
                <img src={currentWeather?.condition.icon}></img>
                <p>
                    {currentWeather?.condition.text} <br />
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
