
import { googleLogout } from '@react-oauth/google';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../Services/UserContext';
import { User } from '../Types/Types';
import { NicknameChanger } from './NicknameChanger';

export const UserMenu = () => {
    const { user, setUser } = useContext(UserContext);
    const [ profilePicture, setProfilePicture ] = useState("");
    const [ showMenu, setShowMenu ] = useState(false);    
    const [ showNicknameChanger, setShowNicknameChanger ] = useState(false);
    // const [ showThemeSelect, setShowThemeSelect ] = useState(false);

    useEffect(() => {
        if (typeof (user.picture) === 'undefined') {
            setProfilePicture("./GenericAvatar.svg");
            return;
        }
        setProfilePicture(user.picture);
    }, [])

    const logoutFlow = () => {
        googleLogout();
        setUser({} as User)
    }

    return (
        <div className="flex flex-col gap-4 items-end">

            <div className="flex w-full gap-4 justify-end">
                { showNicknameChanger &&
                    <NicknameChanger setShowNicknameChanger={setShowNicknameChanger}/>
                }
                <img src={profilePicture} alt="User Menu" className="h-16 rounded-full hover:border-2 border-solid border-white cursor-pointer" 
                    onClick={(e) => {
                        setShowMenu(!showMenu);
                        setShowNicknameChanger(false);
                    }}
                />
            </div>

            { showMenu === true && 
                <ul id="UserMenuOptions" className="w-1/2 p-2 border border-gray rounded-3xl cursor-pointer opacity-90 bg-white " onMouseEnter={(e) => setShowMenu(true)}>
                    
                    <li id="ChangeNickname" className="py-2 px-4 rounded-3xl hover:bg-slate-600 hover:text-white" onClick={(e) => {
                        setShowNicknameChanger(true);
                        setShowMenu(false);
                    }}>Set Nickname</li>

                    <li id="Logout" className="py-2 px-4 rounded-3xl hover:bg-slate-600 hover:text-white" onClick={(e) => logoutFlow()}>Logout</li>
                    {/* <li id="ThemeSelect" className="py-2 px-6 border border-gray rounded-3xl" onMouseEnter={(e) => setShowThemeSelect(true)}> Themes</li> */}
                </ul>
            }
            
            
            
        </div>
    ) 
}
