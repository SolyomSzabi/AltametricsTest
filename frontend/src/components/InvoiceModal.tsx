import React from 'react'
import './Modal.css'

interface User {
  name: string
}

interface Invoice {
  id: number
  amount: number
  due_date: string
  details: string
  user_id: number
  user: User
}

interface InvoiceModalProps {
  invoice: Invoice | null
  onClose: () => void
}

const InvoiceModal: React.FC<InvoiceModalProps> = ({ invoice, onClose }) => {
  if (!invoice) {
    return null
  }

  return (
    <div className='modal-overlay'>
      <div className='modal'>
        <div className='modal-header'>
          <h2>Invoice Details</h2>
          <button className='close-button' onClick={onClose}>
            Close
          </button>
        </div>
        <div className='modal-body'>
          <p>
            <strong>Invoice nr.</strong> {invoice.id}
          </p>
          <p>
            <strong>Due Date:</strong> {invoice.due_date}
          </p>
          <p>
            <strong>Amount:</strong> ${invoice.amount}
          </p>
          <p>
            <strong>Details:</strong> {invoice.details}
          </p>
          <p>
            <strong>User:</strong> {invoice.user.name}
          </p>
        </div>
      </div>
    </div>
  )
}

export default InvoiceModal
