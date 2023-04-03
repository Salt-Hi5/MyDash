import { useContext, useEffect, useState } from "react";
import { UserContext } from '../Services/UserContext';
import { getWeather, patchLocations } from "../Services/ApiClient";
import { DateTime } from 'luxon';
import { LocationSearch } from "./WeatherWidgetLocationSearch";
import { CalendarObject } from "../Types/Types";


export const ListWidgetEvent = (props: {event: CalendarObject}) => {
    const { setSelectedEvent, setActiveDetailView } = useContext(UserContext);
    const startTime = DateTime.fromISO(props.event.start.dateTime.toString());
    const endTime = DateTime.fromISO(props.event.end.dateTime.toString());

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
                    hover:bg-red-100 hover:cursor-pointer`
        } >

        
        

        <span className="width-full
                        flex justify-between">

            <span className="truncate text-xl">{props.event.summary}</span>
            <span className="truncate">{props.event.location}</span>
        </span>
        <span className="truncate font-semibold">{startTime.weekdayLong} {startTime.toLocaleString(DateTime.TIME_24_SIMPLE)} – {endTime.weekdayLong} {endTime.toLocaleString(DateTime.TIME_24_SIMPLE)}</span>

    </article>
}
