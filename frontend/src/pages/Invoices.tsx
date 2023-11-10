import React from 'react'
import InvoiceList from '../components/InvoiceList'
import LayoutComponent from '../components/LayoutComponent'
const Invoice: React.FC = () => {
  return (
    <LayoutComponent>
      <div>
        <InvoiceList />
      </div>
    </LayoutComponent>
  )
}

export default Invoice
