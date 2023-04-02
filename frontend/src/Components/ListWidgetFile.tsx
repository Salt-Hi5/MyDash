import { useContext, useEffect, useState } from "react";
import { UserContext } from '../Services/UserContext';
import { getWeather, patchLocations } from "../Services/ApiClient";
import { DateTime } from 'luxon';
import { LocationSearch } from "./WeatherWidgetLocationSearch";
import { EmailItem, FileItem } from "../Types/Types";


export const ListWidgetFile = (props: {fileItem: FileItem}) => {

    return <article id="ListWidgetFile"       
        onClick={
            (e) => window.open(props.fileItem.link, '_blank', 'noreferrer')
        } 
        className={`flex flex-col gap-1 justify-between
        opacity-90 rounded-3xl w-24 h-28
        hover:cursor-pointer hover:bg-sky-100`
    } >
        
        <img src={props.fileItem.image} alt=""  
            className={`opacity-90 rounded-3xl 
                        bg-white shadow-md shadow-black`
        }/>
        <span className="truncate text-s text-black
                         
        ">{props.fileItem.name}</span>

    </article>
}
