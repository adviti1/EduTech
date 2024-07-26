import React, { useState } from 'react';
import { API } from './services/api';
import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles'; // Added import for styled

const signupInitialValues = {
    email: '',
    password: '',
    name: '' // Added 'name' to the initial signup values
};

const loginInitialValues = {
    email: '',
    password: ''
};

const Error = styled(Typography)`
   font-size: 10px;
   color: red;
   line-height: 0;
   margin-top: 10px;
   font-weight: 500;
`;

const Login = () => {
    const [account, toggleAccount] = useState('login');

    const toggleSignup = () => {
        account === 'signup' ? toggleAccount('login') : toggleAccount('signup');
    };

    const [signup, setSignup] = useState(signupInitialValues);
    const [login, setLogin] = useState(loginInitialValues);
    const [error, setError] = useState(''); // Fixed typo from usestate to useState

    const onInputChange = (e) => {
        setSignup({ ...signup, [e.target.name]: e.target.value });
    };
    const onValueChange = (e) => {
        setChange({ ...login, [e.target.name]: e.target.value });

    };
    const loginUser = () => {

    }

    const signupUser = async () => {
        try {
            const response = await API.userSignup(signup);
            if (response.isSuccess) {
                setError('');
                setSignup(signupInitialValues);
                toggleAccount('login');
            } else {
                setError(response.message || 'Something went wrong! Please try again later');
            }
        } catch (error) {
            setError('Network error or server issue.');
        }
    };

    return (
        <Form onInputChange={onInputChange} signupUser={signupUser} account={account} toggleSignup={toggleSignup} error={error} />
    );
};

const Form = ({ onInputChange, signupUser, account, toggleSignup, error }) => { // Added error as a prop
    const handleFormSubmit = (e) => {
        e.preventDefault();
        signupUser();
    };
    return (
        <div>
            {
                account === 'login' ?
                    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                            <img className="mx-auto h-10 w-auto" src="travel.png" alt="Your Company" />
                            <h1 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Travelera</h1>
                            <h3 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                                Login to your account
                            </h3>
                        </div>

                        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                            <form className="space-y-6" onSubmit={handleFormSubmit} method="POST">
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                        Email address
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            onChange={onValueChange}
                                            id="email"
                                            name="email"
                                            type="email"
                                            autoComplete="email"
                                            required
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center justify-between">
                                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                            Password
                                        </label>
                                        <div className="text-sm">
                                            <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                                Forgot password?
                                            </a>
                                        </div>
                                    </div>
                                    <div className="mt-2">
                                        <input
                                            onChange={onValueChange}
                                            id="password"
                                            name="password"
                                            type="password"
                                            autoComplete="current-password"
                                            required
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                                {error && <Error>{error}</Error>}
                                <div>
                                    <button
                                        type="submit"
                                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        Sign in
                                    </button>
                                </div>
                            </form>

                            <p className="mt-10 text-center text-sm text-gray-500">
                                Not a member?
                                <a onClick={toggleSignup} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                                    Sign up
                                </a>
                            </p>
                        </div>
                    </div>
                    :
                    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                            <img className="mx-auto h-10 w-auto" src="travel.png" alt="Your Company" />
                            <h1 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Travelera</h1>
                            <h3 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                                Sign up
                            </h3>
                        </div>
                        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                            <form className="space-y-6" onSubmit={handleFormSubmit} method="POST">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                                        Full name
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            onChange={onInputChange}
                                            id="name"
                                            name="name"
                                            type="text"
                                            autoComplete="name"
                                            required
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                        Email address
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            onChange={onInputChange}
                                            id="email"
                                            name="email"
                                            type="email"
                                            autoComplete="email"
                                            required
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center justify-between">
                                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                            Password
                                        </label>
                                        <div className="text-sm">
                                            <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                                Forgot password?
                                            </a>
                                        </div>
                                    </div>
                                    <div className="mt-2">
                                        <input
                                            onChange={onInputChange}
                                            id="password"
                                            name="password"
                                            type="password"
                                            autoComplete="current-password"
                                            required
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                                {error && <Error>{error}</Error>}

                                <div>
                                    <button
                                        type="submit"
                                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        Sign up
                                    </button>
                                </div>
                            </form>

                            <p className="mt-10 text-center text-sm text-gray-500">
                                Already a member?
                                <a onClick={toggleSignup} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                                    Already have an account?
                                </a>
                            </p>
                        </div>
                    </div>
            }
        </div>
    );
};

export default Login;
