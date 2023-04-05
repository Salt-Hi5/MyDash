
import { StringUnitLength } from "luxon"
import { DateTime } from "luxon"


export type User = {
    userIdHash: string,
    locations: UserLocation[],
    nickname: string,
    theme: string,
    picture: string,
    email: string
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


export type Tokens = {
    access_token: string,
    expiry_date: Date,
    id_token: string,
    refrest_token: string,
}



export type Threads = {
    threads: [{
        id: string,
        snippet: string,
        historyId: string
    }],
    nextPageToken: string,
    resultSizeEstimate: number
    
}

export type Thread = { 
    messages: Message[]
}

export type Message = {  
    id: string,
    payload: MessagePart
}

export type MessagePart = { 
    body: MessagePartBody
}

export type MessagePartBody = {
    data: string
}


export type EmailObject = {
    date: DateTime
    subject: string 
    sender: string 
    emailURL: string 
    content: string 
    recipient: string
    snippet: string

}

export type Header = {
    name: string,
    value: string
}

export type CalendarObject = {
    summary: string, 
    description: string,
    start: TimeAndTimeZone, 
    htmlLink : string,
    end: TimeAndTimeZone,
    location: string,
    hangoutLink: string
}

export type TimeAndTimeZone = {
    dateTime: DateTime, 
    timeZone: string, 
}

export type Events = {
    items: string
}

export type File = {

}

export type FileItem = {
    mimeType: string, 
    id: string, 
    name: string
}

