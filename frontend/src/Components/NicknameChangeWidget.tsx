import { useContext, useState } from 'react';
import { patchNickname } from '../Services/ApiClient';
import { UserContext } from '../Services/UserContext';



export const NicknameChangeWidget = () => {
    const { user, setNickname } = useContext(UserContext);
    const [ newNickname, setNewNickname ] = useState("");

    const handleKeyDown = async (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            const responseCode = await patchNickname(user.userIdHash, newNickname);

            if (responseCode !== 204) {
                console.log("Server response code: " + responseCode)
                setNickname(user.nickname)
                return;
            }

            setNickname(newNickname);
            user.nickname = newNickname;
            setNewNickname("");
        }
    };

    return (
        <input id="NicknameChangeBar" value={newNickname} className="w-full p-2 border border-gray rounded-3xl" type="text" placeholder="Change Nickname" 
            onChange={(event) => setNewNickname(event.target.value)} 
            onKeyDown={handleKeyDown} 
        />
    )
}
