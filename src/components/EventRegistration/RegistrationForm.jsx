import * as React from "react";
import { InputField } from "./InputField";
import Global from '../../context/Global'
import { useNavigate } from 'react-router-dom';

export function RegistrationForm({eventname}) {
    const navigate = useNavigate();
  
  const [formData, setFormData] = React.useState({
    name: '',
    email: ''
  });
const formdataevents = {student_id:Global.userId,event_name: eventname};
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    //console.log('suerid'+ Global.userId)
   // console.log('eventname'+ eventname)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log('suerid'+ Global.userId)
    if (Global.userId === 0) {
      alert('You need to sign in first to register.');
      navigate('/signin'); 
    } else {
      try {
        const response = await Global.eventRegistration(formdataevents);
        //console.log(response.success);
        navigate('/EventHiveDashboard');
      } catch (error) {
       // console.error("Error during event creation:", error);
        
      } 
      
    }
   // console.log('Form submitted with data:', formData);
  };
//console.log('eventname'+ eventname);
  return (
    <form 
      onSubmit={handleSubmit}
      className="flex flex-col justify-center self-center mt-24 max-w-full text-xs w-[816px] max-md:mt-10"
    >
      <h1 className="text-4xl font-bold text-center text-black max-md:max-w-full">
        Registration
      </h1>
      <InputField
        label="Your name"
        id="name"
        placeholder="Enter your name"
        value={formData.name}
        onChange={handleChange}
      />
      <InputField
        label="Your Email"
        id="email"
        type="email"
        placeholder="Enter your mail"
        value={formData.email}
        onChange={handleChange}
      />

      <button 
        type="submit"
        className="gap-2.5 self-stretch px-10 py-4 mt-8 w-full text-base text-center text-white bg-violet-600 rounded-md max-md:px-5 max-md:max-w-full hover:bg-violet-700 transition-colors focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
      >
        Register
      </button>
    </form>
  );
}