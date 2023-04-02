import Waterfall from "../BackgroundImages/Waterfall.jpeg";
import { UserContext } from '../Services/UserContext';
import { WeatherWidget } from './WeatherWidget';
import { SearchWidget } from './SearchWidget';
import { useContext, useEffect, useState } from 'react';
import { UserMenu } from "./UserMenu";
import { CodeResponse, useGoogleLogin } from "@react-oauth/google";
import { postGoogleAuthorisation } from "../Services/ApiClient";
import axios from 'axios';
import { GetThreads, GetThreadMessages, GetCalendarEvents, GetMessage } from "../Services/GoogleApi";
import { Tokens, Threads, EmailObject, Header, CalendarObject } from "../Types/Types";



export const MainPage = () => {
    const { user, nickname, setNickname } = useContext(UserContext);
    const [ tokens, setTokens ] = useState<Tokens>({} as Tokens);
    const [ threads, setThreads ] = useState<Threads>();
    const [ emails, setEmails ] = useState<EmailObject[]>([]);
    const [ calendarEvents, setCalendarEvents ] = useState<CalendarObject[]>([]);
    

    // 🔥🔥🔥 CHANGE THIS URL TO MAKE IT WORK ON THE DEPLOYED VERSION. http://localhost:3001/auth/google backend that will exchange the code
    let apiUrl = "insert deployed api url here"; 
    apiUrl = "http://localhost:3001/auth/google"; // DEBUG 
    
    useEffect(() => {
        setNickname(user.nickname);
        googleLogin();
    }, [])

    useEffect(() => {
        if (tokens.access_token !== undefined) {
            getEmails();

            GetCalendarEvents(tokens, user.email).then(events => {
                const items: CalendarObject[] = events.items;
                setCalendarEvents(items);
                // items.forEach(item => {
                //     setCalendarEvents([...calendarEvents, {
                //             summary: item.summary,
                //             htmlLink: item.htmlLink,
                //             start: item.start
                //         } as CalendarObject]);
                // });
                
                // const items = events.items;

                // date : headers.find(x => x.name === "Date")!.value,

                /*
                start : 
                    dateTime: "2023-04-05T09:00:00+02:00"
                timeZone: 
                    "Europe/Berlin"
                
                */
            });
        }
    }, [tokens])

    useEffect(() => {
        if (calendarEvents.length !== 0) {
            console.log(calendarEvents[0].summary);
            console.log(calendarEvents[0].start.dateTime)
        }
        console.log(calendarEvents)
    }, [calendarEvents])

    // 

    useEffect(() => {
        if (threads !== undefined) {
            threads.threads.forEach(thread => { // For each thread 
                GetThreadMessages(tokens, thread.id, user.email) // get the messages..
                .then(newThread => {
                    GetMessage(tokens, newThread.messages[0].id, user.email) // Get a single email from the thread 
                    .then(message => {
                        const headers: Header[] = message.payload.headers;
                        setEmails([...emails, // Add the new email to an list email object so it can be displayed. 
                            {   
                                date : headers.find(x => x.name === "Date")!.value,
                                subject : headers.find(x => x.name === "Subject")!.value, 
                                sender : headers.find(x => x.name === "From")!.value,    // 🔥 CONCATINATE TO EXCLUDE USERNAME sender: '"Björn Noctiluca" <bjorn.noctiluca@appliedtechnology.se>' 
                                // ALTERNATIVE WAY: Just extacts the username and not email (but this does NOT WORK for all emails since they have different structures) (headers.find(header => header.name === 'From')?.value.match(/"([^"]*)"/)?.[1] || ''),
                
                                
                                emailURL : `https://mail.google.com/mail/u/${user.email}/#inbox/${thread.id}`, 
                                        
                                // EXAMPLE of Email URL that sends the user to a specific email based on the emails code
                                // (the code is available from "thread.id")
                                // https://mail.google.com/mail/u/john.forsgren@appliedtechnology.se/#inbox/1866ef55b8dd710e
                                
                            } as EmailObject])
                    })
                })
            })
        }
    }, [threads]);



    const googleLogin = useGoogleLogin({
        onSuccess: async (whatever: CodeResponse) => {
            console.log("Authorised scope: " + whatever.scope);
            const code = whatever.code;
            const response = await axios.post(apiUrl, {  
            code
          }).then(response => {
            setTokens(response.data);
          });
          
        },
        flow: 'auth-code',
        scope: "https://mail.google.com/ https://www.googleapis.com/auth/calendar"
    });

    const getEmails = async () => {
        const listOfThreads = await GetThreads(tokens, user.email)
        setThreads(listOfThreads);
    }

    return (
        <main id="Main" className="absolute inset-0 overflow-auto overscroll-none bg-cover bg-fixed flex" style={{ backgroundImage: `url(${"./Waterfall.jpeg"}` }}>

            <section id="LeftWidgetColumn" className="flex w-1/4 p-4 bg-indigo-500 flex-wrap overflow-hidden">
                {calendarEvents.map(event => {
                    return <div>
                        <p>{event.htmlLink}</p>
                        <p>{event.summary}</p>
                        <p>{event.start.dateTime}</p>
                        <p>{event.start.timeZone}</p>
                    </div>
                })}
            </section>

            <section id="CenterWidgetColumn" className="grow flex flex-col items-center">
                <h1 className="opacity-90 rounded-3xl my-20 text-4xl font-extraligh text-white p-1 px-4 shadow-md shadow-black">Welcome {nickname}</h1>
                <SearchWidget />
            </section>

            <section id="RightWidgetColumn" className="flex flex-col gap-4 w-1/4 overflow-auto overscroll-contain p-4">

                <UserMenu />
                <WeatherWidget />
            </section>

        </main>
    )
}
