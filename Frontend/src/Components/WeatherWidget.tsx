import { useContext } from "react";
import { UserContext } from "./App";


export const WeatherWidget = () => {
    const { user } = useContext(UserContext);
    

    if (user.locations === undefined) return <p>Loading...</p>
    return <section>
        
        {user.locations.map(location => 
        <article key={location.name}>
            {location.name},
            {location.country},
            {location.region},
            {location.timezone},
        </article>
        
    )}
    </section>
}

