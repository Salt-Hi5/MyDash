import { useState } from 'react';
import '../../dist/output.css';


export const SearchWidget = () => {
    const [searchQuery, setSearchQuery] = useState("")

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            window.open(`https://www.google.com/search?q=${searchQuery}`, '_blank', 'noreferrer');
        }
    };

    return (
        <input id="SearchBar" className="w-4/5 mt-20 p-2 rounded-3xl" type="text" placeholder="Search Google" 
            onChange={(event) => setSearchQuery(event.target.value)} 
            onKeyDown={handleKeyDown} 
        />
    )
}
