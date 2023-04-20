import React from 'react';

const Tooltip = ({ text, children }) => {
  return (
    <div className="tooltip">
      <span className="tooltiptext">{text}</span>
      {children}
    </div>
  );
};

export default Tooltip;

