import React from 'react';
import {Link} from 'react-router-dom'
import './Nav.css'

export function Nav() {
  return (
    <div className="Nav">
    <div>
      <Link to='/'>
        Inicio
      </Link>
    </div>      
      <Link to='/recipes'>
        Recetas
      </Link>
      <Link to='/recipe'>
        Agregar Receta
      </Link>
    </div>
  )
};

export default Nav;