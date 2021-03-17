import {Link} from 'react-router-dom'
import Nav from './Nav.js'
import { connect } from 'react-redux'
import { useState } from 'react'
import Recipe from './Recipe'
import { increment, decrement, filter, refresh} from '../actions'
import { updateRecipes } from '../reducers'
import React from 'react'


function Recipes({page, recipes, diets, dishes, incrementPage, decrementPage, searchRecipes, filterRecipes, restoreRecipes}) {  
    const [filter, setFilter] = useState('')
    const [order, setOrder] = useState({
        types: [],
        ascAlf: false,
        desAlf: false,
        ascScr: false,
        desScr: false,
    })

    function handleNext(){
        incrementPage()
    }

    function handlePrev(){
        decrementPage()
    }

    function handleInputChange(e){
        setFilter(e.target.value)
    }

    function handleSearch(e){
        e.preventDefault()
        searchRecipes(filter)
    }

    function handleFilter(e){
        e.preventDefault()
        restoreRecipes()
        filterRecipes(order)
    }

    function handleCheckBox(e){
        const value = e.target.checked
        const name = e.target.name
        if(name === 'ascAlf' || name === 'desAlf' || name === 'ascScr' || name === 'desScr'){            
            setOrder({
                ...order,
                ascAlf: false,
                desAlf: false,
                ascScr: false,
                desScr: false,
                [name]: value
            })
        }else{
            let types = order.types
            let index = order.types.findIndex(type => {
                return type === name
            })
            if(index < 0 && value){
                types.push(name)
            }else if(!value){
                types.splice(index,1)
            }
            setOrder({
                ...order,
                types
            })
        }
    }

    if(recipes.length > 0){
        return (
            <>
                <Nav/>
                <button onClick={handlePrev}>Anterior</button>
                <button onClick={handleNext}>Siguiente</button>
                <form onSubmit={handleSearch}>
                    <input type='text' name='name' onChange={handleInputChange}/>
                    <input type='submit' value='Buscar'/>
                </form>
                <form>
                    <div className='dietChecks'>
                    {
                        diets.map(diet => {
                            return (
                                <React.Fragment key={diet.name}> 
                                <input 
                                name={diet.name}
                                type='checkbox'
                                checked={!!order.types[order.types.findIndex(type => {
                                    return type === diet.name})]}
                                onChange={handleCheckBox}
                                />
                                <label>{diet.name}</label>
                                </React.Fragment>
                            )
                        })
                    }</div>
                    <div className='dishChecks'>
                    {
                        dishes.map(dish => {
                            return (
                                <React.Fragment key={dish.name}>                     
                                    <input type='checkbox'/>
                                    <label>{dish.name}</label>
                                </React.Fragment>
                            )
                        })
                    }</div>
                    <input  
                        name={'ascAlf'}
                        type='checkbox'
                        checked={order['ascAlf']}
                        onChange={handleCheckBox}/>
                    <label>{'A-Z'}</label>
                    <input  
                        name={'desAlf'}
                        type='checkbox'
                        checked={order['desAlf']}
                        onChange={handleCheckBox}/>
                    <label>{'Z-A'}</label>
                    <input  
                        name={'ascScr'}
                        type='checkbox'
                        checked={order['ascScr']}
                        onChange={handleCheckBox}/>
                    <label>{'Mayor a menor puntaje'}</label>
                    <input  
                        name={'desScr'}
                        type='checkbox'
                        checked={order['desScr']}
                        onChange={handleCheckBox}/>
                    <label>{'Menor a mayor puntaje'}</label>
                    <input type='button' onClick={handleFilter} value='Filtrar'/>
                </form>
                <div className="Recipes">                
                    <h1>{`Recetas ${page}`}</h1>
                    {
                        recipes.map((recipe) => {
                            return (
                                <Link to={`/details/${recipe.id}`} key={recipe.id}>
                                    <Recipe recipe={recipe}/>
                                </Link> 
                            )                            
                        }).splice((page-1)*9, (page-1)*9+9)
                    }              
                </div>
            </>
        );
    }else{
        return (
            <></>
        )
    }
}

function mapStateToProps(state){
    return{
      page: state.page,
      recipes: state.recipes,
      diets: state.diets,
      dishes: state.dishes,
    } 
}  

function mapDispatchToProps(dispatch){
    return {
        incrementPage: () => dispatch(increment()),
        decrementPage: () => dispatch(decrement()),
        searchRecipes: (name) => dispatch(updateRecipes(name)),
        filterRecipes: (payload) => dispatch(filter(payload)),
        restoreRecipes: () => dispatch(refresh())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Recipes);
