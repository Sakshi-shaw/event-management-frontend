import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EventCard from "./EventCard";
import Global from "../../../context/Global";

const TabCard = ({ title, isActive, onClick, count }) => (
  <div 
    onClick={onClick}
    className={`flex-1 p-4 rounded-lg cursor-pointer transition-all ${
      isActive 
        ? 'bg-violet-600 text-white shadow-lg' 
        : 'bg-white text-neutral-900 border-2 border-violet-200 hover:border-violet-400'
    }`}
  >
    <h3 className="text-base lg:text-xl font-bold mb-2">{title}</h3>
    <p className={`text-xs lg:text-sm ${isActive ? 'text-violet-100' : 'text-neutral-600'}`}>
      Total Events: {count} 
    </p>
  </div>
);

export default function Admin() {
  const [activeTab, setActiveTab] = useState('requests');
  const [requestedEvents, setRequestedEvents] = useState([]);
  const [approvedEvents, setApprovedEvents] = useState([]);
  const [rejectedEvents, setRejectedEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const MAX_DISPLAYED_EVENTS = 6;

  useEffect(() => {
    const fetchAllEvents = async () => {
      try {
        setLoading(true);
        const [requested, approved, rejected] = await Promise.all([
          Global.getRequestedEventByRoomOwner(Global.userId),
          Global.getAcceptedEventByRoomOwner(Global.userId),
          Global.getRejectedEvents(Global.userId)
        ]);
        
        if (requested) setRequestedEvents(requested);
        if (approved) setApprovedEvents(approved);
        if (rejected) setRejectedEvents(rejected);
      } catch (err) {
        setError("Failed to load events.");
        console.error("Error fetching events:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllEvents();
  }, []);

  const handleCardClick = (event) => {
    navigate('/EventDetails', { state: { event } });
  };

  const handleAccept = async (event) => {
    try {
      setRequestedEvents(prev => prev.filter(e => e.id !== event.id));
      setApprovedEvents(prev => [...prev, { ...event, event_status: "1" }]);
    } catch (err) {
      console.error("Error accepting event:", err);
    }
  };

  const handleReject = async (event) => {
    try {
      setRequestedEvents(prev => prev.filter(e => e.id !== event.id));
      setRejectedEvents(prev => [...prev, event]);
    } catch (err) {
      console.error("Error rejecting event:", err);
    }
  };

  const handleViewMoreClick = () => {
    switch (activeTab) {
      case 'requests':
        navigate("/MoreRequestedEvents", { 
          state: { events: requestedEvents }
        });
        break;
      case 'approved':
        navigate("/MoreAcceptedEvents", { 
          state: { events: approvedEvents }
        });
        break;
      case 'rejected':
        navigate("/MoreRejectedtedEvents", { 
          state: { events: rejectedEvents }
        });
        break;
    }
  };

  const renderEvents = () => {
    let events = [];
    let shouldLimitEvents = false;
    
    switch (activeTab) {
      case 'requests':
        events = requestedEvents;
        shouldLimitEvents = true;
        break;
      case 'approved':
        events = approvedEvents;
        shouldLimitEvents = true;
        break;
      case 'rejected':
        events = rejectedEvents;
        shouldLimitEvents = false;
        break;
      default:
        events = requestedEvents;
        shouldLimitEvents = true;
    }

    if (loading) return <p className="text-center py-8">Loading events...</p>;
    if (error) return <p className="text-center py-8 text-red-500">{error}</p>;
    if (events.length === 0) return <p className="text-center py-8">No events found.</p>;

    const displayedEvents = shouldLimitEvents 
      ? events.slice(0, MAX_DISPLAYED_EVENTS) 
      : events;

    return (
      <div className="w-full">
        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 w-full">
            {displayedEvents.map((event, index) => (
              <div key={index} className="w-full flex justify-center">
                <div className="w-80"> {/* Fixed width container for each card */}
                  <EventCard
                    imagename={event.imagename}
                    eventName={event.event_name}
                    eventType={event.eventType}
                    startDate={event.start_date}
                    endDate={event.end_date}
                    status={event.event_status === "0" ? "0" : "1"}
                    onClick={() => handleCardClick(event)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col justify-center items-center w-full p-4 lg:p-8">
      <div className="w-full max-w-7xl">
        {/* Hero Section */}
       {/*  <div className="w-full mb-8">
          <EventHero />
        </div> */}
        
        {/* Events Section Title */}
       {/*  <div className="flex items-center mb-6">
          <h2 className="text-2xl font-bold">
            <span className="text-violet-600">Event</span> Management
          </h2>
        </div> */}
        
        {/* Tabs Section */}
        <div className="w-full mb-8">
          {/* TabCard Container */}
          <div className="w-full mb-6 overflow-hidden">
            <div className="overflow-x-auto">
              <div className="flex flex-col sm:flex-row gap-4 min-w-min pb-2">
                <TabCard
                  title="Event Requests"
                  isActive={activeTab === 'requests'}
                  onClick={() => setActiveTab('requests')}
                  count={requestedEvents.length}
                />
                <TabCard
                  title="Approved Events"
                  isActive={activeTab === 'approved'}
                  onClick={() => setActiveTab('approved')}
                  count={approvedEvents.length}
                />
                <TabCard
                  title="Rejected Events"
                  isActive={activeTab === 'rejected'}
                  onClick={() => setActiveTab('rejected')}
                  count={rejectedEvents.length}
                />
              </div>
            </div>
          </div>

          {/* Events Grid */}
          <div className="w-full">
            {renderEvents()}
          </div>

          {/* View More Button */}
          <div className="flex justify-center mt-8">
            <button
              className="px-6 py-2 text-white bg-violet-600 rounded hover:bg-violet-700 transition-colors"
              onClick={handleViewMoreClick}
            >
              View More Events
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}