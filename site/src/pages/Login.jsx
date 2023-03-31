import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import LoginComponent from '../components/LoginComponent';
import CreateAccount from '../components/CreateAccount';

function Login() {

  const [user, setUser] = useState();
  const [signUp, setSignUp] = useState(false);

  const navigate = useNavigate();

  if (!signUp) {
    return (
    <>
    <LoginComponent />
    <button onClick={() => {setSignUp(true);}} >Create Account</button>
    </>
    );
  } else {
    return (
    <>
    <CreateAccount />
    <button onClick={() => {setSignUp(false);}} >Login</button>

    </>);
  }

}

export default Login;
