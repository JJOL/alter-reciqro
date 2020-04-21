export interface Roles{
    admin?: boolean;
    user?: boolean;
    staff?: boolean;
}


export interface User {
    alias: string;
    delegation_id: string;
    points: number;
    roles: Roles;
}