import React, { useState, useEffect } from 'react';
import './Toast.css';

const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    // Auto-close the toast after 3 seconds
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    // Clear the timer when the component is unmounted or message changes
    return () => clearTimeout(timer);
  }, [message, onClose]); // Re-run the effect if message or onClose changes

  return (
    message && (
      <div className={`toast ${type}`}>
        <div className="toast-content">
          <p>{message}</p>
        </div>
      </div>
    )
  );
}

export default Toast;
