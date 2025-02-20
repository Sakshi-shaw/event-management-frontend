import React, { useEffect, useState } from 'react';
import EventCard from './EventCard';
import Global from '../../context/Global';
import SearchSection from './SearchSection';
import { useNavigate } from 'react-router-dom';

function EventsSection() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loading1, setLoading1] = useState(true);
  const [error, setError] = useState(null);
  const [error1, setError1] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(4);
  const navigate = useNavigate();

  const [eventsPast, setEventsPast] = useState([]);

  
    const [eventsRegistered, setEventsRegistered] = useState(false);
    const [eventsRegisteredData, setEventsRegisteredData] = useState([]);



    useEffect(() => {
      const loadUpcomingEvents = async () => {
        try {
          const response = await Global.fetchUpcomingEvents();
          //console.log("imagename " + JSON.stringify(response.data))
  
          if (response.data) {
            setEvents(response.data);
            setFilteredEvents(response.data);
          } else {
            setError("No events found.");
          }
        } catch (err) {
          setError("Failed to load events.");
        } finally {
          setLoading(false);
        }
      };
      loadUpcomingEvents();
     // alert("Events"+JSON.stringify(events));
    }, []);
  


    useEffect(() => {
      const eventRegistrationByStudent = async () => {
  
        if(Global.userRole==='student'){
        try {
          setLoading1(true);
          setEventsRegistered(true);
          const response = await Global.eventRegistrationByStudent(Global.userId);
          if (response.data) {
            //console.log("Events Registered by students "+JSON.stringify(response.data));
            setEventsPast(response.data);
            const registeredEventNames = response.data.map(event => event.event_name);
              setEventsRegisteredData(registeredEventNames);
            //console.log("Events Registered by students "+JSON.stringify(eventsRegisteredData));
          
          } else {
            setError1("No events found.");
          }
        } catch (err) {
          setError1(err.message || "An error occurred while fetching events.");
        } finally {
          setLoading1(false);
        }}
      };
        eventRegistrationByStudent();
      }, []);





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

  const handleCardClick = (event) => {
    navigate('/EventDetails', { state: { event ,
      eventsRegistered: eventsRegistered, // Pass eventsRegistered for the specific event
      eventsRegisteredData: eventsRegisteredData, // Pass event_name
    },
  });
  };

  return (
    <>
      <SearchSection onSearch={handleSearch} />
      <div className="flex flex-wrap gap-5 justify-between mt-8 w-full max-w-[1200px] max-md:mt-6 max-md:max-w-full px-4 md:px-5">
        <div className="text-4xl font-bold text-violet-600">
          Upcoming <span className="text-violet-600">Events</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 items-center mt-8 w-full">
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

        <div className="flex justify-center items-center mt-6 w-full">
          <button
            className="px-4 py-2 text-white bg-violet-600 rounded"
            onClick={() => navigate('/UpcomingEventPage', { state: { events } })}
          >
            More Events
          </button>
        </div>
      </div>
    </>
  );
}

export default EventsSection;