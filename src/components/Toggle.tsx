// src/components/Toggle.tsx
import React from "react";

interface ToggleProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const Toggle: React.FC<ToggleProps> = ({ label, checked, onChange }) => {
  return (
    <label className="flex items-center cursor-pointer">
      <span className="mr-3">{label}</span>
      <div
        className={`relative inline-flex items-center h-6 rounded-full w-11 ${
          checked ? "bg-green-600" : "bg-gray-300"
        } ${checked ? "after:bg-gray-800" : "after:bg-gray-200"}`}
        onClick={() => onChange(!checked)}
      >
        <span
          className={`absolute w-5 h-5 rounded-full transition-transform ${
            checked ? "translate-x-5 bg-black" : "translate-x-0 bg-white"
          }`}
        />
      </div>
    </label>
  );
};

export default Toggle;
