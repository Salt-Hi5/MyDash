import Waterfall from "../BackgroundImages/Waterfall.jpeg";
import { UserContext } from '../Services/UserContext';
import { WeatherWidget } from './WeatherWidget';
import { SearchWidget } from './SearchWidget';
import { useContext, useEffect } from 'react';
import { UserMenu } from "./UserMenu";
import { useGoogleLogin } from "@react-oauth/google";
import { postGoogleAuthorisation } from "../Services/ApiClient";
import axios from 'axios';
import { ListWidget } from "./ListWidget";
import { EmailViewWidget } from "./EmailViewWidget";
import { EventViewWidget } from "./EventViewWidget";




export const MainPage = () => {
    const { user, nickname, setNickname, activeDetailView, setActiveDetailView, selectedEmail, selectedEvent } = useContext(UserContext);

    useEffect(() => {
        setNickname(user.nickname);
        googleLogin();
    }, [])


    const authorisation = useGoogleLogin({ // ☣️☣️☣️ TEMPORARY VERSION!!! This creates a popup for the user to approve a request for this app to access their data (e.g calendar)
        onSuccess: codeResponse => {
            postGoogleAuthorisation(user.userIdHash, codeResponse.code);
        },
        flow: 'auth-code',
        scope: "https://www.googleapis.com/auth/calendar",

    });

    const googleLogin = useGoogleLogin({
        onSuccess: async ({ code }) => {
            const tokens = await axios.post('http://localhost:3001/auth/google', {  // http://localhost:3001/auth/google backend that will exchange the code
                code,
            });

            console.log(tokens);
        },
        flow: 'auth-code',
    });

    useEffect(() => {
        // Just to rerender the page when activeDetailView is updated
    }, [activeDetailView]);

    const renderDetailView = () => {
        switch (activeDetailView) {
            case "Email": return <EmailViewWidget />
            case "Event": return <EventViewWidget />
        }
    }

    return (
        <main id="Main" className="inset-0 absolute overflow-auto overscroll-none bg-cover bg-fixed flex" style={{ backgroundImage: `url(${"./Waterfall.jpeg"}` }}>

            <section id="LeftWidgetColumn" className="w-1/4 h-full p-4 pt-5
                                                      flex flex-col justify-between gap-4">
                <ListWidget contentType="Emails"/>
                <ListWidget contentType="Events"/>
                <ListWidget contentType="Files"/>
            </section>

            <section id="CenterWidgetColumn" className="w-1/2 grow flex flex-col items-center">
                <h1 className="opacity-90 rounded-3xl my-20 text-4xl font-extraligh text-white p-1 px-4 shadow-md shadow-black">Welcome {nickname}</h1>
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
