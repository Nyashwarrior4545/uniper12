// components/PrivateRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ path, element: Element, isAuthenticated }) => (
  <Route 
    path={path} 
    element={isAuthenticated ? <Element /> : <Navigate to="/login" />}
  />
);

export default PrivateRoute;








// const PrivateRoute = ({ isAuthenticated }) => {
//   // If authenticated, return an outlet that will render child elements
//   // If not, return element that will navigate to the login page
//   return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
// };

// export default PrivateRoute;


