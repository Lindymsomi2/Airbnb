import React from "react";

const Button = ({ children, onClick, color, type, className}) => {
  return (
    <button type={type} className={`btn btn-${color} ${className}`} onClick={onClick} >
      {children}
    </button>
  );
};

export default Button;
