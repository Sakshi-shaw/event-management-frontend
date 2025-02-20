import * as React from "react";
//import collegeImage from '../../../public/college.jpg'; 

export default function AboutCollege() {
  return (
    <section className="flex flex-col items-center px-16 w-full max-md:px-5 max-md:max-w-full">
      <img
        src="https://lh3.googleusercontent.com/p/AF1QipM2svMYf_wQPSND9gcLmc5RlAL_MICEIdeS9UrL=s1360-w1360-h1020"
        alt="IIT Roorkee campus view"
        className="object-contain self-stretch mt-8 w-full rounded-xl aspect-[2.22] max-md:max-w-full"
      />
      <h1 className="self-start mt-8  text-4xl font-bold text-black max-md:ml-2.5">
        Prasad V Potluri Siddhartha Institute Of Technology
      </h1>
      <article className="mt-8 ml-2 text-base text-zinc-500 max-md:max-w-full">
        <p>
        
PVP Siddhartha Institute of Technology (PVP SIT) is a prominent engineering college located in Vijayawada, Andhra Pradesh, India. Established in 1998, the college is named after its founder, Shri P.V.P. Satyanarayana, who aimed to provide high-quality technical education to students. The college is affiliated with JNTUK (Jawaharlal Nehru Technological University, Kakinada) and offers undergraduate and postgraduate programs in various branches of engineering, including Computer Science, Civil, Mechanical, and Electrical Engineering. It is recognized for its infrastructure, state-of-the-art labs, and commitment to academic excellence.
        </p>
        <p className="mt-4">
        The college also emphasizes the holistic development of students, with a focus on research, innovation, and industry collaboration. With a strong faculty, vibrant campus life, and a variety of extracurricular activities, PVP SIT provides students with numerous opportunities to enhance their skills and talents. The institution has consistently maintained a good placement record, with many students securing positions in top national and international companies. Additionally, PVP SIT has a rich legacy of fostering leadership qualities and entrepreneurial skills in its graduates.
        </p>
        
      </article>
    </section>
  );
}