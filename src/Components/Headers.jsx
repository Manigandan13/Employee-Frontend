import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import "./Headers.css"

const Headers = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <h1 className="logo">Employee Management System</h1>

        <div className="navbar-links">
          <Link to="/">Dashboard</Link>
          <Link to="/add">Add Employee</Link>
          <Link to="/attendance">Attendance</Link>
          <Link to="/payroll">Payroll</Link>
        </div>

        {/* Hamburger Button for Mobile */}
        <div className="hamburger" onClick={toggleMenu}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
        <Link to="/" onClick={toggleMenu}>Dashboard</Link>
        <Link to="/add" onClick={toggleMenu}>Add Employee</Link>
        <Link to="/attendance" onClick={toggleMenu}>Attendance</Link>
        <Link to="/payroll" onClick={toggleMenu}>Payroll</Link>
      </div>
    </div>
  );
}

export default Headers;
