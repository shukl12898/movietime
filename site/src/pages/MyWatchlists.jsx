import React, { useState, useEffect } from "react";
import NavBar from '../components/NavBar';
import {
Card, CardHeader, CardBody, Heading,
Flex, Spacer,Button,
 Box, SimpleGrid,CardFooter, ButtonGroup, Badge, Divider
} from '@chakra-ui/react';
import { useNavigate } from "react-router-dom";
import WatchlistMovieDetails from '../components/WatchlistMovieDetails';
import CreateNewList from '../components/CreateNewList';
import DeleteWatchlist from '../components/DeleteWatchlist';
import ReconfigureList from '../components/ReconfigureList';

function MyWatchlists() {

    const [watchlists, assignLists] = useState([]);
    const [userId, setId] = useState(0);
    const navigate = useNavigate();

    const handleAlertDialogClose = () => {
        console.log("Action completed. Lists modified. Refreshing lists.");
        getLists();
      };

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
            console.log("rendering...");
              getLists();
      },[]);

    return (
        <div>
            <NavBar/>

            <Flex minWidth='max-content' alignItems='center' gap='2' p='9'>
              <Box>
                <Heading size='lg'>Your Watchlists</Heading>
              </Box>
              <Spacer />
              <ButtonGroup gap='3'>
               <CreateNewList onAlertDialogClose={handleAlertDialogClose}/>
                <Button> Find a List</Button>
              </ButtonGroup>
            </Flex>
                <SimpleGrid spacing={4} p={10} templateColumns='repeat(auto-fill, minmax(500px, 1fr))'>
                 {watchlists.slice(0).map((watchlist, index) => (
                        <div key={index}>
                             <Card>
                                 <CardHeader>
                                  <Heading size="md">
                                    {watchlists[index].listName}
                                    {watchlists[index].userId == userId && (
                                      <Badge ml="1" fontSize="0.8em" colorScheme="green">
                                        Created by You
                                      </Badge>
                                    )}
                                    {watchlists[index].isPrivate ? (
                                      <Badge ml="1" fontSize="0.8em" colorScheme="purple">
                                        Private
                                      </Badge>
                                    ) : (
                                      <Badge ml="1" fontSize="0.8em" colorScheme="yellow">
                                        Public
                                      </Badge>
                                    )}
                                  </Heading>
                                 </CardHeader>
                                 <CardBody>
                                   {
                                   watchlists[index].movies.map((movieId) => (
                                   <>
                                   <Divider orientation='horizontal' />
                                          <WatchlistMovieDetails
                                          key={movieId}
                                          movieId={movieId}
                                          listTitle={watchlists[index].listName}
                                          listId={watchlists[index].listId}
                                          onAlertDialogClose={handleAlertDialogClose}
                                          watchlists={watchlists}
                                          />
                                          </>
                                        ))
                                  }
                                 </CardBody>
                                 <CardFooter>
                                 <Spacer/>
                                 <ButtonGroup gap='2'>
                                    <ReconfigureList
                                     listTitle={watchlists[index].listName}
                                    listId={watchlists[index].listId}
                                    onAlertDialogClose={handleAlertDialogClose}
                                    />
                                    <DeleteWatchlist
                                    listTitle={watchlists[index].listName}
                                    listId={watchlists[index].listId}
                                    onAlertDialogClose={handleAlertDialogClose}
                                    />
                                    </ButtonGroup>
                                 </CardFooter>
                           </Card>
                        </div>
                            ))}
                </SimpleGrid>

            </div>
    );
}

export default MyWatchlists;