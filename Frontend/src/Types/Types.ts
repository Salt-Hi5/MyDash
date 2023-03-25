
export type User = {
    emailHash: string,
    locations: UserLocation[],
    nickname: string,
    theme: string
}

export type UserLocation = {
    name: string,
    region: string,
    country: string,
    timezone: string,
    url: string
}