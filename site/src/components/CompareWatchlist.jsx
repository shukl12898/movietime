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
  useToast,
  Input,
  FormHelperText
} from "@chakra-ui/react";

function CompareWatchlist({ getLists, listId, isPrivate }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedUserList, setSelectedUserList] = useState("");
  const [newListName, setNewListName] = useState("");
  const toast = useToast();

  const [rename, setRename] = useState(false);

  const [publicWatchlists, setPublicWatchlists] = useState([]);
  const [users, setUsers] = useState([]);

  const onClose = () => setIsOpen(false);

  const handleCompare = async () => {

    const storedId = sessionStorage.getItem('userId');

    try {
       const response = await fetch(`/api/watchlists/combine=${listId}/and=${selectedUserList}`, {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({
           watchListName: newListName,
                  forUser: storedId,
                  isPrivate: false
         }),
       });
       const result = await response.text();
       console.log(result);
       if (result == "Name exists") {
              setRename(true);
         } else if (result == "SUCCESS"){
              setRename(false);
               toast({
                    title: "Watchlists compared",
                    description: `A new watchlist "${newListName}" has been created.`,
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                  });
              onClose();
              getLists();
         }
     } catch (error) {
       console.error(error);
     }

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

    const getListOfUsers = () => {

         const storedId = sessionStorage.getItem('userId');
                 if (storedId) {
                   console.log('ID found in session storage: ', storedId);

                   fetch(`/api/getUsers`, {
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
                           setUsers(response.users);
                       })
                       .catch(error => {
                         console.log(error);
                       });
                 } else {
                   console.log('ID not found in session storage.');
                 }

    };

    const getPublicLists = () => {

         const storedId = sessionStorage.getItem('userId');
         if (storedId) {
           console.log('ID found in session storage: ', storedId);

           fetch(`/api/getPublicLists=${selectedUser}`, {
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
                   setPublicWatchlists(response.watchlists);
               })
               .catch(error => {
                 console.log(error);
               });
         } else {
           console.log('ID not found in session storage.');
         }

    };



   useEffect(()=>{
    getListOfUsers();
    if (selectedUser != "") {
        getPublicLists();
    }
   },[selectedUser]);




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
                    {users.map((user) => (
                         (user.user_id != sessionStorage.getItem('userId')) &&
                          (<option key={user.user_id} value={user.user_id}>{user.displayName}</option>)
                    ) )}
                  </Select>
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Select a watchlist to compare:</FormLabel>
                  <Select
                    placeholder="Select watchlist"
                    value={selectedUserList}
                    onChange={(e) => setSelectedUserList(e.target.value)}
                  >

                    {publicWatchlists.map((list) => (
                            (list.listId != listId) &&
                                              (<option key={list.listId} value={list.listId}>{list.listName}</option>)
                                        ) )}
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
                  {rename && (
                                   <FormHelperText>
                                     This name exists.
                                   </FormHelperText>
                                                )}
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
