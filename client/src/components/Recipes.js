import {Link} from 'react-router-dom'
import Nav from './Nav.js'
import { connect } from 'react-redux'
import { useEffect } from 'react'

function Recipes({page, recipes}) {   
    if(recipes.length > 0){
        return (
            <>
                <Nav/>
                <div className="Recipes">                
                    <h1>Recetas</h1>
                    <Link to={`/details/${recipes[0].id}`} key={recipes[0].id}>
                        <h2>{recipes[0].name}</h2>
                    </Link>                
                </div>
            </>
        );
    }else{
        return (
            <div></div>
        )
    }
}

function mapStateToProps(state){
    return{
      page: state.page,
      recipes: state.recipes,
    } 
}  

export default connect(mapStateToProps)(Recipes);
