import * as React from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Global from '../../context/Global';

export function EventDescription({ 
  imagename,
  description, 
  eventname, 
  startdate, 
  lastdate, 
  teacher_name, 
  eventType, 
  event_level,
  id,
  eventStatus,
  accepted_rejected,
  
  winner_details,
  teacher_email,
  eventsRegistered, 
  eventsRegisteredData,
  eligible_dept,
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const [localIsRegistered, setLocalIsRegistered] = React.useState(
    eventsRegistered && eventsRegisteredData.includes(eventname)
  );
  const [isAuthenticated, setIsAuthenticated] = useState(Global.isAuthenticated());
  const [showRejectForm, setShowRejectForm] = useState(false); // For showing rejection form
  const [rejectionReason, setRejectionReason] = useState(""); // For storing rejection reason

  const [status, setStatus] = useState(accepted_rejected);

  const eligibleDepartments = eligible_dept ? eligible_dept.split(',').map(dept => dept.trim()) : [];


  const handleRegistration = async (e) => {
    e.preventDefault();
    
    if (Global.userId === 0 || !isAuthenticated) {
      //alert('You need to sign in first to register.');
      toast.info('You need to sign in first to register.', {
        position: "top-right",
        autoClose: 3000,
        closeButton: true,
        className: 'mx-2 md:mx-4 mt-16 md:mt-20 max-w-[90vw] md:max-w-md w-fit min-w-[200px] text-sm md:text-base p-4',
        style: {
          zIndex: 9999
        }
      });
      navigate('/signin')
      return;

    }

    if (Global.userRole === 'teacher') {
     // alert('Only students can register for events.');
     toast.info('Only students can register for events.', {
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
      const formDataEvents = {
        student_id: Global.userId,
        event_name: eventname
      };
      
      const response = await Global.eventRegistration(formDataEvents);
      //console.log(response.message)
      if (response.message) {
        //alert('Registration completed successfully!');
        toast.success('Registration completed successfully!', {
          position: "top-right",
        autoClose: 3000,
        closeButton: true,
        className: 'mx-2 md:mx-4 mt-16 md:mt-20 max-w-[90vw] md:max-w-md w-fit min-w-[200px] text-sm md:text-base p-4',
        style: {
          zIndex: 9999
        }
        });
        setLocalIsRegistered(true); // Update local state immediately
      } else {
        //alert('Registration failed. Please try again.');
        toast.info('Your are not eligible', {
          position: "top-right",
          style: { marginTop: '40px' },
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error('An error occurred during registration. Please try again.', {
        position: "top-right",
        autoClose: 3000,
        closeButton: true,
        className: 'mx-2 md:mx-4 mt-16 md:mt-20 max-w-[90vw] md:max-w-md w-fit min-w-[200px] text-sm md:text-base p-4',
        style: {
          zIndex: 9999
        }
      });
      //alert('An error occurred during registration. Please try again.');
    }
  };



  
    const handleAccept = async (eventId) => {
      try {
        const userId = Global.userId; // Get user ID from Global context
        if (!userId || userId === 0) {
          //alert('User ID is not available. Please log in.');
          toast.error('User ID is not available. Please log in.', {
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
    
        const response = await Global.updateRegistrationAccept(eventId, userId,eventname);
    
        if (response.status === 'success') {
          //alert('Event accepted.');
          // Optionally refresh data or update UI here
          toast.success(response.message || 'Event accepted successfully!', {
            position: "top-right",
        autoClose: 3000,
        closeButton: true,
        className: 'mx-2 md:mx-4 mt-16 md:mt-20 max-w-[90vw] md:max-w-md w-fit min-w-[200px] text-sm md:text-base p-4',
        style: {
          zIndex: 9999
        }
          });
          setStatus('1'); // Update status to "Accepted"
        } else {
          toast.success(response.message || 'Failed to accept registration.', {
            position: "top-right",
        autoClose: 3000,
        closeButton: true,
        className: 'mx-2 md:mx-4 mt-16 md:mt-20 max-w-[90vw] md:max-w-md w-fit min-w-[200px] text-sm md:text-base p-4',
        style: {
          zIndex: 9999
        }
          });
          //alert(response.message || 'Failed to accept registration.');
        }
      } catch (error) {
        console.error('Error during acceptance:', error);
        toast.error(error|| 'Failed to accept registration.', {
          position: "top-right",
        autoClose: 3000,
        closeButton: true,
        className: 'mx-2 md:mx-4 mt-16 md:mt-20 max-w-[90vw] md:max-w-md w-fit min-w-[200px] text-sm md:text-base p-4',
        style: {
          zIndex: 9999
        }
        });
        //alert('An error occurred. Please try again later.');
      }
    };


    const handleReject = async (eventId) => {
      try {
        if (!rejectionReason.trim()) {
          toast.info('Please provide a reason for rejection.', {
            position: "top-right",
        autoClose: 3000,
        closeButton: true,
        className: 'mx-2 md:mx-4 mt-16 md:mt-20 max-w-[90vw] md:max-w-md w-fit min-w-[200px] text-sm md:text-base p-4',
        style: {
          zIndex: 9999
        }
          });
          //alert('Please provide a reason for rejection.');
          return;
        }
  
        const userId = Global.userId;
        if (!userId || userId === 0) {
          toast.error('User ID is not available. Please log in.', {
            position: "top-right",
            autoClose: 3000,
            closeButton: true,
            className: 'mx-2 md:mx-4 mt-16 md:mt-20 max-w-[90vw] md:max-w-md w-fit min-w-[200px] text-sm md:text-base p-4',
            style: {
              zIndex: 9999
            }
          });
          //alert('User ID is not available. Please log in.');
          return;
        }
      
        const response = await Global.updateRegistrationReject(eventId, userId, eventname, rejectionReason);
        if (response.status === 'success') {
          toast.success(response.message , {
            position: "top-right",
            autoClose: 3000,
            closeButton: true,
            className: 'mx-2 md:mx-4 mt-16 md:mt-20 max-w-[90vw] md:max-w-md w-fit min-w-[200px] text-sm md:text-base p-4',
            style: {
              zIndex: 9999
            }
          });
          //alert('Event rejected and reason sent to the teacher.');
          setShowRejectForm(false); // Close the form
          setRejectionReason("");  // Reset the reason
          setStatus('0'); // Update status to "Rejected"
        } else {
          toast.error(response.message || 'Failed to reject event.', {
            position: "top-right",
            autoClose: 3000,
            closeButton: true,
            className: 'mx-2 md:mx-4 mt-16 md:mt-20 max-w-[90vw] md:max-w-md w-fit min-w-[200px] text-sm md:text-base p-4',
            style: {
              zIndex: 9999
            }
          });
          //alert(response.message || 'Failed to reject event.');
        }
      } catch (error) {
        console.error('Error during rejection:', error);
        toast.error('An error occurred. Please try again later.', {
          position: "top-right",
          autoClose: 3000,
          closeButton: true,
          className: 'mx-2 md:mx-4 mt-16 md:mt-20 max-w-[90vw] md:max-w-md w-fit min-w-[200px] text-sm md:text-base p-4',
          style: {
            zIndex: 9999
          }
        });
        //alert('An error occurred. Please try again later.');
      }
    };


  const imageUrl = `http://localhost/ci4/backend/public/uploads/event_images/${imagename}`;
  const eventStartDate = new Date(startdate);
  const currentDate = new Date();
  const winnerList = winner_details ? winner_details.split(',').map(winner => winner.trim()) : [];
  const isTeacher = Global.userRole === 'teacher';


  return (
    <div className="max-w-5xl mx-auto p-8 bg-white">
      <ToastContainer />
      <div className="space-y-8">
      <div className="relative w-full pt-[69.15%] rounded-md ">
          <div className="absolute inset-0 p-2.5">
            <img
              loading="lazy"
              src={imageUrl}
              alt="Event"
              className="w-full h-full object-contain rounded-md"
            />
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-medium text-gray-700 mb-4">Event Details</h2>
          <div className="space-y-6">
            <p className="text-base text-gray-600 leading-relaxed">
              <span className="font-semibold">Event Name: </span>{eventname}
            </p>
            <p className="text-base text-gray-600 leading-relaxed">
              <span className="font-semibold">Event Type: </span>{eventType}
            </p>
            <p className="text-base text-gray-600 leading-relaxed">
              <span className="font-semibold">Event Level: </span>{event_level}
            </p>
            <p className="text-base text-gray-600 leading-relaxed">
              <span className="font-semibold">Description: </span>{description}
            </p>
          </div>
        </div>

        {/* Eligible Departments Section */}
        <div>
              <p className="text-lg font-semibold text-gray-700">Eligible Departments:</p>
              <ul className="list-disc list-inside text-base text-gray-600">
                {eligibleDepartments.map((dept, index) => (
                  <li key={index}>{dept}</li>
                ))}
              </ul>
            </div>

        <div>
          <h2 className="text-2xl font-medium text-gray-700 mb-4">Hours</h2>
          <div className="space-y-2">
            <p className="text-base text-gray-600">
              <span className="font-semibold">Start Date: </span>{startdate}
            </p>
            <p className="text-base text-gray-600">
              <span className="font-semibold">Last Date: </span>{lastdate}
            </p>
          </div>
        </div>

        {eventStartDate < currentDate && winnerList.length > 0 && (
          <div>
            <h2 className="text-2xl font-medium text-gray-700 mb-4">Winner Details</h2>
            <div className="space-y-2">
              {winnerList[0] && (
                <p className="text-base text-gray-600">
                  <span className="font-semibold">1st Winner: </span>{winnerList[0]}
                </p>
              )}
              {winnerList[1] && (
                <p className="text-base text-gray-600">
                  <span className="font-semibold">2nd Winner: </span>{winnerList[1]}
                </p>
              )}
              {winnerList[2] && (
                <p className="text-base text-gray-600">
                  <span className="font-semibold">3rd Winner: </span>{winnerList[2]}
                </p>
              )}
            </div>
          </div>
        )}

        <div>
          <h2 className="text-2xl font-medium text-gray-700 mb-4">How can I contact the organizer with any question?</h2>
          <div>
            <p className="text-base text-gray-600">
              <span className="font-semibold">Organizer Name: </span>{teacher_name}
            </p>
            <p className="text-base text-gray-600">
              <span className="font-semibold">Organizer Email: </span>{teacher_email}
            </p>
          </div>
        </div>


{/* Admin Buttons */}
{Global.userRoleId === 4 && (
  <div className="mt-8 flex gap-4">
    {status === '1' && (
      <button
        className="px-6 py-2 text-white bg-green-600 rounded cursor-not-allowed"
        disabled
      >
        Accepted
      </button>
    )}
    {status === '0' && (
      <button
        className="px-6 py-2 text-white bg-red-600 rounded cursor-not-allowed"
        disabled
      >
        Rejected
      </button>
    )}
    {status === null && (
      <>
        <button
          className="px-6 py-2 text-white bg-purple-600 rounded hover:bg-blue-700 transition-colors"
          onClick={() => handleAccept(id)}
        >
          Accept
        </button>
        <button
          className="px-6 py-2 text-white bg-gray-600 rounded hover:bg-blue-700 transition-colors"
          onClick={() => setShowRejectForm(true)}
        >
          Reject
        </button>
      </>
    )}
  </div>
)}


        {/* Rejection Reason Form */}
        {showRejectForm && (
          <div className="mt-4 bg-gray-100 p-4 rounded shadow">
            <h3 className="text-lg font-medium text-gray-800 mb-2">Reason for Rejection</h3>
            <textarea
              className="w-full p-2 border border-gray-300 rounded mb-4"
              rows="4"
              placeholder="Enter the reason for rejection..."
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
            ></textarea>
            <div className="flex gap-4">
              <button
                className="px-6 py-2 text-white bg-red-600 rounded hover:bg-red-700 transition-colors"
                onClick={() => handleReject(id)}
              >
                Submit
              </button>
              <button
                className="px-6 py-2 text-gray-600 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
                onClick={() => setShowRejectForm(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {eventStartDate >= currentDate && !isTeacher && (
          <div className="mt-8">
            <button
              className={`px-6 py-2 rounded transition-colors ${
                localIsRegistered
                  ? "bg-red-600 text-white hover:bg-red-700"
                  : "bg-violet-600 text-white hover:bg-violet-700"
              }`}
              onClick={!localIsRegistered ? handleRegistration : undefined}
              disabled={localIsRegistered}
            >
              {localIsRegistered ? "Registered" : "Register"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}