import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Global from "../../context/Global";

const ResetPasswordForm = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errors = {};
    if (!password) {
      errors.password = "Password is required";
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)) {
      errors.password =
        "Password must include 8 characters, uppercase, lowercase, number, and special character";
    }
    if (!confirmPassword) {
      errors.confirmPassword = "Please confirm your password";
    } else if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    if (Object.keys(errors).length) {
      toast.error(errors.password || errors.confirmPassword, {
        position: "top-right",
        autoClose: 3000,
        closeButton: true,
        className: 'mx-2 md:mx-4 mt-16 md:mt-20 max-w-[90vw] md:max-w-md w-fit min-w-[200px] text-sm md:text-base p-4',
        style: {
          zIndex: 9999
        }
      });
      return;
    }

    try {
      const response = await Global.resetPassword(email, password);
      if (response.status) {
        toast.success("Password updated successfully! Redirecting...", {
          position: "top-right",
          autoClose: 3000,
          closeButton: true,
          className: 'mx-2 md:mx-4 mt-16 md:mt-20 max-w-[90vw] md:max-w-md w-fit min-w-[200px] text-sm md:text-base p-4',
          style: {
            zIndex: 9999
          }
        });
        // Navigate after a short delay to allow the toast to appear
        setTimeout(() => {
          navigate("/signin");
        }, 2000); // Adjust the timeout as needed
      } else {
        toast.error(response.message || "Failed to update password.", {
          position: "top-right",
          autoClose: 3000,
          closeButton: true,
          className: 'mx-2 md:mx-4 mt-16 md:mt-20 max-w-[90vw] md:max-w-md w-fit min-w-[200px] text-sm md:text-base p-4',
          style: {
            zIndex: 9999
          }
        });
      }
    } catch (error) {
      toast.error(error.message || "An error occurred. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        closeButton: true,
        className: 'mx-2 md:mx-4 mt-16 md:mt-20 max-w-[90vw] md:max-w-md w-fit min-w-[200px] text-sm md:text-base p-4',
        style: {
          zIndex: 9999
        }
      });
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <ToastContainer />
      <div>
        <h1 className="text-2xl font-bold text-center">
          Campus <span className="text-purple-600">Connect</span>
        </h1>
        <div className="w-full max-w-md bg-white rounded-md shadow-lg p-6">
          <h2 className="text-2xl text-center text-gray-800 mb-4">Change Your Password</h2>
          <p className="text-sm text-gray-600 mb-4">Make sure to include at least:</p>
          <ul className="list-disc ml-5 mb-4 text-sm text-gray-600">
            <li>Atleast 8 characters</li>
            <li>1 Upercase letter</li>
            <li>1 Lowercase letter</li>
            <li>1 digit</li>
            <li>1 special character</li>
          </ul>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block font-semibold mb-1" htmlFor="password">New Password</label>
              <input
                type="password"
                id="password"
                className="form-control w-full px-3 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:border-blue-400"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block font-semibold mb-1" htmlFor="confirmPassword">
                Confirm New Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                className="form-control w-full px-3 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:border-blue-400"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
            >
              Change Password
            </button>
          </form>

          
        </div>
        <footer className="mt-4 text-xs text-gray-500 text-center">
          &copy; 2025 PVPSIT, Inc. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default ResetPasswordForm;