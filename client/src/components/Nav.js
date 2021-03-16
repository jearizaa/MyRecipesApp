import React from 'react';
import {Link} from 'react-router-dom'

export function Nav() {
  return (
    <div className="Nav">
      <Link to='/'>
        Inicio
      </Link>
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