import React from 'react';
import '../ConfirmModal/ConfirmModal.css'; 

const ConfirmModal = ({ isOpen, onConfirm, onCancel, message }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close-button" onClick={onCancel}>&times;</button>
        <p>{message}</p>
        <div className="modal-actions">
          <button className="modal-button" onClick={onConfirm}>Confirm</button>
          <button className="modal-button" onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
