import React from "react";
import {Link} from 'react-router-dom'
import '../css/Navbar.css';
const Navbar = ({role}) => {
  return (
    <nav className="navbar">
        <div className="navbar-left">
            <Link to='/' className="navbar-brand">Book Store</Link>
        </div>
        <div className="navbar-right">
            <Link to="/books" className="nav-link">Books</Link>
            {role === 'admin' && <>
            <Link to="/addbook" className="nav-link">Add Book</Link>
            <Link to="/addstudent" className="nav-link">Add Student</Link>
            <Link to="/dashboard" className="nav-link">Dashboard</Link>
            </>
}
           {role === ""?
            <Link to="/login" className="nav-link">Login</Link>
            : <Link to="/logout" className="nav-link">Logout</Link>
           }
        </div>
    </nav>
  );
}   
export default Navbar;