import React from 'react';
import {Link} from 'react-router-dom'
import './Nav.css'

export function Nav({page}) {
  return (
    <div className="Nav">
      <div className='toHome'>
        <Link to='/'>
          <div className='navText'>
            Inicio
          </div>
        </Link>
      </div> 
      <div className='toRecipes'>
        <Link to='/recipes'>
          <div className='navText'>
            {page? `Recetas pagina ${page}.`: 'Recetas'}
          </div>
        </Link>
      </div>     
        <div className='toAdd'>
        <Link to='/recipe'>
          <div className='navText'>
            Agregar Receta
          </div>
        </Link>
        </div>
    </div>
  )
};

export default Nav;