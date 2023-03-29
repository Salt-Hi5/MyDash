import { User, UserLocation, WeatherResponse } from "../Types/Types";
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

    const response = await fetch(`${apiUrl}/Weather/${userHash}`);

    if (response.status !== 200) {
        console.log(`Error: ${response.status}: ${response.statusText}.`)
        return {} as WeatherResponse;
    }

    return await response.json() as WeatherResponse;
}

export const patchLocations = async (userHash: string, locationUrls: string[]): Promise<number> => {
    const requestBody = JSON.stringify(locationUrls); // Sends in the locationurls to the request. The locationUrls are the path to a specific location, e.g "london-GreatBritain-[...]"

    const response = await fetch(`${apiUrl}/User/${userHash}/locations`, {
        method: "PATCH",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: requestBody
    });

    return response.status;
}

export const patchNickname = async (userHash: string, nickname: string): Promise<number> => {
    const requestBody = JSON.stringify(nickname);

    const response = await fetch(`${apiUrl}/User/${userHash}/nickname`, {
        method: "PATCH",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: requestBody
    });

    return response.status;
}

export const getWeatherLocations = async (searchTerm: string): Promise<UserLocation[]> => {

    const response = await fetch(`${apiUrl}/Weather/location/${searchTerm}`)
    return await response.json() as UserLocation[];
}
