import { UserContext } from '../Services/UserContext';
import { WeatherWidget } from './WeatherWidget';
import { useContext } from 'react';
import '../CSS/App.css';


export const MainPage = () => {
    const { user } = useContext(UserContext);

    return <main className="Main">
        <h1 className="Main--Header">Welcome {user.nickname}</h1>
        <WeatherWidget />
    </main>
}
