import * as React from "react";

export function InputField({ label, type, placeholder, id }) {
  console.log(label, type, placeholder)
  return (
    <div className="flex flex-col justify-center w-full max-md:max-w-full">
      <label htmlFor={id} className="text-base text-black uppercase max-md:max-w-full">
        {label}
      </label>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        className="gap-2.5 self-stretch px-2.5 py-4 mt-4 w-full text-xs bg-white rounded-md min-h-[46px] text-slate-500 max-md:max-w-full"
        aria-label={label}
      />
    </div>
  );
}