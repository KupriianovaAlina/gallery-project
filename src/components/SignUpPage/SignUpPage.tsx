import React, {
  SyntheticEvent,
  useCallback,
  useState,
  useContext,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { isValidPassword } from './utils/isValidPassword';
import { isValidName } from './utils/isValidName';
import {
  ERROR_MESSAGES,
  INITIAL_FORM_DATA,
  NAVIGATION_PATH_MAIN_PAGE,
} from './constants';
import { Input } from '../shared/Input';
import { StorageContext } from '../StorageProvider';

export const SignUpPage = () => {
  const navigate = useNavigate();
  const storage: any = useContext(StorageContext);

  // Initializing form data state with an object for user inputs
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Function to handle changes in form inputs and update state accordingly
  const handleChange = useCallback((e: SyntheticEvent) => {
    const { name, value } = e.target as HTMLInputElement;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  }, []);

  // Function to validate form data and handle form submission
  const handleSubmit = useCallback(
    (e: SyntheticEvent) => {
      e.preventDefault();

      if (
        formData.email === '' ||
        formData.password === '' ||
        formData.firstName === ''
      ) {
        setError(ERROR_MESSAGES.requiredField);
      } else if (!isValidPassword(formData.password)) {
        setError(ERROR_MESSAGES.invalidPassword);
      } else if (!isValidName(formData.firstName)) {
        setError(ERROR_MESSAGES.invalidFirstName);
      } else if (formData.lastName !== '' && !isValidName(formData.lastName)) {
        setError(ERROR_MESSAGES.invalidLastName);
      } else {
        const users = storage.getUsers() ?? [];
        const existingUser = users.find(
          (user: any) => user.email === formData.email,
        );
        if (existingUser) {
          setError(ERROR_MESSAGES.userExists);
        } else {
          users.push(Object.assign(formData, { favoriteIds: [], history: [] }));
          storage.setUsers(users);
          storage.logIn(formData.email);
          setFormData(INITIAL_FORM_DATA);
          setError('');
          navigate(NAVIGATION_PATH_MAIN_PAGE);
        }
      }
    },
    [formData],
  );

  // Function to toggle the visibility of the password field
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign up
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <Input
            label="First Name"
            id="firstName"
            name="firstName"
            autoComplete="given-name"
            value={formData.firstName}
            onChange={handleChange}
          />

          <Input
            label="Last Name"
            id="lastName"
            name="lastName"
            autoComplete="family-name"
            required={false}
            value={formData.lastName}
            onChange={handleChange}
          />

          <Input
            label="Email address"
            id="email"
            name="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            type="email"
          />

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password&nbsp;<span className="text-red-500">*</span>
              </label>
              <div className="text-sm">
                <button
                  type="button"
                  className="font-semibold text-indigo-600 hover:text-indigo-500 focus:outline-none"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? 'Hide' : 'Show'} Password
                </button>
              </div>
            </div>
            <Input
              label="Password"
              id="password"
              name="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
              type={showPassword ? 'text' : 'password'}
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-teal-400 px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm hover:bg-teal-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
};
