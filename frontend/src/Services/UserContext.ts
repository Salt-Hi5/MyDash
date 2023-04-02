import { createContext, Dispatch, SetStateAction } from "react";
import { User, Weather, EmailItem, CalendarItem, FileItem } from "../Types/Types";

interface UserContextValue {
    user: User;
    setUser: Dispatch<SetStateAction<User>>;
    nickname: string;
    setNickname: Dispatch<SetStateAction<string>>;

    weatherArray: Weather[];
    setWeatherArray: Dispatch<SetStateAction<Weather[]>>;
    emailArray: EmailItem[];
    setEmailArray: Dispatch<SetStateAction<EmailItem[]>>;
    eventArray: CalendarItem[];
    setEventArray: Dispatch<SetStateAction<CalendarItem[]>>;
    fileArray: FileItem[];
    setFileArray: Dispatch<SetStateAction<FileItem[]>>;

    activeDetailView: string;
    setActiveDetailView: Dispatch<SetStateAction<string>>;
    selectedEmail: EmailItem;
    setSelectedEmail: Dispatch<SetStateAction<EmailItem>>;
    selectedEvent: CalendarItem;
    setSelectedEvent: Dispatch<SetStateAction<CalendarItem>>;
    selectedFile: FileItem;
    setSelectedFile: Dispatch<SetStateAction<FileItem>>;
}
export const UserContext = createContext<UserContextValue>({
    user: {} as User,
    setUser: () => { },
    nickname: "",
    setNickname: () => { },

    weatherArray: [],
    setWeatherArray: () => { },
    emailArray: [],
    setEmailArray: () => { },
    eventArray: [],
    setEventArray: () => { },
    fileArray: [],
    setFileArray: () => { },

    activeDetailView: {} as string,
    setActiveDetailView: () => { },
    selectedEmail: {} as EmailItem,
    setSelectedEmail: () => { },
    selectedEvent: {} as CalendarItem,
    setSelectedEvent: () => { },
    selectedFile: {} as FileItem,
    setSelectedFile: () => { },
});
