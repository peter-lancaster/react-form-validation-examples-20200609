import React from 'react';
import useForm from "./useForm";
import validate from './LoginFormValidationRules';

const Form = () => {
  const {
    values,
    errors,
    handleChange,
    handleSubmit,
  } = useForm(login, validate);

  function login() {
    console.log('No errors, submit callback called!');
  }

  return (
            <form onSubmit={handleSubmit} noValidate>
                <label>Email Address</label>
                  <input 
                  autoComplete="off" 
                  type="email" 
                  name="email" 
                  onChange={handleChange} 
                  value={values.email || ''} required />
                  {errors.email && (<p>{errors.email}</p>
                  )}

                <label>Password</label>
                  <input 
                  type="password" 
                  name="password" 
                  onChange={handleChange} 
                  value={values.password || ''} required />
                {errors.password && (<p >{errors.password}</p>
                )}

              <button type="submit">Login</button>
            </form>

  );
};

export default Form;

//Going through validation process above, step-by-step.
//Step 1) Firstly, note that no validation occurs until the button click which results in
//onSubmit={handleSubmit}