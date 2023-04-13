import React from 'react';
import { Flex, Spacer, Button, ButtonGroup, Box, Heading } from '@chakra-ui/react';
import { useNavigate } from "react-router-dom";

// This page provides a button with a redirect to "/other"
function NavBar() {
  // Calling navigate() will allow us to redirect the webpage
  const navigate = useNavigate();
  // Anything returned will be rendered in React
  return (
  <>
  <Flex minWidth='max-content' alignItems='center' gap='2' p={4} bg='#3e5936'>
    <Box p='2'>
      <Heading size='md' color='white'>MovieTime</Heading>
    </Box>
    <Spacer />
    <ButtonGroup >
      <Button bg='white' onClick={() => {
                                       navigate("/Home");
                                     }}>Home</Button>
      <Button bg='white' onClick={() => {
                                       navigate("/Login");
                                     }}
                                   >Login</Button>
      <Button bg='white' onClick={() => {
                                          navigate("/Search");
                                        }}>Search</Button>
      <Button bg='white' onClick={() => {
                                          navigate("/MyWatchlists");
                                        }}>Watchlists</Button>
    </ButtonGroup>
  </Flex>
  </>

  );
};

export default NavBar;