import React from "react";
import { useState } from 'react';
import {
Card, CardHeader, CardBody, Heading,CardFooter,
Flex, Spacer, FormControl,FormLabel,Input, Button
} from '@chakra-ui/react'

function LoginComponent() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

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
                            console.log(response);
                        })
                        .catch(error => {
                          console.log(error)
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