import Waterfall from "../BackgroundImages/Waterfall.jpeg";
import { UserContext } from '../Services/UserContext';
import { WeatherWidget } from './WeatherWidget';
import { SearchWidget } from './SearchWidget';
import { useContext, useEffect, useState } from 'react';
import { UserMenu } from "./UserMenu";
import { CodeResponse, useGoogleLogin } from "@react-oauth/google";
import { postGoogleAuthorisation } from "../Services/ApiClient";
import axios from 'axios';
import { GetThreads, GetThreadMessages, GetCalendarEvents, GetMessage, GetDriveFiles } from "../Services/GoogleApi";
import { Tokens, Threads, EmailObject, Header, CalendarObject } from "../Types/Types";
import { ListWidget } from "./ListWidget";
import { EmailViewWidget } from "./EmailViewWidget";
import { EventViewWidget } from "./EventViewWidget";
import { DateTime } from "luxon";
//import { SearchResultsWidget } from "./SearchResultsWidget";




export const MainPage = () => {

    const { user, nickname, setNickname, activeDetailView, setEmailArray, setEventArray, emailArray, setFileArray } = useContext(UserContext);
    const [tokens, setTokens] = useState<Tokens>({} as Tokens);
    const [threads, setThreads] = useState<Threads>();


    // 🔥🔥🔥 CHANGE THIS URL TO MAKE IT WORK ON THE DEPLOYED VERSION. http://localhost:3001/auth/google backend that will exchange the code
    let apiUrl = "https://mydashgoogleapi.azurewebsites.net/auth/google";
    apiUrl = "http://localhost:3001/auth/google"; // DEBUG 

    useEffect(() => {
        setNickname(user.nickname);
        googleLogin();
    }, [])

    // useEffect(() => {
    //     setEventArray(calendarEvents);
    // }, [ calendarEvents])

    useEffect(() => {
        if (typeof(tokens.access_token) !== 'undefined') {
            getEmails();

            GetCalendarEvents(tokens, user.email).then(events => {
                const items: CalendarObject[] = events.items;
                setEventArray(items);
            });

            GetDriveFiles(tokens).then(filesResponse => {
                setFileArray(filesResponse.files)
                console.log(filesResponse)
            });
        }
    }, [tokens])

    // 

    useEffect(() => {
        if (typeof(threads?.threads) !== "undefined") {
            let emailList: EmailObject[] = [];
            threads.threads.forEach(thread => { // For each thread 
                GetThreadMessages(tokens, thread.id, user.email) // get the messages..
                    .then(newThread => {
                        GetMessage(tokens, newThread.messages[0].id, user.email) // Get a single email from the thread 
                            .then(message => {
                                const headers: Header[] = message.payload.headers;
                                const email = {
                                    date: DateTime.fromRFC2822(headers.find(x => x.name === "Date")!.value),
                                    subject: headers.find(x => x.name === "Subject")?.value,
                                    sender: headers.find(x => x.name === "From")?.value,    // 🔥 CONCATINATE TO EXCLUDE USERNAME sender: '"Björn Noctiluca" <bjorn.noctiluca@appliedtechnology.se>' 
                                    // ALTERNATIVE WAY: Just extacts the username and not email (but this does NOT WORK for all emails since they have different structures) (headers.find(header => header.name === 'From')?.value.match(/"([^"]*)"/)?.[1] || ''),
                                    recipient: headers.find(x => x.name === "Delivered-To")?.value ?? "You",
                                    snippet: message.snippet,
                                    emailURL: `https://mail.google.com/mail/u/${user.email}/#inbox/${thread.id}`,

                                    // EXAMPLE of Email URL that sends the user to a specific email based on the emails code
                                    // (the code is available from "thread.id")
                                    // https://mail.google.com/mail/u/john.forsgren@appliedtechnology.se/#inbox/1866ef55b8dd710e

                                } as EmailObject;

                                emailList.push(email);
                                // Add the new email to an list email object so it can be displayed. 
                                
                            })

                        
                    })
               
            })
            setEmailArray(emailList);   
        }
        
    }, [threads]);

    const googleLogin = useGoogleLogin({
        onSuccess: async (whatever: CodeResponse) => {
            console.log("Authorised scope: " + whatever.scope);
            const code = whatever.code;
            await axios.post(apiUrl, {
                code
            }).then(response => {
                setTokens(response.data);
            });

        },
        flow: 'auth-code',
        scope: "https://mail.google.com/ https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/drive"
    });

    const getEmails = async () => {
        const listOfThreads = await GetThreads(tokens, user.email)
        setThreads(listOfThreads);
    }

    useEffect(() => {
        // Just to rerender the page when activeDetailView is updated
    }, [activeDetailView]);

    const renderDetailView = () => {
        switch (activeDetailView) {
            case "Email": return <EmailViewWidget />
            case "Event": return <EventViewWidget />
            //case "Search": return <SearchResultsWidget />
        }
    }

    return (
        <main id="Main" className="inset-0 absolute overflow-auto overscroll-none bg-cover bg-fixed flex" style={{ backgroundImage: `url(${"./Waterfall.jpeg"}` }}>


            <section id="LeftWidgetColumn" className="w-1/4 h-full p-4 pt-5
                                                      flex flex-col justify-between gap-4">
                <ListWidget contentType="Emails" />
                <ListWidget contentType="Events" />
                <ListWidget contentType="Files" />

            </section>

            <section id="CenterWidgetColumn" className="w-1/2 grow flex flex-col items-center">
                <h1 className="rounded-full my-24 text-6xl font-extraligh text-white py-2 px-6 shadow-md shadow-black bg-emerald-900/60">Welcome {nickname}</h1>
                <SearchWidget />
                <article className={`w-4/5 mt-20`}>
                    {
                        renderDetailView()
                    }
                </article>
            </section>

            <section id="RightWidgetColumn" className="w-1/4 flex flex-col gap-4 overflow-auto overscroll-contain p-4">

                <UserMenu />
                <WeatherWidget />
            </section>

        </main>
    )
}
