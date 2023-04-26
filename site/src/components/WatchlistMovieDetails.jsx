import React from "react";
import {useState, useEffect} from "react";
import '../styles/movie-details.css';
import RemoveMovie from '../components/RemoveMovie';
import CopyMovie from '../components/CopyMovie';
import MoveMovie from '../components/MoveMovie';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
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
    const [showOverlay, setShowOverlay] = useState(false);
    const [selectedMovieID, setSelectedMovieID] = useState(null);
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

    const showDetails = (movieID) => {
        setShowOverlay(true);
        setSelectedMovieID(movieID);
    }

    return (
      <div className="background">
        {
            <Box p={3} id="movie-name" onMouseEnter={showHoverControls} onMouseLeave={hideHoverControls} key={movieID} >
            <Flex>

              <div onClick={() => {
                       showDetails(movieID);
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


        {showOverlay && selectedMovieID && (

        <Modal isOpen={showOverlay} onClose={setShowOverlay} >
                    <ModalOverlay />
                        <ModalContent data-testid="overlay" id="overlay-content">
                          <ModalHeader>
                            {movieDetails.title}
                            <br />
                            <Badge>Released {movieDetails.year} </Badge >
                          </ModalHeader>
                          <ModalCloseButton data-testid="closeButton"/>
                          <ModalBody>
                            <br />
                              <Image src={movieDetails.poster} />
                            <br />
                                {movieDetails.overview}
                            <br />
                              Genres: {movieDetails.genres.map((genre) => genre).join(", ")}

                            <br />
                            <br />
                            <Accordion>
                               <AccordionItem>
                                 <h2>
                                   <AccordionButton>

                                       Cast List

                                     <AccordionIcon />
                                   </AccordionButton>
                                 </h2>
                                 <AccordionPanel maxH="200px" overflowY="scroll" id="scrollContainer">
                                    {movieDetails.cast.map((member,index) =>
                                      <li key={index} data-testid="cast">{member}</li>
                                    )}
                                 </AccordionPanel>
                               </AccordionItem>
                            </Accordion>
                            <br />
                            {movieDetails.director}
                            <br/>
                            {movieDetails.productionCompanies.map((company) => company).join(", ")}
                            <br/>
                              </ModalBody>
                              <ModalFooter>
                              </ModalFooter>
                            </ModalContent>
                     </Modal>


            )}
            </div>
    );
}
export default WatchlistMovieDetails;
