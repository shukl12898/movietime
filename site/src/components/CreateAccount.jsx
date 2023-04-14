import React from "react";
import { useState } from 'react';
import {
Card, CardHeader, CardBody, Heading,CardFooter,
Flex, Spacer, FormControl,FormLabel,Input, Button
} from '@chakra-ui/react'

function CreateAccount() {

     const [username, setUsername] = useState("");
     const [password, setPassword] = useState("");
     const [confirmPassword, setConfPassword] = useState("");
     const [name, setName] = useState("");
     const [user, setUser] = useState();

    console.log(user);
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
               setUser(response);
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

                   <FormControl isRequired>
                     <FormLabel htmlFor="username">Username</FormLabel>
                     <Input
                     placeholder='Enter a username' type="text" value={username} onChange={handleUsernameChange}
                     />
                      </FormControl>
                      <FormControl isRequired>
                      <FormLabel htmlFor="password">Password</FormLabel>
                      <Input placeholder='Enter a password' type="password" value={password} onChange={handlePasswordChange}/>
                       </FormControl>

                     <FormControl isRequired>
                     <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
                     <Input placeholder='Retype password' type="password" value={confirmPassword} onChange={handlePasswordConf}/>
                      </FormControl>

                      <FormControl isRequired>
                   <FormLabel htmlFor="displayName">Display Name</FormLabel>
                   <Input placeholder='Enter display name' type="text" value={name} onChange={handleNameChange}/>
                    </FormControl>
               </CardBody>
               <CardFooter>
                <Spacer/>
                <Button onClick={handleSubmit}>Create Account</Button>
                <Spacer/>
               </CardFooter>
             </Card>
             <Spacer />
             </Flex>
             </div>
     );

}

export default CreateAccount;