import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { auth, db } from './firebase';
import { setDoc, doc } from "firebase/firestore";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import logo from './assets/edu-tech-high-resolution-logo-black-transparent.png';
import './Form.css';

export default function Form() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [account, setAccount] = useState('login');
  const [user, setUser] = useState(null);

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      if (userCredential.user) {
        await setDoc(doc(db, "Users", userCredential.user.uid), {
          email: userCredential.user.email
        });
      }
      console.log("User registered successfully");
      toast.success("User Registered successfully", {
        position: "top-center",
      });
    } catch (error) {
      console.error("Error signing up: ", error.message);
      toast.error(error.message, {
        position: "bottom-center",
      });
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      console.log("User signed in successfully");
      toast.success("User signed in successfully", {
        position: "top-center",
      });
    } catch (error) {
      console.error("Error signing in: ", error.message);
      toast.error(error.message, {
        position: "bottom-center",
      });
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
      console.log("User signed out successfully");
      toast.success("User signed out successfully", {
        position: "top-center",
      });
    } catch (error) {
      console.error("Error signing out: ", error.message);
      toast.error(error.message, {
        position: "bottom-center",
      });
    }
  };

  return (
    <div className="back">
      <ToastContainer />
      {user ? (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <Link to="/">
              <img
                alt="Your Company"
                src={logo}
                className="mx-auto h-10 w-auto"
              />
            </Link>
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Welcome, {user.email}
            </h2>
            <button
              onClick={handleSignOut}
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign Out
            </button>
          </div>
        </div>
      ) : (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <Link to="/">
              <img
                alt="Your Company"
                src={logo}
                className="mx-auto h-10 w-auto"
              />
            </Link>
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              {account === 'login' ? 'Log In' : 'Sign Up'}
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={account === 'login' ? handleSignIn : handleSignUp}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    id="password"
                    name="password"
                    type="password"
                    required
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  {account === 'login' ? 'Log In' : 'Sign Up'}
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              {account === 'login' ? (
                <>
                  Not a member?{' '}
                  <a href="#" onClick={() => setAccount('signup')} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                    Register
                  </a>
                </>
              ) : (
                <>
                  Already a member?{' '}
                  <a href="#" onClick={() => setAccount('login')} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                    Log In
                  </a>
                </>
              )}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
