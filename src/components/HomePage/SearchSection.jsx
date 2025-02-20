// import React, { useEffect, useState } from 'react';
// import Global from '../../context/Global';
// import { DateRangePicker } from 'react-date-range';
// import 'react-date-range/dist/styles.css';
// import 'react-date-range/dist/theme/default.css';
// import { FaCalendarAlt, FaTimes } from 'react-icons/fa';
// import TimePicker from 'react-time-picker';
// import 'react-time-picker/dist/TimePicker.css';
// import 'react-clock/dist/Clock.css';

// function SearchSection({ onSearch }) {
//   const [eventTypes, setEventTypes] = useState([]);
//   const [selectedEventType, setSelectedEventType] = useState('');
//   const [eventName, setEventName] = useState('');
//   const [dateRange, setDateRange] = useState([
//     {
//       startDate: null,
//       endDate: null,
//       key: 'selection',
//     },
//   ]);
//   const [startTime, setStartTime] = useState('00:00:00'); // Default start time
//   const [endTime, setEndTime] = useState('23:59:59'); // Default end time
//   const [showDatePicker, setShowDatePicker] = useState(false); // Toggle for calendar

//   useEffect(() => {
//     const loadEventTypes = async () => {
//       try {
//         const data = await Global.fetchEventType();
//         setEventTypes(data.data);
//       } catch (error) {
//         console.error('Error fetching event types:', error);
//       }
//     };

//     loadEventTypes();
//   }, []);
  
//   // Debounce function for event name search
//   const debounce = (func, wait) => {
//     let timeout;
//     return (...args) => {
//       clearTimeout(timeout);
//       timeout = setTimeout(() => func(...args), wait);
//     };
//   };

//   const handleSearch = (isButtonClick = false) => {
//     const payload = {
//       eventType: selectedEventType,
//       eventName,
//       startDate: formatDateTime(dateRange[0].startDate, startTime),
//       endDate: formatDateTime(dateRange[0].endDate, endTime),
//     };
//     onSearch(payload);
//   };


// // Debounced event name search
//   const debouncedEventNameSearch = debounce((value) => {
//     setEventName(value);
//     handleSearch();
//   }, 50);

//   const formatDate = (date) => {
//     return date ? date.toISOString().split('T')[0] : '';
//   };

//   const formatDateTime = (date, time) => {
//     return date && time ? `${formatDate(date)} ${time}` : '';
//   };

//   const formattedDateRange = dateRange[0].startDate && dateRange[0].endDate
//     ? `${formatDateTime(dateRange[0].startDate, startTime)} - ${formatDateTime(dateRange[0].endDate, endTime)}`
//     : '';

//   const handleEventTypeChange = (e) => {
//     const value = e.target.value;
//     setSelectedEventType(value);
//     handleSearch();
//   };


//   const clearDateRange = () => {
//     setDateRange([
//       {
//         startDate: null,
//         endDate: null,
//         key: 'selection',
//       },
//     ]);
//     setStartTime('00:00:00');
//     setEndTime('23:59:59');
//     handleSearch();
//   };

//   const handleCancel = () => {
//     clearDateRange();
//     setShowDatePicker(false);
//   };

//   const handleOk = () => {
//     setShowDatePicker(false);
//     handleSearch();
//   };

//   return (
//     <div className="flex overflow-hidden z-10 flex-wrap gap-10 justify-center px-16 py-9 mt-8 w-full rounded-3xl bg-violet-950 max-w-[1200px] max-md:px-5 max-md:max-w-full relative">
//       <div className="flex flex-wrap flex-auto gap-10 items-center">
//         {/* Event Type Dropdown */}
//         <div className="flex flex-col flex-1 shrink justify-between self-stretch my-auto basis-0 min-h-[70px] min-w-[240px]">
//           <label className="text-base text-gray-50">Looking for</label>
//           <select
//             className="self-stretch my-auto px-4 py-2 mt-3 text-violet-950 bg-gray-200 rounded-md w-full"
//             value={selectedEventType}
//             onChange={handleEventTypeChange}
//           >
//              <option value="">All Event Types</option>
//             {eventTypes.map((eventType) => (
//               <option key={eventType.id} value={eventType.eventType}>
//                 {eventType.eventType}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Event Name Input */}
//         <div className="flex flex-col flex-1 shrink justify-between self-stretch my-auto basis-0 min-h-[70px] min-w-[240px]">
//           <label className="text-base text-gray-50">Event Name</label>
//           <input
//             type="text"
//             className="px-4 py-2 mt-3 text-violet-950 bg-gray-200 rounded-md w-full"
//             placeholder="Search by event name"
//             value={eventName}
//             onChange={(e) => debouncedEventNameSearch(e.target.value)}
//           />
//         </div>

