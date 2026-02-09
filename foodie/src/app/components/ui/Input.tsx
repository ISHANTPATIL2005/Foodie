"use client";

import React from "react";

interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function Input({ label, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-semibold text-gray-800">
        {label}
      </label>

      <input
        {...props}
        className="
          w-full rounded-xl border border-gray-300
          px-4 py-3 text-gray-900 placeholder-gray-400
          transition
          focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500
          outline-none
        "
      />
    </div>
  );
}
