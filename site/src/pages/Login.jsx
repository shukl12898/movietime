import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from '../components/NavBar';
import {
Card, CardHeader, CardBody, Heading,CardFooter,
Flex, Spacer, FormControl,FormLabel,Input, Button, HStack
} from '@chakra-ui/react'

import LoginComponent from '../components/LoginComponent';
import CreateAccount from '../components/CreateAccount';

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
 // const [fetchResponse, handleFetchResponse] = useState();

  const [signUp, setSignUp] = useState(false);

  function handlePasswordChange(event) {
      setPassword(event.target.value);
    }
  const navigate = useNavigate();
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
