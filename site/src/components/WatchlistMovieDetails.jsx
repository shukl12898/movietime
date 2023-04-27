import React from "react";
import {useState, useEffect} from "react";
import '../styles/movie-details.css';
import RemoveMovie from '../components/RemoveMovie';
import CopyMovie from '../components/CopyMovie';
import MoveMovie from '../components/MoveMovie';

import {
  Image,
  Badge,
   Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box, Flex, Spacer, ButtonGroup
} from '@chakra-ui/react';

function WatchlistMovieDetails({ onAlertDialogClose, ...props }) {

    const [hoverControlsVisible, setHoverControlsVisible] = useState(false);

    const [movieDetails, setMovieDetails] = useState({});
    const [selectedMovieID, setSelectedMovieID] = useState(null);
    const [castIsOpen, setCastIsOpen] = useState(false);
    const movieID = props.movieId;
    const watchlists = props.watchlists;
    const listTitle = props.listTitle;
    const listId = props.listId;

    const showHoverControls = () => {
      setHoverControlsVisible(true);
    };

    const hideHoverControls = () => {
      setHoverControlsVisible(false);
    };

    useEffect(() => {
            fetch(`/movies/${movieID}`)
                .then(response => {
                    if(response.status === 400) {
                        throw new Error(response.json());
                    }
                    return response.json();
                })
                .then(data => setMovieDetails(data))
                .catch(error => console.error(error));
        }, [movieID]);

  const showDetailsToggle = (movieID) => {
    if (selectedMovieID === movieID) {
       setSelectedMovieID(null);
    } else {
       setSelectedMovieID(movieID);
    }
  };

    return (
      <div className="background">
        {
            <Box p={3} id="movie-name" onMouseEnter={showHoverControls} onMouseLeave={hideHoverControls} key={movieID} >
            <Flex>

              <div onClick={() => {
                       showDetailsToggle(movieID);
               }}>
              {movieDetails?.title || 'Loading movie details...'}
              </div>
              <Spacer/>
              {hoverControlsVisible && (
                  <ButtonGroup gap='1'
                  >
                    <CopyMovie
                    movieTitle={movieDetails.title}
                    movieId={movieID}
                    listName={listTitle}
                    listId={listId}
                    onAlertDialogClose={onAlertDialogClose}
                    watchlists={watchlists}/>
                    <MoveMovie
                    movieTitle={movieDetails.title}
                    movieId={movieID}
                    listName={listTitle}
                    listId={listId}
                    onAlertDialogClose={onAlertDialogClose}
                    watchlists={watchlists}/>

                   <RemoveMovie
                   movieTitle={movieDetails.title}
                   movieId={movieID}
                   listName={listTitle}
                   listId={listId}
                   onAlertDialogClose={onAlertDialogClose}
                   />
                  </ButtonGroup>
                )}
          </Flex>
            </Box>}


        {selectedMovieID && (
                    <Box id="overlay-content" data-testid="overlay" mt={2} padding="20px" borderWidth="1px" borderRadius="md" boxShadow="lg" width="400px">
                      <Box mb={2}>
                        <Badge>Released {movieDetails.year}</Badge>
                      </Box>
                      <Box d="flex">
                        <Image src={movieDetails.poster} mr={2} />
                        <Box>
                          <Box mb={2}>{movieDetails.overview}</Box>
                          <Box mb={2}>
                            Genres: {movieDetails.genres.map((genre) => genre).join(", ")}
                          </Box>
                          <Accordion mb={2} allowToggle>
                            <AccordionItem>
                              <h2>
                                <AccordionButton onClick={() => setCastIsOpen(!castIsOpen)}>Cast List</AccordionButton>
                              </h2>
                              <AccordionPanel maxH="200px" overflowY="scroll" isOpen={castIsOpen}>
                                {movieDetails.cast.map((member, index) => (
                                  <li key={index} data-testid="cast">
                                    {member}
                                  </li>
                                ))}
                              </AccordionPanel>
                            </AccordionItem>
                          </Accordion>
                          <Box mb={2}>{movieDetails.director}</Box>
                          <Box>{movieDetails.productionCompanies.join(", ")}</Box>
                        </Box>
                      </Box>
                </Box>
              )}
            </div>
    );
}
export default WatchlistMovieDetails;
