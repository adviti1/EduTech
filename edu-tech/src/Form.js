import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, db, provider, signInWithPopup, signOut } from './firebase';
import { setDoc, doc } from "firebase/firestore";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { getFunctions, httpsCallable } from "firebase/functions";
import logo from './assets/edu-tech-high-resolution-logo-black-transparent.png';
import './Form.css';
import { analytics } from './firebase';
import { logEvent } from "firebase/analytics";

export default function Form() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [account, setAccount] = useState('login');
  const [user, setUser] = useState(null);
  const [discount, setDiscount] = useState(0);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      if (userCredential.user) {
        await setDoc(doc(db, "Users", userCredential.user.uid), {
          email: userCredential.user.email
        });
        logEvent(analytics, 'sign_up', { method: 'email' });
      }
      console.log("User registered successfully");
      toast.success("User Registered successfully", {
        position: "top-center",
      });
      navigate('/button');
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
      logEvent(analytics, 'login', { method: 'email' });
      console.log("User signed in successfully");
      toast.success("User signed in successfully", {
        position: "top-center",
      });
      navigate('/button');
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
      logEvent(analytics, 'logout');
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

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      setUser(user);
      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email
        });
        logEvent(analytics, 'login', { method: 'google' });
      }
      console.log("User signed in with Google successfully");
      toast.success("User signed in with Google successfully", {
        position: "top-center",
      });
      navigate('/button');
    } catch (error) {
      console.error("Error signing in with Google: ", error.message);
      toast.error(error.message, {
        position: "bottom-center",
      });
    }
  };

  const handleCouponValidation = async () => {
    const functions = getFunctions();
    const validateCoupon = httpsCallable(functions, 'validateCoupon');
    try {
      const result = await validateCoupon({ couponCode });
      const { valid, discount } = result.data;
      if (valid) {
        setDiscount(discount);
        toast.success(`Coupon applied! Discount: ${discount}`, {
          position: "top-center",
        });
      } else {
        toast.error('Invalid coupon code', {
          position: "bottom-center",
        });
      }
    } catch (error) {
      console.error("Error validating coupon: ", error.message);
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
                <label htmlFor="couponCode" className="block text-sm font-medium leading-6 text-gray-900">
                  Coupon Code
                </label>
                <div className="mt-2">
                  <input
                    id="couponCode"
                    name="couponCode"
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleCouponValidation}
                  className="mt-2 flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                >
                  Apply Coupon
                </button>
                {discount > 0 && (
                  <p className="mt-2 text-center text-sm text-green-600">
                    Discount Applied: {discount}
                  </p>
                )}
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
                  Don't have an account?{' '}
                  <button
                    onClick={() => setAccount('signup')}
                    className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                  >
                    Sign Up
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{' '}
                  <button
                    onClick={() => setAccount('login')}
                    className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                  >
                    Log In
                  </button>
                </>
              )}
            </p>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <button
                onClick={handleGoogleSignIn}
                className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Sign In with Google
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
