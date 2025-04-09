import React from "react";

const RapperList = ({ rappers, onRapperClick }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 p-6">
      {rappers?.map((rapper, index) => (
        <div
          key={index}
          onClick={() => onRapperClick?.(rapper)}
          className="cursor-pointer flex flex-col items-center bg-white rounded-2xl shadow-md p-4 hover:shadow-xl transition-all duration-200 hover:scale-105"
        >
          <img
            src={rapper.image? rapper.image : "/images/rapper_placeholder.png"}
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
