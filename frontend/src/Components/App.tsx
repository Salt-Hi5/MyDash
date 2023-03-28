import { UserContext } from '../Services/UserContext';
import { User, Weather } from "../Types/Types";
import { MainPage } from './MainPage';
import { LoginPage } from './LoginPage';
import { useState } from 'react';
import '/dist/output.css'



export const App = () => {

  const [user, setUser] = useState<User>({} as User);
  const [nickname, setNickname] = useState("");
  const [weatherArray, setWeatherArray] = useState<Weather[]>([]);

  const isLoggedIn = (): boolean => {
    return typeof (user.userIdHash) !== 'undefined';
  }

  return (<UserContext.Provider value={{ user, setUser, nickname, setNickname, weatherArray, setWeatherArray }}>
    {
      isLoggedIn() ? <MainPage /> : <LoginPage />
    }
  </UserContext.Provider>)
}
