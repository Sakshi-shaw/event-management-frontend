import React from 'react';
import HeroSection from './HeroSection';
import EventsSection from './EventsSection';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

function EventHiveLayout() {
  return (
    <>
    <Header />
    <div className="flex overflow-hidden flex-col items-center mt-4 pt-12 bg-gray-50 rounded-3xl">
      
      <HeroSection />
      {/* <SearchSection /> */}
      <EventsSection />
      {/* <CreateEventSection /> */}
     {/* <BrandsSection /> */}
      <Footer />
    </div>
    </>
  );
}

export default EventHiveLayout;