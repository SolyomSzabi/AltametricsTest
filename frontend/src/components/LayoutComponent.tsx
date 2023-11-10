import React from 'react'
import Sidebar from './Sidebar'
import './Layout.css'

interface LayoutComponentProps {
  children: React.ReactNode
}

const LayoutComponent: React.FC<LayoutComponentProps> = ({ children }) => {
  return (
    <div className='layout'>
      <div style={{ flex: '0 0 20%' }}>
        <Sidebar />
      </div>
      <main style={{ flex: '0 0 80%' }}>{children}</main>
    </div>
  )
}

export default LayoutComponent
