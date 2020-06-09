//This is taken from the blog https://medium.com/@kitson.broadhurst/simple-form-validation-with-react-hooks-usestate-and-useeffect-57620d808cc8

import React, { useState, useEffect, useRef } from 'react'

const SignUpForm = () => {

    console.log("SignUpForm")

  // we use the help of useRef to test if it's the first render
  const firstRender = useRef(true)

  // set a state variable which can be used to disable the save/submit button
  // we set it to true so that the form is disabled on first render
  const [disable, setDisabled] = useState(true)
  
  // we can also set error messages to display to the user
  const [nameError, setNameError] = useState(null)
  
  // set initial state value(s) for example:
  const [nameLabel, setNameLabel] = useState('')

  console.log(nameLabel)
  
  // for every change in our state this will be fired
  // we add validation here and disable the save button if required
  
  useEffect(() => {

    console.log("useEffect")
  
    // we want to skip validation on first render
    if (firstRender.current) {
      firstRender.current = false
      return
    }

    // here we can disable/enable the save button by wrapping the setState function
    // in a call to the validation function which returns true/false
    setDisabled(formValidation())
    
  }, [nameLabel]) // any state variable(s) included in here will trigger the effect to run
  
  // here we run any validation, returning true/false
  const formValidation = () => {

    console.log("formValidation")
    if (nameLabel === "") {
      setNameError('Name cant be blank!')
      return true
    } else {
      setNameError(null)
      return false
    }
  }
  
  const handleSave = () => {
   // ...
  }

  return (
    <form onSubmit={ handleSave } >
      <input
        type      = "text"
        name      = "nameLabel"
        value     = { nameLabel }
        onChange  = { e => setNameLabel(e.target.value) }
      />
      { nameError && <p>{nameError}</p> }
      <button type="submit" disabled={disable} >Save</button>
    </form>
  )
}

export default SignUpForm


//Running through the above, step by step.
//Step 1) First run of the component : instantiation of various state variables, and functions.
//form containing one input field and one button is rendered to the screen.
//
//Step 2) What happens with every character input into the input field: 

//2.1) The state variable "nameLabel" is updated (i.e. is use to hold the field value).

//2.2) The input field is a controlled field, so the value of the field is directly linked to the
//"nameLabel" variable.

//2.3) There is a useEffect() on this component, which will run every time the "nameLabel" variable
//changes (i.e. every time a character is entered into the input field.
//NOTE THE INTERESTING USE OF useRef() TO DETERMINE WHETHER THIS IS THE FIRST RENDER, AND 
//SKIP VALIDATION IF TRUE

//2.4) If it's not first render, then useEffect will run "setDisabled(formValidation())" on every
//keystroke. 

//2.5) If "nameLabel" === "", then "formValidation() will :
//  i) populate "nameError" with an error message
//  ii) return "true" 

//2.6) The conditional formatting in the return statement does the rest. If "nameLabel" is 
//blank then setDisabled === true therefore button will be disabled, AND error message will
//be not null and will therefore be displayed.

//So to summarise the above approach: 
//* Decide what your "invalidations" are and put them in a function.
//* Sort out the point at which you want to validate (in this case, after every character input)
//* Arrange for "invalidations" function to be run every time you want it to.
//* Conditional rendering should take care of the rest.
//
//Interesting approach because of nesting of functions "setDisabled(formValidation())", and 
//also the use of useRef to skip useEffect processing first time only.
//I like this idea of a constant "help message" appearing rather than an error message
//appearing at the end only.