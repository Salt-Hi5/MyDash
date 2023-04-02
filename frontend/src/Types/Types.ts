import { DateTime } from "luxon"

export type User = {
    userIdHash: string,
    locations: UserLocation[],
    nickname: string,
    theme: string,
    picture: string
}

export type UserLocation = {
    name: string,
    region: string,
    country: string,
    timezone: string,
    url: string
}

export type Weather = {
    url: string,
    timezone: string,
    currentWeather: {
        temp_c: number,
        is_day: number,
        condition: {
            text: string,
            icon: string
        },
        wind_kph: number,
        pressure_mb: number,
        precip_mm: number,
        feelslike_c: number,
        vis_km: number,
        uv: number
    }
}

export type WeatherResponse = {
    weatherArray: Weather[]
}

export type GeoLocationResponse = {
    IPv4: string
}

export type EmailItem = {
    subject: string,
    from: string,
    to: string,
    received: string,
    body: string
}

export type CalendarItem = {
    name: string,
    startTime: DateTime,
    endTime: DateTime,
    location: string,
    details: string,
    link: string
}

export type FileItem = {
    name: string,
    image: string,
    link: string
}