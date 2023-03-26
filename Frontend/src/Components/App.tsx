import React, { useState, useEffect, createContext, Dispatch, SetStateAction } from 'react'
import { User, UserLocation, Weather } from "../Types/Types"
import { getUsers } from "../Services/apiClient"
import '../CSS/App.css'
import { WeatherWidget } from './WeatherWidget';

interface UserContextValue {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
  weatherLocations: Weather[];
  setWeatherLocations: Dispatch<SetStateAction<Weather[]>>;
}

export const UserContext = createContext<UserContextValue>({ // Creates the context for the entire app. 
  /* All variables related to thing we display on the UI and are used in more than one component should be placed here. */
  user: {} as User,
  setUser: () => {},
  weatherLocations: [],
  setWeatherLocations: () => {}
});


function App() {
  const [ user, setUser ] = useState<User>({} as User);
  const [ weatherLocations, setWeatherLocations] = useState<Weather[]>([]);
  
  useEffect(() => {
    const initialSetup = async () => {
      const users = await getUsers();
      const [lastItem] = users.slice(-1);
      setUser(lastItem);
    }
    initialSetup();
    
  }, []);

  console.log("Loading user...");
  if (typeof(user.emailHash) === 'undefined') {
    return (<div>Loading...</div>);
  } 

  return (
    <UserContext.Provider value={{user, setUser, weatherLocations, setWeatherLocations}}>    {/*Assigns the userLocations and SetUserLocations to the Provider */}
      <h1 className="header">
        Welcome {user.nickname}!
      </h1>
      <WeatherWidget />
    </UserContext.Provider>
  )
}

export default App
