import React from "react";
function Notify({ message,showSuccess}) {
    return (
        <div
  className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 transition-all duration-500 ease-out z-50 ${
    showSuccess
      ? 'opacity-100 -translate-y-1/2'
      : 'opacity-0 -translate-y-[60%] pointer-events-none'
  }`}
>
  <div className="bg-green-500 text-white px-6 py-2 rounded-xl shadow-lg text-sm font-medium">
    {message}
  </div>
</div>)
}

export default Notify