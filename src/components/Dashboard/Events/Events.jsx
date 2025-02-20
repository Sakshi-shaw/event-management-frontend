import * as React from "react";
import { useEffect, useState } from 'react';
import EventCard from "./EventCard";
import Global from "../../../context/Global";
import { useNavigate } from 'react-router-dom';

export default function Events() {
  const [activeCategory, setActiveCategory] = useState("Technical");
  const [events, setEvents] = useState([]);
  const [eventsPast, setEventsPast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorevents, setErrorevents] = useState(null);
  const [loadingevents, setLoadingevents] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [eventsRegistered, setEventsRegistered] = useState(false);
  const [eventsRegisteredData, setEventsRegisteredData] = useState([]);
  const [pageSize] = useState(4);
  
  const navigate = useNavigate();

  useEffect(() => {
    const loadUpcomingEvents = async () => {
      try {
        const response = await Global.fetchUpcomingEvents();
        if (response.data) {
          setEvents(response.data);
        } else {
          setErrorevents("No events found.");
        }
      } catch (err) {
        setErrorevents("Failed to load events.");
      } finally {
        setLoadingevents(false);
      }
    };

    loadUpcomingEvents();
  }, []);

  useEffect(() => {
    const eventRegistrationByStudent = async () => {
      if (Global.userRole === 'student') {
        try {
          setLoading(true);
          setEventsRegistered(true);
          const response = await Global.eventRegistrationByStudent(Global.userId);
          if (response.data) {
            setEventsPast(response.data);
            const registeredEventNames = response.data.map(event => event.event_name);
            setEventsRegisteredData(registeredEventNames);
          } else {
            setError("No events found.");
          }
        } catch (err) {
          setError(err.message || "An error occurred while fetching events.");
        } finally {
          setLoading(false);
        }
      } else if (Global.userRole === 'teacher') {
        try {
          setLoading(true);
          const response = await Global.eventRegistrationByTeacher(Global.userId);
          if (response.status && response.data) {
            setEventsPast(response.data);
          } else {
            setError("No events found.");
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

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  
  const paginatedEvents1 = eventsPast.slice(startIndex, endIndex);
  const paginatedEvents = events.slice(startIndex, endIndex);

  const handleCardClick = (event) => {
    navigate('/EventDetails', {
      state: {
        event,
        eventsRegistered: eventsRegistered,
        eventsRegisteredData: eventsRegisteredData,
      },
    });
  };

  return (
    <div className="flex flex-col justify-center items-center w-full p-4 lg:p-8">
      {/* Past Events Section */}
      <div className="w-full max-w-7xl">
        <div className="flex items-center mb-6">
          <h2 className="text-2xl font-bold">
            <span className="text-violet-600">Events</span>{" "}
            {Global.userRole === "student" ? "Participated" : "Organised"}
          </h2>
        </div>

        {/* Past Events Grid - Updated for 2 cards on medium laptops */}
        <div className="w-full">
          {loading && <p className="text-center py-4">Loading past events...</p>}
          {error && <p className="text-center text-red-500 py-4">{error}</p>}
          {!loading && !error && paginatedEvents1.length === 0 && (
            <p className="text-center py-4">No past events found matching your registration.</p>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
            {!loading &&
              !error &&
              paginatedEvents1.slice(0, 4).map((event, index) => (
                <EventCard
                  key={index}
                  imagename={event.imagename}
                  eventName={event.event_name}
                  eventType={event.eventType}
                  startDate={event.start_date}
                  endDate={event.end_date}
                  onClick={() => handleCardClick(event)}
                  className="h-full"
                />
              ))}
          </div>
        </div>

        {/* More Events Button */}
        <div className="flex justify-center mt-8">
          <button
            className="px-6 py-2 text-white bg-violet-600 rounded hover:bg-violet-700 transition-colors"
            onClick={() => navigate('/PastCollegeEventPage', { state: { eventsPast } })}
          >
            More Events
          </button>
        </div>
      </div>

      {/* Trending Events Section */}
      <div className="w-full max-w-7xl mt-12">
        <div className="flex items-center mb-6">
          <h2 className="text-2xl font-bold">
            <span className="text-violet-600">Trending</span> Events
          </h2>
        </div>

        {/* Trending Events Grid - Updated for 2 cards on medium laptops */}
        <div className="w-full">
          {loadingevents && <p className="text-center py-4">Loading upcoming events...</p>}
          {errorevents && <p className="text-center text-red-500 py-4">{errorevents}</p>}
          {!loadingevents && !errorevents && paginatedEvents.length === 0 && (
            <p className="text-center py-4">No events found matching your search criteria.</p>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
            {!loadingevents &&
              !errorevents &&
              paginatedEvents.slice(0, 4).map((event, index) => (
                <EventCard
                  key={index}
                  imagename={event.imagename}
                  eventName={event.event_name}
                  eventType={event.eventType}
                  startDate={event.start_date}
                  endDate={event.end_date}
                  onClick={() => handleCardClick(event)}
                  className="h-full"
                />
              ))}
          </div>
        </div>

        {/* More Events Button */}
        <div className="flex justify-center mt-8">
          <button
            className="px-6 py-2 text-white bg-violet-600 rounded hover:bg-violet-700 transition-colors"
            onClick={() => navigate('/UpcomingEventPage', { state: { events } })}
          >
            More Events
          </button>
        </div>
      </div>
    </div>
  );
}