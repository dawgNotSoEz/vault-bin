import React from 'react';

const Tooltip = ({ children, text }) => {
  return (
    <div className="relative group">
      {children}
      <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        {text}
      </div>
    </div>
  );
};

export default Tooltip;
