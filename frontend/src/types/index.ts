export interface UserModel {
    token: string;
    name: string;
}

export interface RegistrationModel {
    name: string;
    password: string;
    email: string;
}

export interface UserInfoModel {
    name: string;
    email: string;
    Role: string;
}

export interface Error {
    [key: string]: string[];
}
export interface ProblemDetails {
    Type: string;
    Title: string;
    Status: Number | null;
    Detail: string;
    Instance: string;
    Errors: Error;
}