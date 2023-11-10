import React from 'react';
import './Modal.css'; 

interface User {
  name: string;
}

interface Bill {
  id: number;
  amount: number;
  due_date: string;
  details: string;
  user_id: number;
  user: User;
}

interface BillModalProps {
  bill: Bill | null;
  onClose: () => void;
}

const BillModal: React.FC<BillModalProps> = ({ bill, onClose }) => {
  if (!bill) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>Bill Details</h2>
          <button className="close-button" onClick={onClose}>
            Close
          </button>
        </div>
        <div className="modal-body">
          <p>
            <strong>Bill nr.</strong> {bill.id}
          </p>
          <p>
            <strong>Due Date:</strong> {bill.due_date}
          </p>
          <p>
            <strong>Amount:</strong> ${bill.amount}
          </p>
          <p>
            <strong>Details:</strong> {bill.details}
          </p>
          <p>
            <strong>User:</strong> {bill.user.name}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BillModal;
