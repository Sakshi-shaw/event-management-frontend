import React, { useState, useEffect } from "react";
import Global from "../../../context/Global";
import { FaEdit } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Profile = () => {
  const [avatar, setAvatar] = useState("https://via.placeholder.com/150");
  const [tab, setTab] = useState("personalInfo");
  const [user, setUser] = useState(null);
  const [editablePhone, setEditablePhone] = useState("");
  const [editableSkills, setEditableSkills] = useState("");
  const [editableInterests, setEditableInterests] = useState("");
  const [isEditingSkills, setIsEditingSkills] = useState(false);
  const [isEditingInterests, setIsEditingInterests] = useState(false);
  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    setLoading(true);
    setError(null);
    try {
      let response;
      if (Global.userRole === "student") {
        response = await Global.eventStudentById(Global.userId);
      } else if (Global.userRole === "teacher") {
        response = await Global.eventTeacherById(Global.userId);
      }

      if (response?.status) {
        //console.log("response data "+JSON.stringify(response.data))
                // Ensure phone number has "+91 " prefix
                const formattedPhone = response.data.phone ? 
                (response.data.phone.startsWith("+91 ") ? 
                  response.data.phone : 
                  "+91 " + response.data.phone.replace(/^\+91/, '').trim())
                : "";

        setUser(response.data);
        setEditablePhone(formattedPhone || "");
        if (Global.userRole === "student") {
          setEditableSkills(response.data.skills || "");
          setEditableInterests(response.data.interest || "");
        }
      } else {
        throw new Error("Failed to fetch user data");
      }
    } catch (error) {
      //setError("Failed to load user data. Please try again later.");
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

/* 
  const handleAvatarUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }; */

  const validatePhoneNumber = (phone) => {
    // Extract the 10-digit number without the prefix
    const phoneNumber = phone.replace(/\D/g, '').slice(2);
    if (phoneNumber.length !== 10) {
      return "Phone number must be exactly 10 digits";
    }
    const num = parseInt(phoneNumber);
    if (num < 6000000000 || num > 9999999999) {
      return "Phone number must be between 6000000000 and 9999999999";
    }
    return null;
  };

  const handlePhoneChange = (e) => {
    const input = e.target.value;
    // Only allow numbers and limit to 10 digits
    const phoneNumber = input.replace(/\D/g, '').slice(0, 10);
    setEditablePhone("+91 " + phoneNumber);
  };

  const handleUpdatePhone = async () => {
    const validationError = validatePhoneNumber(editablePhone);
    if (validationError) {
      toast.error(validationError, {
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

    setLoading(true);
    setError(null);
    try {
      const updatedData = {
        id: user?.id,
        phone: editablePhone, // This will include "+91 " prefix
      };

      let response;
      if (Global.userRole === "student") {
        response = await Global.updateStudent(updatedData);
      } else if (Global.userRole === "teacher") {
        response = await Global.updateTeacher(updatedData);
      }

      if (response?.message) {
        setUser(prev => ({ ...prev, phone: editablePhone }));
        setIsEditingPhone(false);
        toast.success("Phone number updated successfully!", {
          position: "top-right",
          autoClose: 3000,
          closeButton: true,
          className: 'mx-2 md:mx-4 mt-16 md:mt-20 max-w-[90vw] md:max-w-md w-fit min-w-[200px] text-sm md:text-base p-4',
          style: {
            zIndex: 9999
          }

        });
      } else {
        toast.error(response?.message || "Failed to update phone number. Please try again.", {
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
      toast.error(error.message || "Phone number already exist.", {
        position: "top-right",
        autoClose: 3000,
        closeButton: true,
        className: 'mx-2 md:mx-4 mt-16 md:mt-20 max-w-[90vw] md:max-w-md w-fit min-w-[200px] text-sm md:text-base p-4',
        style: {
          zIndex: 9999
        }
      });
      //setError("Failed to update phone number. Please try again.");
      console.error("Error updating phone:", error);
    } finally {
      setLoading(false);
    }
  };



  const handleUpdateSkills = async () => {
    if (Global.userRole !== "student") return;
    
    setLoading(true);
    setError(null);
    try {
      const response = await Global.updateStudent({
        id: user?.id,
        skills: editableSkills
      });

      if (response?.message) {
        setUser(prev => ({ ...prev, skills: editableSkills }));
        setIsEditingSkills(false);
        //alert("Skills updated successfully!");
        toast.success("Skills updated successfully!", {
          position: "top-right",
          autoClose: 3000,
          closeButton: true,
          className: 'mx-2 md:mx-4 mt-16 md:mt-20 max-w-[90vw] md:max-w-md w-fit min-w-[200px] text-sm md:text-base p-4',
          style: {
            zIndex: 9999
          }

        });
      } else {
        //throw new Error(response?.message || "Failed to update skills");
        toast.error(response?.message || "Failed to update skills", {
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
      //setError("Failed to update skills. Please try again.");
      console.error("Error updating skills:", error);
      toast.error(error.message || "Failed to update skills. Please try again.", {
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

  const handleUpdateInterests = async () => {
    if (Global.userRole !== "student") return;
    
    setLoading(true);
    setError(null);
    try {
      const response = await Global.updateStudent({
        id: user?.id,
        interest: editableInterests
      });

      if (response?.message) {
        setUser(prev => ({ ...prev, interest: editableInterests }));
        setIsEditingInterests(false);
        //alert("Interests updated successfully!");
        toast.success("Interests updated successfully!", {
          position: "top-right",
          autoClose: 3000,
          closeButton: true,
          className: 'mx-2 md:mx-4 mt-16 md:mt-20 max-w-[90vw] md:max-w-md w-fit min-w-[200px] text-sm md:text-base p-4',
          style: {
            zIndex: 9999
          }
        });
      } else {
        //throw new Error(response?.message || "Failed to update interests");
        toast.error(response?.message || "Failed to update interests", {
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
      //setError("Failed to update interests. Please try again.");
      console.error("Error updating interests:", error);
      toast.error(error.message || "Failed to update interests. Please try again.", {
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


  

  const handleCancelPhoneEdit = () => {
    setEditablePhone(user?.phone || "");
    setIsEditingPhone(false);
  };

  const handleLogout = () => {
    Global.logout();
  };

  
  
  const handleCancelSkillsEdit = () => {
    setEditableSkills(user?.skills || "");
    setIsEditingSkills(false);
  };


  const handleCancelInterestsEdit = () => {
    setEditableInterests(user?.interest || "");
    setIsEditingInterests(false);
  };




  return (
    <div className="bg-white-50 min-h-screen flex flex-col items-center p-3 w-full max-w-screen-lg mx-auto">
      <ToastContainer />
      {loading && (
          <div className="fixed top-0 left-0 right-0 bg-blue-500 text-white p-2 text-center">
            Loading...
          </div>
        )}
        {error && (
          <div className="fixed top-0 left-0 right-0 bg-red-500 text-white p-2 text-center">
            {error}
          </div>
        )}      
      <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-4xl pb-3">
        {/* Top Section (Avatar and User Info) */}
        <div className="bg-gradient-to-r from-purple-500 to-blue-400 text-white p-6 flex flex-col items-center space-y-4">
        <div className="w-32 h-32 rounded-full bg-blue-500 flex items-center justify-center border-4 border-white">
        <span className="text-white text-2xl font-semibold">
          {user ? `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`.toUpperCase() : ''}
        </span>
      </div>
  <h2 className="mt-4 text-xl font-bold text-center">
    {user?.firstName} {user?.lastName}
  </h2>
          <p className="text-sm text-center">{Global.userRole === "student" ? `Student at ${user?.college}` : `Teacher at ${user?.college}`}</p>
        </div>

        <div className="flex flex-col items-center p-4 md:p-6 lg:p-8 w-full">
          {/* Right Section (Tabs and Content) */}
          <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl bg-white  rounded-lg p-6">
            {/* Tabs */}
            <div className="flex border-b flex-wrap justify-center">
              <button
                className={`px-8 py-4 ${tab === "personalInfo" ? "border-b-2 border-purple-500 text-purple-500" : "text-gray-500"}`}
                onClick={() => setTab("personalInfo")}
              >
                Personal Info
              </button>
              {(Global.userRole === "student" || Global.userRole === "teacher") &&(
                <button
                  className={`px-8 py-4 ${tab === "professionalInfo" ? "border-b-2 border-purple-500 text-purple-500" : "text-gray-500"}`}
                  onClick={() => setTab("professionalInfo")}
                >
                  Professional Info
                </button>
              )}
              {Global.userRole === "student" && (
                <button
                  className={`px-8 py-4 ${tab === "additionalInfo" ? "border-b-2 border-purple-500 text-purple-500" : "text-gray-500"}`}
                  onClick={() => setTab("additionalInfo")}
                >
                  Additional Info
                </button>
              )}
            </div>

            {/* Tab Content */}
            {tab === "personalInfo" && (
              <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-600">First Name</label>
                  <input
                    type="text"
                    value={user?.firstName || ""}
                    className="w-full border-gray-300 rounded-lg shadow-sm p-2 mt-3"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-gray-600">Last Name</label>
                  <input
                    type="text"
                    value={user?.lastName || ""}
                    className="w-full border-gray-300 rounded-lg shadow-sm p-2 mt-3"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-gray-600">Email Address</label>
                  <input
                    type="email"
                    value={user?.email || ""}
                    className="w-full border-gray-300 rounded-lg shadow-sm p-2 mt-3"
                    readOnly
                  />
                </div>

                <div>
      <label className="block text-gray-600">Phone Number</label>
      <div className="relative">
        <div className="flex">
          <span className="flex items-center text-xs bg-gray-200 px-2 py-2 text-gray-500 rounded-l-md mt-3">+91</span>
          <input
            type="text"
            value={editablePhone.replace("+91 ", "")}
            onChange={handlePhoneChange}
            className="w-full border border-gray-300 rounded-r-lg shadow-sm p-2 mt-3"
            disabled={!isEditingPhone}
            pattern="[0-9]*"
            inputMode="numeric"
            maxLength="10"
            placeholder="Enter 10 digit number"
          />
        </div>
        {!isEditingPhone && (
          <button
            onClick={() => setIsEditingPhone(true)}
            className="absolute top-3 right-1 text-purple-500 hover:text-purple-700"
          >
            <FaEdit className="text-xm" />
          </button>
        )}
      </div>
      {isEditingPhone && (
        <div className="flex space-x-4 mt-2">
          <button
            onClick={handleUpdatePhone}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update"}
          </button>
          <button
            onClick={handleCancelPhoneEdit}
            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
              </div>
            )}

            {Global.userRole === "student" && tab === "professionalInfo" && (
              <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-600">Registered ID</label>
                  <input
                    type="text"
                    value={user?.student_id || ""}
                    className="w-full border-gray-300 rounded-lg shadow-sm p-2 mt-1"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-gray-600">College</label>
                  <input
                    type="text"
                    value={user?.college || ""}
                    className="w-full border-gray-300 rounded-lg shadow-sm p-2 mt-3"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-gray-600">Course</label>
                  <input
                    type="text"
                    value={user?.degree || ""}
                    className="w-full border-gray-300 rounded-lg shadow-sm p-2 mt-3"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-gray-600">Branch</label>
                  <input
                    type="text"
                    value={user?.dept_name || ""}
                    className="w-full border-gray-300 rounded-lg shadow-sm p-2 mt-3"
                    readOnly
                  />
                </div>
              </div>
            )}
            {Global.userRole === "teacher" && tab === "professionalInfo" && (
              <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-600">Employee ID</label>
                  <input
                    type="text"
                    value={user?.teacher_id || ""}
                    className="w-full border-gray-300 rounded-lg shadow-sm p-2 mt-1"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-gray-600">Designation</label>
                  <input
                    type="text"
                    value={user?.designation || ""}
                    className="w-full border-gray-300 rounded-lg shadow-sm p-2 mt-1"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-gray-600">College</label>
                  <input
                    type="text"
                    value={user?.college || ""}
                    className="w-full border-gray-300 rounded-lg shadow-sm p-2 mt-3"
                    readOnly
                  />
                </div>
                <div>
                </div>
                <div>
                  <label className="block text-gray-600">Course</label>
                  <input
                    type="text"
                    value={user?.degree || ""}
                    className="w-full border-gray-300 rounded-lg shadow-sm p-2 mt-3"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-gray-600">Branch</label>
                  <input
                    type="text"
                    value={user?.dept_name || ""}
                    className="w-full border-gray-300 rounded-lg shadow-sm p-2 mt-3"
                    readOnly
                  />
                </div>
              </div>
            )}

{Global.userRole === "student" && tab === "additionalInfo" && (
  <div className="mt-10 space-y-6">
    {/* Skills Section */}
    <div>
      <label className="block text-gray-600">Skills</label>
      <div className="relative">
        <textarea
          value={editableSkills}
          onChange={(e) => setEditableSkills(e.target.value)}
          className={`w-full mt-3 p-2 border border-gray-300 rounded-lg shadow-md focus:ring focus:ring-purple-500 ${
            isEditingSkills ? 'h-12' : 'h-12 resize-none'
          }`}
          disabled={!isEditingSkills}
        />
        <button
          onClick={() => setIsEditingSkills(true)}
          className={`absolute top-3 right-1 text-purple-500 hover:text-purple-700 ${isEditingSkills ? "hidden" : ""}`}
        >
          <FaEdit className="text-xm" />
        </button>
      </div>
      {isEditingSkills && (
        <div className="flex space-x-4 mt-2">
          <button
            onClick={handleUpdateSkills}
            className="px-4 py-2  bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Update
          </button>
          <button
            onClick={handleCancelSkillsEdit}
            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      )}
    </div>

    {/* Interests Section */}
    <div>
      <label className="block text-gray-600">Interests</label>
      <div className="relative">
        <textarea
          value={editableInterests}
          onChange={(e) => setEditableInterests(e.target.value)}
          className={`w-full p-2 mt-3 border border-gray-300 rounded-lg shadow-md focus:ring focus:ring-purple-500 transition-all duration-200 ease-in-out ${
            isEditingInterests ? 'h-auto min-h-[3rem] resize-y' : 'h-12 resize-none'
          }`}
          disabled={!isEditingInterests}
        />
        <button
          onClick={() => setIsEditingInterests(true)}
          className={`absolute top-3 right-1 text-purple-500 hover:text-purple-700 ${isEditingInterests ? "hidden" : ""}`}
        >
          <FaEdit className="text-xm" />
        </button>
      </div>
      {isEditingInterests && (
        <div className="flex space-x-4 mt-2">
          <button
            onClick={handleUpdateInterests}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Update
          </button>
          <button
            onClick={handleCancelInterestsEdit}
            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  </div>
)}
          </div>
        </div>
        <div className="flex p-6 mt-2">
          <button
            onClick={handleLogout}
            className="w-32 px-6 py-3 bg-red-700 text-white rounded-lg shadow-md hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
