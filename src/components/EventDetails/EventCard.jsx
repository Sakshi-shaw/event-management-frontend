import * as React from "react";

export const EventCard = ({ image, title, date, location, isFree = true }) => {
  return (
    <div className="flex overflow-hidden flex-col flex-1 shrink items-start self-stretch p-5 my-auto bg-white rounded-xl basis-0 min-w-[240px] shadow-[0px_-8px_80px_rgba(0,0,0,0.07)]">
      <div className="flex relative flex-col items-start self-stretch px-2.5 pt-2.5 pb-52 w-full text-xs text-center whitespace-nowrap rounded-md aspect-[1.446] max-md:pr-5 max-md:pb-24">
        <img
          loading="lazy"
          src={image}
          alt={title}
          className="object-cover absolute inset-0 size-full"
        />
        {isFree && (
          <div className="relative gap-2.5 self-stretch px-2.5 py-1.5 mb-0 bg-white rounded-md max-md:mb-2.5">
            FREE
          </div>
        )}
      </div>
      <div className="mt-4 text-base text-black">{title}</div>
      <div className="mt-4 text-violet-600">{date}</div>
      <div className="mt-5 text-zinc-500">{location}</div>
    </div>
  );
};