import * as React from "react";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import Global from "../../context/Global";

export function SignupPage() {
  const [showNextForm, setShowNextForm] = React.useState(false);
  const [showOtherCollege, setShowOtherCollege] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    phone: "",
    college_id: "",
    dept_id: "",
    registerNumber: "",
    degree_id: "",
    degree: "",
    otherCollege: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [dropdownData, setDropdownData] = useState({
    degrees: [],
    colleges: [],
    departments: [],
  });
  
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const degrees = await Global.fetchDegrees();
        const colleges = await Global.fetchColleges();

        setDropdownData(prev => ({
          ...prev,
          degrees: degrees.data || [],
          colleges: Array.isArray(colleges.data) ? colleges.data : [],
        }));
      } catch (error) {
        console.error("Error fetching initial dropdown data:", error);
      }
    };

    fetchInitialData();
  }, []);

  //console.log(" dropdown degree "+formData.degree_id)

  // New useEffect to fetch departments when degree changes
  useEffect(() => {
    const fetchDepart = async () => {
      if (formData.degree_id) {
        try {
          
            const departments = await Global.fetchDepart(formData.degree_id);
            setDropdownData(prev => ({
              ...prev,
              departments: Array.isArray(departments.data) ? departments.data : []
            }));
         
        } catch (error) {
          console.error("Error fetching departments:", error);
          setDropdownData(prev => ({
            ...prev,
            departments: []
          }));
        }
      }
    };

    fetchDepart();
  }, [formData.degree_id, dropdownData.degrees]);

  const handleLoginClick = () => {
    navigate("/signin");
  };

  const validateFirstForm = () => {
    const errors = {};
    
    if (!formData.firstName.trim()) {
      errors.firstName = "First name is required";
    }
    if (!formData.lastName.trim()) {
      errors.lastName = "Last name is required";
    }
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Invalid email format";
    }
    if (!formData.password) {
      errors.password = "Password is required";
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(formData.password)) {
      errors.password = "Password must include 8 character uppercase, lowercase, number, and special character";
    }
    if (!formData.confirmPassword) {
      errors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    if (!formData.registerNumber.trim()) {
      errors.registerNumber = "Register number is required";
    }

  

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = async (e) => {
    const { id, name, value, type } = e.target;
    const key = id || name;
  
    // Handle college selection
    if (key === 'college_id') {
      const isOthers = dropdownData.colleges.find(
        college => college.id === value
      )?.college === 'OTHERS';
      
      setShowOtherCollege(isOthers);
      
      if (!isOthers) {
        setFormData(prev => ({
          ...prev,
          otherCollege: '',
          [key]: value
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          [key]: value
        }));
      }
      return;
    }

    // Handle degree selection
    if (key === 'degree_id') {
      setFormData(prev => ({
        ...prev,
        [key]: value,
        dept_id: '' // Reset department selection when degree changes
      }));
      return;
    }

    // Handle other college input
    if (key === 'otherCollege') {
      const upperCaseValue = value.toUpperCase();
      setFormData(prev => ({
        ...prev,
        [key]: upperCaseValue
      }));
      return;
    }
  
    // Original phone number handling
    //const updatedValue = key === "phone" ? `+91 ${value}` : value;

        // Handle phone number validation
        if (key === "phone") {
          const phoneNumber = value.replace(/\D/g, ''); // Remove non-digits
          if (phoneNumber.length <= 10) {
            const updatedValue = `+91 ${phoneNumber}`;
            setFormData(prevData => ({
              ...prevData,
              [key]: updatedValue,
            }));
            
            // Clear error when valid
            if (phoneNumber.length === 10 && 
                parseInt(phoneNumber) >= 6000000000 && 
                parseInt(phoneNumber) <= 9999999999) {
              setFormErrors(prev => ({
                ...prev,
                [key]: "",
              }));
            } else if (phoneNumber.length === 10) {
              setFormErrors(prev => ({
                ...prev,
                [key]: "Phone number must be between 6000000000 and 9999999999",
              }));
            }
          }
          return;
        }
  
    // Handle other inputs
    setFormData(prevData => ({
      ...prevData,
      [key]: type === "radio" ? value : value.trim(),
    }));

    // Clear error when user starts typing
    if (formErrors[key]) {
      setFormErrors(prev => ({
        ...prev,
        [key]: "",
      }));
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      let finalFormData = { ...formData };

      // If "OTHERS" is selected and otherCollege is provided, insert new college first
      if (showOtherCollege && formData.otherCollege) {
        try {
          const newCollegeResponse = await Global.insertNewCollege({
            college: formData.otherCollege
          });
          
          //console.log("New college response:", newCollegeResponse);
          
          // Check if the response has the expected structure
          if (newCollegeResponse.status === 'success' && newCollegeResponse.college_id) {
           // console.log("New college added:", newCollegeResponse.college_id);
            // Update the college_id in the form data
            finalFormData = {
              ...finalFormData,
              college_id: newCollegeResponse.college_id
            };
          } else {
            throw new Error(newCollegeResponse.message || 'Failed to add new college');
          }
        } catch (collegeError) {
          console.error("Error adding new college:", collegeError);
          setErrorMessage("Failed to add new college. Please try again.");
          setLoading(false);
          return;
        }
      }

      // Proceed with user registration using the updated form data
      const registrationResponse = await Global.registerUser(finalFormData);
      
      if (registrationResponse.success) {
        //setSuccessMessage("Registration successful! Redirecting to login...");
        toast.success('Registration successful! Redirecting...', {
          position: "top-right",
        autoClose: 3000,
        closeButton: true,
        className: 'mx-2 md:mx-4 mt-16 md:mt-20 max-w-[90vw] md:max-w-md w-fit min-w-[200px] text-sm md:text-base p-4',
        style: {
          zIndex: 9999
        }
        });
        setTimeout(() => {
          navigate("/signin");
        }, 3000);
      } else {
        //setErrorMessage(registrationResponse.message || "Registration failed. Please try again.");
        toast.error(registrationResponse.message || "Registration failed. Please try again.", {
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
      console.error("Error during registration:", error);
      //setErrorMessage("An error occurred during registration. Please try again.");
      toast.error(error.message, {
        position: "top-right",
        autoClose: 3000,
        closeButton: true,
        className: 'mx-2 md:mx-4 mt-16 md:mt-20 max-w-[90vw] md:max-w-md w-fit min-w-[200px] text-sm md:text-base p-4',
        style: {
          zIndex: 9999
        }
      });
    } finally {
      setLoading(false);
    }
  };

  
  const handleNextClick = () => {
    if (validateFirstForm()) {
      setShowNextForm(true);
    }
  };

  const handleBackClick = () => {
    setShowNextForm(false);
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
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/e77c401d7f1a90f9cd10979f52810ca4f9c991aad46aaed3e65704a5c9b1c988?placeholderIfAbsent=true&apiKey=b241e93db00d49568ba12d6c59887446"
              alt="Welcome background"
              className="object-cover absolute inset-0 size-full"
            />
            <div className="flex relative flex-col items-center justify-center px-20 w-full bg-neutral-900 bg-opacity-30 h-full">
              <h1 className="text-4xl font-bold text-white">Welcome back</h1>
              <p className="mt-6 text-lg">
                To keep connected with us provide us with your information
              </p>
              <button
                className="mt-8 px-10 py-3 rounded-md bg-white bg-opacity-10 hover:bg-opacity-50 transition-all text-white"
                onClick={handleLoginClick}
              >
                Sign in
              </button>
            </div>
          </div>
        </section>

        {/* Right Section */}
        <section className="w-full md:w-7/12 bg-white" aria-label="Sign Up Form">
        <div className="flex flex-col justify-center items-center px-4 md:px-12 py-8 w-full h-full overflow-y-auto">
            <div className="flex flex-col items-center w-full max-w-md">
              <h2 className="text-2xl font-bold text-violet-600 mt-8">
                Campus<span>Connect</span>
              </h2>
              <h3 className="mt-2 text-3xl font-bold text-center text-black">
                Sign Up
              </h3>

              <div className="w-full mt-8 h-[500px] px-4">
                <form onSubmit={handleSubmit} className="w-full space-y-6">
                  {!showNextForm ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col justify-center w-full">
                          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                            First Name
                          </label>
                          <input
                            type="text"
                            id="firstName"
                            placeholder="Enter your first name"
                            className={`gap-2.5 self-stretch px-2.5 py-2 mt-1 w-full text-xs bg-white rounded-md min-h-[39px] text-slate-500 ${
                              formErrors.firstName ? 'border-red-500 border-2' : 'border'
                            }`}
                            pattern="[A-Za-z] *"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                          />
                          {formErrors.firstName && (
                            <p className="text-red-500 text-xs mt-1">{formErrors.firstName}</p>
                          )}
                        </div>

                        <div className="flex flex-col justify-center w-full">
                          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                            Last Name
                          </label>
                          <input
                            type="text"
                            id="lastName"
                            placeholder="Enter your last name"
                            className={`gap-2.5 self-stretch px-2.5 py-2 mt-1 w-full text-xs bg-white rounded-md min-h-[39px] text-slate-500 ${
                              formErrors.lastName ? 'border-red-500 border-2' : 'border'
                            }`}
                            pattern="[A-Za-z] *"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                          />
                          {formErrors.lastName && (
                            <p className="text-red-500 text-xs mt-1">{formErrors.lastName}</p>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col justify-center w-full">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          placeholder="Enter your email"
                          className={`gap-2.5 self-stretch px-2.5 py-2 mt-1 w-full text-xs bg-white rounded-md min-h-[39px] text-slate-500 ${
                            formErrors.email ? 'border-red-500 border-2' : 'border'
                          }`}
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                        {formErrors.email && (
                          <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>
                        )}
                      </div>

                      <div className="flex flex-col justify-center w-full">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                          Password
                        </label>
                        <input
                          type="password"
                          id="password"
                          placeholder="Enter your password"
                          className={`gap-2.5 self-stretch px-2.5 py-2 mt-1 w-full text-xs bg-white rounded-md min-h-[39px] text-slate-500 ${
                            formErrors.password ? 'border-red-500 border-2' : 'border'
                          }`}
                          value={formData.password}
                          onChange={handleChange}
                          required
                        />
                        {formErrors.password && (
                          <p className="text-red-500 text-xs mt-1">{formErrors.password}</p>
                        )}
                      </div>

                      <div className="flex flex-col justify-center w-full">
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                          Confirm Password
                        </label>
                        <input
                          type="password"
                          id="confirmPassword"
                          placeholder="Confirm your password"
                          className={`gap-2.5 self-stretch px-2.5 py-2 mt-1 w-full text-xs bg-white rounded-md min-h-[39px] text-slate-500 ${
                            formErrors.confirmPassword ? 'border-red-500 border-2' : 'border'
                          }`}
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          required
                        />
                        {formErrors.confirmPassword && (
                          <p className="text-red-500 text-xs mt-1">{formErrors.confirmPassword}</p>
                        )}
                      </div>

                      <div className="flex flex-col justify-center w-full">
                        <label htmlFor="registerNumber" className="block text-sm font-medium text-gray-700">
                          Register Number
                        </label>
                        <input
                          type="text"
                          id="registerNumber"
                          placeholder="Enter Register Number"
                          className={`gap-2.5 self-stretch px-2.5 py-2 mt-1 w-full text-xs bg-white rounded-md min-h-[39px] text-slate-500 ${
                            formErrors.registerNumber ? 'border-red-500 border-2' : 'border'
                          }`}
                          value={formData.registerNumber}
                          onChange={handleChange}
                          required
                        />
                        {formErrors.registerNumber && (
                          <p className="text-red-500 text-xs mt-1">{formErrors.registerNumber}</p>
                        )}
                      </div>

                      <div className="flex justify-end">
                        <button
                          type="button"
                          onClick={handleNextClick}
                          className="px-6 py-2 bg-violet-600 text-white rounded-md hover:bg-violet-700 transition-colors"
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="mb-4 w-full">
                        <label className="block text-sm font-medium text-gray-700">Gender</label>
                        <div className="flex gap-16 text-sm font-medium text-gray-700">
                          <label className="flex items-center">
                            <input type="radio" name="gender" value="M" checked={formData.gender === "M"} required onChange={handleChange} />
                            <span className="ml-2">Male</span>
                          </label>
                          <label className="flex items-center">
                            <input type="radio" name="gender" value="F" checked={formData.gender === "F"} required onChange={handleChange} />
                            <span className="ml-2">Female</span>
                          </label>
                        </div>
                      </div>

                      <div className="flex flex-col justify-center w-full">
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                          Phone Number
                        </label>
                        <div className="flex">
                          <span className="flex items-center text-xs bg-gray-200 px-2 py-2 text-gray-500 rounded-l-md">+91</span>
                          <input
                            type="text"
                            id="phone"
                            placeholder="Enter remaining 10-digit number"
                            className={`gap-5 self-stretch px-2.5 py-2 w-full text-xs bg-white rounded-r-md min-h-[39px] text-slate-500 ${
                              formErrors.phone ? 'border-red-500 border-2' : 'border'
                            }`}
                            value={formData.phone.replace('+91 ', '')}
                            onChange={handleChange}
                            pattern="^\d{10}$"
                            minLength="10"
                            maxLength="10"
                            required
                          />
                        </div>
                        {formErrors.phone && (
                          <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>
                        )}
                      </div>


                      <div className="flex flex-col justify-center w-full">
                        <label htmlFor="college_id" className="block text-sm font-medium text-gray-700">
                          College Name
                        </label>
                        <select
                          id="college_id"
                          className="gap-2.5 self-stretch px-2.5 py-2 mt-4 w-full text-xs bg-white rounded-md min-h-[39px] text-slate-500"
                          value={formData.college_id}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select College</option>
                          {dropdownData.colleges?.map((college) => (
                            <option key={college.id} value={college.id}>
                              {college.college}
                            </option>
                          ))}
                        </select>

                        {showOtherCollege && (
                          <div className="mt-4">
                            <label htmlFor="otherCollege" className="block text-sm font-medium text-gray-700">
                              Enter College Name (in UPPERCASE)
                            </label>
                            <input
                              type="text"
                              id="otherCollege"
                              value={formData.otherCollege}
                              onChange={handleChange}
                              className="gap-2.5 self-stretch px-2.5 py-2 mt-1 w-full text-xs bg-white rounded-md min-h-[39px] text-slate-500 border"
                              placeholder="ENTER COLLEGE NAME"
                              required={showOtherCollege}
                              style={{ textTransform: 'uppercase' }}
                            />
                          </div>
                        )}
                      </div>


                      <div className="flex flex-col justify-center w-full">
                        <label htmlFor="degree_id" className="block text-sm font-medium text-gray-700">
                          Degree
                        </label>
                        <select
                          id="degree_id"
                          className="w-full mt-2 p-2 border rounded-md"
                          value={formData.degree_id}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select Degree</option>
                          {dropdownData.degrees.map((degree) => (
                            <option key={degree.id} value={degree.degree}>
                              {degree.degree}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="flex flex-col justify-center w-full">
                        <label htmlFor="dept_id" className="block text-sm font-medium text-gray-700">
                          Department
                        </label>
                        <select
                          id="dept_id"
                          className="gap-2.5 self-stretch px-2.5 py-2 mt-4 w-full text-xs bg-white rounded-md min-h-[39px] text-slate-500"
                          value={formData.dept_id}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select Department</option>
                          {dropdownData.departments.map((department) => (
                            <option key={department.id} value={department.id}>
                              {department.dept_name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="flex justify-between mt-12">
                        <button
                          type="button"
                          onClick={handleBackClick}
                          className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
                        >
                          Back
                        </button>
                        <button
                          type="submit"
                          className="px-6 py-2 bg-violet-600 text-white rounded-md hover:bg-violet-700 transition-colors"
                        >
                          Sign Up
                        </button>
                      </div>
                    </div>
                  )}

                  {loading && (
                    <div className="text-center">
                      <p className="text-blue-600">Loading...</p>
                    </div>
                  )}

{/*                   {errorMessage && (
                    <div className="text-center">
                      <p className="text-red-600">{errorMessage}</p>
                    </div>
                  )}

                  {successMessage && (
                    <div className="text-center">
                      <p className="text-green-600">{successMessage}</p>
                    </div>
                  )} */}
                </form>
              </div>

              <div className="mt-14 text-center">
                <p className="text-sm text-gray-600">
                  Already have an account?{" "}
                  <button
                    onClick={handleLoginClick}
                    className="text-violet-600 hover:text-violet-700 font-medium"
                  >
                    Sign in here
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