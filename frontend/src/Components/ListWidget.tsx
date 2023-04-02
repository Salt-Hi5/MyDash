import { useContext, useEffect, useState } from "react";
import { UserContext } from '../Services/UserContext';
import { DateTime } from 'luxon';
import { CalendarItem, EmailItem, FileItem,  } from "../Types/Types";
import { ListWidgetEmail } from "./ListWidgetEmail";
import { ListWidgetEvent } from "./ListWidgetEvent";
import { ListWidgetFile } from "./ListWidgetFile";



export const ListWidget = (props: {contentType: string}) => {
    const { emailArray, eventArray: calendarArray, fileArray, setEmailArray, setEventArray, setFileArray } = useContext(UserContext);

    useEffect(() => {
        console.log("Loading recent emails from API...");

        setEmailArray([
            {
                subject: "Project update: MyDash by Hi5",
                from: "anastasia.nilsson@appliedtechnology.se",
                to: "team@hi5.com",
                received: "Today at 10:49",
                body: "Guys, I really think that we're on to something really good with this MyDash project! Let's keep working hard so that we have something amazing to show off to our clients when they come on Tuesday!"
            },
            {
                subject: "REQUEST FOR ASSISTANCE-STRICTLY CONFIDENTIAL",
                from: "nigerianprince@hotmail.com",
                to: "team@hi5.com",
                received: "Today at 09:15",
                body: "I am Dr. Bakare Tunde, the cousin of Nigerian Astronaut, Air Force Major Abacha Tunde. He was the first African in space when he made a secret flight to the Salyut 6 space station in 1979. He was on a later Soviet spaceflight, Soyuz T-16Z to the secret Soviet military space station Salyut 8T in 1989. He was stranded there in 1990 when the Soviet Union was dissolved. His other Soviet crew members returned to earth on the Soyuz T-16Z, but his place was taken up by return cargo. There have been occasional Progrez supply flights to keep him going since that time. He is in good humor, but wants to come home. In the 14-years since he has been on the station, he has accumulated flight pay and interest amounting to almost $ 15,000,000 American Dollars. This is held in a trust at the Lagos National Savings and Trust Association. If we can obtain access to this money, we can place a down payment with the Russian Space Authorities for a Soyuz return flight to bring him back to Earth. I am told this will cost $ 3,000,000 American Dollars. In order to access the his trust fund we need your assistance. Consequently, my colleagues and I are willing to transfer the total amount to your account or subsequent disbursement, since we as civil servants are prohibited by the Code of Conduct Bureau (Civil Service Laws) from opening and/ or operating foreign accounts in our names. Needless to say, the trust reposed on you at this juncture is enormous. In return, we have agreed to offer you 20 percent of the transferred sum, while 10 percent shall be set aside for incidental expenses (internal and external) between the parties in the course of the transaction. You will be mandated to remit the balance 70 percent to other accounts in due course."
            },
            {
                subject: "Look at this cat meme!!!",
                from: "atte.pitkanen@appliedtechnology.se",
                to: "team@hi5.com",
                received: "Today at 07:54",
                body: "I found this amazing meme. You have to check it out!"
            },
            {
                subject: "Project update: Google Auth",
                from: "anastasia.nilsson@appliedtechnology.se",
                to: "team@hi5.com",
                received: "Yesterday at 19:24",
                body: "Hi! I managed to set up a node.js epress server to deal with the issue we were having. Everything is working fine now, and we have the access tokens!"
            }
        ])

        setEventArray([
            {
                name: "Hi5 Project Meeting",
                startTime: DateTime.now(),
                endTime: DateTime.now().plus({hours: 1}),
                location: "Google Meets",
                details: "Let's discuss the upcoming plans for MyDash.",
                link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            },
            {
                name: "Client Meeting",
                startTime: DateTime.now().plus({hours: 2}),
                endTime: DateTime.now().plus({hours: 3}),
                location: "The Office",
                details: "Meeting with clients to show off all the things we have done.",
                link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            },
            {
                name: "To the moon!",
                startTime: DateTime.now().plus({hours: 5}),
                endTime: DateTime.now().plus({days: 2}),
                location: "Europe's Spaceport",
                details: "We'll be launching off from Europe's Spaceport in French Guiana, and should reach the moon in a couple days.",
                link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            }
        ])

        setFileArray([
            {
                name: "MyDash Project Plan",
                image: "",
                link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            },
            {
                name: "Shopping List",
                image: "",
                link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            },
            {
                name: "VtM Core Rulebook",
                image: "",
                link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            },
            {
                name: "Movies to Watch",
                image: "",
                link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            },
            {
                name: "Project Presentation Week15",
                image: "",
                link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            }
        ])

    }, [])

    const renderWidgetItems = (contentType: string) => {

        switch (contentType) {
            case "Emails": 
                return <section id="EmailWidget" 
                    className={`mt-20 opacity-90 rounded-3xl p-4 
                                flex gap-4 flex-col overflow-auto
                                bg-slate-500 text-black
                                shadow-md shadow-black`} >

                    { emailArray.map(email => <ListWidgetEmail email={email as EmailItem} />) }  
                </section>

            case "Events": 
                return <section id="CalendarWidget" 
                    className={`opacity-90 rounded-3xl p-4 
                                flex gap-4 flex-col overflow-auto
                                bg-red-800 text-black
                                shadow-md shadow-black`} >
                    
                    { calendarArray.map(event => <ListWidgetEvent event={event as CalendarItem} />) }
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
