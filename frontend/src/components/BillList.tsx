import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchBills,
  selectBills,
  selectBillsStatus,
  selectSelectedBill,
  selectBill,
} from '../redux/billsSlice'
import BillModal from './BillModal'
import { Link } from 'react-router-dom'
import './Table.css'

interface User {
  name: string
}

interface Bill {
  id: number
  amount: number
  due_date: string
  details: string
  user_id: number
  user: User
}

const BillList: React.FC = () => {
  const dispatch = useDispatch()
  const bills = useSelector(selectBills)
  const status = useSelector(selectBillsStatus)
  const selectedBill = useSelector(selectSelectedBill)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchBills() as any)
    }
  }, [dispatch, status])

  const handleBillClick = (bill: Bill) => {
    dispatch(selectBill(bill))
    setIsModalOpen(true)
  }

  const closeModal = () => {
    dispatch(selectBill(null))
    setIsModalOpen(false)
  }

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (status === 'failed') {
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <p>You should Log In to see your Bills</p>
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
            {bills.map((bill) => (
              <tr key={bill.id} onClick={() => handleBillClick(bill)}>
                <td>{bill.id}</td>
                <td>{bill.due_date}</td>
                <td>${bill.amount}</td>
                <td>{bill.user.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <BillModal bill={selectedBill} onClose={closeModal} />
    </div>
  )
}

export default BillList
