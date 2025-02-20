import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Global from "../../context/Global";


export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setErrorMessage(""); // Clear previous errors
    if (!email.trim()) {
      setErrorMessage("Email is required");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setErrorMessage("Invalid email format");
      return;
    }

    try {
      // Call the forget password API from Global.js
      const response = await Global.forgetPassword(email);

      if (response.status === "success") {
        // If API responds with success, navigate to reset password page
        navigate("/ResetPasswordForm", { state: { email } });
      } else {
        // If the response indicates failure, display an error message
        setErrorMessage(response.message || "Failed to verify email.");
      }
    } catch (error) {
      // Handle API call errors
      setErrorMessage(error.message || "An error occurred. Please try again.");
    }
  };

  const handleCancel = () => {
    navigate("/signin");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div>
        <h1 className="text-2xl font-bold text-center">
          Campus <span className="text-purple-600">Connect</span>
        </h1>
        <div className="w-full max-w-md bg-white rounded-md shadow-lg p-6">
          <h2 className="text-2xl text-center text-gray-800 mb-4">
            Forgot Your Password
          </h2>
          <p className="text-gray-600 text-sm mb-4">
            Having trouble logging in?
          </p>
          <ul className="list-disc list-inside text-gray-600 text-sm mb-4">
            <li>Usernames are in the form of an email address.</li>
            <li>Passwords are case sensitive.</li>
          </ul>
          <p className="text-gray-600 text-sm mb-4">
            To reset your password, enter your Registered Email.
          </p>
          {errorMessage && (
            <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="Email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="form-control block w-full px-4 py-2 text-sm border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="flex justify-between items-center">
              <button
                type="button"
                className="w-32 py-2 border-2 border-black-500 text-purple-500 bg-white rounded-md hover:bg-purple-100"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-32 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600"
              >
                Continue
              </button>
            </div>
          </form>
        </div>
        <footer className="mt-4 text-xs text-gray-500 text-center">
        &copy; 2025 PVPSIT, Inc. All rights reserved.
      </footer>
      </div>
    </div>
  );
}
