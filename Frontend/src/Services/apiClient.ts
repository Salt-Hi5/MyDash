import { User, WeatherResponse } from "../Types/Types";
import { getIP } from "./GeoLocation";
const apiUrl = "https://mydashapi.azurewebsites.net/api";

export const getUser = async (credential: string): Promise<User> =>  {

    // We have to send the user credentials via HTTPS POST instead of GET in order to keep it encrypted in transit
    const request = new XMLHttpRequest();
    request.open("POST", `${apiUrl}/User/${credential}`)
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    request.setRequestHeader("Credential", credential);
    request.setRequestHeader("IP", await getIP());
    request.onload = async () => {
        if (request.response.status === 200) {
            return await request.response.json() as User;
        }
        console.log(`Response code ${request.response.status} received for the HTTPS POST request.`)
    };
    request.send(`${credential}`);
    
    return {} as User;
}

// export const getUsers = async (): Promise<User[]> => {

//     const response = await fetch(apiUrl + "/User")
//          .catch(err => console.log(err));

//     if (response?.status === 200) {
//         return await response.json() as User[];
//     }
//     return [];
// }

export const getWeather = async (userHash: string): Promise<WeatherResponse> => {

    const response = await fetch(`${apiUrl}Weather/${userHash}`)
        .catch(err => console.log(err)); 

    if (response?.status === 200) {
        return await response.json() as WeatherResponse;
    }
    return {} as WeatherResponse;
}
