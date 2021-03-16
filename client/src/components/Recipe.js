//import {Link} from 'react-router-dom'
import Nav from './Nav.js'

function Recipe() {
  return (
    <div className="Recipe">
        <Nav/>
        <h1>Formulario Recetas</h1>        
        <form method='post' action='http://localhost:3001/recipe'>
            <input name='name' placeholder='Nombre' required />
            <input type='text' name='summary' placeholder='Resumen' required />
            <input type='submit' value='Crear' />
        </form>
    </div>
  );
}

export default Recipe;
