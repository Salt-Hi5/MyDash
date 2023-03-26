import { UserContext } from '../Services/UserContext';
import { User, Weather } from "../Types/Types";
import { MainPage } from './MainPage';
import { LoginPage } from './Login';
import { useState } from 'react';
import '../CSS/App.css';

export const App = () => {

  const [user, setUser] = useState<User>({} as User);
  const [weatherLocations, setWeatherLocations] = useState<Weather[]>([]);

  const isLoggedIn = (): boolean => {
    return typeof (user.emailHash) !== 'undefined';
  }

  return <UserContext.Provider value={{ user, setUser, weatherLocations, setWeatherLocations }}>
    {
      isLoggedIn() ? <MainPage /> : <LoginPage />
    }
  </UserContext.Provider>
}

  // useEffect(() => {
  //   const initialSetup = async () => {
  //     const users = await getUsers();
  //     const [lastItem] = users.slice(-1);
  //     setUser(lastItem);
  //   }
  //   initialSetup();
  // }, []);