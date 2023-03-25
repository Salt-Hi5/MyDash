import { User } from "../Types/Types";

export const getUsers = async (): Promise<User[]> => {
    const response = await fetch("https://mydashapi.azurewebsites.net/api/User").catch(err => console.log(err));
    if (response?.status === 200) {
        return await response.json() as User[];
    }
    return [];
}