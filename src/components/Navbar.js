import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ isAuthenticated }) {
  return (
    <nav>
      <ul>
        {isAuthenticated && (
          <>
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/categorias">Categorías</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
