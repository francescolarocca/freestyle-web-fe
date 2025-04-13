import React from "react";

const RapperList = ({ rappers, onRapperClick,onDeleteRapper }) => {
  return (
    <div className="relative grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 p-6">
      {rappers?.map((rapper, index) => (
        <div
        key={index}
        onClick={() => onRapperClick?.(rapper)}
        className="relative cursor-pointer flex flex-col items-center bg-white rounded-2xl shadow-md p-4 hover:shadow-xl transition-all duration-200 hover:scale-105"
      >
        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevent the click event from bubbling up to the rapper card
            onDeleteRapper?.(rapper);
          }}
          className="absolute top-1 right-1 md:-top-2 md:-right-2 bg-white text-slate-500 hover:text-red-500 rounded-full w-6 h-6 flex items-center justify-center shadow-md z-10"
        >
          ×
        </button>
      
        <img
          src={rapper.image ? rapper.image : "/images/rapper_placeholder.png"}
          alt={rapper.nome}
          className="w-20 h-20 rounded-full object-cover object-center mb-3"
        />
        <p className="text-center font-semibold text-slate-800">
          {rapper.nome}
        </p>
      </div>
      ))}
    </div>
  );
};

export default RapperList;
