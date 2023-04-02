import { UserContext } from '../Services/UserContext';
import { CalendarItem, EmailItem, FileItem, User, Weather } from "../Types/Types";
import { MainPage } from './MainPage';
import { LoginPage } from './LoginPage';
import { useEffect, useState } from 'react';
import '../index.css'


export const App = () => {

  const [user, setUser] = useState<User>({} as User);
  const [nickname, setNickname] = useState("");

  const [weatherArray, setWeatherArray] = useState<Weather[]>([]);
  const [emailArray, setEmailArray] = useState<EmailItem[]>([]);
  const [eventArray, setEventArray] = useState<CalendarItem[]>([]);
  const [fileArray, setFileArray] = useState<FileItem[]>([]);
  
  const [activeDetailView, setActiveDetailView] = useState<string>("");
  const [selectedEmail, setSelectedEmail] = useState<EmailItem>({} as EmailItem);
  const [selectedEvent, setSelectedEvent] = useState<CalendarItem>({} as CalendarItem);
  const [selectedFile, setSelectedFile] = useState<FileItem>({} as FileItem);

  const isLoggedIn = (): boolean => {
    return typeof (user.userIdHash) !== 'undefined';
  }

  return (<UserContext.Provider value={{  user, setUser, 
                                          nickname, setNickname, 
                                          weatherArray, setWeatherArray,
                                          emailArray, setEmailArray,
                                          eventArray, setEventArray,
                                          fileArray, setFileArray,
                                          activeDetailView, setActiveDetailView,
                                          selectedEmail, setSelectedEmail,
                                          selectedEvent, setSelectedEvent,
                                          selectedFile, setSelectedFile
  }}>
    {
      isLoggedIn() ? <MainPage /> : <LoginPage />
    }
  </UserContext.Provider>)
}
