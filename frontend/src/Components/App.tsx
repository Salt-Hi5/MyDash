import { UserContext } from '../Services/UserContext';
import { EmailObject, FileItem, User, Weather, CalendarObject } from "../Types/Types";
import { MainPage } from './MainPage';
import { LoginPage } from './LoginPage';
import { useEffect, useState } from 'react';
import '../index.css'


export const App = () => {

  const [user, setUser] = useState<User>({} as User);
  const [nickname, setNickname] = useState("");

  const [weatherArray, setWeatherArray] = useState<Weather[]>([]);
  const [emailArray, setEmailArray] = useState<EmailObject[]>([]);
  const [eventArray, setEventArray] = useState<CalendarObject[]>([]);
  const [fileArray, setFileArray] = useState<FileItem[]>([]);
  
  const [activeDetailView, setActiveDetailView] = useState<string>("");
  const [selectedEmail, setSelectedEmail] = useState<EmailObject>({} as EmailObject);
  const [selectedEvent, setSelectedEvent] = useState<CalendarObject>({} as CalendarObject);
  const [selectedFile, setSelectedFile] = useState<FileItem>({} as FileItem);

  const [searchQuery, setSearchQuery] = useState("")

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
                                          selectedFile, setSelectedFile,
                                          searchQuery, setSearchQuery
  }}>
    {
      isLoggedIn() ? <MainPage /> : <LoginPage />
    }
  </UserContext.Provider>)
}
