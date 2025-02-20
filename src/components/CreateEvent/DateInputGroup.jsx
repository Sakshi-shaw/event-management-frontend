import * as React from "react";

export function DateInputGroup({ startDate, endDate, onStartDateChange, onEndDateChange }) {
  return (
    <div className="flex flex-wrap gap-7 items-start mt-8 w-full max-md:max-w-full">
      <div className="flex flex-col flex-1 shrink rounded-md basis-0 min-w-[240px]">
        <label htmlFor="start-date" className="self-start text-black">Start date</label>
        <input
          id="start-date"
          type="date"
          value={startDate}
          onChange={(e) => onStartDateChange(e.target.value)}
          className="gap-2.5 self-stretch px-2.5 py-4 mt-2.5 bg-white rounded-md min-h-[46px] text-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-600"
          aria-label="Start date"
        />
      </div>
      <div className="flex flex-col flex-1 shrink rounded-md basis-0 min-w-[240px]">
        <label htmlFor="end-date" className="self-start text-black">End date</label>
        <input
          id="end-date"
          type="date"
          value={endDate}
          onChange={(e) => onEndDateChange(e.target.value)}
          className="gap-2.5 self-stretch px-2.5 py-4 mt-2.5 bg-white rounded-md min-h-[46px] text-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-600"
          aria-label="End date"
        />
      </div>
    </div>
  );
}