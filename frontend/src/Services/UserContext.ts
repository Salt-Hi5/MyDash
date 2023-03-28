import { createContext, Dispatch, SetStateAction } from "react";
import { User, Weather } from "../Types/Types";

interface UserContextValue {
    user: User;
    setUser: Dispatch<SetStateAction<User>>;
    nickname: string;
    setNickname: Dispatch<SetStateAction<string>>;
    weatherArray: Weather[];
    setWeatherArray: Dispatch<SetStateAction<Weather[]>>;
}

export const UserContext = createContext<UserContextValue>({ 
    user: {} as User,
    setUser: () => { },
    nickname: "",
    setNickname: () => { },
    weatherArray: [],
    setWeatherArray: () => { }
});