import React from 'react';
import { Flex, Box, Heading } from '@chakra-ui/react';

// This page provides a button with a redirect to "/other"
function Footer() {
  // Calling navigate() will allow us to redirect the webpage
  // Anything returned will be rendered in React
  return (
  <>
  <footer>
  <Flex minWidth='max-content' alignItems='center' gap='2' p={5} bg='#94a390'>
    <Box p='2'>
      <Heading size='md' color='white'>Team 14</Heading>
    </Box>
  </Flex>
  </footer>
  </>

  );
};

export default Footer;