/* import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Global from "../../context/Global";
import { FiMenu } from "react-icons/fi";

function Header() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(Global.isAuthenticated());

  useEffect(() => {
    setIsAuthenticated(Global.isAuthenticated());
  }, []);

  const handleLoginClick = () => {
    navigate('/signin');
    setIsMenuOpen(false);
  };

  const handleSignupClick = () => {
    navigate('/signup');
    setIsMenuOpen(false);
  };

  const handleDashboardClick = () => {
    navigate('/EventHiveDashboard');
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    Global.logout();
    setIsAuthenticated(false);
    setIsMenuOpen(false);
  };

  return (
    <header className="flex flex-col items-center w-full px-4 md:px-5 ">
      <nav className="flex flex-wrap items-center justify-between w-full max-w-[1320px] relative">
        <div className="text-3xl md:text-4xl font-bold text-black">
          Campus<span className="text-violet-600"> Connect</span>
        </div>

   
        <button 
          className="md:hidden p-2 text-violet-600"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <FiMenu size={24} />
        </button>

        <div className="hidden md:flex gap-10 items-center">
          {isAuthenticated ? (
            <>
              <button 
                className="px-10 py-4 text-center text-white bg-violet-600 rounded-md"
                onClick={handleDashboardClick}
              >
                Dashboard
              </button>
              <button
                className="px-10 py-4 text-center text-white bg-violet-600 rounded-md"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button 
                className="text-neutral-900"
                onClick={handleLoginClick}
              >
                Signin
              </button>
              <button
                className="px-10 py-4 text-center text-white bg-violet-600 rounded-md"
                onClick={handleSignupClick}
              >
                Signup
              </button>
            </>
          )}
        </div>

      
{isMenuOpen && (
  <div 
    className="md:hidden absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg z-50 w-1/2"
  >
    {isAuthenticated ? (
      <div className="flex flex-col gap-2 p-4">
        <button 
          className="w-full py-3 text-center text-white bg-violet-600 rounded-md"
          onClick={handleDashboardClick}
        >
          Dashboard
        </button>
        <button
          className="w-full py-3 text-center text-white bg-violet-600 rounded-md"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    ) : (
      <div className="flex flex-col gap-2 p-4">
        <button 
          className="w-full py-3 text-center text-neutral-900 hover:bg-gray-100 rounded-md"
          onClick={handleLoginClick}
        >
          Signin
        </button>
        <button
          className="w-full py-3 text-center text-white bg-violet-600 rounded-md"
          onClick={handleSignupClick}
        >
          Signup
        </button>
      </div>
    )}
  </div>
)}
      </nav>
    </header>
  );
}

export default Header; */

















/* import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Global from "../../context/Global";
import { FiMenu } from "react-icons/fi";

function Header() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // UseEffect to check if the user is authenticated when the component mounts
  useEffect(() => {
    const checkAuthentication = async () => {
      const authStatus = await Global.isAuthenticated();
      setIsAuthenticated(authStatus); // Update the state once the promise resolves
    };

    checkAuthentication(); // Call the async function
  }, []); // Run once when the component mounts
  console.log(isAuthenticated);
  

  // Update isAuthenticated after logout
  const handleLogout = () => {

    Global.logout();
    setIsAuthenticated(false); // Set state to false after logout
    setIsMenuOpen(false);
  };




  const handleLoginClick = () => {
    navigate('/signin');
    setIsMenuOpen(false);
  };

  const handleSignupClick = () => {
    navigate('/signup');
    setIsMenuOpen(false);
  };

  const handleDashboardClick = () => {
    navigate('/EventHiveDashboard');
    setIsMenuOpen(false);
  };

console.log(isAuthenticated+" "+ isMenuOpen);
  return (
    <header className="fixed top-0 left-0 right-0 bg-gray-50 border-b border-gray-200 z-50">
      <div className="flex flex-col items-center w-full px-4 md:px-5">
        <nav className="flex flex-wrap items-center justify-between w-full max-w-[1320px] relative py-4">
          <div className="text-3xl md:text-4xl font-bold text-black">
            Campus<span className="text-violet-600"> Connect</span>
          </div>

          <button 
            className="md:hidden p-2 text-violet-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <FiMenu size={24} />
          </button>

          <div className="hidden md:flex gap-10 items-center">
            {isAuthenticated == true ? (
              <>
                <button 
                  className="px-10 py-4 text-center text-white bg-violet-600 rounded-md"
                  onClick={handleDashboardClick}
                >
                  Dashboard
                </button>
                <button
                  className="px-10 py-4 text-center text-white bg-violet-600 rounded-md"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button 
                  className="text-neutral-900"
                  onClick={handleLoginClick}
                >
                  Signin
                </button>
                <button
                  className="px-10 py-4 text-center text-white bg-violet-600 rounded-md"
                  onClick={handleSignupClick}
                >
                  Signup
                </button>
              </>
            )}
          </div>

          {isMenuOpen && (
            <div 
              className="md:hidden absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg z-50 w-1/2"
            >
              {isAuthenticated ? (
                <div className="flex flex-col gap-2 p-4">
                  <button 
                    className="w-full py-3 text-center text-white bg-violet-600 rounded-md"
                    onClick={handleDashboardClick}
                  >
                    Dashboard
                  </button>
                  <button
                    className="w-full py-3 text-center text-white bg-violet-600 rounded-md"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-2 p-4">
                  <button 
                    className="w-full py-3 text-center text-neutral-900 hover:bg-gray-100 rounded-md"
                    onClick={handleLoginClick}
                  >
                    Signin
                  </button>
                  <button
                    className="w-full py-3 text-center text-white bg-violet-600 rounded-md"
                    onClick={handleSignupClick}
                  >
                    Signup
                  </button>
                </div>
              )}
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header; */













