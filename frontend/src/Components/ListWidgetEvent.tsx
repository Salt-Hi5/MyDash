import { useContext, useEffect, useState } from "react";
import { UserContext } from '../Services/UserContext';
import { getWeather, patchLocations } from "../Services/ApiClient";
import { DateTime } from 'luxon';
import { LocationSearch } from "./WeatherWidgetLocationSearch";
import { CalendarItem, EmailItem } from "../Types/Types";


export const ListWidgetEvent = (props: {event: CalendarItem}) => {
    const { setSelectedEvent, setActiveDetailView } = useContext(UserContext);

    const selectEvent = () => {
        setSelectedEvent(props.event);
        setActiveDetailView("Event");
    }

    return <article id="EventListItemWidget" 
        onClick={
            (e) => selectEvent()
        } 
        className={`opacity-90 rounded-3xl p-6 
                    grow flex flex-col gap-1 
                    bg-white text-black border-slate-900
                    shadow-md shadow-black
                    hover:bg-sky-100 hover:cursor-pointer`
        } >

        
        

        <span className="width-full
                        flex justify-between">

            <span className="truncate text-xl">{props.event.name}</span>
            <span className="truncate">{props.event.location}</span>
        </span>
        <span className="truncate font-semibold">Time: {props.event.startTime.weekdayLong} {props.event.startTime.toLocaleString(DateTime.TIME_24_SIMPLE)} – {props.event.endTime.weekdayLong} {props.event.endTime.toLocaleString(DateTime.TIME_24_SIMPLE)}</span>

    </article>
}
