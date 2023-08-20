import React from "react";

export function Search({ value, handleOnChange, placeholder }) {
  return (
    <input
      className="border border-gray-300 rounded-full px-4 py-2 m-1"
      value={value}
      onChange={(e) => handleOnChange(e.target.value)}
      placeholder={placeholder}
      type="search" />
  );
}
