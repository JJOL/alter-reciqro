export interface LoginSession {
    isUserLogged: boolean

    userLoggedId: string
    userLoggedTime: Date
    userLoggedRole: string
    userLoggedToken: string
}
