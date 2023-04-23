import React, { useState, useEffect } from "react";
import {
Card, CardHeader, CardBody, Heading,
Flex, Spacer,Button, Popover, PopoverArrow, PopoverCloseButton,
PopoverFooter, PopoverContent, PopoverTrigger, PopoverBody,
 Box, SimpleGrid,Text,CardFooter, ButtonGroup, Input, Badge, Switch, Divider,
 AlertDialog, AlertDialogOverlay,AlertDialogContent,
 AlertDialogHeader,AlertDialogFooter, useDisclosure, IconButton
} from '@chakra-ui/react';
import { useNavigate } from "react-router-dom";

import { DeleteIcon, EditIcon} from '@chakra-ui/icons'

function DeleteWatchlist({ onAlertDialogClose, ...props }) {
    const listName = props.listTitle;
    const listId = props.listId;

    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()

    const deleteWatchlist = async ()=> {
         try {
             const response = await fetch(`/api/watchlists/${listId}`, {
                 method: "DELETE",
                 headers: {
                     "Content-Type": "application/json"
                 },
                 body: JSON.stringify({
                    userId: 0
                 })
             });
             const result = await response.text();
             console.log("API Responded With: ", result);
             onAlertDialogClose();
         } catch (error) {
             console.error("Error deleting watchlist:", error);
         }
    };

    const handleClose = () => {
        onAlertDialogClose(); // Call the function from Component A
        onClose(); // Close the AlertDialog
    };

    const handleDelete = () => {
        deleteWatchlist();
        onClose();
    };

    return (

     <>

      <IconButton
        colorScheme='red'
         icon={<DeleteIcon/>}
        onClick={onOpen}
         />
          <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={handleClose}
          >
            <AlertDialogOverlay>
              <AlertDialogContent>
                <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                  Delete {listName}?
                </AlertDialogHeader>

                <AlertDialogFooter>
                  <Button ref={cancelRef} onClick={handleClose}>
                    Cancel
                  </Button>
                  <Button colorScheme='red' onClick={handleDelete} ml={3}>
                    Delete
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialogOverlay>
          </AlertDialog>
        </>
    );
}

export default DeleteWatchlist;