import {NAME_REGEX} from "../constants";

export const isValidName = (name: string) => {
    return NAME_REGEX.test(name);
};