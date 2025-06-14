type Authorities = "ROLE_DEFAULT_USER" | "ROLE_ADMIN_USER";

export type User = {       
    id: string;
    username: string;
    email: string;
    authorities: Authorities[];
    token: string,
    expirationTime: number
};