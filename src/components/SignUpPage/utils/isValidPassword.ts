import {PASSWORD_REGEX} from "../constants";

export const isValidPassword = (password: string) => {
    return PASSWORD_REGEX.test(password);
};