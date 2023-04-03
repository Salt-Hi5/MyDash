import { useContext, useEffect, useState } from "react";
import { UserContext } from '../Services/UserContext';
import { DateTime } from 'luxon';
import { CalendarItem, CalendarObject, EmailItem, EmailObject, FileItem,  } from "../Types/Types";
import { ListWidgetEmail } from "./ListWidgetEmail";
import { ListWidgetEvent } from "./ListWidgetEvent";
import { ListWidgetFile } from "./ListWidgetFile";



export const ListWidget = (props: {contentType: string}) => {
    const { emailArray, eventArray: calendarArray, fileArray, setEmailArray, setEventArray, setFileArray } = useContext(UserContext);

    useEffect(() => {
        console.log("Loading recent emails from API...");

    }, [])

    const renderWidgetItems = (contentType: string) => {

        switch (contentType) {
            case "Emails": 
                return <section id="EmailWidget" 
                    className={`mt-20 opacity-90 rounded-3xl p-4 
                                flex gap-4 flex-col overflow-auto
                                bg-slate-500 text-black
                                shadow-md shadow-black`} >

                    { emailArray.map(email => <ListWidgetEmail key={email.emailURL} email={email as EmailObject} />) }  
                </section>

            case "Events": 
                return <section id="CalendarWidget" 
                    className={`opacity-90 rounded-3xl p-4 
                                flex gap-4 flex-col overflow-auto
                                bg-red-800 text-black
                                shadow-md shadow-black`} >
                    
                    { calendarArray.map(event => <ListWidgetEvent key={event.htmlLink} event={event as CalendarObject} />) }
                </section>

            case "Files": 
                return <section id="FileWidget" 
                    className={`opacity-90 rounded-3xl p-4 h-min
                                flex gap-4 flex-row overflow-auto
                                bg-green-800 text-black
                                shadow-md shadow-black`} >
            
                    { fileArray.map(file => <ListWidgetFile fileItem={file as FileItem} />) }
                </section>
        }
    }

    return <>{renderWidgetItems(props.contentType)}</>
}
