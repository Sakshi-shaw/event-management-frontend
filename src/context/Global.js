import axios from 'axios';
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";

 
const BASE_URL = 'http://localhost/ci4/backend'; 


const secretKey = "EventManagement"; 

  // Encrypt and store session ID in cookies
const encryptSessionId = (session_id) => {
  const encrypted = CryptoJS.AES.encrypt(session_id, secretKey).toString();
  //console.log("Encrypted Session ID:", encrypted);

  // Store in a cookie (expires in 1 day)
  Cookies.set("encrypted_session_id", encrypted, { expires: 1/12, secure: true, sameSite: "Strict" });
};

// Decrypt session ID from cookies
const decryptSessionId = () => {
  const encryptedSessionId = Cookies.get("encrypted_session_id");

  if (!encryptedSessionId) {
    //console.error("No encrypted session ID found in cookies.");
    return null;
  }

  try {
    //console.log("Stored Encrypted ID:", encryptedSessionId);
    const bytes = CryptoJS.AES.decrypt(encryptedSessionId, secretKey);
    const originalSessionId = bytes.toString(CryptoJS.enc.Utf8);

    if (!originalSessionId) {
      //console.error("Decryption failed. Incorrect key or corrupted data.");
      return null;
    }

    //console.log("Decrypted Session ID:", originalSessionId);
    return originalSessionId;
  } catch (error) {
    //console.error("Error during decryption:", error);
    return null;
  }
};




  

