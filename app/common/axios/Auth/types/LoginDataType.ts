
export interface LoginDataType {
    "status": string,
    "message": string,
    "data": {
        "id": string,
        "username": string,
        "email": string,
        "authorities": string[],
        "token": string,
        "expirationTime": number
    }
}