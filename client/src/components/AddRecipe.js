import React, { useState } from 'react'
import { connect } from 'react-redux'
import Nav from './Nav.js'
import './AddRecipe.css'

function validate(input){
  let errors = {}
    if(!input.name){
      errors.name = 'El nombre es requerido'
    }

    if(!input.summary){
      errors.summary = 'Un resumen es requerido'
    }

    if(errors.name || errors.summary){
      errors.disable = true
    }else{
      errors.disable = false
    }

    return errors
}

function AddRecipe({diets, dishes}) {
  const [form, setForm] = useState({
    name: '',
    summary: '',
    score: 0,
    healthyScore:0,
    steps: [''],
    diets: [],
    dishes: [],
    errors: {},
  })

  function addStep(){
    let steps = [...form.steps]
    steps.push('')
    console.log(steps)
    setForm({
      ...form,
      steps
    })
  }

  function removeStep(e){
    if(form.steps.length > 1){
      let {id} = e.target
      let steps = [...form.steps]
      steps.splice(id, 1)
      setForm({
        ...form,
        steps
      })
    }    
  }

  function handleCheckBox(e){
    const value = e.target.checked
    const name = e.target.name
    let {diets, dishes} = form
    let type = name.substring(1)
    console.log(name[0])
    console.log(type)
    console.log(value)
    if(name[0] === 't'){
      let index = form.diets.findIndex(diet => {
        return diet === type
      })
      if(index < 0 && value){
        diets.push(type)
      }else if(!value){
        diets.splice(index, 1)
      }
      setForm({
        ...form,
        diets
      })
    }else if(name[0] === 'h'){
      let index = form.dishes.findIndex(dish => {
        return dish === type
      })
      if(index < 0 && value){
        dishes.push(type)
      }else if(!value){
        dishes.splice(index, 1)
      }
      setForm({
        ...form,
        dishes
      })
    }
    console.log(form)
  }

  function handleStepsChange(e){
    let {name, value, id} = e.target
    console.log(name, value, id)
    let steps = [...form.steps]
    steps[id] = value
    setForm({
      ...form,
      steps
    })
  }

  function handleForm(e){
    let {name, value} = e.target
    if(name === 'score' || name === 'healthyScore'){
      if(value <= 100 && value >= 0) setForm({
        ...form,
        [name]: value,
      })
    }else{
      setForm({
        ...form,
        [name]: value,
        errors: validate({
          ...form,
          [name]: value,
        })
      })
    }
  }

  return (
    <>
      <Nav/>
      <div className='page'>
        <div className="addRecipe">
          <h1>Formulario Recetas</h1>        
          <form className='recipeForm' method='post' action='http://localhost:3001/recipe'>
              <div className='contentF'>
                <label htmlFor='name'>Nombre: </label>
                <input 
                  name='name' 
                  placeholder='Nombre' 
                  onChange={handleForm}
                  required />
                <p className='danger'>{form.errors.name}</p>
                <label htmlFor='summary'>Resumen: </label>
                <textarea 
                  type='text' 
                  name='summary' 
                  placeholder='Resumen' 
                  onChange={handleForm}
                  required />
                <p className='danger'>{form.errors.summary}</p>
                <label htmlFor='score'>Puntuacion: </label>
                <input 
                  type='number' 
                  name='score' 
                  value={form.score}
                  placeholder='Puntuacion' 
                  onChange={handleForm}/>
                <label htmlFor='healthyScore'>Saludable: </label>
                <input 
                  type='number' 
                  name='healthyScore' 
                  value={form.healthyScore}
                  placeholder='Saludable' 
                  onChange={handleForm}/>                       
                {
                  form.steps.map((el, i) => {
                    return(
                      <div key={`step${i}`}>
                      <label htmlFor={`step${i}`}>{`Paso ${i+1}: `}</label>
                      <textarea
                        type='textarea'
                        name={`step${i}`}
                        id={i}
                        data-name='steps'
                        value={el}
                        onChange={handleStepsChange}
                      />
                      <input type='button' value='X' id={i} onClick={removeStep}/>
                    </div>                  
                    )                  
                  })
                }
                <input type='button' value='+' onClick={addStep}/>
                <input disabled={form.errors.disable} type='submit' value='Crear'/>
              </div>
              <div className='addFilter'>
              <div className='addChecks'>
                <div className='addDietChecks'>
                {
                    diets.map(diet => {
                        return (
                            <div key={diet.name}> 
                            <input 
                            name={`t${diet.name}`}
                            type='checkbox'
                            checked={!!form.diets[form.diets.findIndex(el => {
                                return el === diet.name})]}
                            onChange={handleCheckBox}
                            />
                            <label>{diet.name}</label>
                            </div>
                        )
                    })
                }</div>
                <div className='addDishChecks'>
                {
                    dishes.map(dish => {
                        return (
                            <div key={dish.name}>                     
                                <input 
                                name={`h${dish.name}`}
                                type='checkbox'
                                checked={!!form.dishes[form.dishes.findIndex(el => {
                                    return el === dish.name
                                })]}    
                                onChange={handleCheckBox}
                                />
                                <label>{dish.name}</label>
                            </div>
                        )
                    })
                }</div>  
                </div>
              </div>  
          </form>
      </div>
      </div>
    </>
  );
}

function mapStateToProps(state){
  return{
    diets: state.diets,
    dishes: state.dishes,
  } 
}  



export default connect(mapStateToProps)(AddRecipe);