const Global = {
  userId: localStorage.getItem('userId') ? Number(localStorage.getItem('userId')) : 0,
  userRole: localStorage.getItem('userRole') || '',
  userRoleId: localStorage.getItem('userRoleId') ? Number(localStorage.getItem('userRoleId')) : 0,
  
  

  setUserId: (id) => {
    if (typeof id === 'number') {
      Global.userId = id;
      localStorage.setItem('userId', id);
      //console.log('Global.userId:', Global.userId);
    } else {
      //console.error('Invalid userId type. It must be a number.');
    }
  },

  setUserRole: (role) => {
    if (typeof role === 'string') {
      Global.userRole = role;
      localStorage.setItem('userRole', role);
      //console.log('Global.userRole:', Global.userRole);
    } else {
      //console.error('Invalid userRole type. It must be a string.');
    }
  },

  setUserRoleId: (role_id) => {
    if (typeof role_id === 'number') {
      Global.userRoleId = role_id;
      localStorage.setItem('userRoleId', role_id); // Store userRoleId in localStorage
      //console.log('Global.userRoleId: ' + Global.userRoleId);
    } else {
      //console.error('Invalid userRole type. It must be a string.');
    }
  },

  getUserId: () => parseInt(localStorage.getItem('userId')) || 0,

  getUserRole: () => localStorage.getItem('userRole') || '',

  getUserRoleId: () => {
    return localStorage.getItem('role_id') || 0;
  },



  isAuthenticated: async () => {
    const decrypt_id = decryptSessionId(Cookies.get('session_id'));
    if (!decrypt_id || !Cookies.get("session_id")) {
      //console.log("Session expired, logging out...");
      Global.logout(); // Auto logout if session is expired
      return false;
    }
    try {
      // Await the axios request to get response
      const response = await axios.post(`${BASE_URL}/checkAuth`, JSON.stringify({
        session_id: decrypt_id,
      }));
  
      //console.log("isAuthenticated response:", response.data.message);
      
      // Check if the response is successful
      if (response.data.success === true) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      //console.error("Error in isAuthenticated:", error);
      return false;
    }
  },
  


  logout: async () => {
    const decrypt_id = decryptSessionId(Cookies.get('session_id'));
    
    try {
      const response = await axios.post(`${BASE_URL}/logout`,JSON.stringify({
        session_id: decrypt_id,
      }));
      if (response.status === 200) {
        localStorage.removeItem('userId');
        localStorage.removeItem('userRole');
        localStorage.removeItem('userRoleId');
        window.location.href = '/';
      }
    } catch (error) {
      //console.error('Error logging out:', error);
    }
  },


    login: async (userData) => {
      //console.log(userData)
      try {

        const response = await axios.post(`${BASE_URL}/login`, JSON.stringify(userData));
       // console.log("67"+JSON.stringify(response.status)); 
        //console.log("ji"+JSON.stringify(response.data))
        // Check for successful registration and return the response data
        if (response.status === 200) {
          //const data=JSON.stringify(response.data['data'])
         
          const { logid, id,session_id, data } = response.data; // Destructure response data
  
        // Store id in the global variable
          Global.setUserId(Number(id));
          Global.setUserRole(String(data.role));
          Global.setUserRoleId(Number(data.role_id));
         //console.log("session_id"+session_id, " ",encryptSessionId(session_id));
         encryptSessionId(session_id);
          Cookies.set("session_id", session_id, { expires: 1 / 12, secure: true, sameSite: "Strict" });
          scheduleAutoLogout();
  
        //console.log("Logged in user ID:", id);
  
        //console.log("use:", Global.userId);
        //console.log("Logged in user Role:", data.role);
  
        //console.log("user role id:", Global.userRoleId);
          return response.data; // Return response data if registration is successful
        } else {
          // Handle unsuccessful registration
          throw new Error(response.data.message || 'Error sigin user');
        }
      } catch (error) {
        console.error('Error sigin user:', error);
        //return { success: false, message: error.response?.data?.message || 'An error occurred during login' };
        if (error.response && error.response.data && error.response.data.message) {
          throw new Error(error.response.data.message);
        } else {
          throw new Error('An error occurred while sigin.');
        }
      }
    
    },    



  
  registerUser: async (userData) => {
    try {
      const response = await axios.post(`${BASE_URL}/register`, JSON.stringify(userData), {
        headers: { 'Content-Type': 'application/json' },
      });
      //console.log("67"+JSON.stringify(response.data)); 
      // Check for successful registration and return the response data
      if (response.status === 200 || response.status === 201) {
        return response.data; // Registration is successful
    } else {
        throw new Error(response.data.message || 'Error occurred while signup');
    }
    } catch (error) {
      //console.error('Error occurred while signup:', error);
      //return { success: false, message: error.response?.data?.message || 'An error occurred during registration' };
      if (error.response && error.response.data && error.response.data.message) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error('An error occurred while signup.');
      }
    }
  },  
    



  // Fetch Degree data
  fetchDegrees: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/degrees`); // API for degrees
      if (response.status === 200) {
        return response.data; // Return degree data
      } else {
        throw new Error('Error fetching degrees');
      }
    } catch (error) {
      //console.error('Error fetching degrees:', error);
      return []; // Return empty array in case of error
    }
  },

  // Fetch College data
  fetchColleges: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/colleges`); // API for colleges
      if (response.status === 200) {
        return response.data; // Return college data
      } else {
        throw new Error('Error fetching colleges');
      }
    } catch (error) {
      //console.error('Error fetching colleges:', error);
      return []; // Return empty array in case of error
    }
  },

  // ************************Fetch Department data
   fetchDepartments: async () => {
     try {
       const response = await axios.get(`${BASE_URL}/getDepartments`); // API for departments
       //console.log(JSON.stringify(response.data)); 
       if (response.status === 200) {
        return response.data; // Return department data
       } else {
         throw new Error('Error fetching departments');
       }
     } catch (error) {
       //console.error('Error fetching departments:', error);
       return []; // Return empty array in case of error
     }
   },


   fetchEventLevels: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/getEventLevels`); // API for departments
      //console.log(JSON.stringify(response.data)); 
      if (response.status === 200) {
       return response.data; 
      } else {
        throw new Error('Error fetching Event Levels');
      }
    } catch (error) {
      console.error('Error fetching Event Levels:', error);
      return []; // Return empty array in case of error
    }
  },




  fetchDepart: async (degreeName) => {
    try {
      const filters = { degree_name: degreeName }; // Pass the degree name as a filter
      
      const response = await axios.post(`${BASE_URL}/departments`, filters, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      //console.log(JSON.stringify(response.data));
      if (response.status === 200) {
        return response.data; // Return department data
      } else {
        throw new Error(response.data.message || 'Failed to fetch departments.');
      }
    } catch (error) {
      console.error('Error fetching departments:', error);
      return []; // Return an empty array in case of error
    }
  },
  
  // Register user API call
  // Register user API call



  // logout: async () => {  
  //   // Clear client-side storage
  //   localStorage.removeItem('user');
  //   localStorage.removeItem('authToken');
  //   sessionStorage.clear();
  
  //   // Clear session cookie
  //   document.cookie = 'session_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  
  //   // Redirect to login page
  //   window.location.href = '/';
  // },
  





    // Fetch student details function
    fetchStudents: async () => {
      try {
        const response = await axios.get(`${BASE_URL}/students`); // API endpoint for students
        //console.log("students: "+ JSON.stringify(response.data));
        if (response.status === 200) {
          return response.data; // Return student data if the request is successful
        } else {
          throw new Error(response.data.message || 'Failed to fetch students.');
        }
      } catch (error) {
        console.error('Error fetching students:', error);
        throw new Error(error.response?.data?.message || 'Failed to fetch students.');
      }
    } , 

    fetchEvents: async () => {
      try {
        const response = await axios.get(`${BASE_URL}/events`);
        //console.log("events: "+ JSON.stringify(response.data));
        if (response.data.status) {
          return response.data; // Return the events data if status is true
        } else {
          throw new Error(response.data.message || 'Failed to fetch events.');
        }
      } catch (error) {
        console.error('Error fetching events:', error);
        throw new Error(error.response?.data?.message || 'Failed to fetch events.');
      }
    },

    fetchPastEvents: async () => {
      try {
        const response = await axios.get(`${BASE_URL}/geteventspast`);
        //console.log("events123: "+ JSON.stringify(response.data));
        
        if (response.status === 200) {
          return response.data; // Return the events data if status is true
        } else {
          throw new Error(response.data.message || 'Failed to fetch events.');
        }
      } catch (error) {
        console.error('Error fetching events:', error);
        throw new Error(error.response?.data?.message || 'Failed to fetch events.');
      }
    },

    fetchUpcomingEvents: async () => {
      try {
        const response = await axios.get(`${BASE_URL}/geteventsupcoming`);
        //console.log("events: "+ JSON.stringify(response.data));
        if (response.data.status) {
          return response.data; // Return the events data if status is true
        } else {
          throw new Error(response.data.message || 'Failed to fetch events.');
        }
      } catch (error) {
        console.error('Error fetching events:', error);
        throw new Error(error.response?.data?.message || 'Failed to fetch events.');
      }
    },

    createEvent: async (eventData) => {
    eventData = {
      teacher_id: String(Global.userId), // Add or update the teacher_id field
      ...eventData, // Spread the existing eventData properties
    };
      
      //console.log("eventData: ", JSON.stringify(eventData));
    
      try {
        const response = await axios.post(`${BASE_URL}/createEvent`, JSON.stringify(eventData), {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        //console.log(response.message)

        //console.log("Event creation response: ", JSON.stringify(response.data));
  // Return the response if successful
  if (response.status === 200 && response.data.status) {
    return response.data;
  } else {
    // Throw an error with the backend's error message
    throw new Error(response.data.message || 'Failed to create the event.');
  }
} catch (error) {
  console.error('Error creating the event:', error);

  // Re-throw the error to propagate it to the calling code
  if (error.response && error.response.data && error.response.data.message) {
    throw new Error(error.response.data.message);
  } else {
    throw new Error('An error occurred while creating the event.');
  }
}
},

    uploadEventImage: async (formDataToSend) => {
      try {
        const response = await axios.post(`${BASE_URL}/upload_image`, formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
       
        //console.log("uploading image response: ", JSON.stringify(response.data));
  
        if (response.status === 200 || response.data.status) {
          return response.data; // Return success response
        } else {
          throw new Error(response.data.message || 'Failed to upload image.');
        }
      } catch (error) {
        console.error('Error uploading image :', error);
        throw new Error(error.response?.data?.message || 'An error occurred while uploading the image.');
      }
    },

    fetchEventRegistration: async () => {
      try {
        const response = await axios.get(`${BASE_URL}/getRegistrations`);
        //console.log("Registrations : "+ JSON.stringify(response.data));
        
        if (response.status === 200) {
          return response.data; // Return the events data if status is true
        } else {
          throw new Error(response.data.message || 'Failed to fetch Registrations.');
        }
      } catch (error) {
        console.error('Error fetching Registrations:', error);
        throw new Error(error.response?.data?.message || 'Failed to fetch Registrations.');
      }
    },

  
    updateStudent: async (studentData) => {
      try {
        const response = await axios.put(`${BASE_URL}/updateStudent`, studentData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
    
        if (response.status === 200 || response.message===true) {
          //console.log(response.data);
          return response.data; // Return success response
        } else {
          throw new Error(response.data.message || 'Failed to update student data.');
        }
      } catch (error) {
        console.error('Error updating student data:', error);
        throw new Error(error.response?.data?.message || 'Failed to update student data.');
      }
    },    

    updateTeacher: async (data) => {
      try {
        const response = await axios.put(`${BASE_URL}/updateTeacher`, data, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
    
        if (response.status === 200 || response.message===true) {
          //console.log(response.data);
          return response.data; // Return success response
        } else {
          throw new Error(response.data.message || 'Failed to update student data.');
        }
      } catch (error) {
        console.error('Error updating student data:', error);
        throw new Error(error.response?.data?.message || 'Failed to update student data.');
      }
    },    

    insertNewCollege: async (eventData) => {
      //console.log("from new college "+JSON.stringify(eventData));
      try {
        const response = await axios.post(`${BASE_URL}/insertCollege`, JSON.stringify(eventData), {
          headers: {
            'Content-Type': 'application/json',
          },
        });
    
        if (response.status === 201 || response.data.succes===true) {
          //console.log(response.data);
          return response.data; // Return success response
        } else {
          throw new Error(response.data.message || 'Failed to insert New College data.');
        }
      } catch (error) {
        console.error('Error inserting New College data:', error);
        throw new Error(error.response?.data?.message || 'Failed to insert New College data.');
      }
    },


    insertNewDegree: async (eventData) => {
      //console.log("from new Degree "+JSON.stringify(eventData));
      try {
        const response = await axios.post(`${BASE_URL}/insertDegree`, JSON.stringify(eventData), {
          headers: {
            'Content-Type': 'application/json',
          },
        });
    
        if (response.status === 201 || response.data.succes===true) {
          //console.log(response.data);
          return response.data; // Return success response
        } else {
          throw new Error(response.data.message || 'Failed to insert New Degree data.');
        }
      } catch (error) {
        console.error('Error inserting New Degree data:', error);
        throw new Error(error.response?.data?.message || 'Failed to insert New Degree data.');
      }
    },

    
    insertNewDepartment: async (eventData) => {
      //console.log("from new Degree "+JSON.stringify(eventData));
      try {
        const response = await axios.post(`${BASE_URL}/insertDepartment`, JSON.stringify(eventData), {
          headers: {
            'Content-Type': 'application/json',
          },
        });
    
        if (response.status === 201 || response.data.succes===true) {
          //console.log(response.data);
          return response.data; // Return success response
        } else {
          throw new Error(response.data.message || 'Failed to insert New Department data.');
        }
      } catch (error) {
        console.error('Error inserting New Department data:', error);
        throw new Error(error.response?.data?.message || 'Failed to insert New Department data.');
      }
    },


  
  fetchVenues: async (filters) => {
    try {
      const response = await axios.post(`${BASE_URL}/venues`, filters, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(JSON.stringify(response.status));
      if (response.status === 200) {
        return response.data; // Return the venues data
      } else {
        throw new Error(response.data.message || 'Failed to fetch venues.');
      }
    } catch (error) {
      console.error('Error fetching venues:', error);
      return []; // Return an empty array in case of error
    }
  },

  fetchEventType: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/eventtypes`); // API endpoint for students
      //console.log("eventtypes: "+ JSON.stringify(response.data));
      if (response.status === 200) {
        return response.data; // Return student data if the request is successful
      } else {
        throw new Error(response.data.message || 'Failed to fetch eventtypes.');
      }
    } catch (error) {
      console.error('Error fetching eventtypes:', error);
      throw new Error(error.response?.data?.message || 'Failed to fetch eventtypes.');
    }
  } , 

  



