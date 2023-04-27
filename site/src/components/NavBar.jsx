import React from 'react';
import { Flex, Spacer, Button, ButtonGroup, Box, Heading,
 Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton
  } from '@chakra-ui/react';
import { useNavigate } from "react-router-dom";
import {useState, useEffect} from "react";


// This page provides a button with a redirect to "/other"
function NavBar({toggleLogIn, ...props}) {

    const name = props.name;

  // Calling navigate() will allow us to redirect the webpage
  const navigate = useNavigate();


  return (
  <>
  <Flex minWidth='max-content' alignItems='center' gap='2' p={4} bg='#3e5936'>
    <Box p='2'>
      <Heading size='md' color='white'>MovieTime - Team 14</Heading>
    </Box>
    <Spacer />

    <ButtonGroup >
      <Button bg='white' isDisabled={name ? false : true} onClick={() => {navigate("/Search");}}>Search</Button>
      <Button bg='white' isDisabled={name ? false : true} onClick={() => {navigate("/MyWatchlists");}}>Watchlists</Button>

     {!name && (<Button bg='white' onClick={() => {navigate("/");}} >Login</Button>) }

     {name && (
         <Popover>
           <PopoverTrigger>
             <Button bg="#fcad03">{name}</Button>
           </PopoverTrigger>
           <PopoverContent>
             <PopoverArrow />
             <PopoverCloseButton />
             <PopoverHeader>Welcome to MovieTime, {name}!</PopoverHeader>
             <PopoverFooter>
                 <Button
                 colorScheme='red'
                 onClick={()=>{
                 sessionStorage.clear();
                 toggleLogIn();
                 navigate("/");
                 }}
                 >Log Out</Button>
             </PopoverFooter>
           </PopoverContent>
         </Popover>
     ) }
    </ButtonGroup>
  </Flex>
  </>

  );
};

export default NavBar;