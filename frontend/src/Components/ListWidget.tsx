import { useContext, useEffect, useState } from "react";
import { UserContext } from '../Services/UserContext';
import { DateTime } from 'luxon';
import { CalendarObject, EmailObject, FileItem, } from "../Types/Types";
import { ListWidgetEmail } from "./ListWidgetEmail";
import { ListWidgetEvent } from "./ListWidgetEvent";
import { ListWidgetFile } from "./ListWidgetFile";



export const ListWidget = (props: { contentType: string }) => {
    const { emailArray, eventArray: calendarArray, fileArray, setEmailArray, setEventArray, setFileArray } = useContext(UserContext);

    useEffect(() => {

    }, [emailArray, calendarArray])

    const renderWidgetItems = (contentType: string) => {

        switch (contentType) {
            case "Emails":
                return <section id="EmailWidget"
                        className={`mt-20 opacity-90 rounded-3xl p-4 h-3/5
                                flex gap-4 flex-col overflow-auto shrink
                                bg-slate-500 text-black
                                shadow-md shadow-black`} >
                        <span className="text-xl text-white pl-2">Recent Emails</span>
                        {emailArray.map(email => <ListWidgetEmail key={email.emailURL} email={email as EmailObject} />)}
                    </section>

            case "Events":
                return <section id="CalendarWidget"
                        className={`opacity-90 rounded-3xl p-4 h-2/5
                                flex gap-4 flex-col overflow-auto
                                bg-red-800 text-black
                                shadow-md shadow-black`} >
                        <span className="text-xl text-white pl-2">Upcoming Events</span>
                        {calendarArray.map(event => <ListWidgetEvent key={event.htmlLink} event={event as CalendarObject} />)}
                    </section>

            case "Files":
                return <section id="FileWidget"
                            className={`opacity-90 rounded-3xl p-6 pb-4
                                        flex flex-col justify-start
                                        bg-emerald-600 text-black
                                        
                                        shadow-md shadow-black`} >
                        <span className="text-xl text-white pl-2 pb-4 h-12">Recent Files</span>
                        <div className="flex flex-row overflow-auto gap-4 h-44 ">
                                
                        
                            {fileArray.map(file => <ListWidgetFile fileItem={file as FileItem} />)}
                        </div>
                    </section>
        }
    }

    return <>{renderWidgetItems(props.contentType)}</>
}
