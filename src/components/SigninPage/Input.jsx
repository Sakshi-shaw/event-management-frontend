import * as React from "react";

export function Input({ label, type = "text", id, placeholder, className = "" }) {
  return (
    <div className="flex flex-col justify-center w-full">
      <label htmlFor={id} className="text-base text-black">
        {label}
      </label>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        className={`gap-2.5 px-2.5 py-4 mt-4 w-full text-xs bg-white rounded-md min-h-[46px] text-slate-500 ${className}`}
        aria-label={label}
      />
    </div>
  );
}