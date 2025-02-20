// import * as React from "react";
// import { useNavigate } from "react-router-dom";

// export default function EventCard({ title, date, imageSrc, statsImage, 
//   imagename,
//   eventType,
//   eventName,
//   eventDescription,
//   startDate,
//   endDate,
//   teacherName,
//   roomNo,
//   deptName,
//   event_level,
//   id,
//   onClick,
// }) {

//   const navigate = useNavigate();
//   const handleRegisterClick = () => {
//     navigate('/RegistrationPage');
//   };
//   //alert('IMZGENZME'+imagename)
//   const imageUrl = `http://localhost/ci4/backend/public/uploads/event_images/${imagename}`;
//   return (
//     <div onClick={onClick} className="flex overflow-hidden flex-col items-start p-5 my-auto bg-white rounded-xl shadow-[0px_-8px_80px_rgba(0,0,0,0.07)] transition-all duration-300 transform hover:scale-105 hover:shadow-[0px_-8px_80px_rgba(128,90,213,0.5)]">
//    <div className="flex relative flex-col items-start self-stretch px-2.5 pt-2.5 pb-52 w-full text-xs text-center whitespace-nowrap rounded-md aspect-[1.446] max-md:pr-5 max-md:pb-24">
//       <img

//         loading="lazy"

//         src={imageUrl}

//         alt="Event"

//         className="object-cover absolute inset-0 size-full"

//         /> 
// </div>
//       <div className="flex gap-5 justify-between items-start mt-5 max-md:mr-1 max-md:ml-2.5">
//         <div className="flex flex-col font-bold">
//             <div className="mt-4 text-base font-bold text-black max-w-full overflow-hidden">
//                 <div className="truncate w-full">
//                   {eventName}
//                 </div>
//             </div>
//           <div className="mt-2 text-sm text-gray-500">{eventType}</div>
      
//           <div className="mt-4 text-gray-500">
//             {new Date(startDate).toLocaleDateString()} - {new Date(endDate).toLocaleDateString()}
//           </div>
//         </div>
//           {/* <div className="flex flex-col text-sm font-medium tracking-tight leading-6 text-center text-gray-50 whitespace-nowrap">
//             <img
//               loading="lazy"
//               src={statsImage}
//               alt="Event statistics"
//               className="object-contain self-end aspect-[2.56] w-[87px]"
//             />
            
//           </div> */}
//       </div>
//     </div>
//   );
// }











import * as React from "react";
import { useNavigate } from "react-router-dom";

export default function EventCard({ title, date, imageSrc, statsImage, 
  imagename,
  eventType,
  eventName,
  eventDescription,
  startDate,
  endDate,
  teacherName,
  roomNo,
  deptName,
  event_level,
  id,
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