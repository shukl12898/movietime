import React, { useRef, useState, useEffect } from 'react';
import { IconButton, HStack, Button } from '@chakra-ui/react';
import { AiFillDollarCircle } from 'react-icons/ai';
import { BsPlusCircleFill, BsFillEyeFill } from 'react-icons/bs';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  Select, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton,
  ModalBody, ModalFooter
} from '@chakra-ui/react';

function HoverButtons(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const movieTitle = props.movieTitle;
  const movieId = props.movieId;
  const [showOverlay, setShowOverlay] = useState(false);
  const [lists, setLists] = useState([]);

  const [toListId, setToListId] = useState(0);
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
  }
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
      } catch (error) {
        console.error(error);
      }

  }

  useEffect(()=>{
   fetchLists();
  },[]);


  return (
    <>
        <HStack spacing={4}>
          <IconButton
            icon={<BsFillEyeFill style={{ color: "#3e5936" }} />}
            aria-label="Like"
            size="lg"
            variant="unstyled"
            display="flex"
          />
          <IconButton
            onClick={() => setShowOverlay(true)}
            icon={<BsPlusCircleFill style={{ color: "#3e5936" }} />}
            aria-label="Comment"
            size="md"
            variant="unstyled"
            display="flex"
          />
          <IconButton
            onClick={() => onOpen()}
            icon={<AiFillDollarCircle style={{ color: "#3e5936" }} />}
            aria-label="Ticket"
            size="md"
            variant="unstyled"
            display="flex"
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
                Free tickets!
              </AlertDialogHeader>
            </div>

            <AlertDialogBody>
              Do you want to redeem free tickets to this movie?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button style={{ backgroundColor: "#3e5936", color: 'white' }} onClick={onClose} ml={3}>
                Purchase
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>


      <Modal isOpen={showOverlay} onClose={() => setShowOverlay(false)}>
            <ModalOverlay />
            <ModalContent>
        <ModalHeader>
          Add {movieTitle} to a new list?
          <br />
        </ModalHeader>
        <ModalCloseButton/>
        <ModalBody>
        <Select placeholder='Select your list' value={selectedOption} onChange={handleChange}>
          {lists.slice(0).map((movie, index) => (
                <option key={lists[index].listId} value={lists[index].listId}>{lists[index].listName}</option>
          ) )}
        </Select>
        </ModalBody>
        <ModalFooter>
                  <Button onClick={() => addToList(selectedOption, movieId)}>Add</Button>
                </ModalFooter>
      </ModalContent>
      </Modal>
    </>
  );
}

export default HoverButtons;
