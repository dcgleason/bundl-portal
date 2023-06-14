import React, { useState } from 'react';
import Image from 'next/image';
import logo from "../images/bundlelogowhite.png"

function SignUpPage() {

const [username, setUsername] = useState("");
const [password, setPassword] = useState("");
const [firstName, setFirstName] = useState("");
const [lastName, setLastName] = useState("");



const onSubmit = async e => {
  e.preventDefault();

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ 
      username: username,
      password: password,
      firstName: firstName,
      lastName: lastName
  });

  try {
    console.log("body: ", body);
    // Use fetch to send a POST request to the /signup route
    const res = await fetch(
      'https://yay-api.herokuapp.com/login/signup',
      {
        method: 'POST',
        body: body,
        headers: config.headers,
      }
    );

    const data = await res.json();
    console.log(data);
    console.log("success res:" + res.status);

    // If the signup was successful, redirect to the next page
  // After successful login
if (res.status === 200) {
  // Assuming the response data contains the user's ID
  const userID = data.userId;
  // Store the user's ID in local storage so it can be accessed in other components
  localStorage.setItem('userID', userID);
  // Redirect to the dashboard page
  window.location.href = `https://www.usebundl.com/`;
}
  } catch (err) {
    console.error(err);
  }
};

  return (
    <>
    {/*
      This example requires updating your template:

      ```
      <html class="h-full bg-gray-50">
      <body class="h-full">
      ```
    */}
    <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Image
           className='mx-auto w-auto'
          src={logo}
          height = {100}
          width = {100}
          alt="Your Company"
        />
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Sign up for your account</h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" >
      <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
        <div className="space-y-6 sm:space-y-5">
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900">Registration</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Tell us a bit about you.
            </p>
          </div>

        </div>

        <div>
              <label className="block text-sm font-medium text-gray-700">
                First name
              </label>
              <div className="mt-1">
                <input
                  id="firstname"
                  name="firstname"
                  type="text"
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                  required
                 // autoComplete="email"
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label  className="block text-sm font-medium text-gray-700">
              Last name
              </label>
              <div className="mt-1">
                <input
                  id="lastname"
                  name="lastname"
                  type="text"
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
                  autoComplete="current-password"
                  required
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm"
                />
              </div>
            </div>


       
      </div>

 
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="username"
                  type="email"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  required
                 // autoComplete="email"
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Set Your Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm"
                />
              </div>
            </div>

            {/* <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-red-600 hover:text-red-500">
                  Forgot your password?
                </a>
              </div>
            </div> */}

            <div>
              <button
                type="submit"
                onClick={e => onSubmit(e)}
                className="flex w-full justify-center rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                Sign up
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">Or sign in</span>
              </div>
            </div>

            <div className="mt-6">
            <div>
              <a href="https://usebundl.com/signin">
                <button
                  className="flex w-full justify-center rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  Sign in
                </button>
              </a>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
   
  );
}

export default SignUpPage;
