type Authorities = "ROLE_DEFAULT_USER" | "ROLE_ADMIN_USER";

export type LoginUser = {       
    id: string;
    username: string;
    email: string;
    authorities: Authorities[];
    token: string,
    expirationTime: number
    // just to solve back-end returning
    // user and not loginuser sometimes
    authoritiesList?: Authorities[];
    fullName?: string;
};

export type User = {       
    fullName: string;
    email: string;
    id: string;
    profilePhoto?: string;
    enrollment: string;
    authoritiesList: Authorities[];
    enabled: boolean,
    credentialsNonExpired: boolean,
    accountNonExpired: boolean,
    accountNonLocked: boolean
};