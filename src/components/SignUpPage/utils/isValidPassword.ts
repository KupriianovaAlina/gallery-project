import {passwordRegex} from "../constants";

export const isValidPassword = (password: string) => {
    return passwordRegex.test(password);
};