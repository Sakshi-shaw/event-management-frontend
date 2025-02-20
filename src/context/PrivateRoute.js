import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Global from './Global';

const PrivateRoute = ({ element }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const authStatus = await Global.isAuthenticated();
        setIsAuthenticated(authStatus);
        // console.log('PrivateRoute isAuthenticated', authStatus);
      } catch (error) {
        console.error("Error checking authentication:", error);
        setIsAuthenticated(false);
      }
    };
    checkAuthentication();
  }, []);

  if (isAuthenticated === null) return <div>Loading...</div>;

  return isAuthenticated ? element : <Navigate to="/signin" replace />;
};

export default PrivateRoute;
