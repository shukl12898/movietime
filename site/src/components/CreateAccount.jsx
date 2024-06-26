import React from "react";
import { useState } from 'react';
import {
Card, CardHeader, CardBody, Heading,CardFooter,
Flex, Spacer, FormControl,FormLabel,Input, Button, FormHelperText
} from '@chakra-ui/react'

function CreateAccount({toggleLogIn}) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfPassword] = useState("");
    const [name, setName] = useState("");

    const [exists, setExists] = useState(false);

    const matchingPw = password != confirmPassword;
    const empty = (username == '') || (password == '');
    //const [validUser, setValid] = useState(true);

    function handleUsernameChange(event) {
        setUsername(event.target.value);
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value);
    }

     function handleNameChange(event) {
         setName(event.target.value);
     }

     function handlePasswordConf(event) {
        setConfPassword(event.target.value);
     }

     function handleSubmit() {
        if (name == "") {
            setName(username);
        }
        fetch("/api/createUser", {
            method: "POST",
            headers: {
             "Content-Type": "application/json"
            },
            body: JSON.stringify({
            username: username,
            password: password,
            name : name
            })
            })
            .then(res => res.json())
            .then((response) => {
               console.log("API Responded With: ");
               console.log(response);
               if (response.message == "User exists.") {
                   setExists(true);
               } else {
                   setExists(false);
                   sessionStorage.setItem("userId", response.userId);
                   sessionStorage.setItem("displayName", response.displayName);
                   toggleLogIn();
               }
            })
            .catch(error => {
             console.log(error)
            });
     };

     return (
      <div>
         <Flex>
              <Spacer />
             <Card variant='elevated' size='lg'>
               <CardHeader>
                   <Heading size='md'>Create Account</Heading>
               </CardHeader>
               <CardBody>

                   <FormControl isRequired isInvalid={false}>
                     <FormLabel htmlFor="username">Username</FormLabel>
                     <Input
                     placeholder='Enter a username' type="text" value={username} onChange={handleUsernameChange}
                     />
                     {exists && (
                          <FormHelperText>
                            Username already exists.
                          </FormHelperText>
                        )}
                      </FormControl>
                      <FormControl isRequired isInvalid={matchingPw}>
                      <FormLabel htmlFor="password">Password</FormLabel>
                      <Input placeholder='Enter a password' type="password" value={password} onChange={handlePasswordChange}/>
                       </FormControl>

                     <FormControl isRequired isInvalid={matchingPw}>
                     <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
                     <Input placeholder='Retype password' type="password" value={confirmPassword} onChange={handlePasswordConf}/>
                    {matchingPw && (
                          <FormHelperText>
                            Passwords must match.
                          </FormHelperText>
                        )}
                      </FormControl>

                      <FormControl>
                   <FormLabel htmlFor="displayName">Display Name</FormLabel>
                   <Input placeholder='Enter display name' type="text" value={name} onChange={handleNameChange}/>
                    </FormControl>
               </CardBody>
               <CardFooter>
                <Spacer/>
                <Button isDisabled={matchingPw || empty} onClick={handleSubmit}>Create Account</Button>
                <Spacer/>
               </CardFooter>
             </Card>
             <Spacer />
             </Flex>
             </div>
     );

}

export default CreateAccount;