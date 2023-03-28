import Waterfall from "../BackgroundImages/Waterfall.jpeg";
import { UserContext } from '../Services/UserContext';
import { WeatherWidget } from './WeatherWidget';
import { SearchWidget } from './SearchWidget';
import { useContext, useEffect } from 'react';
import { UserMenu } from "./UserMenu";



export const MainPage = () => {
    const { user, nickname, setNickname } = useContext(UserContext);

    useEffect(() => {
        setNickname(user.nickname)
    }, [])

    return (
        <main id="Main" className="absolute inset-0 overflow-auto overscroll-none bg-cover bg-fixed flex" style={{ backgroundImage: `url(${"./Waterfall.jpeg"}` }}>

            <section id="LeftWidgetColumn" className="w-1/4 p-4">
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
