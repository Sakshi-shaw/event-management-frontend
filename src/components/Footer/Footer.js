import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Global from '../../context/Global';
import {InputField} from './InputField';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Footer() {
  const navigate = useNavigate();
  const [formemail, setFormEmail] = useState({
    email:"",
  });

  const handleInputChange = (name, value) => {
    setFormEmail((prev) => {
      const updatedData = { ...prev, [name]: value };
      return updatedData;
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await Global.subscribe(formemail.email);
      if (response.success === "true") {
        toast.success('Subscription successful for ${formemail.email}', {
          position: "top-right",
          autoClose: 3000,
          closeButton: true,
          className: 'mx-2 md:mx-4 mt-16 md:mt-20 max-w-[90vw] md:max-w-md w-fit min-w-[200px] text-sm md:text-base p-4',
          style: {
            zIndex: 9999
          }
        });
      } else {
        toast.error("Subscription failed: ${response.message}", {
          position: "top-right",
          autoClose: 3000,
          closeButton: true,
          className: 'mx-2 md:mx-4 mt-16 md:mt-20 max-w-[90vw] md:max-w-md w-fit min-w-[200px] text-sm md:text-base p-4',
          style: {
            zIndex: 9999
          }
        });        
      }
    } catch (error) {
      console.error("Error during subscription:", error);
      toast.error("Error during subscription", {
        position: "top-right",
        autoClose: 3000,
        closeButton: true,
        className: 'mx-2 md:mx-4 mt-16 md:mt-20 max-w-[90vw] md:max-w-md w-fit min-w-[200px] text-sm md:text-base p-4',
        style: {
          zIndex: 9999
        }
      });
    }
  };

  const handleNavClick = (path, e) => {
    e.preventDefault();
    navigate(path);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="flex flex-col items-center px-16 py-7 mt-20 w-full bg-violet-950 max-md:px-5 max-md:mt-10 max-md:max-w-full">
      <div className="text-4xl font-bold text-center text-black">
        <span className="text-gray-50">Campus</span>{" "}
        <span className="text-violet-600">Connect</span>
      </div>
      <form className="flex gap-2.5 justify-center items-center mt-0 max-w-full w-[450px] max-md:w-[90%] max-sm:w-[95%]"
      onSubmit={handleSubmit}>
        <InputField
          type="email"
          label="Event Title"
          id="emailInput"
          className="flex-1 shrink gap-2.5 self-stretch px-4 py-5 my-auto text-xs bg-white rounded-md basis-[50px] min-h-[50px] max-md:min-h-[40px] max-sm:min-h-[35px] min-w-[240px] max-md:min-w-[180px] text-slate-500"
          placeholder="Enter your mail"
          value={formemail.email}
          onChange={(value) => handleInputChange("email", value)}
        />
        <button type="submit" className="gap-2.5 mt-4 self-stretch px-10 py-4 my-auto text-base text-center text-white whitespace-nowrap bg-violet-600 rounded-md min-h-[50px] max-md:min-h-[40px] max-sm:min-h-[35px] max-sm:px-4 max-md:text-sm max-sm:text-xs max-md:px-5">
          Subscribe
        </button>
      </form>
      <nav className="flex flex-row max-md:flex-col justify-center items-center mt-8 max-w-full text-base text-center text-white w-[492px] max-md:w-full">
        <Link to="/" onClick={(e) => handleNavClick('/', e)} className="p-2 hover:text-violet-400 transition-colors max-md:w-full">Home</Link>
        <Link to="/EventPage" onClick={(e) => handleNavClick('/EventPage', e)} className="p-2 hover:text-violet-400 transition-colors max-md:w-full">About</Link>
        <Link to="/UpcomingEventPage" onClick={(e) => handleNavClick('/UpcomingEventPage', e)} className="p-2 hover:text-violet-400 transition-colors max-md:w-full">Events</Link>
        <Link to="/ContactUs" onClick={(e) => handleNavClick('/ContactUs', e)} className="p-2 hover:text-violet-400 transition-colors max-md:w-full">Get in touch</Link>
        <Link to="/FAQs" onClick={(e) => handleNavClick('/FAQs', e)} className="p-2 hover:text-violet-400 transition-colors max-md:w-full">FAQs</Link>
      </nav>
      <div className="shrink-0 self-stretch mt-7 h-px bg-white border border-white border-solid max-md:max-w-full" />
      <div className="w-full mt-6 max-md:max-w-full">
        <div className="flex justify-center items-center gap-20 max-md:flex-col max-md:gap-4">
          <div className="flex gap-4 justify-center items-center">
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/3154c4e1aff88efc93bc09c4ccef434c067a31ef5faa201d29d57318a4acf20c?placeholderIfAbsent=true&apiKey=58da0bc4bd54467aa5614e6442508e2b"
                alt="LinkedIn"
                className="object-contain shrink-0 self-stretch my-auto aspect-square w-[31px]"
              />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/c67c7831952fd57070cd499bcca6df52424205155184bf4b2e386b19e944287c?placeholderIfAbsent=true&apiKey=58da0bc4bd54467aa5614e6442508e2b"
                alt="Instagram"
                className="object-contain shrink-0 self-stretch my-auto aspect-square w-[31px]"
              />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/db877a0f4c077d292c2aa74deda0ba7e30af6b0e8c6e1be86b5482f0647148e5?placeholderIfAbsent=true&apiKey=58da0bc4bd54467aa5614e6442508e2b"
                alt="social media"
                className="object-contain shrink-0 self-stretch my-auto aspect-square w-[31px]"
              />
            </a>
          </div>
          <div className="text-base text-white">
            Non Copyrighted © 2023 Upload by PVPSIT
          </div>
        </div>
      </div>
    </div>
  );
}