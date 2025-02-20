import * as React from "react";

export function InputField({ id, value, onChange }) {
  //const id = label.toLowerCase().replace(/\s+/g, '-');
  
  return (
    <div className="flex flex-col mt-2 w-full rounded-md max-md:max-w-full">
      <input
        id={id}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="gap-2.5 self-stretch px-2.5 py-4 mt-2.5 bg-white rounded-md min-h-[46px] text-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-600"
        placeholder="Enter details"
      />
    </div>
  );
}
  