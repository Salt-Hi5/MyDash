import { useContext, useEffect, useState } from "react";
import { UserContext } from '../Services/UserContext';
import { getWeather, patchLocations } from "../Services/ApiClient";
import { DateTime } from 'luxon';
import { LocationSearch } from "./WeatherWidgetLocationSearch";
import { } from "../Types/Types";
import { ListWidgetEmail } from "./ListWidgetEmail";


export const EventViewWidget = () => {
    const { selectedEvent, setActiveDetailView } = useContext(UserContext);
    const startTime = DateTime.fromISO(selectedEvent.start.dateTime.toString());
    const endTime = DateTime.fromISO(selectedEvent.end.dateTime.toString());

    const cancel = () => {
        setActiveDetailView("");
    }

    const showMeetsButton = () => {
        if (typeof (selectedEvent.hangoutLink) !== "undefined") {
            return <button onClick={(e) => window.open(selectedEvent.hangoutLink, '_blank', 'noreferrer')}
                className="rounded-full h-10 px-3
                    bg-white text-md font-light">Google Meets
            </button>
        }
    }

    return (
        <section id="EventViewWidget"
            className=" w-full opacity-90 
                        flex flex-col overflow-auto
                        shadow-md shadow-black" >

            <div id="EventViewWidget--Header"
                className="width-full rounded-t-3xl p-5
                            flex justify-between 
                            bg-red-800">

                <button onClick={(e) => { cancel() }}
                    className="rounded-full w-10 h-10 pb-1
                                bg-white text-2xl font-light">x
                </button>

                <div className="flex gap-4">
                    {showMeetsButton()}
                    <button onClick={(e) => window.open(selectedEvent.htmlLink, '_blank', 'noreferrer')}
                        className="rounded-full h-10 px-3
                                bg-white text-md font-light">Show in Calendar
                    </button>
                </div>

            </div>

            <div id="EventViewWidget--Body"
                className="p-12 rounded-b-3xl
                            flex flex-col 
                            bg-white text-black">

                <span className="truncate text-3xl">{selectedEvent.summary}</span>
                <div className="flex flex-col pt-4">

                    <span className="truncate text-lg "><b>Time:</b> {startTime.weekdayLong} {startTime.toLocaleString(DateTime.TIME_24_SIMPLE)} – {endTime.weekdayLong} {endTime.toLocaleString(DateTime.TIME_24_SIMPLE)}</span>
                    <span className="truncate text-lg "><b>Location:</b> {selectedEvent.location}</span>

                </div>
                <hr className="mt-10 border-t border-slate-300" />
                <span className="mt-10">{selectedEvent.description}</span>
            </div>

        </section>
    )
}
