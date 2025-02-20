/* import React from 'react';
import Global from '../../context/Global';
import { useNavigate } from 'react-router-dom';

function EventCard({
  imagename,
  eventType,
  eventName,
  eventDescription,
  startDate,
  endDate,
  teacherName,
  roomNo,
  deptName,
  onClick,
}) {
  const imageUrl = `http://localhost/ci4/backend/public/uploads/event_images/${imagename}`;
  const navigate = useNavigate();
  const handleRegisterClick = () => {

    navigate('/RegistrationPage');
  };
  console.log("imagename " + JSON.stringify(imagename))

  return (
    <div onClick={onClick} className="flex overflow-hidden flex-col items-start p-5 my-auto bg-white rounded-xl shadow-[0px_-8px_80px_rgba(0,0,0,0.07)] transition-all duration-300 transform hover:scale-105 hover:shadow-[0px_-8px_80px_rgba(128,90,213,0.5)]">
      <div className="flex relative flex-col items-start self-stretch px-2.5 pt-2.5 pb-52 w-full text-xs text-center whitespace-nowrap rounded-md aspect-[1.446] max-md:pr-5 max-md:pb-24">
      <img

loading="lazy"

src={imageUrl}

alt="Event"

className="object-cover absolute inset-0 size-full"

/> 

      </div>

      <div className="mt-4 text-base font-bold text-black max-w-full overflow-hidden">
        <div className="truncate w-full">
          {eventName}
        </div>
      </div>
      <div className="mt-2 text-sm text-gray-500">{eventType}</div>
      
      <div className="mt-4 text-gray-500">
        {new Date(startDate).toLocaleDateString()} - {new Date(endDate).toLocaleDateString()}
      </div>
    </div>
  );
}

export default EventCard; */


















import React from 'react';
import Global from '../../context/Global';
import { useNavigate } from 'react-router-dom';

function EventCard({
  imagename,
  eventType,
  eventName,
  eventDescription,
  startDate,
  endDate,
  teacherName,
  roomNo,
  deptName,
  onClick,
}) {
  const imageUrl = `http://localhost/ci4/backend/public/uploads/event_images/${imagename}`;
  const navigate = useNavigate();
  const handleRegisterClick = () => {
    navigate('/RegistrationPage');
  };
  //console.log("imagename " + JSON.stringify(imagename))

  return (
    <div onClick={onClick} className="flex overflow-hidden flex-col items-start p-5 my-auto bg-white rounded-xl shadow-[0px_-8px_80px_rgba(0,0,0,0.07)] transition-all duration-300 transform hover:scale-105 hover:shadow-[0px_-8px_80px_rgba(128,90,213,0.5)]">
      <div className="relative w-full pt-[69.15%] rounded-md">
        <div className="absolute inset-0 p-2.5">
          <img
            loading="lazy"
            src={imageUrl}
            alt="Event"
            className="w-full h-full object-contain rounded-md"
          />
        </div>
      </div>

      <div className="mt-4 text-base font-bold text-black max-w-full overflow-hidden">
        <div className="truncate w-full">
          {eventName}
        </div>
      </div>
      <div className="mt-2 text-sm text-gray-500">{eventType}</div>
      
      <div className="mt-4 text-gray-500">
        {new Date(startDate).toLocaleDateString()} - {new Date(endDate).toLocaleDateString()}
      </div>
    </div>
  );
}

export default EventCard;