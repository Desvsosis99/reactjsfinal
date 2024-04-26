import React from 'react';
import { Link } from 'react-router-dom';

const NavbarContainer = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">TiendaTech</Link>
      <div className="navbar-nav">
        <Link className="nav-item nav-link" to="/categoria/audifonos">Audífonos</Link>
        <Link className="nav-item nav-link" to="/categoria/parlantes">Parlantes</Link>
        <Link className="nav-item nav-link" to="/categoria/microfonos">Micrófonos</Link>
      </div>
    </nav>
  );
};

export default NavbarContainer;
