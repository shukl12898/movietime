import React, { useState } from "react";
import {
Button, Input,
 AlertDialog, AlertDialogOverlay,AlertDialogContent, AlertDialogBody,
 AlertDialogHeader,AlertDialogFooter, useDisclosure, IconButton, FormControl, FormLabel, FormHelperText
} from '@chakra-ui/react';
import { EditIcon} from '@chakra-ui/icons';

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
            const response = await fetch(`/api/watchlists/changeList=${listId}/to=${newListName}`, {
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
            if (result == "Name exists") {
                setExists(true);
            } else {
                setExists(false);
                handleClose();
            }
          } catch (error) {
            console.error(error);
          }
      }

    const handleClose = () => {
        onAlertDialogClose(); // Call the function from Component A
        onClose(); // Close the AlertDialog
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
                <AlertDialogBody>
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
                </AlertDialogBody>
                <AlertDialogFooter>
                  <Button ref={cancelRef} onClick={handleClose}>
                    Cancel
                  </Button>
                  <Button colorScheme='green' onClick={updateList} ml={3}>
                    Submit Changes
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialogOverlay>
          </AlertDialog>
        </>
    );
}

export default ReconfigureList;