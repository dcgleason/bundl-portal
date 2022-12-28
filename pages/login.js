import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function LoginSignupForm() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const { username, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify({ username, password });

    try {
      // Use axios to send a POST request to the /login or /signup route
      // depending on whether the user is trying to login or sign up
      const res = await axios.post(
        '/login',
        body,
        config
      );

      console.log(res.data);
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <form onSubmit={e => onSubmit(e)}>
      <h1>Login</h1>
      <input
        type='text'
        placeholder='Username'
        name='username'
        value={username}
        onChange={e => onChange(e)}
      />
      <input
        type='password'
        placeholder='Password'
        name='password'
        value={password}
        onChange={e => onChange(e)}
      />
      <button type='submit'>Log In</button>
      <Link to='/signup'>Sign Up</Link>
    </form>
  );
}

export default LoginSignupForm;
