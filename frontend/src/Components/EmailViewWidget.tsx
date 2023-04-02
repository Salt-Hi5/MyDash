import { useContext, useEffect, useState } from "react";
import { UserContext } from '../Services/UserContext';
import { getWeather, patchLocations } from "../Services/ApiClient";
import { DateTime } from 'luxon';
import { LocationSearch } from "./WeatherWidgetLocationSearch";
import { EmailItem } from "../Types/Types";



export const EmailViewWidget = () => {
    const { selectedEmail, setActiveDetailView } = useContext(UserContext);

    const cancel = () => {
        setActiveDetailView("");
    }

    return (
        <section id="EmailViewWidget"
            className=" w-full opacity-90 
                        flex flex-col overflow-auto
                        shadow-md shadow-black" >

            <div id="EmailViewWidget--Header"
                className="width-full rounded-t-3xl p-5
                            flex justify-between 
                            bg-slate-500">

                <button onClick={(e) => { cancel() }}
                    className="rounded-full w-10 h-10 pb-1
                                bg-white text-2xl font-light">x
                </button>

                <button onClick={(e) => {}} 
                    className="rounded-full h-10 px-3
                                bg-white text-md font-light">Reply
                </button>
            </div>

            <div id="EmailViewWidget--Body"
                className="p-12 rounded-b-3xl
                            flex flex-col 
                            bg-white text-black">

                <span className="truncate text-3xl">{selectedEmail.subject}</span>
                <div className="flex justify-between pt-4">

                    <div className="flex flex-col">
                        <span className="truncate text-lg "><b>From: </b>{selectedEmail.from}</span>
                        <span className="truncate text-lg "><b>To: </b>{selectedEmail.to}</span>
                    </div>
                    <span className="shrink-0 ml-5 mt-1">Received {selectedEmail.received.toLowerCase()}</span>
                    
                </div>
                <hr className="mt-10 border-t border-slate-300" />
                <span className="mt-10">{selectedEmail.body}</span>
            </div>

        </section>
    )
}
