import * as React from "react";
import  { useState, useEffect } from "react";
import EventCard from '../HomePage/EventCard'
import Global from "../../context/Global";
import { useNavigate } from 'react-router-dom';




export default function CollegeEvents() {

  
const [events, setEvents] = useState([]); 
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(null); // State for error handling

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch events when the component mounts or when the page changes
    const fetchPast = async () => {
      try {
        setLoading(true);
        const response = await Global.fetchRecentEventsPast();
        //console.log(response.data);
        if (response.status) {
          setEvents(response.data || []); // Update state with fetched events
        } else {
          setError("Failed to fetch events.");
        }
      } catch (err) {
        setError(err.message || "An error occurred while fetching events.");
      } finally {
        setLoading(false);
      }
    };

    fetchPast();
  }, []);



  const handleCardClick = (event) => {
    navigate('/EventDetails', { state: { event}});
    };

  return (
    <section className="flex flex-col items-center px-16 w-full max-md:px-5 max-md:max-w-full">
      <h2 className="self-start mt-14 text-4xl font-bold text-violet-600 max-md:mt-10 max-md:ml-2.5">
        College <span className="text-violet-600">Events</span>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 items-center mt-8 w-full max-w-[1200px] max-md:max-w-full">
        {loading && <p>Loading past events...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading &&
          !error &&
          events.map((event, index) => (
            <EventCard
              key={index}
              // imageUrl={eventImages[index % eventImages.length]} // Use cyclic images if required
              imagename={event.imagename}
              eventName={event.event_name}
              eventType={event.eventType}    
              startDate={event.start_date}
              endDate={event.end_date}            
              onClick={() => handleCardClick(event)}
          />
          ))}
      </div>
{/*       <div className="flex justify-center items-center mt-6 w-full">
          <button
            className="px-4 py-2 text-white bg-violet-600 rounded"
            onClick={() => navigate('/PastCollegeEventPage', { state: { events } })}
          >
            More Events
          </button>
      </div> */}    
    </section>
  );
}