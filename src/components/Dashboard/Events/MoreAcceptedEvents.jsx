import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import EventCard from "./EventCard";
import EventHero from "./EventHero";
import Global from "../../../context/Global";

import Footer from '../../Footer/Footer';
import SearchSection from '../../HomePage/SearchSection'; // Importing SearchSection component
import Header from '../../Header/Header';



function MoreAcceptedEvents() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [events, setEvents] = useState([]); // State to hold the events
  const [filteredEvents, setFilteredEvents] = useState([]); // State to hold filtered events
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8; // Two rows of four columns each

  const [eventsPast, setEventsPast] = useState([]);
  const [eventsRegistered, setEventsRegistered] = useState(false);
  const [eventsRegisteredData, setEventsRegisteredData] = useState([]);





  // Function to load upcoming events (simulate API call)
  useEffect(() => {
    const getAcceptedEventByRoomOwner = async () => {
      try {
        const response = await Global.getAcceptedEventByRoomOwner(Global.userId);
        //console.log(JSON.stringify(response));
        if (response) {
          setEvents(response);
          setFilteredEvents(response);
        } else {
          setError("No events found.");
        }
      } catch (err) {
        setError("Failed to load events.");
      } finally {
        setLoading(false);
      }
    };

    getAcceptedEventByRoomOwner();
  }, []);


  
  // Handle search/filter logic
  const handleSearch = ({ eventType, eventName, startDate, endDate }) => {
    let filtered = [...events];

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
  //console.log("eventsRegistered "+eventsRegistered + "  RegisteredEventName "+ eventsRegisteredData)

  const handleCardClick = (event) => {
    navigate('/EventDetails', { state: { event}
  });
};  

  return (
    <div className="flex overflow-hidden flex-col items-center pt-12 bg-gray-50 rounded-3xl">
      <Header /> {/* Include Header */}
      <div className="flex flex-col items-center mt-8 w-full">
        {/* Search Section */}
        <SearchSection onSearch={handleSearch} />
        
        {/* Page Title */}
        <div className="text-4xl font-bold text-violet-600 mt-8 text-center">
          All Accepted <span className="text-violet-600">Events</span>
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
    </div>
  );
}

export default MoreAcceptedEvents;
