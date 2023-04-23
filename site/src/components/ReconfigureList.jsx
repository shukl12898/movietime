import React, { useState, useEffect } from "react";
import {
Card, CardHeader, CardBody, Heading,
Flex, Spacer,Button, Popover, PopoverArrow, PopoverCloseButton,
PopoverFooter, PopoverContent, PopoverTrigger, PopoverBody,
 Box, SimpleGrid,Text,CardFooter, ButtonGroup, Input, Badge, Switch, Divider,
 AlertDialog, AlertDialogOverlay,AlertDialogContent,
 AlertDialogHeader,AlertDialogFooter, useDisclosure, IconButton
} from '@chakra-ui/react';
import { DeleteIcon, EditIcon} from '@chakra-ui/icons'
import { useNavigate } from "react-router-dom";

function ReconfigureList({ onAlertDialogClose, ...props }) {
    const listName = props.listTitle;
    const listId = props.listId;

    const [newListName, setNewListName] = useState("");

    const [exists, setExists] = useState(false);

    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()

    const updateList = async () => {
        const storedId = sessionStorage.getItem('userId');
         try {
            const response = await fetch(`/api/watchlists/changeList=${listId}/to=${rename}`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                userId: storedId
              }),
            });
            const result = await response.text();
            console.log(result);
          } catch (error) {
            console.error(error);
          }
      }

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
         icon={<EditIcon/>}
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
                  Edit {listName}
                </AlertDialogHeader>

                <FormControl isRequired isInvalid={exists}>
                  <FormLabel>Rename your list:</FormLabel>
                  <Input
                  placeholder={listName}
                  variant='filled'
                  width='auto'
                  value={newListName}
                  onChange={(e) => setNewListName(e.target.value)}/>

                  {exists && (
                       <FormHelperText>
                         A list by this name exists.
                       </FormHelperText>
                    )}
                    </FormControl>

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

export default ReconfigureList;