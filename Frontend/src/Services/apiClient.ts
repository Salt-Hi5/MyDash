import { User, Weather, WeatherResponse } from "../Types/Types";

export const getUsers = async (): Promise<User[]> => {
    const response = await fetch("https://mydashapi.azurewebsites.net/api/User").catch(err => console.log(err));
    if (response?.status === 200) {
        return await response.json() as User[];
    }
    return [];
}

export const getWeather = async (userHash: string): Promise<WeatherResponse> => {
    const response = await fetch(`https://mydashapi.azurewebsites.net/api/Weather/${userHash}`).catch(err => console.log(err)); 
    if (response?.status === 200) {
        return await response.json() as WeatherResponse;
    }
    return {} as WeatherResponse;
}

