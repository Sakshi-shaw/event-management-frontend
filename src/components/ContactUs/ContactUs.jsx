// import React, { useState } from "react";
// import Header from "../Header/Header";
// import Footer from "../Footer/Footer";

// const ContactUs = () => {
//   const [selectedCard, setSelectedCard] = useState(null);

//   const handleCardClick = (card) => {
//     setSelectedCard(card);
//   };

//   const cardStyles = (card) =>
//     selectedCard === card
//       ? "bg-blue-600 text-white"
//       : "bg-gray-50 text-black hover:bg-blue-500 ";

//   const iconColor = (card) =>
//     selectedCard === card ? "text-white" : "text-blue-600";

//   return (
//     <div className="flex overflow-hidden flex-col items-center pt-12 bg-gray-50 rounded-3xl">
//       <Header />
//       <div className="min-h-screen mt-8 flex items-center justify-center bg-white-100 p-4">
//         <div className="w-full max-w-5xl h-[700px] bg-gray-50 rounded-xl shadow-lg overflow-hidden flex"
//   style={{ boxShadow: "0 -10px 15px rgba(15, 0, 128, 0.4), 0 10px 15px rgba(128, 0, 128, 0.4)" }}>
//           {/* Left Section */}
//           <section
//             className="w-6/10 bg-white p-8"
//             aria-label="Contact Information"
//           >
//             <h1 className="text-3xl font-bold text-blue-600 mb-6">
//               Contact Information
//             </h1>
//             <p className="text-black-600 mb-8">
//               We're here to assist you with any questions, concerns, or
//               feedback. Whether you need support or more information, feel free
//               to reach out.
//             </p>

//             <div className="grid grid-cols-1 gap-3">
//               {/* Address Section */}
//               <div
//                 className={`flex items-center p-9 border rounded-lg transition duration-300 cursor-pointer ${cardStyles(
//                   "address"
//                 )}`}
//                 onClick={() => handleCardClick("address")}
//               >
//                 <div className="mr-4">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     strokeWidth="1.5"
//                     stroke="currentColor"
//                     className={`h-8 w-8 ${iconColor("address")}`}
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
//                     />
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
//                     />
//                   </svg>
//                 </div>
//                 <div>
//                   <h2 className="text-xl font-semibold">Address</h2>
//                   <p className="mt-2 text-sm">
//                   Prasad V Potluri Siddhartha Institute Of Technology,
//                   Kanuru,Vijayawada-520 007, Andhra Pradesh,India
//                   </p>
//                 </div>
//               </div>

//               {/* Phone Section */}
//               <div
//                 className={`flex items-center p-9 border rounded-lg transition duration-300 cursor-pointer ${cardStyles(
//                   "phone"
//                 )}`}
//                 onClick={() => handleCardClick("phone")}
//               >
//                 <div className="mr-4">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     strokeWidth="1.5"
//                     stroke="currentColor"
//                     className={`h-8 w-8 ${iconColor("phone")}`}
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
//                     />
//                   </svg>
//                 </div>
//                 <div>
//                   <h2 className="text-xl font-semibold">Phone</h2>
//                   <p className="mt-2 text-sm">Talk to us and see how we can work 0866-2581699</p>
//                 </div>
//               </div>

//               {/* Email Section */}
//               <div
//                 className={`flex items-center p-9 border rounded-lg transition duration-300 cursor-pointer ${cardStyles(
//                   "email"
//                 )}`}
//                 onClick={() => handleCardClick("email")}
//               >
//                 <div className="mr-4">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     strokeWidth="1.5"
//                     stroke="currentColor"
//                     className={`h-8 w-8 ${iconColor("email")}`}
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
//                     />
//                   </svg>
//                 </div>
//                 <div>
//                   <h2 className="text-xl font-semibold">Email</h2>
//                   <p className="mt-2 text-sm">we're usually replying with principal@pvpsiddhartha.ac.in</p>
//                 </div>
//               </div>
//             </div>
//           </section>

//           {/* Right Section */}
//           <section className="w-8/12 bg-gray-100 flex items-center justify-center">
//           <div className="flex relative flex-col grow text-base text-center text-white h-full">
//           <img
//           src="/contact-us.jpg" // Replace with the desired image URL
//           alt="Contact Us"
//           className="max-w-full max-h-full object-contain"
//           />
//           </div>
//           </section>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default ContactUs;


























import React, { useState } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const ContactUs = () => {
  const [selectedCard, setSelectedCard] = useState(null);

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const cardStyles = (card) =>
    selectedCard === card
      ? "bg-blue-600 text-white"
      : "bg-gray-50 text-black hover:bg-blue-500 ";

  const iconColor = (card) =>
    selectedCard === card ? "text-white" : "text-blue-600";

  return (
    <div className="flex overflow-hidden flex-col items-center pt-12 bg-gray-50 rounded-3xl">
      <Header />
      <div className="min-h-screen mt-12 flex items-center justify-center bg-white-100 p-4">
        <div className="w-full max-w-5xl h-auto lg:h-[700px] bg-gray-50 rounded-xl shadow-lg"
          style={{ boxShadow: "0 -10px 15px rgba(15, 0, 128, 0.4), 0 10px 15px rgba(128, 0, 128, 0.4)" }}>
          <div className="flex flex-col lg:flex-row h-full">
            {/* Left Section */}
            <section
              className="order-2 lg:order-1 w-full lg:w-6/10 bg-white p-8"
              aria-label="Contact Information"
            >
              <h1 className="text-3xl font-bold text-blue-600 mb-6">
                Contact Information
              </h1>
              <p className="text-black-600 mb-8">
                We're here to assist you with any questions, concerns, or
                feedback. Whether you need support or more information, feel free
                to reach out.
              </p>

              <div className="grid grid-cols-1 gap-3">
                {/* Address Section */}
                <div
                  className={`flex items-center p-9 border rounded-lg transition duration-300 cursor-pointer ${cardStyles(
                    "address"
                  )}`}
                  onClick={() => handleCardClick("address")}
                >
                  <div className="mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className={`h-8 w-8 ${iconColor("address")}`}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">Address</h2>
                    <p className="mt-2 text-sm">
                      Prasad V Potluri Siddhartha Institute Of Technology,
                      Kanuru,Vijayawada-520 007, Andhra Pradesh,India
                    </p>
                  </div>
                </div>

                {/* Phone Section */}
                <div
                  className={`flex items-center p-9 border rounded-lg transition duration-300 cursor-pointer ${cardStyles(
                    "phone"
                  )}`}
                  onClick={() => handleCardClick("phone")}
                >
                  <div className="mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className={`h-8 w-8 ${iconColor("phone")}`}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">Phone</h2>
                    <p className="mt-2 text-sm">Talk to us and see how we can work 0866-2581699</p>
                  </div>
                </div>

                {/* Email Section */}
                <div
                  className={`flex items-center p-9 border rounded-lg transition duration-300 cursor-pointer ${cardStyles(
                    "email"
                  )}`}
                  onClick={() => handleCardClick("email")}
                >
                  <div className="mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className={`h-8 w-8 ${iconColor("email")}`}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                      />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">Email</h2>
                    <p className="mt-2 text-sm">we're usually replying with principal@pvpsiddhartha.ac.in</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Right Section - Fixed overflow issues */}
            <section className="order-1 lg:order-2 w-full lg:w-8/12 bg-gray-100">
              <div className="relative w-full h-[400px] sm:h-[750px] md:h-[850px] lg:h-full">
                <img
                  src="/contact-us.jpg"
                  alt="Contact Us"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactUs;