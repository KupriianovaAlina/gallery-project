export type FormData = {
    email: string;
    password: string;
}

export type ErrorMessages = Record<string, string>;

export interface User {
    email: string;
    password: string;
}
