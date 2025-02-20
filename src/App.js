import './App.css';
import './index.css';
import { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import { BrowserRouter as Router, Routes, Route, useNavigate, Link } from "react-router-dom";
import Global from './context/Global';
import { SignupPage } from './components/SignupPage/SignupPage';
import { SignInPage } from './components/SigninPage/SignInPage';
import EventHiveLayout from './components/HomePage/EventHiveLayout';
import { EventDetails } from './components/EventDetails/EventDetails';
import EventPage from './components/College/EventPage'; 
import PastCollegeEventPage from './components/College/PastCollegeEventPage'; 
import FAQs from './components/ContactUs/FAQs';
import ContactUs from './components/ContactUs/ContactUs';


import ForgotPasswordPage from './components/ContactUs/ForgotPasswordPage';
import ResetPasswordForm from './components/ContactUs/ResetPasswordForm';
import Profile from './components/Dashboard/Events/Profile';
import Dashboard from './components/Dashboard/Events/Dashboard';
import Admin from './components/Dashboard/Events/Admin';
import MoreRequestedEvents from './components/Dashboard/Events/MoreRequestedEvents';
import MoreAcceptedEvents from './components/Dashboard/Events/MoreAcceptedEvents';
import MoreRejectedtedEvents from './components/Dashboard/Events/MoreRejectedtedEvents';
import Notification from './components/Dashboard/Events/Notification';


import EventForm from './components/CreateEvent/EventForm';
import { RegistrationPage } from './components/EventRegistration/RegistrationPage';
import EventHiveDashboard from './components/Dashboard/EventHiveDashboard';
import UpcomingEventPage from './components/HomePage/UpcomingEventPage';
import PrivateRoute from './context/PrivateRoute';


function App() {
  const navigate = useNavigate();

  const showToast = (role) => {
    if (role === 'teacher') {
      toast.info('Only Teachers can access this page', {
        position: "top-right",
        autoClose: 3000,
        closeButton: true,
        className: 'mx-2 md:mx-4 mt-16 md:mt-20 max-w-[90vw] md:max-w-md w-fit min-w-[200px] text-sm md:text-base p-4',
        style: {
          zIndex: 9999
        }
      });
    } else if (role === 'both') {
      toast.info('Only Admin can access this page', {
        position: "top-right",
        autoClose: 3000,
        closeButton: true,
        className: 'mx-2 md:mx-4 mt-16 md:mt-20 max-w-[90vw] md:max-w-md w-fit min-w-[200px] text-sm md:text-base p-4',
        style: {
          zIndex: 9999
        }
      });
    } else {
      toast.info('You are not authorized to access this page', {
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

  useEffect(() => {
    if (Global.userRoleId !== 2 && window.location.pathname === '/EventForm') {
      showToast('teacher'); // Trigger toast for non-teacher role
    }
    if (Global.userRoleId !== 4 && window.location.pathname === '/Admin' || window.location.pathname === '/MoreRequestedEvents' || window.location.pathname === '/MoreAcceptedEvents' || window.location.pathname === '/MoreRejectedtedEvents') {
      showToast('both'); // Trigger toast for non-both role
    }
  }, [Global.userRole]);
  

  return (
    <div>
    <ToastContainer />
      <Routes>
        <Route path="/" element={<EventHiveLayout />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/EventDetails" element={<EventDetails />} />
        <Route path="/EventPage" element={<EventPage />} />
        <Route path="/EventHiveDashboard" element={<PrivateRoute element={<EventHiveDashboard />} />} />
        <Route path="/RegistrationPage" element={<PrivateRoute element={<RegistrationPage />} />} />
        <Route path="/UpcomingEventPage" element={<UpcomingEventPage />} />
        <Route path="/PastCollegeEventPage" element={<PastCollegeEventPage />} />
        <Route path="/ContactUs" element={<ContactUs />} />
        <Route path="/FAQs" element={<FAQs />} /> 
         <Route path="/ForgotPasswordPage" element={<ForgotPasswordPage />} />
        <Route path="/ResetPasswordForm" element={<ResetPasswordForm />} /> 
        <Route path="/Profile" element={<PrivateRoute element={<Profile />} />} />
        <Route path="/Notification" element={<PrivateRoute element={<Notification />} />} />
        <Route path="/Dashboard" element={<PrivateRoute element={<Dashboard />} />} />
        {/* <Route path="/EventForm" element={<PrivateRoute element={<EventForm />} />} />
          <Route path="/Admin" element={<PrivateRoute element={<Admin />} />} />
          <Route path="/MoreRequestedEvents" element={<PrivateRoute element={<MoreRequestedEvents />} />} />
          <Route path="/MoreAcceptedEvents" element={<PrivateRoute element={<MoreAcceptedEvents />} />} />
          <Route path="/MoreRejectedtedEvents" element={<PrivateRoute element={<MoreRejectedtedEvents />} />} /> */}
          
        {/* Protected Route for EventPage - Only for 'teacher' */}
        <Route path="/EventForm" element={
            Global.userRoleId === 2 
              ? <PrivateRoute element={<EventForm />} />
              : (
                <div>
                <p className="ml-5 mt-5">You are not authorized to access this page.</p>
                <Link
                  to="/" // Use Link to navigate
                  className="text-blue-600 flex items-center"
                >
                  <span className="ml-5">←</span> Go to Home
                </Link>
              </div>
              )
          } />

        {/* Admin & Management Pages - Only for 'both' role */}
        <Route path="/Admin" element={
          Global.userRoleId === 4 
            ? <PrivateRoute element={<Admin />} /> 
            : (
              <div>
              <p className="ml-5 mt-5">You are not authorized to access this page.</p>
              <Link
                to="/" // Use Link to navigate
                className="text-blue-600 flex items-center"
              >
                <span className="ml-5">←</span> Go to Home
              </Link>
            </div>
            )
        } />
        <Route path="/EventForm" element={
          Global.userRoleId === 4 
            ? <PrivateRoute element={<EventForm />} /> 
            : (
              <div>
              <p className="ml-5 mt-5">You are not authorized to access this page.</p>
              <Link
                to="/" // Use Link to navigate
                className="text-blue-600 flex items-center"
              >
                <span className="ml-5">←</span> Go to Home
              </Link>
            </div>
            )
        } />        
        <Route path="/MoreRequestedEvents" element={
          Global.userRoleId === 4 
            ? <PrivateRoute element={<MoreRequestedEvents />} /> 
            : (
              <div>
              <p className="ml-5 mt-5">You are not authorized to access this page.</p>
              <Link
                to="/" // Use Link to navigate
                className="text-blue-600 flex items-center"
              >
                <span className="ml-5">←</span> Go to Home
              </Link>
            </div>
            )
        } />
        <Route path="/MoreAcceptedEvents" element={
          Global.userRoleId === 4 
            ? <PrivateRoute element={<MoreAcceptedEvents />} /> 
            : (
              <div>
              <p className="ml-5 mt-5">You are not authorized to access this page.</p>
              <Link
                to="/" // Use Link to navigate
                className="text-blue-600 flex items-center"
              >
                <span className="ml-5">←</span> Go to Home
              </Link>
            </div>
            )
        } />
        <Route path="/MoreRejectedtedEvents" element={
          Global.userRoleId === 4 
            ? <PrivateRoute element={<MoreRejectedtedEvents />} /> 
            : (
              <div>
              <p className="ml-5 mt-5">You are not authorized to access this page.</p>
              <Link
                to="/" // Use Link to navigate
                className="text-blue-600 flex items-center"
              >
                <span className="ml-5">←</span> Go to Home
              </Link>
            </div>
            )
        } />

          {/* <Route path="/forgot-password" element={<ForgotPasswordPage/>}/> */}   
        {/* <Route path="/dashboard" element={<Dashboard />} />  */}

      </Routes>
    </div>

    
  );
}

export default App;
