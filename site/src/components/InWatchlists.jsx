
import React, { useState, useEffect } from 'react';
import { IconButton, Button,
Divider, Modal, ModalBody, ModalCloseButton,
ModalContent, ModalFooter, ModalHeader, ModalOverlay,
useDisclosure } from '@chakra-ui/react';
import { BsFillEyeFill } from 'react-icons/bs';

function InWatchlists(props) {

    const movieTitle = props.movieTitle;
    const movieId = props.movieId;

    const [lists, setLists] = useState([]);

    const { isOpen, onOpen, onClose } = useDisclosure();

    const getLists = async() => {
        console.log("fetching lists...");
        const storedId = sessionStorage.getItem('userId');
        fetch(`/api/watchlists/fetchFor=${movieId}`, {
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
    }

    useEffect(() =>{
        getLists();
    }, []);


    return (
    <>
        <IconButton
          icon={<BsFillEyeFill style={{ color: "#3e5936" }} />}
          aria-label="Like"
          size="lg"
          variant="unstyled"
          display="flex"
          onClick={onOpen}
          id="eyeButton"
        />

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Your lists Containing: {movieTitle}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
             {lists.map((item) => (
                   <>
                   <Divider orientation='horizontal' />
                         {item.listName}
                          </>)
                        )
             }
            </ModalBody>
            <ModalFooter>
                   <Button colorScheme='green' onClick={onClose} ml={3}>
                     Done
                   </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

    </>
    );

}

export default InWatchlists;