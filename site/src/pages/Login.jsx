import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from '../components/NavBar';
import {
Card, CardHeader, CardBody, Heading,CardFooter,
Flex, Spacer, FormControl,
                             FormLabel,Input, Button
} from '@chakra-ui/react'
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
 // const [fetchResponse, handleFetchResponse] = useState();

  function handleUsernameChange(event) {
    setUsername(event.target.value);
  }

  function handlePasswordChange(event) {
      setPassword(event.target.value);
    }
  const navigate = useNavigate();

  return (
    <div>
    <NavBar/>
    <br/>
    <Flex>
     <Spacer />
            <Card variant='elevated' size='lg'>
              <CardHeader>
                  <Heading size='md'>Login or Create Account</Heading>
              </CardHeader>
              <CardBody>

                  <FormControl isRequired>
                    <FormLabel>Username</FormLabel>
                    <Input placeholder='Username' type="text" value={username} onChange={handleUsernameChange}/>
                     </FormControl>
                     <FormControl isRequired>
                     <FormLabel>Password</FormLabel>
                     <Input placeholder='Password' type="password" value={password} onChange={handlePasswordChange}/>
                      </FormControl>


              </CardBody>
              <CardFooter>
               <Button onClick={() => {
                                              fetch("/api/login", {
                                                method: "POST",
                                                headers: {
                                                  "Content-Type": "application/json"
                                                },
                                                body: JSON.stringify({
                                                 username: username,
                                                 password: password
                                                 })
                                              })
                                                .then(res => res.json())
                                                .then((response) => {
                                                    console.log("API Responded With: ");
                                                    console.log(response);
                                                })
                                                .catch(error => {
                                                  console.log(error)
                                                });
                                            }}
                                            >Log In</Button>
              </CardFooter>
            </Card>
            <Spacer />
            </Flex>
      <h2>Login</h2>
      <button
              onClick={() => {
                navigate("/Home");
              }}
            >
              Click to go to Home page
            </button>


    <footer>
    </footer>
    </div>
  );
}

export default Login;
