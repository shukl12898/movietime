import React from "react";
import { useState } from 'react';
import {
Card, CardHeader, CardBody, Heading,CardFooter,
Flex, Spacer, FormControl,FormLabel,Input, Button, FormHelperText
} from '@chakra-ui/react';

function LoginComponent({toggleLogIn}) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const allow = (username != '') && (password != '');

    const [registered, setRegistered] = useState(true);
    const [correct, setCorrect] = useState(true);

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
                       {!correct && (
                                                <FormHelperText>
                                                  Incorrect password.
                                                </FormHelperText>
                                              )}
                  </FormControl>


          </CardBody>
          <CardFooter>
          <Spacer/>
           <Button
           isDisabled={!allow}
           onClick={() => {
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
                            if(response.message == "Wrong password.") {

                                setCorrect(false);

                            } else if(response.message == "User does not exist.") {

                                setCorrect(true);
                                setRegistered(false);

                            } else if (response.message == "Success"){

                                sessionStorage.setItem("userId", response.userId);
                                                                sessionStorage.setItem("displayName", response.displayName);
                                setCorrect(true);
                                setRegistered(true);
                                toggleLogIn();

                            }
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