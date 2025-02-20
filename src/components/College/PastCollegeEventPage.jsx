import React, { useState, useEffect } from 'react';
import EventCard from '../HomePage/EventCard'
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../Header/Header';

import Footer from '../Footer/Footer';
import SearchSection from '../HomePage/SearchSection'; // Importing SearchSection component
import Global from '../../context/Global';


function PastCollegeEventPage() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [eventsPast, setEventsPast] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]); // State to hold filtered events
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8; // Two rows of four columns each

  
  const [eventsRegistered, setEventsRegistered] = useState(false);
  const [eventsRegisteredData, setEventsRegisteredData] = useState([]);


  // Function to load upcoming events (simulate API call)
  useEffect(() => {
    // Fetch events registered by the student
    const eventRegistrationByStudent = async () => {

      if(Global.userRole==='student'){
      try {
        setLoading(true);
        setEventsRegistered(true);
        const response = await Global.eventRegistrationByStudent(Global.userId);
        //console.log("eventRegistrationByStudent  "+JSON.stringify(response.data));
        if (response.status && response.data) {
         // console.log("eventRegistrationByStudent  "+JSON.stringify(registeredEvents.data));
         //setFilteredEvents(events.filter(event => registeredEvents.includes(event.id))); // Filter events by registered event IDs
         setEventsPast(response.data); // Store registered event IDs
         setFilteredEvents(response.data);

         const registeredEventNames = response.data.map(event => event.event_name);
            setEventsRegisteredData(registeredEventNames);
         // console.log("Registered Event IDs: ", registeredEvents);
        } else {
          setError("Failed to fetch registered events.");
        }
      } catch (err) {
        setError(err.message || "An error occurred while fetching events.");
      } finally {
        setLoading(false);
      }}
      else if(Global.userRole==='teacher'){
        try {
          setLoading(true);
          const response = await Global.eventRegistrationByTeacher(Global.userId);
          //console.log("eventRegistrationByStudent  "+JSON.stringify(response.data));
          if (response.status && response.data) {
           // console.log("eventRegistrationByStudent  "+JSON.stringify(registeredEvents.data));
           //setFilteredEvents(events.filter(event => registeredEvents.includes(event.id))); // Filter events by registered event IDs
           setEventsPast(response.data); // Store registered event IDs
           setFilteredEvents(response.data);
           // console.log("Registered Event IDs: ", registeredEvents);
          } else {
            setError("Failed to fetch registered events.");
          }
        } catch (err) {
          setError(err.message || "An error occurred while fetching events.");
        } finally {
          setLoading(false);
        }
      }
    };

    eventRegistrationByStudent();
  }, []);

  // Handle search/filter logic
  const handleSearch = ({ eventType, eventName, startDate, endDate }) => {
    let filtered = [...eventsPast];

    if (eventType) {
      filtered = filtered.filter(event => event.eventType === eventType);
    }

    if (eventName) {
      filtered = filtered.filter(event =>
        event.event_name.toLowerCase().includes(eventName.toLowerCase())
      );
    }

    if (startDate && endDate) {
      filtered = filtered.filter(event => {
        const eventStartDate = new Date(event.start_date);
        const eventEndDate = new Date(event.end_date);
        return (
          eventStartDate >= new Date(startDate) &&
          eventEndDate <= new Date(endDate)
        );
      });
    }

    setFilteredEvents(filtered);
    setCurrentPage(1); // Reset to first page when search is performed
  };

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedEvents = filteredEvents.slice(startIndex, endIndex);
  //console.log("paginatedEvents "+ filteredEvents)

  const handleNextPage = () => {
    if (endIndex < filteredEvents.length) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (startIndex > 0) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleCardClick = (event) => {
    //alert('eventsPast'+ eventsPast);
    navigate('/EventDetails', { state: { event,
      eventsRegistered: eventsRegistered, // Pass eventsRegistered for the specific event
      eventsRegisteredData: eventsRegisteredData, // Pass event_name
    },
  });
  };

  return (
    <>
      <Header /> {/* Include Header */}
      <div className="flex flex-col items-center mt-20 w-full">
        {/* Search Section */}
        <SearchSection onSearch={handleSearch} />
        
        {/* Page Title */}
        <div className="text-4xl font-bold text-violet-600 mt-8 text-center">
          All <span className="text-violet-600">Events</span>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 items-center mt-8 w-full px-16">
          {loading && <p>Loading upcoming events...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {!loading && !error && paginatedEvents.length === 0 && (
            <p className="col-span-full text-center">No events found matching your search criteria.</p>
          )}
          {!loading &&
            !error &&
            paginatedEvents.map((event, index) => (
              <EventCard
                key={index}
                imagename={event.imagename}
                eventName={event.event_name}
                eventType={event.eventType}
                startDate={event.start_date}
                endDate={event.end_date}
                onClick={() => handleCardClick(event)}
              />
            ))}
        </div>

        {/* Pagination */}
        {/*         <div className="flex justify-between items-center mt-6 w-full max-w-6xl"> */}
        <div className="flex justify-center gap-4 my-8 items-center mt-6 w-full max-w-6xl">
          <button
            className="w-24 text-center px-4 py-2 text-white bg-violet-600 rounded disabled:bg-gray-300"
            onClick={handlePrevPage}
            disabled={startIndex === 0}
          >
            Previous
          </button>
          <button
            className="w-24 text-center px-4 py-2 text-white bg-violet-600 rounded disabled:bg-gray-300"
            onClick={handleNextPage}
            disabled={endIndex >= filteredEvents.length}
          >
            Next
          </button>
        </div>
      </div>
      <Footer /> {/* Include Footer */}
    </>
  );
}

export default PastCollegeEventPage;
