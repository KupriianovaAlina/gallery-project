import {nameRegex} from "../constants";

export const isValidName = (name: string) => {
    return nameRegex.test(name);
};