import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchInvoices,
  selectInvoices,
  selectInvoicesStatus,
  selectSelectedInvoice,
  selectInvoice,
} from '../redux/invoicesSlice'
import InvoiceModal from './InvoiceModal'
import { Link } from 'react-router-dom'
import './Table.css'

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

const InvoiceList: React.FC = () => {
  const dispatch = useDispatch()
  const invoices = useSelector(selectInvoices)
  const status = useSelector(selectInvoicesStatus)
  const selectedInvoice = useSelector(selectSelectedInvoice)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchInvoices() as any)
    }
  }, [dispatch, status])

  const handleInvoiceClick = (invoice: Invoice) => {
    dispatch(selectInvoice(invoice))
    setIsModalOpen(true)
  }

  const closeModal = () => {
    dispatch(selectInvoice(null))
    setIsModalOpen(false)
  }

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (status === 'failed') {
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <p>You should Log In to see your Invoices</p>
        <Link className='button' to='/login'>
          Login
        </Link>
      </div>
    )
  }

  return (
    <div className='main'>
      <div className='table-container'>
        <table className='table'>
          <thead>
            <tr>
              <th>nr.</th>
              <th>Due Date</th>
              <th>Amount</th>
              <th>User</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <tr key={invoice.id} onClick={() => handleInvoiceClick(invoice)}>
                <td>{invoice.id}</td>
                <td>{invoice.due_date}</td>
                <td>${invoice.amount}</td>
                <td>{invoice.user.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <InvoiceModal invoice={selectedInvoice} onClose={closeModal} />
    </div>
  )
}

export default InvoiceList
