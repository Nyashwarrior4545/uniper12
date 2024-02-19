// src/components/Register.js
import React, { useState } from 'react';
import axios from 'axios';
// Import the CSS file at the top of your component file
import './AuthStyles.css';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    userType: '' // Add any additional fields you need for registration
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/auth/register', formData);
      console.log('Registration successful:', response.data);
      // Redirect or show a success message as needed
    } catch (error) {
      console.error('Registration error:', error.response.data);
      // Handle registration error, e.g., show an error message to the user
    }
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="userType">User Type:</label>
          <input
            type="text"
            id="userType"
            name="userType"
            value={formData.userType}
            onChange={handleChange}
          />
        </div>
        <button className='login-button' type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
