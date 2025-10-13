import React from 'react';

const Modal = ({ children, onClose, className = '' }) => {
  return (
    <div className="modal-overlay">
      <div className={`modal-content ${className}`}>
        {onClose && (
          <button className="modal-close-btn" onClick={onClose}>
            <span>✕</span>
          </button>
        )}
        {children}
      </div>
    </div>
  );
};

export default Modal;