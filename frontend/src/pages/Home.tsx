import React from 'react'
import LayoutComponent from '../components/LayoutComponent'
import { Link } from 'react-router-dom'
import './Home.css'
const Home: React.FC = () => {
  return (
    <LayoutComponent>
      <div className='buttons-wrapper'>
        <Link to='/invoices'>
          <button>Go to Invoices</button>
        </Link>
        <Link to='/bills'>
          <button>Go to Bills</button>
        </Link>
      </div>
    </LayoutComponent>
  )
}

export default Home
