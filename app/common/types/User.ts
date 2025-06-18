type Authorities = "ROLE_DEFAULT_USER" | "ROLE_ADMIN_USER";

export type LoginUser = {       
    id: string;
    username: string;
    email: string;
    authorities: Authorities[];
    token: string,
    expirationTime: number
};

export type User = {       
    fullName: string;
    email: string;
    id: string;
    authorities: Authorities[];
    enabled: boolean,
    credentialsNonExpired: boolean,
    accountNonExpired: boolean,
    accountNonLocked: boolean
};