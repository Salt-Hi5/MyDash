import React, { useState, useEffect, createContext, Dispatch, SetStateAction } from 'react'
import { User, UserLocation } from "../Types/Types"
import { getUsers } from "../Services/apiClient"
import '../CSS/App.css'

interface UserContextValue {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
}

export const UserContext = createContext<UserContextValue>({ // Creates the context for the entire app. 
  /* All variables related to thing we display on the UI and are used in more than one component should be placed here. */
  user: {} as User,
  setUser: () => {}
});


function App() {
  const [ user, setUser ] = useState<User>({} as User);
  
  useEffect(() => {
    const initialSetup = async () => {
      setUser((await getUsers())[-1]);
    }
    initialSetup();
  }, []);

  if (user === undefined) return <div>Loading...</div>

  return (
    <UserContext.Provider value={{user, setUser}}>    {/*Assigns the userLocations and SetUserLocations to the Provider */}
      <h1 className="header">
        Welcome {user.nickname}!
      </h1>
    </UserContext.Provider>
  )
}

export default App
