
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

export type Thread = { // A single email thread, i.e multiple people that have responded back and forth. 
    messages: Message[]
}

export type Message = {  // An email in each part of the thread 
    id: string,
    payload: MessagePart
}

export type MessagePart = { // At the time of writing, this just takes out the actual body/content of the email. 
    body: MessagePartBody
}

export type MessagePartBody = {
    data: string
}


export type EmailObject = {
    date: DateTime
    subject: string // 
    sender: string 
    emailURL: string // The link to the email. 
    content: string // 🔥🔥🔥 IDEALY: Include this (although we cant access it at this point)
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




/*
access_token
: 
"ya29.a0Ael9sCPWyvq05GuXW3mcrzv6vTKqQcK8EhyDPWtMgVZFHkwz84vMRPGdroXqk0o8CvVs1i3MIF-COQojTwtgvOc32pj1or9bvQMa3c2hpKiWf1iXVaW9_JB7BqQ_RZfnoAwrvR3QgyabcB_hMZeG1MfVzyttaCgYKATUSARISFQF4udJhLs2vzG-xRnlu2RgEkgj6nQ0163"
expiry_date
: 
1680348402228
id_token
: 
"eyJhbGciOiJSUzI1NiIsImtpZCI6ImFjZGEzNjBmYjM2Y2QxNWZmODNhZjgzZTE3M2Y0N2ZmYzM2ZDExMWMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiIxMzQwODE5MTYxNjEtbDd0cHY0Nmg2dmJhZ2ljcWhvNDdvMWw2a3MyMjByNGcuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiIxMzQwODE5MTYxNjEtbDd0cHY0Nmg2dmJhZ2ljcWhvNDdvMWw2a3MyMjByNGcuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDcwNjU2MTE4MDY2MDIzNTE0NzkiLCJlbWFpbCI6ImpvaG4uZXYuZm9yc2dyZW5AZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF0X2hhc2giOiJnWnIxVWF4SXd4SC1LS1dnbWJaWEV3IiwibmFtZSI6IkpvaG4gRm9yc2dyZW4iLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUdObXl4YnVlaERGaXM3RGVXSi1zaGY5UDRzS1BnS0lkN2prYXVMcTFfTEI9czk2LWMiLCJnaXZlbl9uYW1lIjoiSm9obiIsImZhbWlseV9uYW1lIjoiRm9yc2dyZW4iLCJsb2NhbGUiOiJlbi1HQiIsImlhdCI6MTY4MDM0NDgwMSwiZXhwIjoxNjgwMzQ4NDAxfQ.mWEgfKseSzVKG32-sCFjv2_GlIxC77XhrjeXODdNtnN6BUzXucv-ZuHGTnO1ZxF0D9jXY37-HjFQz8jOYZlotHU72Yg-VX5bCHDXkeW-MgyCmeGlXBbsZi9RnEfquGuhFRaLK0oTZt06tKMGbXGEwuUr7r7ktEGpqD8vDAGbO3Qk0fbtWm82B1Idxwp9_EMsdqk6gYhyXGxD3ftb3gtT9uweoZIbyMPLdNWSEhjYE-1HHLfD9yYclWhqxHEKpJ74x9cbnDUah_lJox6bMmkiOtqBCghZi3U9OHlhh-_96jkPpmWmx84Ri0Gsot21FC_Xlz-FLNiEPhrhbhF9xRW4CQ"
refresh_token
: 
"1//0cb-vFsI4PBrtCgYIARAAGAwSNwF-L9Ir7gKLGRN_D2HL9eEdfkhDQRrY0DM3TQrrMmw3zvPknN693eHZifr9FyImFE2LYg3Sm9Y"
scope
: 
"https://www.googleapis.com/auth/userinfo.email openid https://www.googleapis.com/auth/userinfo.profile"
token_type
: 
"Bearer"
*/

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

