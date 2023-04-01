import Waterfall from "../BackgroundImages/Waterfall.jpeg";
import { UserContext } from '../Services/UserContext';
import { WeatherWidget } from './WeatherWidget';
import { SearchWidget } from './SearchWidget';
import { useContext, useEffect, useState } from 'react';
import { UserMenu } from "./UserMenu";
import { CodeResponse, useGoogleLogin } from "@react-oauth/google";
import { postGoogleAuthorisation } from "../Services/ApiClient";
import axios from 'axios';
import { GetThreads, GetThreadMessages, GetMessageBody, GetMessage } from "../Services/GoogleApi";
import { Tokens, Threads } from "../Types/Types";



export const MainPage = () => {
    const { user, nickname, setNickname } = useContext(UserContext);
    const [ tokens, setTokens ] = useState<Tokens>({} as Tokens);
    const [ threads, setThreads ] = useState<Threads>()
    

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
        }
    }, [tokens])

    // 

    useEffect(() => {
        console.log(threads);

        if (threads !== undefined) {
            const thread = threads.threads[0]

            GetThreadMessages(tokens, thread.id, user.email)
            .then(newThread => {
                console.log(newThread);
                // GetMessage(tokens, newThread.messages[0].id, user.email)
                // .then(message => {
                //     const id = message.payload.parts[1].body.attachmentId
                //     GetMessageBody(tokens, newThread.messages[0].id, id, user.email)
                //     .then(attachment => console.log(attachment.data));
                // })
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
        scope: "https://mail.google.com/"
    });

    const getEmails = async () => {
        const listOfThreads = await GetThreads(tokens, user.email)
        setThreads(listOfThreads);
    }

    return (
        <main id="Main" className="absolute inset-0 overflow-auto overscroll-none bg-cover bg-fixed flex" style={{ backgroundImage: `url(${"./Waterfall.jpeg"}` }}>

            <section id="LeftWidgetColumn" className="w-1/4 p-4">
                {threads?.threads.map(thread => {

                    return "shit"
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
