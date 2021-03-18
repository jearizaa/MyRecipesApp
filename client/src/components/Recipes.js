import {Link} from 'react-router-dom'
import Nav from './Nav.js'
import { connect } from 'react-redux'
import { useState } from 'react'
import Recipe from './Recipe'
import { increment, decrement, filter, refresh, sort} from '../actions'
import { updateRecipes } from '../reducers'
import React from 'react'
import './Recipes.css'

function Recipes({page, recipes, diets, dishes, incrementPage, decrementPage, searchRecipes, filterRecipes, restoreRecipes, sortRecipes}) {  
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
        console.log(e.target.value)
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
        sortRecipes(order)

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
                <Nav page={page}/> 
                <div className='recipesBar'>
                    {/* <div className='titleText'>{`Recetas pagina ${page}`}</div> */}
                    <form className='search' onSubmit={handleSearch}>
                        <input type='text' name='name' onChange={handleInputChange}/>
                        <input type='submit' value='Buscar'/>
                    </form>     
                </div>
                <div className='recipesScreen'>  
                    <div className='flechas' onClick={handlePrev}>
                        <div className='divFlechas'>
                            <h1 className='f'>{'<'}</h1>  
                        </div> 
                    </div>  
                    <div className="recipes"> 
                        <div className='matrix'>              
                        {
                            recipes.map((recipe, index) => {
                                return ( 
                                    <Link to={`/details/${recipe.id}`} key={recipe.id}>
                                        <Recipe recipe={recipe}/>
                                    </Link> 
                                )                            
                            }).slice((page-1)*9, (page-1)*9+9)
                        } 
                        </div>    
                    </div>
                    <div className='flechas' onClick={handleNext}>
                        <div className='divFlechas'>
                            <h1 className='f'>{'>'}</h1>  
                        </div>                        
                    </div>
                    <form className='filter'>
                        <div className='order'>
                            <div className='buttonsFilter'>
                                <input type='button' onClick={handleFilter} value='Filtrar'/>
                                <input type='button' onClick={restoreRecipes} value='Restaurar'/>
                            </div>
                            <div className='orderChecks'>
                                <div>
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
                                </div>
                                <div>
                                <div>
                                <input  
                                    name={'ascScr'}
                                    type='checkbox'
                                    checked={order['ascScr']}
                                    onChange={handleCheckBox}/>
                                <label>{'Puntaje ascendente'}</label>
                                </div>
                                <div>
                                <input  
                                    name={'desScr'}
                                    type='checkbox'
                                    checked={order['desScr']}
                                    onChange={handleCheckBox}/>
                                <label>{'Puntaje descendente'}</label>
                                </div>
                                </div>
                            </div>
                        </div>
                        <div className='checks'>
                            <div className='dietChecks'>
                            {
                            diets.map(diet => {
                                return (
                                    <div className='check' key={diet.name}> 
                                        <input 
                                        name={diet.name}
                                        type='checkbox'
                                        checked={!!order.types[order.types.findIndex(type => {
                                            return type === diet.name})]}
                                        onChange={handleCheckBox}
                                        />
                                        <label>{diet.name}</label>
                                    </div>
                                )
                            })
                            }
                            </div>
                            <div className='dishChecks'>
                            {
                            dishes.map(dish => {
                                return (
                                    <div className='check' key={dish.name}>                     
                                        <input 
                                        name={dish.name}
                                        type='checkbox'
                                        checked={!!order.types[order.types.findIndex(type => {
                                            return type === dish.name
                                        })]}    
                                        onChange={handleCheckBox}
                                        />
                                        <label>{dish.name}</label>
                                    </div>
                                )
                            })
                            }</div>
                        </div>
                    </form>
                </div>   
            </>
        );
    }else{
        return (
            <>
                <Nav/>
                <h1 className='errorPage'>No hay recetas con el criterio especificado.</h1>
                <button onClick={restoreRecipes}>Volver a buscar.</button>
            </>
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
        restoreRecipes: () => dispatch(refresh()),
        sortRecipes: (payload) => dispatch(sort(payload)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Recipes);
