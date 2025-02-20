import * as React from "react";
import Header from '../Header/Header'
import { RegistrationForm } from "./RegistrationForm";
import { useLocation } from "react-router-dom";

export function RegistrationPage() {
  const location = useLocation();
  const { eventname } = location.state || {}; // Retrieve eventname from state
 // console.log("eventname "+eventname)


  return (
    <div className="flex overflow-hidden flex-col items-center px-20 pt-12 bg-gray-50 rounded-3xl pb-[1040px] max-md:px-5 max-md:pb-24">
      <div className="flex flex-col w-full max-w-[1200px] max-md:max-w-full">
        <Header />
        <RegistrationForm eventname={eventname} /> {/* Pass eventname to RegistrationForm */}
      </div>
    </div>
  );
}
