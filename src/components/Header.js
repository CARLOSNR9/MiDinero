import React from 'react';
import { Link } from 'react-router-dom';
import { useGlobalState } from '../GlobalState';

function Header() {
  const { balance, isAuthenticated } = useGlobalState();

  return (
    <header>
      <h1>MiDinero</h1>
      <p>¡Que no se me escape ni un peso!</p>
      {isAuthenticated && <h2 className="balance">Tienes para gastar: COP ${balance.toLocaleString('es-CO')}</h2>}
      {isAuthenticated && (
        <nav className="nav-center">
          <Link to="/">Inicio</Link> | <Link to="/categorias">Categorías</Link>
        </nav>
      )}
    </header>
  );
}

export default Header;
