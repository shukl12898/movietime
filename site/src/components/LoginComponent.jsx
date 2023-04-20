import React from "react";
import { useState } from 'react';
import {
Card, CardHeader, CardBody, Heading,CardFooter,
Flex, Spacer, FormControl,FormLabel,Input, Button, FormHelperText
} from '@chakra-ui/react';
import { useNavigate } from "react-router-dom";

function LoginComponent() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const [registered, setRegistered] = useState(true);

    function handleUsernameChange(event) {
        setUsername(event.target.value);
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value);
    }


    return (
    <div>
    <Flex>
         <Spacer />
        <Card variant='elevated' size='lg'>
          <CardHeader>
              <Heading size='md'>Login</Heading>
          </CardHeader>
          <CardBody>

              <FormControl isRequired isInvalid={!registered}>
                <FormLabel>Username</FormLabel>
                <Input placeholder='Username' type="text" value={username} onChange={handleUsernameChange}/>
                 </FormControl>
                 <FormControl isRequired isInvalid={!registered}>
                 <FormLabel>Password</FormLabel>
                 <Input placeholder='Password' type="password" value={password} onChange={handlePasswordChange}/>
                  {!registered && (
                         <FormHelperText>
                           Account not found.
                         </FormHelperText>
                       )}
                  </FormControl>


          </CardBody>
          <CardFooter>
          <Spacer/>
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
                            if (response.displayName == null) {
                                console.log("Error.");
                                setRegistered(false);
                            } else {
                                sessionStorage.setItem("userId", response.userId);
                                sessionStorage.setItem("displayName", response.displayName);
                                setRegistered(true);
                                navigate('/Search');
                            }
                            console.log(response);
                        })
                        .catch(error => {
                          console.log(error);
                        });
                    }}
                    >Log In</Button>
                    <Spacer/>
          </CardFooter>
        </Card>
        <Spacer />
        </Flex>
        </div>

    );
}

export default LoginComponent;