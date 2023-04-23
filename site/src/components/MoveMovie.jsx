import React, { useState, useEffect } from "react";
import {
Card, CardHeader, CardBody, Heading,
Flex, Spacer,Button, Popover, PopoverArrow, PopoverCloseButton,
PopoverFooter, PopoverContent, PopoverTrigger, PopoverBody,
 Box, SimpleGrid,Text,CardFooter, ButtonGroup, Input, Badge, Switch, Divider,
 AlertDialog, AlertDialogOverlay,AlertDialogContent,
 AlertDialogHeader,AlertDialogFooter, useDisclosure,
 Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton,
  ModalBody, ModalFooter, Select
} from '@chakra-ui/react';
import { useNavigate } from "react-router-dom";
import CreateNewList from '../components/CreateNewList';

function MoveMovie({ onAlertDialogClose, ...props }) {

    const movieTitle = props.movieTitle;
    const movieId = props.movieId;
    const listName = props.listName;
    const listId = props.listId;
    const navigate = useNavigate();

    const [watchlists, setLists] = useState(props.watchlists);

    const [selectedOption, setSelectedOption] = useState(0);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()

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

   const deleteMovie = async () => {
       try {
           const response = await fetch(`/api/watchlists/${listId}/${movieId}`, {
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
       } catch (error) {
           console.error("Error deleting watchlist:", error);
       }

   };
    const addToList = async () => {
            const storedId = sessionStorage.getItem('userId');
             try {
                const response = await fetch(`/api/watchlists/insertMovie=${selectedOption}/${movieId}`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    userId: 0
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
      deleteMovie();
      addToList();
      setSelectedOption(0);
      onClose();
    };

    const handleChange = (event) => {
          setSelectedOption(event.target.value);
    };

    return (

     <>
          <Button size="xs" onClick={onOpen}>
            Move
          </Button>

          <Modal isOpen={isOpen} onClose={handleClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>{movieTitle} is currently in {listName}. Where would you
                                             like to move it to?
                                             </ModalHeader>
              <ModalCloseButton />
              <ModalBody>
               <Select placeholder="Select a list" value={selectedOption} onChange={handleChange}>
                    {watchlists
                      .filter((list) => list.listId !== listId)
                      .map((list, index) => (
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

export default MoveMovie;