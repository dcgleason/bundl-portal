import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function SignUpPage() {
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
      // Use axios to send a POST request to the /signup route
      const res = await axios.post(
        '/register',
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
      <h1>Sign Up</h1>
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
      <button type='submit'>Sign Up</button>
      <Link to='/login'>Log In</Link>
    </form>
  );
}

export default SignUpPage;
