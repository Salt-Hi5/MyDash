import { useContext, useEffect, useState } from "react";
import { UserContext } from '../Services/UserContext';
import { getWeather, patchLocations } from "../Services/ApiClient";
import { DateTime } from 'luxon';
import { LocationSearch } from "./WeatherWidgetLocationSearch";
import { FileItem } from "../Types/Types";


export const ListWidgetFile = (props: {fileItem: FileItem}) => {

    /*
    
    https://docs.google.com/document/d/1FC2X7trXIPpLht0HESSbT2BvM_OhF9UGBa9zUscFfvc/edit

    https://docs.google.com/document/d/1FC2X7trXIPpLht0HESSbT2BvM_OhF9UGBa9zUscFfvc/edit
    https://docs.google.com/presentation/d/1IPSnZMdXGhUqSYnAM6V-Zt2Y55zQ1iJz_Cny5_keqaE/edit#slide=id.p
    https://docs.google.com/spreadsheets/d/1JIVXJ91GPgGv2bWhG0WIUzRbj_qXnx6lHCyYbrnxR8Y/edit#gid=0

        ASSUMPTION: The link to the file is: 
    
    */


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
