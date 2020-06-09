import React from 'react';
import logo from './logo.svg';
import './App.css';
import SignUpForm from "./signupform-basic-approach/SignUpForm"
import Form from "./custom-react-hooks-form-validation/Form.js"

function App() {
  return (
    <div >
      <p>from blog https://medium.com/@kitson.broadhurst/simple-form-validation-with-react-hooks-usestate-and-useeffect-57620d808cc8 </p>
      <SignUpForm />
      <hr />
      <p>from https://upmostly.com/tutorials/form-validation-using-custom-react-hooks</p>
      <Form />
      <hr />
    </div>
  );
}

export default App;
