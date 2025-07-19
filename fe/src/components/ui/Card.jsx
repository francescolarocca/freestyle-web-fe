import React from "react";
const Card = ({ icon = null, title, description = '' , onclickApply}) => {
    if (!title) {
      console.error('ModalitaCard: "title" è obbligatorio');
      return null;
    }
  
    return (
      <div
        className="cursor-pointer bg-white rounded-2xl h-64 flex flex-col items-center justify-center 
                   text-center shadow-md hover:shadow-2xl hover:shadow-blue-200 transition duration-300 
                   border border-gray-200 hover:border-blue-400 px-4"
                   onClick = {onclickApply}
      >
        {icon && (
          <div className="text-blue-600 text-4xl mb-2">
            {icon}
          </div>
        )}
        <h3 className="text-3xl font-bold mb-1">{title}</h3>
        {description && (
          <p className="text-sm text-gray-600">{description}</p>
        )}
      </div>
    );
  };
  
  export default Card;
  