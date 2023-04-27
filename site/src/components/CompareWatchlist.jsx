import React, { useState, useEffect} from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Select,
  Text,
  useToast,
  Input
} from "@chakra-ui/react";

function CompareWatchlist({ listId, isPrivate }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedUserList, setSelectedUserList] = useState("");
  const [newListName, setNewListName] = useState("");
  const toast = useToast();
  const [publicWatchlists, setPublicWatchlists] = useState([]);
  const [users, setUsers] = useState([]);



  const onClose = () => setIsOpen(false);

  const handleCompare = () => {
    // Implement the logic to create a new list based on the comparison

    // Show success message
    toast({
      title: "Watchlists compared",
      description: `A new watchlist "${newListName}" has been created.`,
      status: "success",
      duration: 5000,
      isClosable: true,
    });

    onClose();
  };

    const handleFirstCompareClick = () => {
      if (isPrivate) {
        toast({
          title: "Error",
          description: "Private watchlists cannot be compared.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } else {
        setIsOpen(true);
      }
    };

  return (
    <>
      <Button onClick= {handleFirstCompareClick}>Compare</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Compare Watchlist</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
              <>
                <FormControl>
                  <FormLabel>Select a user to compare:</FormLabel>
                  <Select
                    placeholder="Select user"
                    value={selectedUser}
                    onChange={(e) => setSelectedUser(e.target.value)}
                  >
                    {/* Populate with real user data , retrieve all user data*/}
                    <option value="userB">User B</option>
                  </Select>
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Select a watchlist to compare:</FormLabel>
                  <Select
                    placeholder="Select watchlist"
                    value={selectedUserList}
                    onChange={(e) => setSelectedUserList(e.target.value)}
                  >
                    {/* Populate with real watchlist data */}
                    <option value="action">Action</option>
                  </Select>
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Name the new watchlist:</FormLabel>
                  <Input
                    placeholder = 'Watchlist Name'
                    variant = 'filled'
                    width = 'auto'
                    id = 'newListTextBox'
                    value={newListName}
                    onChange={(e) => setNewListName(e.target.value)}
                  />
                </FormControl>
              </>

          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleCompare} disabled={isPrivate}>
              Compare
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default CompareWatchlist;
