import * as React from "react";

export function TimeInputGroup({ startTime, endTime, onStartTimeChange, onEndTimeChange }) {
  return (
    <div className="flex flex-col mt-8 w-full rounded-md max-md:max-w-full">
      <div className="flex gap-5 justify-between max-w-full text-black w-[467px]">
        <label htmlFor="start-time">Start time</label>
        <label htmlFor="end-time">End time</label>
      </div>
      <div className="flex flex-wrap gap-7 mt-2.5 w-full text-slate-500 max-md:max-w-full">
        <input
          id="start-time"
          type="time"
          value={startTime}
          onChange={(e) => onStartTimeChange(e.target.value)}
          className="flex-auto gap-2.5 self-stretch px-2.5 py-4 bg-white rounded-md min-h-[46px] focus:outline-none focus:ring-2 focus:ring-violet-600"
          aria-label="Start time"
        />
        <input
          id="end-time"
          type="time"
          value={endTime}
          onChange={(e) => onEndTimeChange(e.target.value)}
          className="flex-auto gap-2.5 self-stretch px-2.5 py-4 bg-white rounded-md min-h-[46px] focus:outline-none focus:ring-2 focus:ring-violet-600"
          aria-label="End time"
        />
      </div>
    </div>
  );
}