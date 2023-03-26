import { useContext, useEffect } from "react";
import { getWeather } from "../Services/apiClient";
import { UserContext } from "./App";


export const WeatherWidget = () => {
    const { user, weatherLocations, setWeatherLocations } = useContext(UserContext);

    useEffect(() => {
        const updateWeather = async () => {
          const weatherResponse = await getWeather(user.emailHash);
          setWeatherLocations(weatherResponse.weatherArray);
        }
        updateWeather();
      }, []);

    //if (user.locations === undefined) return <p>Loading...</p>
    return <section className="WeatherWidgetList">
        

  
        
        {user.locations.map(location => {
        const currentWeather = weatherLocations.find(weatherLocation => weatherLocation.url === location.url)?.currentWeather;
        return <article key={location.name}>
            <br />
            <h2>{location.name}</h2>
            <h3>{location.country}</h3>
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
        }
        )}
    </section>
}

