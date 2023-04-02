import { useContext, useEffect, useState } from "react";
import { UserContext } from '../Services/UserContext';
import { getWeather, patchLocations } from "../Services/ApiClient";
import { DateTime } from 'luxon';
import { LocationSearch } from "./WeatherWidgetLocationSearch";
import { EmailItem } from "../Types/Types";


export const ListWidgetEmail = (props: {email: EmailItem}) => {
    const { setSelectedEmail, setActiveDetailView } = useContext(UserContext);

    const selectEmail = () => {
        setSelectedEmail(props.email);
        setActiveDetailView("Email");
    }

    return <article id="ListWidgetEmail" 
        onClick={
            (e) => selectEmail()
        } 
        className={`opacity-90 rounded-3xl p-6
                    grow flex gap-1 flex-col 
                    bg-white text-black border-slate-900
                    shadow-md shadow-black
                    hover:bg-sky-100 hover:cursor-pointer`
        } >

        <span className="width-full
                        flex justify-between">

            <span className="truncate text-xl">{props.email.subject}</span>
            <span className="shrink-0 ml-5">{props.email.received}</span>
        </span>
        <span className="truncate font-semibold">From: {props.email.from}</span>
        <span className="truncate mt-4">{props.email.body}</span>

    </article>
}
