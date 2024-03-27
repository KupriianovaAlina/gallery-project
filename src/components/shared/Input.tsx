import React from "react";
import {InputProps} from "../SignUpPage/types/types";

export const Input: React.FC<InputProps> = ({id, name, autoComplete, required = true, value, onChange, label, type = "text"}) => (
    <div>
        {id !== "password" && (
            <label htmlFor={id} className="block text-sm font-medium leading-6 text-gray-900">
                {label} {required && <span className="text-red-500">*</span>}
            </label>)
        }

        <div className="mt-2">
            <input
                id={id}
                name={name}
                type={type}
                autoComplete={autoComplete}
                required={required}
                value={value}
                onChange={onChange}
                className="block w-full rounded-md border-0 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
        </div>
    </div>
)