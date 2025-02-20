/* import React, { useState, useEffect, useCallback } from 'react';

function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const images = [
    "https://cdn.builder.io/api/v1/image/assets/TEMP/520e4053c54256a12eb0af66541a3cdce1b4dc19b32e5f60f33219ddc4f5b3c5?placeholderIfAbsent=true&apiKey=58da0bc4bd54467aa5614e6442508e2b",
    "https://i.ytimg.com/vi/sJYDlLwK7-U/hqdefault.jpg",
    "https://www.knowafest.com/files/uploads/Sitar%202k20%20annual%20fest.jpg",
    "https://live.staticflickr.com/3040/2977849554_6b2e307eee_b.jpg",
  ];

  const nextSlide = useCallback(() => {
    setCurrentSlide(prev => (prev + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const handlePrevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + images.length) % images.length);
  };

  const handleNextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % images.length);
  };

  return (
    <div className="flex justify-center w-full px-4 md:px-5">
      <div className="relative w-full max-w-[1320px] h-[600px] mt-8 overflow-hidden rounded-xl">
        {images.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-500 ${
              currentSlide === index ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={img}
              alt={`Hero slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
        
        <div className="absolute inset-0 flex items-center justify-between px-9 max-md:px-5">
          <div 
            className="flex justify-center items-center px-2.5 bg-violet-800 bg-opacity-20 h-[50px] w-[50px] rounded-full cursor-pointer hover:bg-opacity-30 transition-all"
            onClick={handlePrevSlide}
          >
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/a6d4f5280b01cd6d6786da8e666a4fef8bb14b34b140acebe5cd0c6f61e91600?placeholderIfAbsent=true&apiKey=58da0bc4bd54467aa5614e6442508e2b"
              alt="Previous"
              className="w-8 h-8"
            />
          </div>
          <div 
            className="flex justify-center items-center px-2.5 bg-violet-800 bg-opacity-20 h-[50px] w-[50px] rounded-full cursor-pointer hover:bg-opacity-30 transition-all"
            onClick={handleNextSlide}
          >
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/5d52e52938979bed966f9db5409781fef72de89a07e99cbbf3dad142abd1f022?placeholderIfAbsent=true&apiKey=58da0bc4bd54467aa5614e6442508e2b"
              alt="Next"
              className="w-8 h-8"
            />
          </div>
        </div>

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full ${
                currentSlide === index ? 'bg-white' : 'bg-white/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default HeroSection; */

















/* import React, { useState, useEffect, useCallback } from 'react';

function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const images = [
    "https://cdn.builder.io/api/v1/image/assets/TEMP/520e4053c54256a12eb0af66541a3cdce1b4dc19b32e5f60f33219ddc4f5b3c5?placeholderIfAbsent=true&apiKey=58da0bc4bd54467aa5614e6442508e2b",
    "https://i.ytimg.com/vi/sJYDlLwK7-U/hqdefault.jpg",
    "https://www.knowafest.com/files/uploads/Sitar%202k20%20annual%20fest.jpg",
    "https://live.staticflickr.com/3040/2977849554_6b2e307eee_b.jpg",
    "https://www.pvpsiddhartha.ac.in/new_images/Banner7.jpg",
    "	https://www.pvpsiddhartha.ac.in/new_images/civil_1.jpg",
    "https://www.pvpsiddhartha.ac.in/new_images/14.jpg"
  ];

  const nextSlide = useCallback(() => {
    setCurrentSlide(prev => (prev + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const handlePrevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + images.length) % images.length);
  };

  const handleNextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % images.length);
  };

  return (
    <div className="flex justify-center w-full px-4 md:px-5">
      <div className="relative w-full max-w-[1320px] h-[600px] mt-8 overflow-hidden rounded-xl">
        {images.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-500 ${
              currentSlide === index ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="w-full h-full flex items-center justify-center">
              <img
                src={img}
                alt={`Hero slide ${index + 1}`}
                className="max-w-full max-h-full w-auto h-auto object-contain"
                style={{
                  display: 'block',
                  margin: '0 auto'
                }}
              />
            </div>
          </div>
        ))}
        
        <div className="absolute inset-0 flex items-center justify-between px-9 max-md:px-5">
          <div 
            className="flex justify-center items-center px-2.5 bg-violet-800 bg-opacity-20 h-[50px] w-[50px] rounded-full cursor-pointer hover:bg-opacity-30 transition-all"
            onClick={handlePrevSlide}
          >
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/a6d4f5280b01cd6d6786da8e666a4fef8bb14b34b140acebe5cd0c6f61e91600?placeholderIfAbsent=true&apiKey=58da0bc4bd54467aa5614e6442508e2b"
              alt="Previous"
              className="w-8 h-8"
            />
          </div>
          <div 
            className="flex justify-center items-center px-2.5 bg-violet-800 bg-opacity-20 h-[50px] w-[50px] rounded-full cursor-pointer hover:bg-opacity-30 transition-all"
            onClick={handleNextSlide}
          >
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/5d52e52938979bed966f9db5409781fef72de89a07e99cbbf3dad142abd1f022?placeholderIfAbsent=true&apiKey=58da0bc4bd54467aa5614e6442508e2b"
              alt="Next"
              className="w-8 h-8"
            />
          </div>
        </div>

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full ${
                currentSlide === index ? 'bg-white' : 'bg-white/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default HeroSection; */