//         {/* Date Range Picker with Calendar Icon */}
//         <div className="flex flex-col flex-1 shrink justify-between self-stretch my-auto basis-0 min-h-[70px] min-w-[240px] relative">
//           <label className="text-base text-gray-50">When</label>
//           <div className="flex items-center mt-3 relative">
//             <input
//               type="text"
//               className="px-4 py-2 text-violet-950 bg-gray-200 rounded-md w-full"
//               placeholder="Select a date range"
//               value={formattedDateRange}
//               readOnly
//               onClick={() => setShowDatePicker((prev) => !prev)}
//             />
//             <div className="absolute right-4 flex items-center gap-2">
//               {formattedDateRange && (
//                 <FaTimes
//                   className="text-gray-600 cursor-pointer"
//                   onClick={clearDateRange}
//                 />
//               )}
//               <FaCalendarAlt
//                 className="text-gray-600 cursor-pointer"
//                 onClick={() => setShowDatePicker((prev) => !prev)}
//               />
//             </div>
//           </div>
//           {showDatePicker && (
//             <div
//               className="absolute top-full left-0 z-50 mt-2 bg-white shadow-lg rounded-md"
//               style={{
//                 position: 'fixed',
//                 top: '50%',
//                 left: '70%',
//                 transform: 'translate(-50%, -50%)',
//                 zIndex: 10000,
//               }}
//             >
//               <DateRangePicker
//                 ranges={dateRange}
//                 onChange={(ranges) => setDateRange([ranges.selection])}
//                 showDateDisplay={false}
//               />
//               <div className="flex justify-between mt-4 gap-4">
//                 <div>
//                   <label>Start Time</label>
//                   <TimePicker
//                     onChange={setStartTime}
//                     value={startTime}
//                     disableClock
//                     format="HH:mm:ss"
//                   />
//                 </div>
//                 <div>
//                   <label>End Time</label>
//                   <TimePicker
//                     onChange={setEndTime}
//                     value={endTime}
//                     disableClock
//                     format="HH:mm:ss"
//                   />
//                 </div>
//               </div>
//               <div className="flex justify-between gap-4 mt-4">
//                 <button
//                   className="px-4 py-2 bg-gray-600 text-white rounded-md"
//                   onClick={handleCancel}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   className="px-4 py-2 bg-violet-600 text-white rounded-md"
//                   onClick={handleOk}
//                 >
//                   OK
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Search Button */}
//       <button
//         className="flex gap-2.5 justify-center items-center px-4 py-2 bg-violet-600 text-white rounded-md mt-5"
//         onClick={handleSearch}
//       >
//         Search
//       </button>

//       {/* CSS to remove rdrStaticRanges class */}
//       <style jsx>{`
//         .rdrStaticRanges {
//           display: none !important;
//         }
//         .rdrDefinedRangesWrapper{
//           display: none !important;
//         }
//       `}</style>
//     </div>
//   );
// }

// export default SearchSection;

























import React, { useEffect, useState } from 'react';
import Global from '../../context/Global';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { FaCalendarAlt, FaTimes } from 'react-icons/fa';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';

function SearchSection({ onSearch }) {
  const [eventTypes, setEventTypes] = useState([]);
  const [selectedEventType, setSelectedEventType] = useState('');
  const [eventName, setEventName] = useState('');
  const [dateRange, setDateRange] = useState([
    {
      startDate: null,
      endDate: null,
      key: 'selection',
    },
  ]);
  const [startTime, setStartTime] = useState('00:00:00');
  const [endTime, setEndTime] = useState('23:59:59');
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    const loadEventTypes = async () => {
      try {
        const data = await Global.fetchEventType();
        setEventTypes(data.data);
      } catch (error) {
        console.error('Error fetching event types:', error);
      }
    };

    loadEventTypes();
  }, []);

  // Function to trigger search
  const triggerSearch = (includeDate = true) => {
    const payload = {
      eventType: selectedEventType,
      eventName,
      startDate: includeDate && dateRange[0].startDate ? `${formatDateTime(dateRange[0].startDate, startTime)}` : '',
      endDate: includeDate && dateRange[0].endDate ? `${formatDateTime(dateRange[0].endDate, endTime)}` : '',
    };
    onSearch(payload);
  };

  // Effect to trigger search when filters change
  useEffect(() => {
    if (selectedEventType !== undefined || eventName !== '') {
      triggerSearch(true);
    }
  }, [selectedEventType, eventName]);

  const formatDate = (date) => {
    return date ? date.toISOString().split('T')[0] : '';
  };

  const formatDateTime = (date, time) => {
    return date && time ? `${formatDate(date)} ${time}` : '';
  };

  const formattedDateRange = dateRange[0].startDate && dateRange[0].endDate
    ? `${formatDateTime(dateRange[0].startDate, startTime)} - ${formatDateTime(dateRange[0].endDate, endTime)}`
    : '';

  const handleEventTypeChange = (e) => {
    setSelectedEventType(e.target.value);
  };

  const handleEventNameChange = (e) => {
    setEventName(e.target.value);
  };

  const handleDateRangeChange = (ranges) => {
    setDateRange([ranges.selection]);
  };

  const clearDateRange = () => {
    setDateRange([{
      startDate: null,
      endDate: null,
      key: 'selection',
    }]);
    setStartTime('00:00:00');
    setEndTime('23:59:59');
    
    // Reset search without date parameters
    const resetPayload = {
      eventType: selectedEventType,
      eventName,
      startDate: '',
      endDate: '',
    };
    onSearch(resetPayload);
  };

  const handleCancel = () => {
    clearDateRange();
    setShowDatePicker(false);
  };

  const handleOk = () => {
    setShowDatePicker(false);
    if (dateRange[0].startDate && dateRange[0].endDate) {
      triggerSearch(true);
    }
  };

  return (
    <div className="flex justify-center w-full">
      <div className="w-full max-w-[1320px] px-4 md:px-5">
        <div className="flex overflow-visible z-10 flex-wrap gap-10 justify-center px-4 sm:px-6 lg:px-8 py-9 mt-8 w-full rounded-3xl bg-violet-950 max-w-[1200px] mx-auto">
          <div className="flex flex-wrap flex-auto gap-5 lg:gap-10 items-center w-full">
            {/* Event Type Dropdown */}
            <div className="flex flex-col flex-1 shrink justify-between self-stretch my-auto basis-0 min-h-[70px] w-full sm:w-auto min-w-[240px]">
              <label className="text-base text-gray-50">Looking for</label>
              <select
                className="self-stretch my-auto px-4 py-2 mt-3 text-violet-950 bg-gray-200 rounded-md w-full"
                value={selectedEventType}
                onChange={handleEventTypeChange}
              >
                <option value="">All Event Types</option>
                {eventTypes.map((eventType) => (
                  <option key={eventType.id} value={eventType.eventType}>
                    {eventType.eventType}
                  </option>
                ))}
              </select>
            </div>

            {/* Event Name Input */}
            <div className="flex flex-col flex-1 shrink justify-between self-stretch my-auto basis-0 min-h-[70px] w-full sm:w-auto min-w-[240px]">
              <label className="text-base text-gray-50">Event Name</label>
              <div className="relative">
                <input
                  type="text"
                  className="px-4 py-2 mt-3 text-violet-950 bg-gray-200 rounded-md w-full"
                  placeholder="Search by event name"
                  value={eventName}
                  onChange={handleEventNameChange}
                />
                {eventName && (
                  <FaTimes
                    className="absolute right-3 top-1/2 transform translate-y-1 text-gray-600 cursor-pointer"
                    onClick={() => setEventName('')}
                  />
                )}
              </div>
            </div>

            {/* Modified Date Range Picker */}
            <div className="flex flex-col flex-1 shrink justify-between self-stretch my-auto basis-0 min-h-[70px] w-full sm:w-auto min-w-[240px] relative">
              <label className="text-base text-gray-50">When</label>
              <div className="flex items-center mt-3 relative">
                <input
                  type="text"
                  className="px-4 pr-16 py-2 text-violet-950 bg-gray-200 rounded-md w-full text-sm focus:outline-none focus:ring-2 focus:ring-violet-600 overflow-hidden whitespace-nowrap text-ellipsis"
                  placeholder="Select a date range"
                  value={formattedDateRange}
                  readOnly
                  onClick={() => setShowDatePicker((prev) => !prev)}
                />
                <div className="absolute right-0 flex items-center h-full pr-2">
                  {formattedDateRange && (
                    <FaTimes
                      className="text-gray-600 cursor-pointer mr-2"
                      onClick={clearDateRange}
                    />
                  )}
                  <FaCalendarAlt
                    className="text-gray-600 cursor-pointer"
                    onClick={() => setShowDatePicker((prev) => !prev)}
                  />
                </div>
              </div>
              
              {/* Modified DateRangePicker Popup */}
              {showDatePicker && (
                <>
                  {/* Overlay */}
                  <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={() => setShowDatePicker(false)}
                  />
                  
                  {/* DateRangePicker Container */}
                  <div className="absolute bg-white shadow-lg rounded-lg z-50 mt-2"
                       style={{
                         top: "calc(100% + 8px)",
                         left: "50%",
                         transform: "translateX(-50%)",
                         width: "auto",
                         maxWidth: "100vw"
                       }}>
                    <div className="p-4">
                      <DateRangePicker
                        ranges={dateRange}
                        onChange={handleDateRangeChange}
                        showDateDisplay={false}
                        className="!border-0"
                      />
                      <div className="flex justify-between mt-4 gap-4">
                        <div className="flex-1">
                          <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
                          <TimePicker
                            onChange={setStartTime}
                            value={startTime}
                            disableClock
                            format="HH:mm:ss"
                            className="w-full p-2 border rounded-md"
                          />
                        </div>
                        <div className="flex-1">
                          <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
                          <TimePicker
                            onChange={setEndTime}
                            value={endTime}
                            disableClock
                            format="HH:mm:ss"
                            className="w-full p-2 border rounded-md"
                          />
                        </div>
                      </div>
                      <div className="flex justify-end gap-4 mt-4 pt-4 border-t">
                        <button
                          className="px-4 py-2 text-sm font-medium text-black bg-gray-200 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
                          onClick={handleCancel}
                        >
                          Cancel
                        </button>
                        <button
                          className="px-4 py-2 text-sm font-medium text-white bg-violet-600 rounded-md hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
                          onClick={handleOk}
                        >
                          OK
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .rdrStaticRanges {
          display: none !important;
        }
        .rdrDefinedRangesWrapper {
          display: none !important;
        }
        .rdrCalendarWrapper {
          font-size: 14px !important;
          width: auto !important;
        }
        .rdrDateDisplayWrapper {
          background-color: transparent !important;
        }
        .react-time-picker {
          width: 100% !important;
        }
        .react-time-picker__wrapper {
          border: 1px solid #e2e8f0 !important;
          border-radius: 0.375rem !important;
          padding: 0.5rem !important;
        }
        .react-time-picker__inputGroup {
          padding: 0 !important;
        }
      `}</style>
    </div>
  );
}

export default SearchSection;