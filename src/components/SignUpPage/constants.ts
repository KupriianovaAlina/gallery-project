import {ErrorMessages, FormData} from './types/types';
export const initialFormData: FormData = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
};
export const passwordRegex: RegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{5,25}$/;
export const nameRegex: RegExp = /^[A-Za-z]{3,25}$/;

export const errorMessages: ErrorMessages = {
    requiredField: 'Please fill in all fields',
    invalidPassword: 'Password should contain from 5 to 25 characters, 1 digit, 1 uppercase letter, 1 lowercase letter, and 1 punctuation mark.',
    invalidFirstName: 'First name should contain only letters and be 3 to 25 characters long',
    invalidLastName: 'Last name should contain only letters and be 3 to 25 characters long',
    userExists: 'A user with this email address already exists'
};

export const NAVIGATION_PATH_MAIN_PAGE = '/';