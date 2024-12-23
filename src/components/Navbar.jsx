import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/spa-react">Inicio</Link></li>
        <li><Link to="/form">Formulario</Link></li>
        <li><Link to="/about">Sobre nosotros</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;