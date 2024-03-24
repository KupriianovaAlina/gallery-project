import {useState} from "react";
import {useNavigate} from "react-router-dom";

const SignupPage = () => {
    const navigate = useNavigate();
    // Initializing form data state with an object for user inputs
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    // Function to handle changes in form inputs and update state accordingly
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    // Function to validate form data and handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData.email === '' || formData.password === '' || formData.firstName === '') {
            setError('Please fill in all fields');
        } else if (!isValidPassword(formData.password)) {
            setError('Password should contain from 5 to 25 characters, 1 digit, 1 uppercase letter, 1 lowercase letter, and 1 punctuation mark.');
        } else if (!isValidName(formData.firstName)) {
            setError('First name should contain only letters and be 3 to 25 characters long');
        } else if (formData.lastName !== '' && !isValidName(formData.lastName)) {
            setError('Last name should contain only letters and be 3 to 25 characters long');
        } else {
            localStorage.setItem('user', JSON.stringify(formData));
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                password: ''
            });
            setError('');
            navigate('/');
        }
    }

    // Function to validate password against a regular expression
    const isValidPassword = (password) => {
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{5,25}$/;
        return passwordRegex.test(password);
    };

    // Function to validate name against a regular expression
    const isValidName = (name) => {
        const nameRegex = /^[A-Za-z]{3,25}$/;
        return nameRegex.test(name);
    };

    // Function to toggle the visibility of the password field
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const renderInput = ({id, name, autoComplete, required = true}) => (
        <div className="mt-2">
            <input
                id={id}
                name={name}
                type="text"
                autoComplete={autoComplete}
                required={required}
                value={formData[name]}
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
        </div>
    );

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Sign up
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="firstName" className="block text-sm font-medium leading-6 text-gray-900">
                            First Name&nbsp;<span className="text-red-500">*</span>
                        </label>
                        {renderInput({
                            id: 'firstName',
                            name: 'firstName',
                            autoComplete: 'given-name',
                            placeholder: 'First Name'
                        })}
                    </div>

                    <div>
                        <label htmlFor="lastName" className="block text-sm font-medium leading-6 text-gray-900">
                            Last Name
                        </label>
                        <div className="mt-2">
                            {renderInput({
                                id: 'lastName',
                                name: 'lastName',
                                autoComplete: 'family-name',
                                placeholder: 'Last Name',
                                required: false // Явно указываем, что поле не является обязательным
                            })}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                            Email address&nbsp;<span className="text-red-500">*</span>
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="block w-full rounded-md border-0 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
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
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                autoComplete="current-password"
                                onChange={handleChange}
                                value={formData.password}
                                required
                                className="block w-full rounded-md border-0 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-teal-400 px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm hover:bg-teal-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Sign up
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignupPage;