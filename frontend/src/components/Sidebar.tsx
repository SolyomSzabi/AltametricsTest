import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css'

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="sidebar">
      <Link to="/" className={`sidebar-link ${location.pathname === '/' && 'active'}`}>
        Home
      </Link>
      <Link to="/login" className={`sidebar-link ${location.pathname === '/login' && 'active'}`}>
        Login
      </Link>
      <Link to="/register" className={`sidebar-link ${location.pathname === '/register' && 'active'}`}>
        Register
      </Link>
      <Link to="/bills" className={`sidebar-link ${location.pathname === '/bills' && 'active'}`}>
        Bills
      </Link>
      <Link to="/invoices" className={`sidebar-link ${location.pathname === '/invoices' && 'active'}`}>
        Invoices
      </Link>
    </div>
  );
};

export default Sidebar;
