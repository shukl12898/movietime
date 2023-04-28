import React, { useState, useEffect } from "react";
import {
Card, CardHeader, CardBody, Heading,
Flex, Spacer,Button, Popover, PopoverArrow, PopoverCloseButton,
PopoverFooter, PopoverContent, PopoverTrigger, PopoverBody,
 Box, SimpleGrid,Text,CardFooter, ButtonGroup, Input, Badge, Switch,
 Divider,FormHelperText, FormControl,FormLabel
} from '@chakra-ui/react';
import { useNavigate } from "react-router-dom";
import MovieDetails from '../components/MovieDetails';
import WatchlistMovieDetails from '../components/WatchlistMovieDetails';

function SuggestionCreateNewList({movies, numResults}) {

    const [newListName, setNewListName] = useState("");
    const [makePrivate, setMakePrivate] = useState(false);
    const [exists, setExists] = useState(false);
    const [watchlists, setWatchlists] = useState([]);

  const getListId = async () => {
    const storedId = sessionStorage.getItem('userId');
    if (storedId) {
      const response = await fetch("/api/getAllLists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userId: storedId
        })
      });
      const data = await response.json();
      console.log("API Responded With: ");
      console.log(data);

      const newWatchlist = data.watchlists.find(
        (watchlist) => watchlist.listName === newListName
      );

      if (newWatchlist) {
        return newWatchlist.listId;
      }
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

        // Check if the response status is OK
        if (response.ok) {
          const result = await response.text();
          console.log(`Added movie ${movieId} to watchlist ${watchlistId}:`, result);
        } else {
          console.error(`Error adding movie ${movieId} to watchlist ${watchlistId}:`, response.status, response.statusText);
        }
      } catch (error) {
        console.error(`Error adding movie ${movieId} to watchlist ${watchlistId}:`, error);
      }
    };




    const listCreated = async () => {
      const storedId = sessionStorage.getItem("userId");
      try {
        const response = await fetch("/api/newList", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            watchListName: newListName,
            forUser: storedId,
            isPrivate: makePrivate,
          }),
        });
        const result = await response.json();
        console.log("API Responded With: ");
        console.log(result);
        if (result.message === "List name exists.") {
          setExists(true);
          return false;
        } else {
          setExists(false);
          setNewListName("");
          return true;
        }
      } catch (error) {
        console.log(error);
        return false;
      }
    };




    return (
        <Popover>
            <PopoverTrigger>
              <Button>Create a New List</Button>
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
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}/>

              {exists && (
                   <FormHelperText>
                     A list by this name exists.
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
                   colorScheme="green"
                   onClick={async () => {
                     const listCreatedSuccessfully = await listCreated();
                     if(!listCreatedSuccessfully)
                     {
                        console.log("List name already exists, doing nothing.");
                        return;
                     }
                     else{
                         const watchlistId = await getListId();
                          console.log(`I'm here, right before if watchlistId: ${watchlistId}`);
                          if (watchlistId) {
                            for (let i = 0 ; i< numResults;i++) {
                              await addToList(watchlistId, movies[i].id);
                            }
                          }
                     }
                   }}
                 >
                   Done
                 </Button>

              </PopoverFooter>
            </PopoverContent>
          </Popover>
    );
}

export default SuggestionCreateNewList;