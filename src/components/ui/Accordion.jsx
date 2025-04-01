import React from 'react';

function Accordion({ title, isExpanded, onToggle, children, className = '', hideContent }) {
  return (
    <div className={`mb-4 ${className}`}>
      <button
        onClick={onToggle}
        className="w-full bg-white p-4 rounded-lg shadow flex justify-between items-center"
      >
        <span className="text-xl font-semibold">{title}</span>
        <span className={`transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </button>
      {!hideContent && isExpanded && (
        <div className="mt-2 bg-white rounded-lg shadow p-4">
          {children}
        </div>
      )}

      {hideContent  && (
        <div className={isExpanded ? 'block mt-2 bg-white rounded-lg shadow p-4' : 'hidden mt-2 bg-white rounded-lg shadow p-4'}>
          {children}
        </div>
      )}
    </div>
  );
}

export default Accordion;