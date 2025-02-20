import * as React from "react";

export function InputField({ label, type = "text", id, placeholder, value, onChange }) {
  return (
    <div className="flex flex-col mt-8 w-full rounded-md max-md:max-w-full">
      <label htmlFor={id} className="self-start text-black text-xs">
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="gap-2.5 self-stretch px-2.5 py-4 mt-2.5 bg-white rounded-md min-h-[46px] text-slate-500 text-xs border border-gray-200 focus:outline-none focus:border-violet-600"
        aria-label={label}
        required
      />
    </div>
  );
}