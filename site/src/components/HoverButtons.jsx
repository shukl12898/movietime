import React, { useRef, useState, useEffect } from 'react';
import { IconButton, HStack, Button } from '@chakra-ui/react';
import { AiFillDollarCircle } from 'react-icons/ai';
import { BsPlusCircleFill } from 'react-icons/bs';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  Select, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton,
  ModalBody, ModalFooter, Heading, FormHelperText, FormControl
} from '@chakra-ui/react';
import CreateNewList from '../components/CreateNewList';
import InWatchlists from '../components/InWatchlists';

function HoverButtons({movieDetails}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

    const movieTitle = movieDetails.title;
    const movieId = movieDetails.id;
    const [showOverlay, setShowOverlay] = useState(false);
    const [lists, setLists] = useState([]);

    const [exists, setInList] = useState(false);

   const [selectedOption, setSelectedOption] = useState(0);

       const handleChange = (event) => {
         setSelectedOption(event.target.value);
       };

        const fetchLists = async() => {
           const storedId = sessionStorage.getItem('userId');
             if (storedId) {
               console.log('ID found in session storage: ', storedId);

               fetch("/api/getAllLists", {
                   method: "POST",
                   headers: {
                     "Content-Type": "application/json"
                   },
                   body: JSON.stringify({
                    userId: storedId
                    })
                     })
                   .then(res => res.json())
                   .then((response) => {
                       console.log("API Responded With: ");
                       console.log(response);
                       setLists(response.watchlists);
                   })
                   .catch(error => {
                     console.log(error);
                   });
             } else {
               console.log('ID not found in session storage.');
             }
         };

         const addToList = async (watchlistId, movieId) => {
           const storedId = sessionStorage.getItem('userId');
            try {
               const response = await fetch(`/api/watchlists/insertMovie=${watchlistId}/${movieId}`, {
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
               if (result == "Already in list") {
                    setInList(true);
                    setShowOverlay(true);
               } else {
                    setInList(false);
                    setShowOverlay(false);
               }
             } catch (error) {
               console.error(error);
             }

         }

         useEffect(()=>{
          fetchLists();
         },[]);

  const redirectToTickets = () => {
    window.open('https://www.regmovies.com/search?query=' + movieDetails.title, '_blank');
  }

  return (
    <>
      <HStack spacing={4} data-testid= "hover-buttons">
        <InWatchlists
            movieTitle = {movieTitle}
            movieId = {movieId}
        />
        <IconButton
          onClick={() => setShowOverlay(true)}
          icon={<BsPlusCircleFill style={{ color: "#3e5936" }} />}
          aria-label="Comment"
          size="md"
          variant="unstyled"
          display="flex"
          id="addButton"
        />
        <IconButton
          onClick={onOpen}
          icon={<AiFillDollarCircle style={{ color: "#3e5936" }} />}
          aria-label="Ticket"
          size="md"
          variant="unstyled"
          display="flex"
          id="dollarButton"
        />
      </HStack>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <div>
              <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                Buy tickets!
              </AlertDialogHeader>
            </div>

            <AlertDialogBody>
              Do you want to buy tickets to this movie?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button id="purchaseButton" style={{ backgroundColor: "#3e5936", color: 'white' }} onClick={redirectToTickets} ml={3}>
                Purchase
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      <Modal data-testid="modal" isOpen={showOverlay} onClose={() => setShowOverlay(false)}>
                  <ModalOverlay />
                  <ModalContent>
              <ModalHeader>
                Add {movieTitle} to a new list?
                <br />
              </ModalHeader>
              <ModalCloseButton data-testid="close-modal-button"/>
              <ModalBody>
              <FormControl>
              <Select placeholder='Select your list' id="dropdown" value={selectedOption} onChange={handleChange}>
                {lists.slice(0).map((movie, index) => (
                      <option key={lists[index].listId} value={lists[index].listId}>{lists[index].listName}</option>
                ) )}
              </Select>
              {exists && (
                 <FormHelperText>
                   The movie is already in this list.
                 </FormHelperText>
                              )}
              </FormControl>
               <br/>
               <Heading size='sm'>Looking for something new?</Heading>
             <CreateNewList onAlertDialogClose={fetchLists}/>
              </ModalBody>
              <ModalFooter>
                        <Button id="addToList" onClick={() => {
                        addToList(selectedOption, movieId);
                        }}>Add</Button>
                      </ModalFooter>
            </ModalContent>
            </Modal>
    </>
  );
}

export default HoverButtons;
