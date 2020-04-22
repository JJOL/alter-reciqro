/* In this case we are disabling camelcase to agree with firebase recommended naming convention.*/
/* eslint-disable camelcase */
export interface Roles{
    admin?: boolean;
    user?: boolean;
    staff?: boolean;
}


export interface User {
    alias: string;
    delegation_id: string;
    points: number;
    roles: [string];
}