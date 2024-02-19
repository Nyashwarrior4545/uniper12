// App.js
// App.js
// App.js
import React, { useEffect } from 'react';
import { BrowserRouter as Router, useRoutes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './pages/Home';
import Navbar from './components/Navbar'; // import Navbar
import { useAuth } from './hooks/useAuth';

const App = () => {
  const { isAuthenticated, checkAuth } = useAuth();

  useEffect(() => {
    // Check authentication status when the app starts
    checkAuth();
  }, [checkAuth]);

  return (
    <Router>
      <Navbar isAuthenticated={isAuthenticated} /> {/* add Navbar */}
      <Routes isAuthenticated={isAuthenticated} />
    </Router>
  );
};

const Routes = ({ isAuthenticated }) => {
  // Define your routes using useRoutes
  const routing = useRoutes([
    { path: '/login', element: <Login /> },
    { path: '/register', element: <Register /> },
    { path: '/main', element: isAuthenticated ? <Home /> : <Navigate to="/login" /> },
    { path: '*', element: <Navigate to="/login" /> },
  ]);

  return routing;
};

export default App;