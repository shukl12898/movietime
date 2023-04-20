import React, { useState, useEffect } from "react";
import NavBar from '../components/NavBar';
import {
HStack, VStack,
Card, CardHeader, CardBody, Heading,
Flex, Spacer,StackDivider,Button, Popover, PopoverArrow, PopoverCloseButton,
PopoverFooter, PopoverContent, PopoverTrigger, PopoverBody,
 Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon, Box, SimpleGrid,Text,CardFooter, ButtonGroup, Input, Badge
} from '@chakra-ui/react';
import { useNavigate } from "react-router-dom";

function MyWatchlists() {

    const [watchlists, assignLists] = useState([]);
    const [userId, setId] = useState(0);
    const navigate = useNavigate();
    const [newListName, setNewListName] = useState("");

    const getLists = async() => {
        const storedId = sessionStorage.getItem('userId');
        if (storedId) {
          setId(storedId);
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
                  assignLists(response.watchlists);
              })
              .catch(error => {
                console.log(error);
              });
        } else {
          console.log('ID not found in session storage.');
          navigate("/");
        }
    };

      useEffect(()=>{
              getLists();
      },[]);

   const listCreated = async () => {
       try {
           const response = await fetch("/api/newList", {
               method: "POST",
               headers: {
                   "Content-Type": "application/json"
               },
               body: JSON.stringify({
                   watchListName: newListName,
                   forUser: userId
               })
           });
           const result = await response.json();
           console.log("API Responded With: ");
           console.log(result);
       } catch (error) {
           console.log(error);
       }

        setNewListName('');
       getLists();
   };

   const deleteWatchlist = async (watchlistId) => {
       try {
           const response = await fetch(`/api/watchlists/${watchlistId}`, {
               method: "DELETE",
               headers: {
                   "Content-Type": "application/json"
               },
               body: JSON.stringify({
                  userId: userId
               })
           });
           const result = await response.text();
           console.log("API Responded With: ", result);
       } catch (error) {
           console.error("Error deleting watchlist:", error);
       }
       getLists();
   };

    return (
        <div>
            <NavBar/>

            <Flex minWidth='max-content' alignItems='center' gap='2' p='9'>
              <Box>
                <Heading size='lg'>Your Watchlists</Heading>
              </Box>
              <Spacer />
              <ButtonGroup gap='3'>
                <Popover>
                                    <PopoverTrigger>
                                      <Button>Create a New List</Button>
                                    </PopoverTrigger>
                                    <PopoverContent>
                                      <PopoverArrow />
                                      <PopoverCloseButton />
                                      <PopoverBody>
                                      <Input
                                      placeholder='Watchlist Name'
                                      variant='filled'
                                      width='auto'
                                      value={newListName}
                                      onChange={(e) => setNewListName(e.target.value)}/>
                                      </PopoverBody>
                                      <PopoverFooter>
                                          <Button
                                          colorScheme='green'
                                          onClick={listCreated}
                                          >Done</Button>
                                      </PopoverFooter>
                                    </PopoverContent>
                                  </Popover>

                <Button> Find a List</Button>
              </ButtonGroup>
            </Flex>

                <SimpleGrid spacing={4} p={10} templateColumns='repeat(auto-fill, minmax(500px, 1fr))'>
                {watchlists.slice(0).map((movie, index) => (
                                    <div key={index}>
                                         <Card>
                                             <CardHeader>
                                               <Heading size='md'>
                                               {watchlists[index].listName}
                                               {(watchlists[index].userId == userId) && (
                                                <Badge ml='1' fontSize='0.8em' colorScheme='green'>
                                                  Created by You
                                                </Badge>)}
                                                <Badge ml='1' fontSize='0.8em' colorScheme='purple'>
                                                  Private
                                                </Badge>
                                               </Heading>
                                             </CardHeader>
                                             <CardBody>
                                               <Text>{watchlists[index].listId}</Text>
                                             </CardBody>
                                             <CardFooter>
                                               <Button
                                               colorScheme='red'
                                               onClick={() =>
                                                deleteWatchlist(watchlists[index].listId)}
                                                >Delete List</Button>
                                             </CardFooter>
                                       </Card>
                                    </div>

                            ))}
                </SimpleGrid>

            </div>
    );
}

export default MyWatchlists;