import React, { useState, useEffect, useCallback } from 'react';

function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const images = [
    "https://cdn.builder.io/api/v1/image/assets/TEMP/520e4053c54256a12eb0af66541a3cdce1b4dc19b32e5f60f33219ddc4f5b3c5?placeholderIfAbsent=true&apiKey=58da0bc4bd54467aa5614e6442508e2b",
    "https://i.ytimg.com/vi/sJYDlLwK7-U/hqdefault.jpg",
    "https://www.knowafest.com/files/uploads/Sitar%202k20%20annual%20fest.jpg",
    "https://live.staticflickr.com/3040/2977849554_6b2e307eee_b.jpg",
    "https://www.pvpsiddhartha.ac.in/new_images/Banner7.jpg",
    "https://www.pvpsiddhartha.ac.in/new_images/civil_1.jpg",
    "https://www.pvpsiddhartha.ac.in/new_images/14.jpg"
  ];

  const nextSlide = useCallback(() => {
    setCurrentSlide(prev => (prev + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const handlePrevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + images.length) % images.length);
  };

  const handleNextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % images.length);
  };

  return (
    <div className="flex justify-center w-full px-4 md:px-5">
      <div className="relative w-full max-w-[1320px] h-[200px] sm:h-[400px] md:h-[300px] lg:h-[600px] mt-8 overflow-hidden rounded-xl">
        {images.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-500 ${
              currentSlide === index ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="w-full h-full flex items-center justify-center">
              <img
                src={img}
                alt={`Hero slide ${index + 1}`}
                className="w-full h-full object-contain"
                style={{
                  imageRendering: 'crisp-edges',
                  maxWidth: '100%',
                  maxHeight: '100%'
                }}
              />
            </div>
          </div>
        ))}
        
        <div className="absolute inset-0 flex items-center justify-between px-4 sm:px-6 md:px-9">
          <div 
            className="flex justify-center items-center px-2 sm:px-2.5 bg-violet-800 bg-opacity-30 h-[35px] w-[35px] sm:h-[40px] sm:w-[40px] md:h-[50px] md:w-[50px] rounded-full cursor-pointer hover:bg-opacity-50 transition-all"
            onClick={handlePrevSlide}
          >
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/a6d4f5280b01cd6d6786da8e666a4fef8bb14b34b140acebe5cd0c6f61e91600?placeholderIfAbsent=true&apiKey=58da0bc4bd54467aa5614e6442508e2b"
              alt="Previous"
              className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8"
            />
          </div>
          <div 
            className="flex justify-center items-center px-2 sm:px-2.5 bg-violet-800 bg-opacity-30 h-[35px] w-[35px] sm:h-[40px] sm:w-[40px] md:h-[50px] md:w-[50px] rounded-full cursor-pointer hover:bg-opacity-50 transition-all"
            onClick={handleNextSlide}
          >
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/5d52e52938979bed966f9db5409781fef72de89a07e99cbbf3dad142abd1f022?placeholderIfAbsent=true&apiKey=58da0bc4bd54467aa5614e6442508e2b"
              alt="Next"
              className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8"
            />
          </div>
        </div>

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${
                currentSlide === index ? 'bg-white' : 'bg-white/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default HeroSection;