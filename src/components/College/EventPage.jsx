import * as React from "react";
import Header from '../Header/Header';
import CollegeEvents from "./CollegeEvents";
import Footer from '../Footer/Footer';
import AboutCollege from "./AboutCollege";

export default function EventPage() {
  return (
    <>
    <Header />
    <div className="flex overflow-hidden flex-col items-center pt-12 bg-gray-50 rounded-3xl mt-4">
      
      <AboutCollege />
      <CollegeEvents />
      <Footer />
    </div>
    </>
  );
}