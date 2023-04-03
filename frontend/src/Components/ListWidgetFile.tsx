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
    const url = "https://docs.google.com";
    const mimetypeArray = /[^.]*$/.exec(props.fileItem.mimeType);
    const mimetype = mimetypeArray ? mimetypeArray[0] : "other";

    const getImage = () => {
        switch (mimetype) {
            case "document": return "./Docs.png";
            case "spreadsheets": return "./Sheets.png";
            case "presentation": return "./Slides.png";
            default: return "./Drive.png";
        }
    }

    
    const getLink = () => {
        return `${url}/${mimetype}/d/${props.fileItem.id}/edit`;
    }

    return <article id="ListWidgetFile"       
        onClick={
            (e) => window.open(getLink(), '_blank', 'noreferrer')
        } 
        className={`flex flex-col gap-1 p-2 pt-4
                    hover:cursor-pointer w-40 h-40 shrink-0
                    shadow-md shadow-black
                    rounded-3xl bg-white/70  hover:bg-emerald-100/70
                    `
    } >
        


        <img src={getImage()} alt=""  
            className={`object-scale-down w-20 self-center
                        
                        `
        }/> 

        <span className={`opacity-90 rounded-3xl px-4 text-center h-12 overflow-y-hidden
                     text-s text-black
                          `}>{props.fileItem.name}</span>

    </article>
}
