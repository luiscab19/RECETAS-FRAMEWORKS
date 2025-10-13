import React from 'react';

const Button = ({ 
    children, 
    onClick, 
    variant = 'primary', 
    type = 'button',
    className = '',
    ...props 
}) => {
    const baseClass = `btn-${variant}`;
  
    return (
        <button 
            type={type}
            className={`${baseClass} ${className}`}
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;