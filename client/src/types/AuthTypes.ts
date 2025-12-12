export interface RegisterData {
    name: string,
    username:string,
    email:string,
    password : string
}

export interface LoginData {
    email : string,
    password : string
}

export interface User {
    id : string,
    name : string,
    username : string,
    password : string
}

export interface AuthResponse {
    success : boolean,
    message : string,
    user : User
}

export interface ChangeEmailData {
    newEmail : string,
    password : string
}

export interface ChangePasswordData {
    currentPasssword : string,
    newPassword : string
}
