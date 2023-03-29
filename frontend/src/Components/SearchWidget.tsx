import { useState } from 'react';



export const SearchWidget = () => {
    const [searchQuery, setSearchQuery] = useState("")

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            window.open(`https://www.google.com/search?q=${searchQuery}`, '_blank', 'noreferrer');
        }
    };

    return (
        <input id="SearchBar" className="opacity-90 w-4/5 mt-20 py-2 px-6 rounded-3xl" type="text" placeholder="Search Google" autoFocus autoComplete="off"
            onChange={(event) => setSearchQuery(event.target.value)}
            onKeyDown={handleKeyDown}
        />
    )
}
