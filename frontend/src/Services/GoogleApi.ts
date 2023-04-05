import { Tokens, Threads, Thread } from "../Types/Types"

export const GetThreads = async (tokens: Tokens, email: string): Promise<Threads> => {
    let apiUrl = `https://gmail.googleapis.com/gmail/v1/users/${email}/threads?maxResults=10`;

    const threadsResponse = await fetch(apiUrl, {
        headers: {
            Authorization: `Bearer ${tokens.access_token}`
        },
    });

    const response = await threadsResponse.json();

    return response as Threads;
}

export const GetThreadMessages = async (tokens: Tokens, threadId: string, email: string): Promise<Thread> => {
    const apiUrl = `https://gmail.googleapis.com/gmail/v1/users/${email}/threads/${threadId}?format=full`;
    const threadResponse = await fetch(apiUrl, {
        headers: {
            Authorization: `Bearer ${tokens.access_token}`
        },
    }).then(response => response.json())

    return threadResponse;
}

export const GetMessage = async (tokens: Tokens, messageId: string, email: string) => {
    const apiUrl = `https://gmail.googleapis.com/gmail/v1/users/${email}/messages/${messageId}?format=full`;
    const messageResponse = await fetch(apiUrl, {
        headers: {
            Authorization: `Bearer ${tokens.access_token}`
        },
    }).then(response => response.json())

    return messageResponse;
}

export const GetCalendarEvents = async (tokens: Tokens, email: string) => {
    const date = (new Date()).toISOString();

    const apiUrl = `https://www.googleapis.com/calendar/v3/calendars/${email}/events?singleEvents=true&orderBy=startTime&maxResults=5&timeMin=${date}`; // /${email}/threads?maxResults=5
    
    const calendarsResponse = await fetch(apiUrl, {
        headers: {
            Authorization: `Bearer ${tokens.access_token}`
        },
    }).then(response => response.json())

    return calendarsResponse;
}

export const GetDriveFiles = async (tokens: Tokens) => {

    const apiUrl = `https://www.googleapis.com/drive/v3/files?pageSize=10`;
    
    const driveResponse = await fetch(apiUrl, {
        headers: {
            Authorization: `Bearer ${tokens.access_token}`
        },
    }).then(response => response.json())

    return driveResponse;
}
