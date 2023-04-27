import React, { useState, useEffect } from "react";
import {
Flex, Spacer, Button
} from '@chakra-ui/react';
import NavBar from '../components/NavBar';

import { useNavigate } from "react-router-dom";

import LoginComponent from '../components/LoginComponent';
import CreateAccount from '../components/CreateAccount';

function Login({toggleLogIn}) {

 // const [fetchResponse, handleFetchResponse] = useState();
  const [signUp, setSignUp] = useState(false);
  const navigate = useNavigate();

     if (!signUp) {
        return (
        <>
        <br/>
        <LoginComponent toggleLogIn={toggleLogIn} data-testid="login-component" />
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
        <br/>
        <CreateAccount toggleLogIn={toggleLogIn} data-testid="create-account"/>
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
