import React from 'react';

const Card = ({ children, className = '', hoverEffect = true }) => {
  return (
    <div 
      className={`bg-white rounded-xl shadow-sm p-6 ${
        hoverEffect ? 'hover:shadow-md transition-shadow duration-200' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;