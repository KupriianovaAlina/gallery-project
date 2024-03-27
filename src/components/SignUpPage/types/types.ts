import {ChangeEvent} from "react";

export interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export type ErrorMessages = Record<string, string>;

export interface InputProps {
    id: string;
    name: string;
    autoComplete?: string;
    required?: boolean;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    label: string;
    type?: string;
}