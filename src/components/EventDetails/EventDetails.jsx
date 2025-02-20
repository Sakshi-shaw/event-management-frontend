import * as React from "react";
import { EventDescription } from "./EventDescription";
import Footer from '../Footer/Footer';
import { useLocation } from 'react-router-dom';
import Header from '../Header/Header';

export function EventDetails() {
  const [isBookingOpen, setIsBookingOpen] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState(null);
  const location = useLocation();
 // const { event } = location.state || {};
 const { event = {}, eventsRegistered = false, eventsRegisteredData = null } = location.state || {};



  //const {eventsRegistered, eventsRegisteredData} = location.state || {};
  //console.log("eventsRegistered "+eventsRegistered + "  RegisteredEventName "+ eventsRegisteredData)

  const handleBookNow = () => {
    setIsBookingOpen(true);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  
  return (
    <>
    <Header /> 
    <div className="flex overflow-hidden flex-col items-center pt-12 bg-gray-50 rounded-3xl mt-4">
     
      <main className="px-4 py-8 max-w-7xl mx-auto">
        <div className="flex justify-center items-center">
          <EventDescription 
            imagename={event.imagename}
            event_level={event.event_level}
            id={event.id}
            eventStatus={event.event_status}
            eventType={event.eventType} 
            startdate={event.start_date} 
            teacher_name={event.teacher_name} 
            lastdate={event.end_date} 
            eventname={event.event_name} 
            description={event.description} 
            winner_details={event.winner_details}
            teacher_email={event.teacher_email}
            accepted_rejected={event.accepted_rejected}
            eventsRegistered={eventsRegistered}
            eventsRegisteredData={eventsRegisteredData}
            eligible_dept={event.eligible_dept}
          />
        </div>
      </main>
      
      <Footer />
    </div>
    </>
  );
}