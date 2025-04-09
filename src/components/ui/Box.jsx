import React, { useState, setError } from 'react';
import { useOutletContext } from 'react-router-dom';
function Box({title,middletext,element,orientation}) {
  const { selectedRappers } = useOutletContext();
  const [error, setError] = useState("");
  const [sfida, setSfida] = useState([]);

  return (
    <>
          <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md mx-auto">

            {title && <h2 className="text-2xl font-bold text-gray-700 mb-4">{title}</h2>}
            
            <div className="flex flex-col items-center justify-center gap-4">
              {/* Primo team */}
              <div className="w-full bg-blue-100 border border-blue-300 rounded-xl shadow-md h-[60px] flex items-center justify-center text-center px-4">
                <h2 className="text-base font-semibold text-blue-800 overflow-hidden text-ellipsis whitespace-nowrap">{sfida[0] }🤝🏻{sfida[1]}</h2>
              </div>

              {middletext && <div className="text-xl font-bold text-gray-700">{middletext}</div>}

              {/* Secondo team */}
              <div className="w-full bg-blue-100 border border-blue-300 rounded-xl shadow-md h-[60px] flex items-center justify-center text-center px-4">
                <h2 className="text-base font-semibold text-blue-800 overflow-hidden text-ellipsis whitespace-nowrap">{sfida[2] }🤝🏻{sfida[3]}</h2>
              </div>
            </div>
          </div>
    </>
  );
}

export default Box;