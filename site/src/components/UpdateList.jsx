import React, { useState } from "react";
import {
Heading,
Button, Popover, PopoverArrow, PopoverCloseButton,
PopoverFooter, PopoverContent, PopoverTrigger, PopoverBody,
Input, Switch,
FormHelperText, FormControl,FormLabel
} from '@chakra-ui/react';

function UpdateList({onAlertDialogClose}) {

    const [newListName, setNewListName] = useState("");
    const [makePrivate, setMakePrivate] = useState(false);

    const [exists, setExists] = useState(false);

    const listCreated = async () => {
       const storedId = sessionStorage.getItem('userId');
       try {
           const response = await fetch("/api/updateList", {
               method: "POST",
               headers: {
                   "Content-Type": "application/json"
               },
               body: JSON.stringify({
                   watchListName: newListName,
                   forUser: storedId,
                   isPrivate: makePrivate
               })
           });
           const result = await response.json();

           console.log("API Responded With: ");
           console.log(result);
           if (result.message == "List name exists.") {
                setExists(true);
           } else {
                setExists(false);
                onAlertDialogClose();
                setNewListName('');
           }
       } catch (error) {
           console.log(error);
       }
       };

    return (
        <Popover>
            <PopoverTrigger>
              <Button>Rename List</Button>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverBody>
              <FormControl isRequired isInvalid={exists}>
              <FormLabel>Name your list:</FormLabel>
              <Input
              placeholder='Watchlist Name'
              variant='filled'
              width='auto'
              id="newListTextBox"
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}/>

              {exists && (
                   <FormHelperText>
                     A list by this name exists.
                   </FormHelperText>
                )}

                {!exists && (
                     <FormHelperText>
                      Valid list Name!
                     </FormHelperText>
                  )}
                </FormControl>

              <br/>
              <Heading size='sm'>Make private?</Heading>
              <Switch size='md'
                value={makePrivate}
                onChange={(e) => setMakePrivate(e.target.value)}/>
              </PopoverBody>
              <PopoverFooter>
                  <Button
                  colorScheme='green'
                  onClick={listCreated}
                  id="DoneButton"
                  >Done</Button>
              </PopoverFooter>
            </PopoverContent>
          </Popover>
    );
}

export default CreateNewList;