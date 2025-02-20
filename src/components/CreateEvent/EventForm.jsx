import * as React from "react";
import { useEffect, useState, useRef  } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { EventDescription } from "./EventDescription";
import Global from "../../context/Global";
import { AiOutlineFile } from 'react-icons/ai'; // Import the file icon


function EventForm() {
  const [formData, setFormData] = useState({
    title: "",
    venue: "",
    venueType: "",
    degree: "",
    department: "",
    startTime: "",
    endTime: "",
    startDate: "",
    endDate: "",
    event_image: null,
    description: "",
    eventType: "",
    event_level: "",
    eligibleDepartments: "",
  });

  const [errors, setErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});
  
  // Add state to track if form was submitted
  const [formWasSubmitted, setFormWasSubmitted] = useState(false);

  const [isEligibleDeptDropdownOpen, setIsEligibleDeptDropdownOpen] = useState(false);
    // Add state for available departments
    const [availableDepartments, setAvailableDepartments] = useState([]);
    // Add new useEffect to fetch all departments
  useEffect(() => {
    const fetchAllDepartments = async () => {
      try {
        const response = await Global.fetchDepartments();
        if (response && response.data) {
          setAvailableDepartments(response.data);
        }
      } catch (error) {
        //console.error("Error fetching departments:", error);
        toast.error('Error fetching departments', {
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

    fetchAllDepartments();
  }, []); // Empty dependency array means this runs once on component mount



const [dropdownData, setDropdownData] = useState({
    degrees: [],
    colleges: [],
    departments: [],
  });
  const [venues, setVenues] = useState([]); // Ensure venues is an array
  const [eventTypes, setEventTypes] = useState([]);
  const [eventLevels, setEventLevels] = useState([]);
  // Updated state for custom dropdown and facilities
  const [isVenueDropdownOpen, setIsVenueDropdownOpen] = useState(false);
  const [facilities, setFacilities] = useState(null);
  const [selectedVenueFacilities, setSelectedVenueFacilities] = useState(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const dropdownRef = useRef(null);
  const tooltipRef = useRef(null);

  // const [eventLevels, setEventLevels] = useState([]);

  // Fetch venues whenever filters change
  useEffect(() => {
    const fetchVenues = async () => {
      if (formData.startDate && formData.startTime && formData.endTime && formData.venueType ) {
        const filters = {
          start_date: formData.startDate,
          end_date: formData.endDate,
          start_time: formData.startTime,
          end_time: formData.endTime,
          room_type: formData.venueType,
        };
        
        //console.log('Fetching venues with filters:', filters);
        const availableVenues = await Global.fetchVenues(filters);
        // Ensure availableVenues is an array
       console.log('avaial'+JSON.stringify(availableVenues['data']));
        setVenues(Array.isArray(availableVenues['data'])?availableVenues['data']:[]);
        
      }
    };
    fetchVenues();
  }, [formData.startDate, formData.startTime, formData.endTime, formData.venueType, formData.event_level]);

  useEffect(() => {
    const fetchEventType = async () => {
      try{
        const availableEventTypes = await Global.fetchEventType();
        // Ensure availableVenues is an array
        //console.log('avaial'+JSON.stringify(availableEventTypes['data']));
        setEventTypes(Array.isArray(availableEventTypes['data'])?availableEventTypes['data']:[]);
        
      }catch (error) {
        console.error("Error fetching dropdown data:", error);
      }
        
        
      };
  
      fetchEventType();
  }, []);

  

  useEffect(() => {
    const fetchData1 = async () => {
      try {
        const degrees = await Global.fetchDegrees();
        // const colleges = await Global.fetchColleges();
        // const departments = await Global.fetchDepartments();

        //console.log("Fetched degree:", degrees); 

        setDropdownData({
          degrees: degrees.data || [],

        });
      } catch (error) {
        console.error("Error fetching dropdown data:", error);
      }
    };

    fetchData1();
  }, []);

  useEffect(() => {
    const fetchEventLevels = async () => {
      try {
        const response = await Global.fetchEventLevels();
        // Extract event_level values from the response data
        const levels = Array.isArray(response.data) 
          ? response.data.map(level => level.event_level) 
          : [];
        setEventLevels(levels);
      } catch (error) {
        console.error("Error fetching Event Levels data:", error);
      }
    };
    fetchEventLevels();
  }, []);


  useEffect(() => {
    const fetchDepartments = async () => {
      if (formData.degree) {
        try {
          const departments = await Global.fetchDepart(formData.degree);
          //console.log("Fetched Departments:", departments); // Debug log
          setDropdownData((prev) => ({
            ...prev,
            departments: departments.data || [], // Ensure it's an array
          }));
        } catch (error) {
          console.error("Error fetching departments:", error);
        }
      }
    };
    
    fetchDepartments();
  }, [formData.degree]);

  const handleVenueHover = async (venue) => {
    try {
      const response = await Global.fetchRoomfacilities(venue.id);
      if (response && response.data) {
        setFacilities(response.data);
      }
    } catch (error) {
      //console.error('Error fetching facilities:', error);
      setFacilities(null);
    }
  };




  // Add a ref for the dropdown
  const eligibleDeptDropdownRef = useRef(null);

  // Add click outside handler for the eligible departments dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (eligibleDeptDropdownRef.current && !eligibleDeptDropdownRef.current.contains(event.target)) {
        setIsEligibleDeptDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  

  const handleVenueChange = async (venueId, venueRoomNo) => {
    handleInputChange("venue", venueRoomNo);
    try {
      const response = await Global.fetchRoomfacilities(venueId);
      if (response && response.data) {
        setSelectedVenueFacilities(response.data);
      }
    } catch (error) {
      //console.error('Error fetching facilities:', error);
      setSelectedVenueFacilities(null);
    }
  };

  // Close tooltip when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target)) {
        setShowTooltip(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);




// Validation function
const validate = (name, value) => {
  switch (name) {
    case 'title':
      return value.trim() ? '' : 'Title is required';
    case 'startTime':
      return value ? '' : 'Start time is required';
    case 'endTime':
      return value ? '' : 'End time is required';
    case 'startDate':
      return value ? '' : 'Start date is required';
    case 'endDate':
      return value ? '' : 'End date is required';
    case 'eventType':
      return value ? '' : 'Event type is required';
    case 'venueType':
      return value ? '' : 'Venue type is required';
    case 'degree':
      return value ? '' : 'Degree is required';
    case 'department':
      return value ? '' : 'Department is required';
    case 'venue':
        // Only return error if form was submitted or field was touched
      return (touchedFields.venue || formWasSubmitted) && !value ? 'Please select Venue' : '';
    case 'description':
      return value.trim() ? '' : 'Description is required';
    case 'event_level':
      return value ? '' : 'Event level is required';
    case 'event_image':
      return value ? '' : 'Event image is required';
    case 'eligibleDepartments':
      return value.length > 0 ? '' : 'At least one eligible department must be selected';  
    default:
      return '';
  }
};


// Modified handleEligibleDepartmentToggle function
const handleEligibleDepartmentToggle = (deptName, id) => {
  setFormData(prev => {
    // If selecting "ALL"
    if (id === "ALL") {
      return {
        ...prev,
        eligibleDepartments: "ALL"
      };
    }
    
    // If current selection is "ALL" and selecting a specific department
    if (prev.eligibleDepartments === "ALL") {
      return {
        ...prev,
        eligibleDepartments: id.toString()
      };
    }

    const currentDepts = prev.eligibleDepartments ? prev.eligibleDepartments.split(',') : [];
    let updatedDepts;
    
    if (currentDepts.includes(id.toString())) {
      updatedDepts = currentDepts.filter(dept => dept !== id.toString());
    } else {
      updatedDepts = [...currentDepts, id.toString()];
    }
    
    return {
      ...prev,
      eligibleDepartments: updatedDepts.join(',')
    };
  });

  setTouchedFields(prev => ({
    ...prev,
    eligibleDepartments: true
  }));

  // Update validation to check string length instead of array length
  const error = validate('eligibleDepartments', formData.eligibleDepartments);
  setErrors(prev => ({
    ...prev,
    eligibleDepartments: error
  }));
};

      // Add a click handler for the multiselect
  const handleMultiSelectClick = (e) => {
    e.preventDefault(); // Prevent form submission
    setIsEligibleDeptDropdownOpen(!isEligibleDeptDropdownOpen);
  };


  useEffect(() => {
    // Clear venue selection when venue type changes
    handleInputChange("venue", "");
    setSelectedVenueFacilities(null);
    setShowTooltip(false);
  }, [formData.venueType]);


 // alert(formData.eligibleDepartments)
  

  const formDataToSend = new FormData();
  formDataToSend.append("event_image", formData.event_image); // Send only the image
  const handleInputChange = (name, value) => {
    setFormData((prev) => {
      const updatedData = { ...prev, [name]: value };
      if (name === "event_level" && value === "National") {
        updatedData.eligibleDepartments = "ALL";
      }
      
      console.log(`Updated ${name}:`, updatedData);

      return updatedData;
    });
        // Mark field as touched
        setTouchedFields(prev => ({
          ...prev,
          [name]: true
        }));
        // Validate the field and update errors
        const error = validate(name, value);
        setErrors(prev => ({
          ...prev,
          [name]: error
        }));
  };


  
  // Helper component for error message that only shows for touched fields
  const ErrorMessage = ({ field, message }) => {
    if (!touchedFields[field] && !formWasSubmitted) return null;
    return message ? <div className="text-red-500 text-sm mt-1">{message}</div> : null;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormWasSubmitted(true); // Mark form as submitted
    // Validate all fields
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validate(key, formData[key]);
      if (error) {
        newErrors[key] = error;
      }
    });

    // Additional validation for date and time
    if (formData.startDate && formData.endDate) {
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);
      if (end < start) {
        newErrors.endDate = 'End date must be after or equal to start date';
      }
    }

    if (formData.startTime && formData.endTime) {
      const startTime = new Date(`2000/01/01 ${formData.startTime}`);
      const endTime = new Date(`2000/01/01 ${formData.endTime}`);
      // if (endTime <= startTime) {
      //   newErrors.endTime = 'End time must be after start time';
      // }
    }

    setErrors(newErrors);

    // If there are any errors, don't submit
    if (Object.keys(newErrors).length > 0) {
      toast.error('Please fill in all required fields correctly', {
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
        // Check specifically for image
    if (!formData.event_image) {
      toast.error('Please upload an event image', {
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



    const filterscreate = {
      event_name: formData.title,
      description: formData.description,
      dept_name: formData.department,
      start_date: formData.startDate,
      end_date: formData.endDate,
      start_time: formData.startTime,
      end_time: formData.endTime,
      room_no: formData.venue,
      eventType: formData.eventType,
      event_level: formData.event_level,
      eligibleDepartments: formData.eligibleDepartments,
    };


    try {
      const response = await Global.createEvent(filterscreate);
      //console.log(response.success)
      
      if (response.status) {
        setTouchedFields({});
      setFormWasSubmitted(false);
        toast.success('Event created successfully!', {
          position: "top-right",
          autoClose: 3000,
          closeButton: true,
          className: 'mx-2 md:mx-4 mt-16 md:mt-20 max-w-[90vw] md:max-w-md w-fit min-w-[200px] text-sm md:text-base p-4',
          style: {
            zIndex: 9999
          }
        });

         // Reset the form data after successful creation
      setFormData({
        title: "",
        venue: "",
        venueType: "",
        degree: "",
        department: "",
        startTime: "",
        endTime: "",
        startDate: "",
        endDate: "",
        event_image: null,
        description: "",
        eventType: "",
        event_level: "",
        eligibleDepartments: "",
      });

      // You can also reset other states if necessary
      setVenues([]);
      //setEventTypes([]);
      //setEventLevels([]);
      setDropdownData({
        degrees: [],
        colleges: [],
        departments: [],
      });
    
      } else {
        toast.error('Failed to create event', {
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
      toast.error(error.message, {
        position: "top-right",
        autoClose: 3000,
        closeButton: true,
        className: 'mx-2 md:mx-4 mt-16 md:mt-20 max-w-[90vw] md:max-w-md w-fit min-w-[200px] text-sm md:text-base p-4',
        style: {
          zIndex: 9999
        }
      });
/*       console.error("Error during event creation:", error);
      toast.error('Error creating event', {
        position: "top-right",
        autoClose: 3000,
      }); */
    }

    try {
      const response = await Global.uploadEventImage(formDataToSend);
      
      if (response.status) {
        toast.success('Image uploaded successfully', {
          position: "top-right",
          autoClose: 3000,
          closeButton: true,
          className: 'mx-2 md:mx-4 mt-16 md:mt-20 max-w-[90vw] md:max-w-md w-fit min-w-[200px] text-sm md:text-base p-4',
          style: {
            zIndex: 9999
          }
        });
      } else {
        toast.error('Error uploading image', {
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
      
      //console.error("Error during image upload:", error);
      toast.error('Error uploading image', {
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

  //console.log("Image Upload"+(formData.event_image.size))


  
 

  return (
    <div className="flex overflow-hidden flex-col items-center pt-5 pb-36 bg-violet-100 rounded-3xl max-md:px-5 max-md:pb-24">
      <ToastContainer />
      <div className="flex flex-col items-center w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <form onSubmit={handleSubmit} className="flex flex-col justify-center mt-2 w-full max-w-[816px] text-xs">
          <h1 className="text-4xl font-bold text-center text-black max-md:max-w-full">
            Create Event
          </h1>
          
          {/* Event Title */}
          <div className="mt-4 w-full">
            <label className="font-medium">Event Title<span className="text-red-500">*</span></label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              className={`w-full mt-2 p-2 border rounded-md ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Enter event title"
              required
            />
            <ErrorMessage field="title" message={errors.title} />
          </div>

          {/* Time Input Group */}
          <div className="mt-4 w-full">
            <label className="font-medium">Event Time<span className="text-red-500">*</span></label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <input
                  type="time"
                  value={formData.startTime}
                  onChange={(e) => handleInputChange("startTime", e.target.value)}
                  className={`w-full mt-2 p-2 border rounded-md ${errors.startTime ? 'border-red-500' : 'border-gray-300'}`}
                  required
                />
                <ErrorMessage field="startTime" message={errors.startTime} />
              </div>
              <div>
                <input
                  type="time"
                  value={formData.endTime}
                  onChange={(e) => handleInputChange("endTime", e.target.value)}
                  className={`w-full mt-2 p-2 border rounded-md ${errors.endTime ? 'border-red-500' : 'border-gray-300'}`}
                  required
                />
                <ErrorMessage field="endTime" message={errors.endTime} />
              </div>
            </div>
          </div>

          {/* Date Input Group */}
          <div className="mt-4 w-full">
            <label className="font-medium">Event Date<span className="text-red-500">*</span></label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => handleInputChange("startDate", e.target.value)}
                  className={`w-full mt-2 p-2 border rounded-md ${errors.startDate ? 'border-red-500' : 'border-gray-300'}`}
                  required
                />
                <ErrorMessage field="startDate" message={errors.startDate} />
              </div>
              <div>
                <input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => handleInputChange("endDate", e.target.value)}
                  className={`w-full mt-2 p-2 border rounded-md ${errors.endDate ? 'border-red-500' : 'border-gray-300'}`}
                  required
                />
                <ErrorMessage field="endDate" message={errors.endDate} />
              </div>
            </div>
          </div>

          {/* Event Level */}
          <div className="mt-4 w-full">
            <label className="font-medium">Event Level<span className="text-red-500">*</span></label>
            <div className="mt-2 flex flex-wrap gap-2">
              {eventLevels.map((level) => (
                <label key={level} className="inline-flex items-center mr-4">
                  <input
                    type="radio"
                    name="event_level"
                    value={level}
                    checked={formData.event_level === level}
                    onChange={(e) => handleInputChange("event_level", e.target.value)}
                    className={`form-radio ${errors.event_level ? 'border-red-500' : ''}`}
                    required
                  />
                  <span className="ml-2">{level}</span>
                </label>
              ))}
            </div>
            <ErrorMessage field="event_level" message={errors.event_level} />
          </div>



          {/* Multi-select Eligible Departments styled as dropdown */}
  {/* Multi-select Eligible Departments styled as dropdown */}
  {formData.event_level === 'Institute' && (
    <div className="mt-4 w-full" ref={eligibleDeptDropdownRef}>
      <label className="font-medium">Eligible Departments<span className="text-red-500">*</span></label>
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsEligibleDeptDropdownOpen(!isEligibleDeptDropdownOpen)}
          className={`w-full mt-2 p-2 border rounded-md bg-white text-left relative
            ${errors.eligibleDepartments ? 'border-red-500' : 'border-gray-300'}
            focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent`}
        >
          <span className={formData.eligibleDepartments.length === 0 ? 'text-gray-500' : 'text-black'}>
            {formData.eligibleDepartments === "ALL" 
              ? "All Departments"
              : formData.eligibleDepartments 
                ? `${formData.eligibleDepartments.split(',').length} department(s) selected`
                : 'Select Eligible Departments'}
          </span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <svg
              className="h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </button>

        {isEligibleDeptDropdownOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
            {/* Add ALL option at the top */}
            <div
              className="px-2 py-2 hover:bg-gray-100 cursor-pointer border-b"
              onClick={() => handleEligibleDepartmentToggle("ALL", "ALL")}
            >
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.eligibleDepartments === "ALL"}
                  onChange={(e) => {
                    e.stopPropagation();
                    handleEligibleDepartmentToggle("ALL", "ALL");
                  }}
                  className="form-checkbox h-4 w-4 text-violet-600 rounded"
                />
                <span className="select-none">ALL</span>
              </label>
            </div>
            
            {/* Existing department options */}
            {Array.isArray(availableDepartments) &&
              availableDepartments.map((department) => (
                <div
                  key={department.id}
                  className="px-2 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    handleEligibleDepartmentToggle(department.dept_name, department.id);
                  }}
                >
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.eligibleDepartments !== "ALL" && 
                              formData.eligibleDepartments.split(',').includes(department.id.toString())}
                      onChange={(e) => {
                        e.stopPropagation();
                        handleEligibleDepartmentToggle(department.dept_name, department.id);
                      }}
                      className="form-checkbox h-4 w-4 text-violet-600 rounded"
                      disabled={formData.eligibleDepartments === "ALL"}
                    />
                    <span className="select-none">{department.dept_name}</span>
                  </label>
                </div>
              ))}
          </div>
        )}
      </div>
      <ErrorMessage field="eligibleDepartments" message={errors.eligibleDepartments} />
      
      {/* Selected departments tags */}
      {formData.eligibleDepartments && formData.eligibleDepartments !== "ALL" && (
        <div className="mt-2 flex flex-wrap gap-2">
          {formData.eligibleDepartments.split(',').map((deptId) => {
            const department = availableDepartments.find(d => d.id.toString() === deptId);
            return department ? (
              <span
                key={deptId}
                className="inline-flex items-center px-2 py-1 bg-gray-100 border border-gray-300 rounded-md text-sm"
              >
                {department.dept_name}
                <button
                  type="button"
                  onClick={() => handleEligibleDepartmentToggle(department.dept_name, department.id)}
                  className="ml-1 text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </span>
            ) : null;
          })}
        </div>
      )}
    </div>
  )}




          {/* Event Type */}
          <div className="mt-4 w-full">
            <label className="font-medium">Event Type<span className="text-red-500">*</span></label>
            <select
              value={formData.eventType}
              onChange={(e) => handleInputChange("eventType", e.target.value)}
              className={`w-full mt-2 p-2 border rounded-md ${errors.eventType ? 'border-red-500' : 'border-gray-300'}`}
              required
            >
              <option value="">Select Event Type</option>
              {Array.isArray(eventTypes) && eventTypes.length > 0 ? (
                eventTypes.map((eventType) => (
                  <option key={eventType.id} value={eventType.eventType}>
                    {eventType.eventType}
                  </option>
                ))
              ) : (
                <option>No event types available</option>
              )}
            </select>
            <ErrorMessage field="eventType" message={errors.eventType} />
          </div>

          {/* Venue Type */}
          <div className="mt-4 w-full">
            <label className="font-medium">Type of Venue<span className="text-red-500">*</span></label>
            <div className="mt-2">
              {["Seminar Hall", "Classroom", "Lab", "Auditorium", "E-Classroom"].map((venueOption) => (
                <label key={venueOption} className="inline-flex items-center mr-4">
                  <input
                    type="radio"
                    name="venueType"
                    value={venueOption}
                    checked={formData.venueType === venueOption}
                    onChange={(e) => handleInputChange("venueType", e.target.value)}
                    className={`form-radio ${errors.venueType ? 'border-red-500' : ''}`}
                    required
                  />
                  <span className="ml-2">{venueOption}</span>
                </label>
              ))}
            </div>
            <ErrorMessage field="venueType" message={errors.venueType} />
          </div>



          {/* Venue */}
          <div className="mt-4 w-full">
            <label className="font-medium">Venue<span className="text-red-500">*</span></label>
            <div className="flex items-center gap-2">
              <select
                value={formData.venue}
                onChange={(e) => {
                  if (e.target.value === "") {
                    handleInputChange("venue", "");
                    setSelectedVenueFacilities(null);
                    setShowTooltip(false);
                  } else {
                    const selectedVenue = venues.find(v => v.room_no === e.target.value);
                    if (selectedVenue) {
                      handleVenueChange(selectedVenue.id, selectedVenue.room_no);
                    }
                  }
                }}
                onBlur={() => setTouchedFields(prev => ({ ...prev, venue: true }))}
                className={`w-full mt-2 p-2 border rounded-md ${
                  (touchedFields.venue || formWasSubmitted) && errors.venue 
                    ? 'border-red-500' 
                    : 'border-gray-300'
                }`}
                required
              >
                <option value="">Select Venue</option>
                {Array.isArray(venues) && venues.length > 0 ? (
                  venues.map((venue) => (
                    <option key={venue.room_no} value={venue.room_no}>
                      {venue.room_no} ( Capacity: {venue.seating_capacity} )
                    </option>
                  ))
                ) : (
                  <option>No venues available</option>
                )}
              </select>
              {formData.venue && (
                <button
                  type="button"
                  className="mt-2 text-violet-600 hover:text-violet-800"
                  onClick={() => setShowTooltip(!showTooltip)}
                >
                  ℹ️
                </button>
              )}
            </div>
            <ErrorMessage  field="venue" message={errors.venue} />
            
            {/* Facilities Tooltip */}
            {showTooltip && formData.venue && (
              <div ref={tooltipRef} className="absolute mt-2 p-4 bg-white border rounded-md shadow-lg min-w-[200px] z-50">
                <h4 className="font-bold mb-2">Room Facilities:</h4>
                {selectedVenueFacilities && selectedVenueFacilities.length > 0 ? (
                  <ul className="space-y-1">
                    {selectedVenueFacilities.map((facility, index) => (
                      <li key={index} className="text-sm">
                        • {facility.facility}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-600">No facilities available</p>
                )}
              </div>
            )}
          </div>    



          {/* Degree */}
          <div className="mt-4 w-full">
            <label className="font-medium">Degree<span className="text-red-500">*</span></label>
            <select
              value={formData.degree}
              onChange={(e) => handleInputChange("degree", e.target.value)}
              className={`w-full mt-2 p-2 border rounded-md ${errors.degree ? 'border-red-500' : 'border-gray-300'}`}
              required
            >
              <option value="">Select Degree</option>
              {dropdownData.degrees?.map((degree) => (
                <option key={degree.degree} value={degree.degree}>
                  {degree.degree}
                </option>
              ))}
            </select>
            <ErrorMessage field="degree" message={errors.degree} />
          </div>

          {/* Department */}
          <div className="mt-4 w-full">
            <label className="font-medium">Department<span className="text-red-500">*</span></label>
            <select
              value={formData.department}
              onChange={(e) => handleInputChange("department", e.target.value)}
              className={`w-full mt-2 p-2 border rounded-md ${errors.department ? 'border-red-500' : 'border-gray-300'}`}
              required
            >
              <option value="">Select Department</option>
              {Array.isArray(dropdownData.departments) &&
                dropdownData.departments.map((department) => (
                  <option key={department.id} value={department.dept_name}>
                    {department.dept_name}
                  </option>
                ))}
            </select>
            <ErrorMessage field="department" message={errors.department} />
          </div>

          

         {/* Description */}
         <div className="mt-4 w-full">
            <EventDescription
              event_image={formData.event_image}
              description={formData.description}
              onImageChange={(file) => {
                handleInputChange("event_image", file);
                setTouchedFields(prev => ({
                  ...prev,
                  event_image: true
                }));
              }}
              onDescriptionChange={(value) => handleInputChange("description", value)}
              error={touchedFields.event_image || formWasSubmitted ? errors.event_image : ''}
            />
            {touchedFields.event_image || formWasSubmitted ? (
              <ErrorMessage field="event_image" message={errors.event_image} />
            ) : null}
          </div>

          <button
            type="submit"
            className="gap-2.5 px-10 py-4 mt-10 w-full text-base text-center text-white bg-violet-600 rounded-md hover:bg-violet-700 transition-colors max-md:px-5"
          >
            Create Event
          </button>
        </form>
      </div>
    </div>
  );
}

export default EventForm;