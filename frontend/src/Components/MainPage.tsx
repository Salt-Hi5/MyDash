import Waterfall from "../BackgroundImages/Waterfall.jpeg";
import { UserContext } from '../Services/UserContext';
import { WeatherWidget } from './WeatherWidget';
import { SearchWidget } from './SearchWidget';
import { useContext, useEffect, useState } from 'react';
import { NicknameChangeWidget } from "./NicknameChangeWidget";
import { LogoutWidget } from "./LogoutWidget";



export const MainPage = () => {
    const { user, nickname, setNickname } = useContext(UserContext);

    useEffect(() => {
        setNickname(user.nickname)
    }, [])

    return (
        // <main id="Main" className="absolute inset-0 overflow-auto overscroll-none bg-cover bg-fixed flex" style={{ backgroundImage: `url(${Waterfall}` }}>
        <main id="Main" className="absolute inset-0 flex">

            <section id="LeftWidgetColumn" className="w-1/4 p-4">
            </section>

            <section id="CenterWidgetColumn" className="grow flex flex-col items-center">
                <h1 className="py-20 text-4xl font-extralight">Welcome {nickname}</h1>
                <SearchWidget />
            </section>

            <section id="RightWidgetColumn" className="flex flex-col gap-4 w-1/4 overflow-auto overscroll-contain p-4">
                <div className="flex w-full gap-4">
                <NicknameChangeWidget /> <LogoutWidget />
                </div>
                
                <WeatherWidget />
            </section>

        </main>
    )
}
