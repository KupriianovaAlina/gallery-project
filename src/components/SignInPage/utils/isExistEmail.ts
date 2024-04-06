import {User} from "../types/types";

export const isExistEmail = (email: string) => {
    const usersData = JSON.parse(localStorage.getItem('users') || '[]');
    return  usersData.find((user: User) => user.email === email);
}
