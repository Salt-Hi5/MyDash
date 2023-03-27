import Waterfall from "../BackgroundImages/Waterfall.jpeg";
import { UserContext } from '../Services/UserContext';
import { WeatherWidget } from './WeatherWidget';
import { SearchWidget } from './SearchWidget';
import { useContext } from 'react';
import '/dist/output.css';


export const MainPage = () => {
    const { user } = useContext(UserContext);

    return (
        // <main id="Main" className="absolute inset-0 overflow-auto overscroll-none bg-cover bg-fixed flex" style={{ backgroundImage: `url(${Waterfall}` }}>
        <main id="Main" className="absolute inset-0 flex">

            <section id="LeftWidgetColumn" className="w-1/4">
            </section>

            <section id="CenterWidgetColumn" className="grow flex flex-col items-center">
                <h1 className="py-20 text-4xl text-white font-extralight">Welcome {user.nickname}</h1>
                <SearchWidget />
            </section>

            <section id="RightWidgetColumn" className="w-1/4 overflow-auto overscroll-contain">
                <WeatherWidget />
            </section>

        </main>
    )
}
