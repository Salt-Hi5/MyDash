import { useContext, useState } from 'react';
import { UserContext } from '../Services/UserContext';



export const SearchWidget = () => {
    const { setSearchQuery, setActiveDetailView } = useContext(UserContext);
    const [ searchText, setSearchText ] = useState("");

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            window.open(`https://www.google.com/search?q=${searchText}`, '_blank', 'noreferrer');
        }
    };

    return (
        <input id="SearchBar" className="opacity-90 w-4/5 mt-6 py-2 px-6 rounded-3xl" type="text" placeholder="Search Google" autoFocus autoComplete="off"
            onChange={(event) => setSearchText(event.target.value)}
            onKeyDown={handleKeyDown}
        />
    )
}
