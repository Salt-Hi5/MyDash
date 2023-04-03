import { createContext, Dispatch, SetStateAction } from "react";
import { User, Weather, EmailItem, CalendarItem, FileItem, EmailObject, CalendarObject } from "../Types/Types";

interface UserContextValue {
    user: User;
    setUser: Dispatch<SetStateAction<User>>;
    nickname: string;
    setNickname: Dispatch<SetStateAction<string>>;

    weatherArray: Weather[];
    setWeatherArray: Dispatch<SetStateAction<Weather[]>>;
    emailArray: EmailObject[];
    setEmailArray: Dispatch<SetStateAction<EmailObject[]>>;
    eventArray: CalendarObject[];
    setEventArray: Dispatch<SetStateAction<CalendarObject[]>>;
    fileArray: FileItem[];
    setFileArray: Dispatch<SetStateAction<FileItem[]>>;

    activeDetailView: string;
    setActiveDetailView: Dispatch<SetStateAction<string>>;
    selectedEmail: EmailObject;
    setSelectedEmail: Dispatch<SetStateAction<EmailObject>>;
    selectedEvent: CalendarObject;
    setSelectedEvent: Dispatch<SetStateAction<CalendarObject>>;
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
    selectedEmail: {} as EmailObject,
    setSelectedEmail: () => { },
    selectedEvent: {} as CalendarObject,
    setSelectedEvent: () => { },
    selectedFile: {} as FileItem,
    setSelectedFile: () => { },
});
