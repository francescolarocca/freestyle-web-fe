import React from 'react';


function Button ({ label, onClick, disabled,className }) {
  return (
    <button
    className={className || "bg-blue-500 text-white rounded px-4 py-2 text-lg hover:bg-blue-600 focus:outline-none"}
    onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
}

export default Button;