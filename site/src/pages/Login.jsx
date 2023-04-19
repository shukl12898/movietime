import React, { useState, useEffect } from "react";
import {
Flex, Spacer, Button
} from '@chakra-ui/react';
import NavBar from '../components/NavBar';

import { useNavigate } from "react-router-dom";

import LoginComponent from '../components/LoginComponent';
import CreateAccount from '../components/CreateAccount';

function Login() {

 // const [fetchResponse, handleFetchResponse] = useState();
  const [signUp, setSignUp] = useState(false);
  const navigate = useNavigate();

    useEffect(() => {
      checkDisplayName();
    }, []);

    const checkDisplayName = () => {
      var storedName = sessionStorage.getItem('displayName');
      if (storedName) {
        console.log('Name found in session storage:', storedName);
        navigate("/Search");
      } else {
        console.log('Name not found in session storage.');
      }
    };

     if (!signUp) {
        return (
        <>
        <NavBar/>
        <br/>
        <LoginComponent data-testid="login-component" />
        <br/>
        <Flex alignItems='center'>
        <Spacer/>
        <Button data-testid="createButton" variant='ghost' onClick={() => {setSignUp(true);}} >Create Account</Button>
        <Spacer/>
        </Flex>
        </>
        );
      } else {
        return (
        <>
        <NavBar/>
        <br/>
        <CreateAccount data-testid="create-account"/>
        <br/>
        <Flex alignItems='center'>
        <Spacer/>
        <Button data-testid="loginButton" variant='ghost' onClick={() => {setSignUp(false);}} >Have an account? Login</Button>
        <Spacer/>
        </Flex>
        </>);
      }
}

export default Login;
