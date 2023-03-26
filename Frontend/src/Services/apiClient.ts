import { User, WeatherResponse } from "../Types/Types";
import { getIP } from "./GeoLocation";
var apiUrl = "https://mydashapi.azurewebsites.net/api";
const apiTestUrl = "https://localhost:7038/api";
//apiUrl = apiTestUrl;

export const getUser = async (credential: string): Promise<User> =>  {

    const response = await fetch(`${apiUrl}/User`, {
        method: "POST",
        headers: {
            "Credential": credential,
            "IpAddress": await getIP()
        }
    });

    if (response.status !== 200) {
        console.log(`Error: ${response.status}: ${response.statusText}.`)
        return {} as User;
    }

    return await response.json() as User;
}

export const getWeather = async (userHash: string): Promise<WeatherResponse> => {
    //userHash = "EA29820A2615C95344376BE7D6A0FBDC1AE2922766DCF15AAA7E009AD28B0620";
    const response = await fetch(`${apiUrl}/Weather/${userHash}`);

    if (response.status !== 200) {
        console.log(`Error: ${response.status}: ${response.statusText}.`)
        return {} as WeatherResponse;
    }

    return await response.json() as WeatherResponse;
}


// export const getUsers = async (): Promise<User[]> => {

//     const response = await fetch(apiUrl + "/User")
//          .catch(err => console.log(err));

//     if (response?.status === 200) {
//         return await response.json() as User[];
//     }
//     return [];
// }