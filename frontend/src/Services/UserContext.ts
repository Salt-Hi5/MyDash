import { createContext, Dispatch, SetStateAction } from "react";
import { User, Weather } from "../Types/Types";

interface UserContextValue {
    user: User;
    setUser: Dispatch<SetStateAction<User>>;
    weatherArray: Weather[];
    setWeatherArray: Dispatch<SetStateAction<Weather[]>>;
}

export const UserContext = createContext<UserContextValue>({ 
    user: {} as User,
    setUser: () => { },
    weatherArray: [],
    setWeatherArray: () => { }
});