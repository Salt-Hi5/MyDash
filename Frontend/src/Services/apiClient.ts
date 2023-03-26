import { User, Weather } from "../Types/Types";

export const getUsers = async (): Promise<User[]> => {
    const response = await fetch("https://mydashapi.azurewebsites.net/api/User").catch(err => console.log(err));
    if (response?.status === 200) {
        return await response.json() as User[];
    }
    return [];
}

export const getWeather = async (): Promise<Weather[]> => {
    const response = await fetch("").catch(err => console.log(err));
    if (response?.status === 200) {
        return await response.json() as Weather[];
    }
    return [];
}

