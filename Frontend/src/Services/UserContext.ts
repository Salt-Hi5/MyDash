import { createContext, Dispatch, SetStateAction } from "react";
import { User, Weather } from "../Types/Types";

interface UserContextValue {
    user: User;
    setUser: Dispatch<SetStateAction<User>>;
    weatherLocations: Weather[];
    setWeatherLocations: Dispatch<SetStateAction<Weather[]>>;
}

export const UserContext = createContext<UserContextValue>({ // Creates the context for the entire app. 
    /* All variables related to thing we display on the UI and are used in more than one component should be placed here. */
    user: {} as User,
    setUser: () => { },
    weatherLocations: [],
    setWeatherLocations: () => { }
});