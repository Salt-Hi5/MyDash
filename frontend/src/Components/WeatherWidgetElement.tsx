import { useContext, useEffect, useState } from "react";
import { UserContext } from '../Services/UserContext';
import { getWeather, patchLocations } from "../Services/ApiClient";
import { DateTime } from 'luxon';
import { LocationSearch } from "./WeatherWidgetLocationSearch";
import { UserLocation, Weather } from "../Types/Types";

interface WeatherWidgetElementProps {
    location: UserLocation;
    currentTime: DateTime;
    currentWeather?: {
        temp_c: number,
        is_day: number,
        condition: {
            text: string,
            icon: string
        },
        wind_kph: number,
        pressure_mb: number,
        precip_mm: number,
        feelslike_c: number,
        vis_km: number,
        uv: number
    },
    deleteLocation: (location: string) => {},
}

export const WeatherWidgetElement = (props: WeatherWidgetElementProps) => {
    const location = props.location;
    const weather = props.currentWeather;
    const time = props.currentTime;
    const deleteLocation = props.deleteLocation;

    useEffect(() => {
        console.log(location)
    }, [])

    const isDay = (): boolean => {
        return (weather?.is_day === 1) ? true : false;
    }

    return <article id="WeatherWidgetElement" className={`opacity-90 grow  rounded-3xl p-4 flex flex-col shadow-md shadow-black ${ isDay() ? "border-slate-900 bg-blue-200 text-black" : "border-white bg-slate-700 text-white"}`} >

        <div className="flex justify-between">
            <div>
                <h1 className="text-2xl">{location.name}</h1>
                <h2 className="">{location.country}</h2>
            </div>
            <span className="text-4xl">{time.setZone(location.timezone).toLocaleString(DateTime.TIME_24_SIMPLE)}</span>
        </div>

        <div className="flex flex-col justify-center items-center my-2">
            <img src={weather?.condition.icon} className="w-16" />
            <span className="text-sm font-bold">{weather?.condition.text}</span>

        </div>

        <div className="flex justify-between">
            <div className="flex flex-col items-start justify-end">
                <span className="text-4xl">{weather?.temp_c}<span className="text-xs font-light"> °C</span></span>
                    <span className="text-xs font-light">Feels like: {weather?.feelslike_c} °C</span>
            </div>

            <p className="text-xs font-light text-right">
                Rain: {weather?.precip_mm} mm<br />
                Visibility: {weather?.vis_km} km<br />
                Pressure: {weather?.pressure_mb} mb<br />
                Wind speed: {weather?.wind_kph} km/h<br />
                
            </p>
        </div>

        <button className={`self-center mt-4 text-xs font-light px-2 rounded-3xl ${ isDay() ? "hover:bg-slate-700 hover:text-white" : "hover:bg-white hover:text-black"}`} onClick={(e) => deleteLocation(location.url)}>Delete</button>


    </article>
}
