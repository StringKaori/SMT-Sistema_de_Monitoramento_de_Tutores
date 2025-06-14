type Authorities = "ROLE_DEFAULT_USER" | "ROLE_ADMIN_USER";

export type User = {
    fullName: string;
    email: string;
    id: string;
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
    authoritiesList: Authorities[];
    accountNonLocked: boolean;
    enabled: boolean;
    credentialsNonExpired: boolean;
    accountNonExpired: boolean;
};