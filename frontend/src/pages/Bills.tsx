import React from 'react'
import BillsList from '../components/BillList'
import LayoutComponent from '../components/LayoutComponent'
const Bills: React.FC = () => {
  return (
    <LayoutComponent>
      <div>
        <BillsList />
      </div>
    </LayoutComponent>
  )
}

export default Bills
