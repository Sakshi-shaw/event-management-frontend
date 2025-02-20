import * as React from "react";

export default function EventHero() {
  return (
    <div className="flex overflow-hidden gap-5 items-center max-w-full font-medium min-h-[350px] w-[1130px]">
      <div className="flex overflow-hidden flex-col self-stretch my-auto bg-white rounded-3xl min-w-[240px] w-[1130px]">
        <div className="flex relative flex-col items-start px-16 py-12 w-full min-h-[350px] max-md:px-5 max-md:max-w-full">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/a1da168a78f1e3c1af7df387ebc10804b49987cbce56ca62216b9d6d7b06dea8?placeholderIfAbsent=true&apiKey=58da0bc4bd54467aa5614e6442508e2b"
            alt="Event banner background"
            className="object-cover absolute inset-0 size-full"
          />
          <div className="relative text-4xl font-bold tracking-tighter leading-10 text-white w-[377px]">
            Discover and experience extraordinary Events
          </div>
          <div className="relative text-base tracking-tight leading-7 text-gray-50">
            Enter in the world of events. Discover now the latest Events or start creating your own!
          </div>
          <div className="flex relative gap-10 mt-11 max-md:mt-10">
            <button 
              className="px-7 py-3 text-sm tracking-tight leading-6 text-center text-neutral-900 bg-white rounded-2xl max-md:px-5 hover:bg-gray-100 transition-colors"
              aria-label="Discover events now"
            >
              Discover now
            </button>
            <button 
              className="my-auto text-base tracking-tight leading-loose text-white hover:text-gray-200 transition-colors"
              aria-label="Watch video about events"
            >
              Watch video
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}