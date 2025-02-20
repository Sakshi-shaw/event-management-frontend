import * as React from "react";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import Global from "../../context/Global";

export function SignInPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  
  
  const navigate = useNavigate();

  const handleSignUpClick = () => {
    navigate("/signup");
  };

  const handleChange = (e) => {
    const { id, name, value, type } = e.target;
    const key = id || name;

    setFormData((prevData) => ({
      ...prevData,
      [key]: type === "radio" || type === "text" ? value : value.trim(),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");
    //console.log("Global.isAuthenticated "+ Global.isAuthenticated)
    try {
      const response = await Global.login(formData);
      //console.log(response.data)
      const role = response.data["role"];
      //console.log(JSON.stringify(role))
      if (response.data) {
        const token = response.data["authToken"]; // Adjust based on your API's response format
        localStorage.setItem("authToken", token); // Store the token in localStorage
        toast.success('Login successful! Redirecting...', {
          position: "top-right",
        autoClose: 3000,
        closeButton: true,
        className: 'mx-2 md:mx-4 mt-16 md:mt-20 max-w-[90vw] md:max-w-md w-fit min-w-[200px] text-sm md:text-base p-4',
        style: {
          zIndex: 9999
        }
        });
        //setSuccessMessage("Login successful! Redirecting to Home...");
       // navigate("/EventForm");
        if (Global.isAuthenticated()  && role==='student') {
          localStorage.setItem("role", role);
          setTimeout(() => {
            navigate("/EventHiveDashboard"); // Redirect directly
          }, 2000);
        }
        else if (Global.isAuthenticated() && role==='teacher') {
          localStorage.setItem("role", role);
          setTimeout(() => {
            navigate("/EventHiveDashboard"); // Redirect directly
          }, 2000);
        }
      }
      else {
        navigate("/")
        //console.log('hi')
        toast.error(response.message, {
          position: "top-right",
        autoClose: 3000,
        closeButton: true,
        className: 'mx-2 md:mx-4 mt-16 md:mt-20 max-w-[90vw] md:max-w-md w-fit min-w-[200px] text-sm md:text-base p-4',
        style: {
          zIndex: 9999
        }
        });
        //setErrorMessage(response.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during Login:", error);
      toast.error(error.message, {
        /* position: "top-right",
        style: { marginTop: '40px' },
        autoClose: 3000, */
        position: "top-right",
        autoClose: 3000,
        closeButton: true,
        className: 'mx-2 md:mx-4 mt-16 md:mt-20 max-w-[90vw] md:max-w-md w-fit min-w-[200px] text-sm md:text-base p-4',
        style: {
          zIndex: 9999
        }
      });
      //setErrorMessage("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPasswordClick = () => {
    navigate("/ForgotPasswordPage");
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <ToastContainer />
      <div className="w-full max-w-6xl h-[700px] bg-white rounded-xl shadow-lg overflow-hidden flex">
        {/* Left Section */}
        <section className="hidden md:block md:w-5/12 relative" aria-label="Welcome Section">
          <div className="flex relative flex-col grow text-base text-center text-white h-full">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/3151e04e2aa941c8dcbad5122c51cadcea2cd0d5adcfddf88825f67f62e1a031?placeholderIfAbsent=true&apiKey=b241e93db00d49568ba12d6c59887446"
              alt="Welcome background"
              className="object-cover absolute inset-0 size-full"
            />
            <div className="flex relative flex-col items-center justify-center px-20 w-full bg-neutral-900 bg-opacity-30 h-full">
              <h1 className="text-4xl font-bold text-white">Hello Friend</h1>
              <p className="mt-6 text-lg">
                Enter your personal details and start your journey with us
              </p>
              <button 
                className="mt-8 px-10 py-3 rounded-md bg-white bg-opacity-10 hover:bg-opacity-50 transition-all text-white"
                onClick={handleSignUpClick}
              >
                Sign up
              </button>
            </div>
          </div>
        </section>

        {/* Right Section */}
        <section className="w-full md:w-7/12 bg-white" aria-label="Sign Up Form">
          <div className="flex flex-col justify-center items-center px-4 md:px-12 py-8 w-full h-full overflow-y-auto">
            <div className="flex flex-col items-center w-full max-w-md">
              <h2 className="text-2xl font-bold text-violet-600">
                Campus<span>Connect</span>
              </h2>
              <h3 className="mt-6 text-3xl font-bold text-center text-black">
                Sign In
              </h3>

              <form onSubmit={handleSubmit} className="w-full mt-3 space-y-6">
                <div className="flex flex-wrap gap-3 justify-between items-center w-full text-base max-md:max-w-full">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    className="gap-2.5 self-stretch px-2.5 py-2 mt-1 w-full text-xs bg-white rounded-md min-h-[39px] text-slate-500 max-md:max-w-full"
                    aria-label="Email" 
                    value={formData.email}
                    onChange={handleChange}
                    required
                    
                  />
                </div>

                <div className="flex flex-wrap gap-2 justify-between items-center w-full text-base max-md:max-w-full">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    placeholder="Enter your password"
                    className="gap-2.5 self-stretch px-2.5 py-2 mt-1 w-full text-xs bg-white rounded-md min-h-[39px] text-slate-500 max-md:max-w-full"
                    name="password"
                    aria-label="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="flex items-center justify-between">
                  {/* <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-violet-600 focus:ring-violet-500 border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                      Remember me
                    </label>
                  </div> */}
                  <button
                    type="button"
                    className="text-sm font-medium text-violet-600 hover:text-violet-500"
                    onClick={handleForgotPasswordClick}
                  >
                    Forgot password?
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-violet-600 text-white rounded-md hover:bg-violet-700 transition-colors"
                  disabled={loading}
                >
                  {loading ? "Signing in..." : "Sign in"}
                </button>

                {errorMessage && (
                  <div className="text-center">
                    <p className="text-red-600">{errorMessage}</p>
                  </div>
                )}

                {successMessage && (
                  <div className="text-center">
                    <p className="text-green-600">{successMessage}</p>
                  </div>
                )}

                {/* <div className="mt-6">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-gray-500">Or continue with</span>
                    </div>
                  </div>

                  <div className="mt-6">
                    <SocialButton
                      icon="https://cdn.builder.io/api/v1/image/assets/TEMP/19fad4c432d724d240b8caaa35d270141724c5e6ddf3193d014ed3af2f39f5c9"
                      text="Sign in with Google"
                    />
                  </div>
                </div> */}
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Don't have an account?{" "}
                  <button
                    onClick={handleSignUpClick}
                    className="text-violet-600 hover:text-violet-700 font-medium"
                  >
                    Sign up here
                  </button>
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}