import { useContext, useEffect, useState } from "react";
import { UserContext } from '../Services/UserContext';
import { getWeather, patchLocations } from "../Services/ApiClient";
import { DateTime } from 'luxon';
import { LocationSearch } from "./WeatherWidgetLocationSearch";
import { FileItem } from "../Types/Types";


export const ListWidgetFile = (props: {fileItem: FileItem}) => {

    /*
    const documentUrl = "https://docs.google.com/document/d/{fileId}/edit"
    const spreadsheetUrl = "https://docs.google.com/spreadsheets/d/{fileId}/edit"
    const presentationUrl = "https://docs.google.com/presentation/d/{fileId}/edit"
    
    the mimeType contains the type of file after the last period.
    url + {type} + /d/ + {fileId} + /edit

    */
   const url = "https://docs.google.com/";


    return <article id="ListWidgetFile"       
        onClick={
            (e) => window.open(props.fileItem.mimeType, '_blank', 'noreferrer')
        } 
        className={`flex flex-col gap-1 justify-between
        opacity-90 rounded-3xl w-24 h-28
        hover:cursor-pointer hover:bg-sky-100`
    } >
        
        {/* <img src={props.fileItem.image} alt=""  
            className={`opacity-90 rounded-3xl 
                        bg-white shadow-md shadow-black`
        }/> */}
        <span className="truncate text-s text-black
                         
        ">{props.fileItem.name}</span>

    </article>
}
