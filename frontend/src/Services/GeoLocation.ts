import { GeoLocationResponse } from "../Types/Types";


export const getIP = async (): Promise<string> => {

    const response = await fetch("https://geolocation-db.com/json/")
        .catch(err => console.log(err));

    if (response?.status === 200) {
        var geoLocationResponse = await response.json() as GeoLocationResponse;
        return geoLocationResponse.IPv4;
    }
    return "";
}
