import React, { useState } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const FAQ = () => {
  const [activeCard, setActiveCard] = useState(null); // Tracks which card is active globally

  const toggleFAQ = (section, index) => {
    const cardId = `${section}-${index}`; // Create a unique ID for each card
    setActiveCard(activeCard === cardId ? null : cardId);
  };

  const faqs_l = [
    { question: "How can I reset my password?", answer: "To reset your password, go to the login page and click on the 'Forgot password' link. Enter the email address associated with your account, and you will receive an email with instructions on how to reset your password." },
    { question: "How can I contact customer support?", answer: "You can contact customer support through the 'Contact us' button on this page." },
    { question: "How do I update my profile information?", answer: "Go to your account settings and update your profile information in the relevant fields." },
    { question: "Can I cancel my event registration?", answer: "Yes, you can cancel your registration by visiting the event details page and clicking on the Cancel Registration button before the event starts." },
    { question: "How is my data used by the platform?", answer: "Your data is securely stored and used only to enhance your experience, such as providing personalized event recommendations and analyzing feedback for improving event quality." },
    { question: "Can I book a room for my event?", answer: "Yes, the platform provides a room booking feature. During the event creation process, you can select and book an available room that suits your needs." },
  ];

  const faqs_r = [
    { question: "How can I register for an event?", answer: "You can register for an event by navigating to the event details page and clicking on the Register button. Fill in the required information to complete your registration." },
    { question: "What types of events does the platform support?", answer: "The platform supports a wide range of events, including tech festivals, webinars, sports competitions, cultural programs, and workshops." },
    { question: "How does the platform allocate rooms for events?", answer: "The platform uses an AI-driven algorithm to allocate rooms based on event requirements, availability, and participant capacity." },
    { question: "How can I provide feedback for an event I attended?", answer: "After attending an event, you will receive a notification with a link to the feedback form. You can submit your feedback directly through the platform." },
    { question: "How can I view the schedule of events?", answer: "The schedule of events is available on the homepage or the Events Calendar section. You can filter events by type, date, or category." },
  ];

  return (
    <div className="flex overflow-hidden flex-col items-center pt-12 bg-gray-50 rounded-3xl">
      <Header />
    <div className="min-h-screen mt-8 bg-white-100 flex flex-col items-center justify-center p-6">
      {/* Title */}
      <h1 className="text-4xl font-bold text-purple-600 mb-8 text-center">
        Frequently Asked Questions
      </h1>

      {/* FAQ Sections */}
      <div className="flex flex-col md:flex-row md:space-x-10 justify-center w-full max-w-5xl">
        {/* Left Section */}
        <div className="flex flex-col items-center md:w-1/2 space-y-4">
          {faqs_l.map((faq, index) => (
            <div
              key={index}
              className={`border rounded-lg p-4 w-full max-w-md hover:scale-105 transition-transform duration-200 cursor-pointer ${
                activeCard === `left-${index}`
                  ? "shadow-lg shadow-gray-400"
                  : "shadow-none"
              }`}
              onClick={() => toggleFAQ("left", index)}
            >
              <div className="flex justify-between items-center">
                <h3
                  className={`text-lg font-semibold ${
                    activeCard === `left-${index}`
                      ? "text-gray-500"
                      : "text-blue-500"
                  }`}
                >
                  {faq.question}
                </h3>
                <button
                  className={`text-2xl ${
                    activeCard === `left-${index}`
                      ? "text-gray-500"
                      : "text-blue-500"
                  }`}
                >
                  {activeCard === `left-${index}` ? "-" : "+"}
                </button>
              </div>
              {activeCard === `left-${index}` && (
                <p className="mt-2 text-gray-700">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>

        {/* Right Section */}
        <div className="flex flex-col items-center md:w-1/2 space-y-4 mt-6 md:mt-0">
          {faqs_r.map((faq, index) => (
            <div
              key={index}
              className={`border rounded-lg p-4 w-full max-w-md hover:scale-105 transition-transform duration-200 cursor-pointer ${
                activeCard === `right-${index}`
                  ? "shadow-lg shadow-gray-400"
                  : "shadow-none"
              }`}
              onClick={() => toggleFAQ("right", index)}
            >
              <div className="flex justify-between items-center">
                <h3
                  className={`text-lg font-semibold ${
                    activeCard === `right-${index}`
                      ? "text-gray-500"
                      : "text-blue-500"
                  }`}
                >
                  {faq.question}
                </h3>
                <button
                  className={`text-2xl ${
                    activeCard === `right-${index}`
                      ? "text-gray-500"
                      : "text-blue-500"
                  }`}
                >
                  {activeCard === `right-${index}` ? "-" : "+"}
                </button>
              </div>
              {activeCard === `right-${index}` && (
                <p className="mt-2 text-gray-700">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
    <Footer />
  </div>
  );
};

export default FAQ;
