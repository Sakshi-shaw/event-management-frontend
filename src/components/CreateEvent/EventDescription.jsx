import React, { useRef }  from "react";
import { AiOutlineFile } from "react-icons/ai"; // Import file icon from React Icons


export function EventDescription({ event_image, description, onImageChange, onDescriptionChange, error }) {
  const fileInputRef = useRef(null);
  const handleImageClick = () => {
    //document.getElementById('event-image').click();
    
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
    //console.log("Event Image Details:");
    //console.log("Name:", event_image.name);
   // console.log("Name:", event_image);
    //console.log("Size:", event_image.size, "bytes");
    //console.log("Type:", event_image.type);
  };

  const handleImageKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleImageClick();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onImageChange(file);
    }
  };

  return (
    <>
      <h2 className="text-4xl mt-4 font-bold text-center text-black max-md:max-w-full">
        Event Description
      </h2>
      <div className="flex flex-col mt-6 w-full text-black max-md:max-w-full">
        <label htmlFor="event-image" className="max-md:max-w-full">
          Event Image<span className="text-red-500">*</span>
        </label>
        <input
          type="file"
          name="event_image"
          id="event_image"
          ref={fileInputRef}
          accept="image/*"
          onChange={handleFileChange}
          className="sr-only"
          aria-label="Upload event image"
          required
        />
        <div
          role="button"
          tabIndex={0}
          onClick={handleImageClick}
          onKeyDown={handleImageKeyDown}
          className={`flex flex-col items-center justify-center mt-2.5 w-full bg-gray-300 rounded-2xl min-h-[254px] max-md:max-w-full cursor-pointer hover:bg-gray-400 transition-colors ${
            error ? 'border-2 border-red-500' : ''
          }`}
          aria-label="Click to upload event image"
        >
          {event_image ? (
            <img
              src={URL.createObjectURL(event_image)}
              alt="Event preview"
              className="w-full h-full object-cover rounded-2xl"
            />
          ) : (
            <div className="flex flex-col items-center">
              <AiOutlineFile className="text-5xl text-gray-600 mb-2" />
              <span className="text-gray-700 text-sm">Click to upload image</span>
            </div>
          )}
        </div>
      </div>
      
      {/* Description textarea section remains the same */}
      <div className="flex flex-col mt-10 w-full max-md:max-w-full">
        <label htmlFor="description" className="text-black max-md:max-w-full">
          Event Description<span className="text-red-500">*</span>
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
          className="gap-2.5 px-2.5 pt-2.5 pb-36 mt-2.5 w-full bg-white rounded-md min-h-[173px] text-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-600 max-md:pb-24 max-md:max-w-full"
          placeholder="Type here..."
          aria-label="Event description"
          required
        />
      </div>
    </>
  );
}