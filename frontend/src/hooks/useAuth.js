// hooks/useAuth.js
import { useState, useEffect } from 'react';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuth = () => {
    // Check if the user is authenticated (e.g., by verifying a token)
    const token = localStorage.getItem('authToken'); // Replace with your actual storage method
    setIsAuthenticated(!!token);
  };

  useEffect(() => {
    checkAuth();
  }, []); // Run checkAuth when the component mounts

  return { isAuthenticated, checkAuth };
};

export { useAuth };

