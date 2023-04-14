import React, { useState } from "react";
import NavBar from '../components/NavBar';
import {
Flex, Spacer, Button
} from '@chakra-ui/react'

import LoginComponent from '../components/LoginComponent';
import CreateAccount from '../components/CreateAccount';

function Login() {

 // const [fetchResponse, handleFetchResponse] = useState();
  const [signUp, setSignUp] = useState(false);


     if (!signUp) {
        return (
        <>
        <NavBar/>
        <br/>
        <LoginComponent />
        <br/>
        <Flex alignItems='center'>
        <Spacer/>
        <Button variant='ghost' onClick={() => {setSignUp(true);}} >Create Account</Button>
        <Spacer/>
        </Flex>
        </>
        );
      } else {
        return (
        <>
        <NavBar/>
        <br/>
        <CreateAccount />
        <br/>
        <Flex alignItems='center'>
        <Spacer/>
        <Button variant='ghost' onClick={() => {setSignUp(false);}} >Have an account? Login</Button>
        <Spacer/>
        </Flex>
        </>);
      }
}

export default Login;