eventRegistration: async (filters) => {
  try {
    // Pass the degree name as a filter
   // console.log('Fetching event registration'+filters);
    const response = await axios.post(`${BASE_URL}/eventregistration`, filters, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    //console.log(JSON.stringify(response.data));
    if (response.status === 200) {
      return response.data; // Return department data
    } else {
      throw new Error(response.data.message || 'Failed to fetch failed to store.');
    }
  } catch (error) {
    console.error('Error storing data', error);
    return []; // Return an empty array in case of error
  }
},

eventRegistrationByStudent: async (studentId) => {
  try {
    // Pass the studentId as part of the URL path
    //console.log('Fetching event registration for student ID: ' + studentId);
    const response = await axios.get(`${BASE_URL}/registrations/student/${studentId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    //console.log(JSON.stringify(response.status));

    if (response.status === 200) {
      return response.data; // Return registration data
    } else if(response.status === 404) { 
      throw new Error(response.data.message );
    }
  } catch (error) {
    console.error('Error fetching registration data', error);
    return []; // Return an empty array in case of error
  }
},

eventRegistrationByTeacher: async (teacherID) => {
  try {
    // Pass the studentId as part of the URL path
    //console.log('Fetching event registration for student ID: ' + studentId);
    const response = await axios.get(`${BASE_URL}/registrations/teacher/${teacherID}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    //console.log(JSON.stringify(response.data));

    if (response.status === 200) {
      return response.data; // Return registration data
    } else {
      throw new Error(response.data.message || 'Failed to fetch registrations.');
    }
  } catch (error) {
    console.error('Error fetching registration data', error);
    return []; // Return an empty array in case of error
  }
},



fetchRecentEventsPast: async () => {
  try {
    const response = await axios.get(`${BASE_URL}/getRecentEventsPast`);
    ////console.log("events123: "+ JSON.stringify(response.data));
    
    if (response.status === 200) {
      return response.data; // Return the events data if status is true
    } else {
      throw new Error(response.data.message || 'Failed to fetch events.');
    }
  } catch (error) {
    console.error('Error fetching events:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch events.');
  }
},

eventStudentById: async (studentId) => {
  try {
    // Pass the studentId as part of the URL path
    //console.log('Fetching event registration for student ID: ' + studentId);
    const response = await axios.get(`${BASE_URL}/students/${studentId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    //console.log(JSON.stringify(response.data));

    if (response.status === 200) {
      return response.data; // Return registration data
    } else if(response.status === 404) { 
      throw new Error(response.data.message );
    }
  } catch (error) {
    console.error('Error fetching registration data', error);
    return []; // Return an empty array in case of error
  }
},

eventTeacherById: async (teachersId) => {
  try {
    // Pass the studentId as part of the URL path
    //console.log('Fetching event registration for student ID: ' + studentId);
    const response = await axios.get(`${BASE_URL}/teachers/${teachersId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    //console.log(JSON.stringify(response.data));

    if (response.status === 200) {
      return response.data; // Return registration data
    } else if(response.status === 404) { 
      throw new Error(response.data.message );
    }
  } catch (error) {
    console.error('Error fetching registration data', error);
    return []; // Return an empty array in case of error
  }
},


subscribe: async (userData) => {
  //console.log(userData)
  try {
    const response = await axios.post(`${BASE_URL}/subscribe`, JSON.stringify(userData), {
      headers: { 'Content-Type': 'application/json' },
    });
    //console.log("67"+JSON.stringify(response.status)); 
    // Check for successful registration and return the response data
    if (response.status === 200 ||  response.success===true) {
      return response.data; // Return response data if registration is successful
    } else {
      // Handle unsuccessful registration
      throw new Error(response.data.message || 'Error registering user');
    }
  } catch (error) {
    console.error('Error registering user:', error);
    return { success: false, message: error.response?.data?.message || 'An error occurred during registration' };
  }
},




getRequestedEventByRoomOwner: async (teacherID) => {
  try {
    // Pass the studentId as part of the URL path
    //console.log('Fetching event registration for student ID: ' + studentId);
    const response = await axios.get(`${BASE_URL}/events/requested/${teacherID}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    //console.log(JSON.stringify(response));

    if (response.status === 200) {
      return response.data; // Return registration data
    } else {
      throw new Error(response.data.message || 'Failed to fetch registrations.');
    }
  } catch (error) {
    console.error('Error fetching registration data', error);
    return []; // Return an empty array in case of error
  }
},



getAcceptedEventByRoomOwner: async (teacherID) => {
  try {
    // Pass the studentId as part of the URL path
    //console.log('Fetching event registration for student ID: ' + studentId);
    const response = await axios.get(`${BASE_URL}/events/accepted/${teacherID}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    //console.log(JSON.stringify(response.data));

    if (response.status === 200) {
      return response.data; // Return registration data
    } else {
      throw new Error(response.data.message || 'Failed to fetch registrations.');
    }
  } catch (error) {
    console.error('Error fetching registration data', error);
    return []; // Return an empty array in case of error
  }
},


getRejectedEvents: async (teacherID) => {
  try {
    // Pass the studentId as part of the URL path
    //console.log('Fetching event registration for student ID: ' + studentId);
    const response = await axios.get(`${BASE_URL}/events/rejected/${teacherID}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    //console.log(JSON.stringify(response.data));

    if (response.status === 200) {
      return response.data; // Return registration data
    } else {
      throw new Error(response.data.message || 'Failed to fetch registrations.');
    }
  } catch (error) {
    console.error('Error fetching registration data', error);
    return []; // Return an empty array in case of error
  }
},


updateRegistrationAccept: async (eventId, userId,eventname) => {
  try {
    // Make a POST request with eventId and userId in the request body
    const response = await axios.post(
      `${BASE_URL}/acceptRegistration`, // Replace with your actual endpoint
      {
        event_id: eventId,
        userId: userId,
        eventname:eventname,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    //console.log(JSON.stringify(response.data)); // Log the response data for debugging

    if (response.status === 200) {
      return response.data; // Return success response
    } else {
      throw new Error(response.data.message || 'Failed to update registration acceptance.');
    }
  } catch (error) {
    console.error('Error updating registration acceptance:', error);
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error('An error occurred while creating the event.');
    }
  }
},



updateRegistrationReject: async (eventId, userId,eventname,rejectionReason) => {
  try {
    // Make a POST request with eventId and userId in the request body
    const response = await axios.post(
      `${BASE_URL}/rejectRegistration`, // Replace with your actual endpoint
      {
        event_id: eventId,
        userId: userId,
        eventname : eventname, rejectionReason : rejectionReason
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    //console.log(JSON.stringify(response.data)); // Log the response data for debugging

    if (response.status === 200) {
      return response.data; // Return success response
    } else {
      throw new Error(response.data.message || 'Failed to update registration acceptance.');
    }
  } catch (error) {
    console.error('Error updating registration acceptance:', error);
    throw error; // Re-throw the error so it can be handled by the caller
  }
},




fetchNotifications: async () => {
  try {
    const response = await axios.get(`${BASE_URL}/getNotification`); // API endpoint for students
    //console.log("getNotification: "+ JSON.stringify(response.data));
    if (response.status === 200) {
      return response.data; // Return student data if the request is successful
    } else {
      throw new Error(response.data.message || 'Failed to fetch students.');
    }
  } catch (error) {
    console.error('Error fetching students:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch students.');
  }
} , 



fetchgetNotificationRequestedById: async (teacherId) => {
  try {
    const response = await axios.get(`${BASE_URL}/getNotificationRequestedById/${teacherId}`); // API endpoint for students
    //console.log("getNotification: "+ JSON.stringify(response.data));
    if (response.status === 200) {
      return response.data; // Return student data if the request is successful
    } else {
      throw new Error(response.data.message || 'Failed to fetch students.');
    }
  } catch (error) {
    console.error('Error fetching students:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch students.');
  }
} , 


getNotificationsByAcceptedBy: async (teacherId) => {
  try {
    const response = await axios.get(`${BASE_URL}/getNotificationRequestedById/${teacherId}`); // API endpoint for students
    //console.log("getNotification: "+ JSON.stringify(response.data));
    if (response.status === 200) {
      return response.data; // Return student data if the request is successful
    } else {
      throw new Error(response.data.message || 'Failed to fetch students.');
    }
  } catch (error) {
    console.error('Error fetching students:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch students.');
  }
} , 


fetchRoomfacilities: async (roomId) => {
  try {
    ///console.log('Calling API for roomId:', roomId); // Debug log
    const response = await axios.get(`${BASE_URL}/roomfacilities/${roomId}`);
    //console.log('API response:', response.data); // Debug log
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(response.data.message || 'Failed to fetch room facilities.');
    }
  } catch (error) {
    console.error('Error fetching room facilities:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch room facilities.');
  }
},


// Function to remove notification
removeNotification: async (id) => {
  try {
    const response = await axios.put(`${BASE_URL}/notifications/${id}/hide`);
    
    // Axios response is directly accessible in `response.data`
    if (response.data.status === 'success') {
      return { success: true };
    } else {
      return { success: false, error: 'Failed to remove notification.' };
    }
  } catch (err) {
    return { success: false, error: 'Error removing notification.' };
  }
},





markNotificationsAsRead: async (userId) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/notifications/markAsRead/${userId}`
    );
    return response.data; // Handle the response
  } catch (error) {
    console.error("Error marking notifications as read", error);
    throw error; // Propagate error if needed
  }
},





// Forget Password API
forgetPassword: async (email) => {
  try {
    const response = await axios.post(`${BASE_URL}/forget-password`, { email: email }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data; // Return the API response
  } catch (error) {
    throw error.response.data; // Return error message
  }
},

// Reset Password API
resetPassword: async (email, newPassword) => {
  try {
    // Debugging to verify parameters
    //console.log("Reset Password Request: ", { email, newPassword });

    const response = await axios.post(`${BASE_URL}/reset-password`, {
      email: email, // Email should be a string
      newPassword: newPassword, // Password should be a string
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
      return response.data; // Return success response
    } else {
      throw new Error(response.data.message || 'Failed to update Password.');
    }
  } catch (error) {
    console.error('Error updating Password:', error);
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error('An error occurred while updating Password.');
    }
  }
},


};


// Function to schedule auto logout after 2 hours
const scheduleAutoLogout = () => {
  setTimeout(() => {
    Global.logout();
  }, 2 * 60 * 60 * 1000); // 2 hours in milliseconds
};

// Function to check session on page load and restart logout timer
const checkSessionAndLogout = async () => {
  const isValid = await Global.isAuthenticated();
  if (!isValid) {
    Global.logout();
  } else {
    scheduleAutoLogout(); // Restart auto logout timer
  }
};

// Run session check on page load
checkSessionAndLogout();

// Periodically check session every 10 minutes
setInterval(async () => {
  const isValid = await Global.isAuthenticated();
  if (!isValid) {
    Global.logout();
  }
}, 10 * 60 * 1000); // 10 minutes

  

export default Global;