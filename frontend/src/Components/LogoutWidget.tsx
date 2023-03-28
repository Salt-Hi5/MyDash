
import { googleLogout } from '@react-oauth/google';
import { useContext } from 'react';
import { UserContext } from '../Services/UserContext';
import { User } from '../Types/Types';

export const LogoutWidget = () => {
    const { setUser } = useContext(UserContext);

    const logoutFlow = () => {
        googleLogout();
        setUser({} as User)
    }

    return (
        <button id="LogoutButton" className="py-2 px-4 border border-gray rounded-3xl" onClick={(e) => logoutFlow()}>Logout</button>       
    ) 
}


