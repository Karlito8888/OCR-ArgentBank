import React from 'react';
import "./style.scss";

const Tooltip = ({ text, children }) => {
  return (
    <div className="tooltip-container">
      {children}
      <span className="tooltip">{text}</span>
    </div>
  );
};


export default Tooltip;