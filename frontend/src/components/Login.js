// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
// Import the CSS file at the top of your component file
import './AuthStyles.css';


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Use the useNavigate hook

  const handleLogin = async () => {
    try {
      const response = await axios.post('/api/auth/login', {
        username,//was 'aifuwa',
        password,//was 'test123',
      });
  
      console.log('Login response:', response.data);
  
      // Set the token in local storage
      const token = response.data.token;
      localStorage.setItem('authToken', token);
  
      // If login is successful, navigate to the desired location
      navigate('/main');
    } catch (error) {
      console.error('Login error:', error);
      // Handle error appropriately
    }
  };
  

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button className='login-button' onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
