import React, { useState } from "react";
import {
Heading,
Button,useDisclosure, Select,
 Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton,
 ModalBody, ModalFooter
} from '@chakra-ui/react';
import CreateNewList from '../components/CreateNewList';

function CopyMovie({ onAlertDialogClose, ...props }) {
    const movieTitle = props.movieTitle;
    const movieId = props.movieId;
    const listName = props.listName;
    const listId = props.listId;
    const [watchlists, setLists] = useState(props.watchlists);

    const [selectedOption, setSelectedOption] = useState(0);

    const { isOpen, onOpen, onClose } = useDisclosure()

   const addToList = async () => {
       const storedId = sessionStorage.getItem('userId');
        try {
           const response = await fetch(`/api/watchlists/insertMovie=${selectedOption}/${movieId}`, {
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
           onAlertDialogClose();
         } catch (error) {
           console.error(error);
         }
     }

     const handleClose = () => {
        onAlertDialogClose(); // Call the function from Component A
        setSelectedOption(0);
        onClose(); // Close the AlertDialog
      };

   const handleConfirm = () => {

     addToList();
     setSelectedOption(0);
     onClose();
   };
    const refreshLists = async() => {
        const storedId = sessionStorage.getItem('userId');
          try {
              const response = await fetch("/api/getAllLists", {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
               userId: storedId
              })
             });
             const result = await response.json();
            console.log("API Responded With: ");
            setLists(result.watchlists);
            console.log(result.watchlists);
            } catch (error) {
                       console.log(error);
                   }
        };

   const handleChange = (event) => {
         setSelectedOption(event.target.value);
       };

    return (

     <>
          <Button size="xs" onClick={onOpen}>
            Copy
          </Button>

           <Modal isOpen={isOpen} onClose={handleClose}>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>{movieTitle} is currently in {listName}. Where would you
                                                   like to copy it to?
                                                   </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                     <Select placeholder="Select a list" value={selectedOption} onChange={handleChange}>
                                          {watchlists
                                            .filter((list) => list.listId !== listId)
                                            .map((list) => (
                                              <option key={list.listId} value={list.listId}>
                                                {list.listName}
                                              </option>
                                            ))}
                                        </Select>
                    <br/>
                       <Heading size='sm'>Looking for something new?</Heading>
                     <CreateNewList onAlertDialogClose={refreshLists}/>
                    </ModalBody>

                    <ModalFooter>
                      <Button onClick={handleClose}>
                                         Cancel
                                       </Button>
                                       <Button colorScheme='green' onClick={handleConfirm} ml={3}>
                                         Confirm
                                       </Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>

        </>
    );
}

export default CopyMovie;