import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Global from "../../context/Global";
import { FiMenu } from "react-icons/fi";

function Header() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // Added loading state

  // UseEffect to check if the user is authenticated when the component mounts
  useEffect(() => {
    const checkAuthentication = async () => {
      const authStatus = await Global.isAuthenticated();
      setIsAuthenticated(authStatus); // Update the state once the promise resolves
      setLoading(false); // Set loading to false after authentication is checked
    };

    checkAuthentication(); // Call the async function
  }, []); // Run once when the component mounts

  const handleLogout = () => {
    Global.logout();
    setIsAuthenticated(false); // Set state to false after logout
    setIsMenuOpen(false);
  };

  const handleLoginClick = () => {
    navigate('/signin');
    setIsMenuOpen(false);
  };

  const handleSignupClick = () => {
    navigate('/signup');
    setIsMenuOpen(false);
  };

  const handleDashboardClick = () => {
    navigate('/EventHiveDashboard');
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-gray-50 border-b border-gray-200 z-50">
      <div className="flex flex-col items-center w-full px-4 md:px-5">
        <nav className="flex flex-wrap items-center justify-between w-full max-w-[1320px] relative py-4">
          <div className="text-3xl md:text-4xl font-bold text-black">
            Campus<span className="text-violet-600"> Connect</span>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-violet-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <FiMenu size={24} />
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-10 items-center">
            {loading ? (
              <p></p> // Show loading text or a spinner while checking authentication
            ) : isAuthenticated ? (
              <>
                <button 
                  className="px-10 py-4 text-center text-white bg-violet-600 rounded-md"
                  onClick={handleDashboardClick}
                >
                  Dashboard
                </button>
                <button
                  className="px-10 py-4 text-center text-white bg-violet-600 rounded-md"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button 
                  className="text-neutral-900"
                  onClick={handleLoginClick}
                >
                  Signin
                </button>
                <button
                  className="px-10 py-4 text-center text-white bg-violet-600 rounded-md"
                  onClick={handleSignupClick}
                >
                  Signup
                </button>
              </>
            )}
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div 
              className="md:hidden absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg z-50 w-1/2"
            >
              {loading ? (
                <p></p> // Show loading text or a spinner on mobile as well
              ) : isAuthenticated ? (
                <div className="flex flex-col gap-2 p-4">
                  <button 
                    className="w-full py-3 text-center text-white bg-violet-600 rounded-md"
                    onClick={handleDashboardClick}
                  >
                    Dashboard
                  </button>
                  <button
                    className="w-full py-3 text-center text-white bg-violet-600 rounded-md"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-2 p-4">
                  <button 
                    className="w-full py-3 text-center text-neutral-900 hover:bg-gray-100 rounded-md"
                    onClick={handleLoginClick}
                  >
                    Signin
                  </button>
                  <button
                    className="w-full py-3 text-center text-white bg-violet-600 rounded-md"
                    onClick={handleSignupClick}
                  >
                    Signup
                  </button>
                </div>
              )}
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
