import * as React from "react";

export function EventHero({ eventData, onBookNow, onDateSelect }) {
  return (
    <div className="flex relative flex-col justify-center py-px mt-8 rounded-md min-h-[596px] max-md:max-w-full">
      <img
        loading="lazy"
        src={eventData.heroImage}
        alt="Event background"
        className="object-cover absolute inset-0 size-full"
      />
      <div className="flex relative flex-col items-start px-16 pt-8 pb-16 w-full rounded-xl bg-neutral-900 bg-opacity-50 max-md:px-5 max-md:max-w-full">
        <div className="w-full max-w-[1140px] max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col">
            <div className="flex flex-col w-[61%] max-md:ml-0 max-md:w-full">
              <div className="flex flex-col w-full text-base text-white max-md:mt-10 max-md:max-w-full">
                <button 
                  className="flex gap-1.5 justify-center items-center self-start p-2.5 text-center whitespace-nowrap bg-violet-600 rounded-md shadow-sm"
                  onClick={() => window.history.back()}
                >
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/2408c84d0e1d7f58baaca89b2a8a430271f72581e62a19efa6cd50476f7c5b5d?placeholderIfAbsent=true&apiKey=58da0bc4bd54467aa5614e6442508e2b"
                    alt=""
                    className="object-contain shrink-0 self-stretch my-auto w-5 aspect-square"
                  />
                  <span>Back</span>
                </button>
                <h1 className="mt-16 text-6xl font-bold max-md:mt-10 max-md:mr-2.5 max-md:max-w-full max-md:text-4xl">
                  {eventData.title}
                </h1>
                <h2 className="self-start mt-10 text-4xl font-bold">
                  {eventData.organizer}
                </h2>
                <p className="mt-5 max-md:max-w-full">
                  {eventData.description}
                </p>
              </div>
            </div>
            <div className="flex flex-col ml-5 w-[39%] max-md:ml-0 max-md:w-full">
              <div className="flex overflow-hidden flex-col items-start p-8 mt-24 w-full text-base bg-white rounded-xl shadow-sm max-md:px-5 max-md:mt-10">
                <h3 className="text-2xl font-bold text-black">Date & time</h3>
                <p className="mt-5 text-lg text-zinc-500">
                  {eventData.date}
                </p>
                <button 
                  className="mt-5 text-violet-600"
                  onClick={() => onDateSelect(eventData.date)}
                >
                  Add to calendar
                </button>
                <div className="flex flex-col justify-center self-stretch mt-5 w-full text-center text-white">
                  <button 
                    className="gap-2.5 self-stretch px-10 py-4 w-full bg-violet-600 rounded-md max-md:px-5"
                    onClick={onBookNow}
                  >
                    Book now
                  </button>
                  <button className="gap-2.5 self-stretch px-10 py-4 mt-2.5 w-full rounded-md bg-stone-300 max-md:px-5">
                    Program promoter
                  </button>
                </div>
                <p className="self-center mt-5 text-center text-zinc-500">
                  No Refunds
                </p>
              </div>
            </div>
          </div>
        </div>
        <button className="flex gap-2.5 mt-5 text-lg text-white">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/42e137f32a6677b26d4b4293c42e682b24a49b650a0495223645ea403931b576?placeholderIfAbsent=true&apiKey=58da0bc4bd54467aa5614e6442508e2b"
            alt=""
            className="object-contain shrink-0 self-start aspect-[0.95] w-[19px]"
          />
          <span>View map</span>
        </button>
      </div>
    </div>
  );
}