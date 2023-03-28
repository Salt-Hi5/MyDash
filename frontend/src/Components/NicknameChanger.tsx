import React from 'react';
import { useContext, useState } from 'react';
import { patchNickname } from '../Services/ApiClient';
import { UserContext } from '../Services/UserContext';

interface NicknameChangerProps {
    setShowNicknameChanger: React.Dispatch<React.SetStateAction<boolean>>
}

export const NicknameChanger = (props: NicknameChangerProps) => {
    const { user, setNickname } = useContext(UserContext);
    const [ newNickname, setNewNickname ] = useState("");

    const handleKeyDown = async (event: React.KeyboardEvent) => {
        if (event.key === 'Escape') {
            setNewNickname("");
            props.setShowNicknameChanger(false);
        }
        if (event.key === 'Enter') {
            if (newNickname === "") {
                props.setShowNicknameChanger(false);
                return;
            }

            const responseCode = await patchNickname(user.userIdHash, newNickname);
            if (responseCode !== 204) {
                console.log("Server response code: " + responseCode)
                setNickname(user.nickname)
                return;
            }

            setNickname(newNickname);
            user.nickname = newNickname;
            setNewNickname("");
            props.setShowNicknameChanger(false);
        }
    };

    return (
        <input id="NicknameChanger" value={newNickname} type="text" placeholder="Change Nickname" autoFocus
            className="opacity-90 w-full h-10 my-auto py-2 px-6 rounded-3xl" 
            onChange={(event) => setNewNickname(event.target.value)} 
            onKeyDown={handleKeyDown} 
        />
    )
}
