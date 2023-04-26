import React from "react";
import {
Button,
 AlertDialog, AlertDialogOverlay,AlertDialogContent,
 AlertDialogHeader,AlertDialogFooter, useDisclosure
} from '@chakra-ui/react';

function RemoveMovie({ onAlertDialogClose, ...props }) {

    const movieTitle = props.movieTitle;
    const movieId = props.movieId;
    const listName = props.listName;
    const listId = props.listId;

    const { isOpen, onOpen, onClose } = useDisclosure()
      const cancelRef = React.useRef()

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
     deleteMovie();
     onClose();
   };

    return (

     <>
          <Button size="xs" colorScheme='red' onClick={onOpen}>
            Remove
          </Button>

          <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={handleClose}
          >
            <AlertDialogOverlay>
              <AlertDialogContent>
                <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                  Delete {movieTitle} from {listName}?
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

export default RemoveMovie;