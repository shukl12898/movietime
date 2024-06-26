import React, { useState, useEffect } from "react";
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
import SuggestionButton from '../components/SuggestionButton';
import CompareWatchlist from "../components/CompareWatchlist";

function MyWatchlists({selectedMovies, setSelectedMovies}) {

    const [watchlists, assignLists] = useState([]);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [userId,setId] = useState(0);
    const navigate = useNavigate();
    const [showSuggestionStuff, setShowSuggestionStuff] = useState(false);

    const handleSuggestionClick = () => {
         setShowSuggestionStuff(!showSuggestionStuff);
     };

    const handleCreateMontage = (selectedId) => {
      const selectedWatchlist = watchlists.find(list => list.listId === selectedId);
      if (!selectedWatchlist || selectedWatchlist.movies.length === 0) {
        alert('Selected watchlist has no movies!');
        return;
      }
      navigate("/Montage", { state: { movies: selectedWatchlist.movies } });
      console.log('Creating montage.');
    }

    const handleAlertDialogClose = () => {
        console.log("Action completed. Lists modified. Refreshing lists.");
        getLists();
      };

    const handleRadioChange = (movieId, isSelected) => {
      if (isSelected) {
        setSelectedMovies((prevState) => [...prevState, movieId]);
      } else {
        setSelectedMovies((prevState) =>
          prevState.filter((id) => id !== movieId)
        );
      }
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


            <Flex minWidth='max-content' alignItems='center' gap='2' p='9'>
              <Box>
                <Heading size='lg'>Your Watchlists</Heading>
              </Box>
              <Spacer />
              <ButtonGroup gap='2'>
               <Button onClick = {handleSuggestionClick} > Get Suggestions </Button>
               <CreateNewList onAlertDialogClose={handleAlertDialogClose}/>
              </ButtonGroup>
            </Flex>
            <Flex justifyContent="center" alignItems="center" flexDirection="row">
                                {showSuggestionStuff && (
                                    <SuggestionButton containsSomething = {selectedMovies.length}/>
                                    )}
                            </Flex>
                <SimpleGrid spacing={4} p={10} templateColumns='repeat(auto-fill, minmax(500px, 1fr))'>
                 {watchlists.slice(0).map((watchlist, index) => (
                        <div key={index}>
                             <Card>
                                 <CardHeader>
                                  <Heading size="md">
                                    {watchlists[index].listName}
                                    {watchlists[index].private ? (
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
                                          onRadioChange={handleRadioChange}
                                          showRadio = {showSuggestionStuff}
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

                                    <Button onClick={() => handleCreateMontage(watchlists[index].listId)}>
                                        Create Montage
                                    </Button>
                                    {!watchlists[index].private && <CompareWatchlist
                                        listId = {watchlists[index].listId}
                                        isPrivate = {watchlists[index].isPrivate}
                                        getLists={getLists}/>}

                                     <DeleteWatchlist
                                        listTitle={watchlists[index].listName}
                                        listId={watchlists[index].listId}
                                        onAlertDialogClose={handleAlertDialogClose}/>
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