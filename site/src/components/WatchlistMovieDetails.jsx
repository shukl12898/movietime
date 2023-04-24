import React from "react";
import {useState, useEffect} from "react";
import '../styles/movie-details.css';
import HoverButtons from '../components/HoverButtons';
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
    Box,Button, Flex, Spacer, ButtonGroup
} from '@chakra-ui/react';

function WatchlistMovieDetails({ onAlertDialogClose, ...props }) {

    const [hoverControlsVisible, setHoverControlsVisible] = useState(false);

   const [movieDetails, setMovieDetails] = useState({});
    const [isHovering, setIsHovering] = useState(false);
    const [castDetails, setCastDetails] = useState({});
    const [showOverlay, setShowOverlay] = useState(false);
    const imageURL = "https://image.tmdb.org/t/p/w500/";
    const APIkey = '?api_key=5e9de98263d160a232935f6d95ab878d';
    const movieId = props.movieId;
    const watchlists = props.watchlists;
    const baseurl = 'https://api.themoviedb.org/3/movie/';
    const listTitle = props.listTitle;
    const listId = props.listId;

    const showHoverControls = () => {
      setHoverControlsVisible(true);
    };

    const hideHoverControls = () => {
      setHoverControlsVisible(false);
    };

    useEffect(() => {
      const fullurl = baseurl + movieId + APIkey;
      fetch(fullurl)
        .then((response) => response.json())
        .then((data) => setMovieDetails(data))
        .catch((error) => console.log(error));
    }, [movieId]);

    useEffect(() => {
      const casturl = baseurl + movieId + '/credits' + APIkey;
      fetch(casturl)
        .then((response) => response.json())
        .then((data) => {
         if (data) {
                //setMovieDetails(data);
                console.log(data);
              } else {
                console.log("API returned null data");
              }
        })
        .catch((error) => console.log(error));
    }, [movieId]);

    const showDetails = (movieID) => {
        setShowOverlay(true);
    }

    const handleMouseEnter = () => {
        setIsHovering(true);
    };

      const handleMouseLeave = () => {
        setIsHovering(false);
    };

    return (
      <div className="background">
        {
            <Box p={3} id="movie-name" onMouseEnter={showHoverControls} onMouseLeave={hideHoverControls} key={movieId} >
            <Flex>

              <div onClick={() => {
                       showDetails(movieId);
               }}>
              {movieDetails?.original_title || 'Loading movie details...'}
              </div>
              <Spacer/>
              {hoverControlsVisible && (
                  <ButtonGroup gap='1'
                  >
                    <CopyMovie
                    movieTitle={movieDetails.original_title}
                    movieId={movieId}
                    listName={listTitle}
                    listId={listId}
                    onAlertDialogClose={onAlertDialogClose}
                    watchlists={watchlists}/>
                    <MoveMovie
                    movieTitle={movieDetails.original_title}
                    movieId={movieId}
                    listName={listTitle}
                    listId={listId}
                    onAlertDialogClose={onAlertDialogClose}
                    watchlists={watchlists}/>

                   <RemoveMovie
                   movieTitle={movieDetails.original_title}
                   movieId={movieId}
                   listName={listTitle}
                   listId={listId}
                   onAlertDialogClose={onAlertDialogClose}
                   />
                  </ButtonGroup>
                )}
          </Flex>
            </Box>}


        {showOverlay && (

        <Modal isOpen={showOverlay} onClose={setShowOverlay} >
            <ModalOverlay />
                <ModalContent data-testid="overlay" id="overlay-content">
                  <ModalHeader>
                    {movieDetails.original_title}
                    <br />
                    <Badge>Released {movieDetails.release_date.toString().substring(0, 4)} </Badge >
                  </ModalHeader>
                  <ModalCloseButton data-testid="closeButton"/>
                  <ModalBody>
                    <br />
                      <Image src={imageURL + movieId.poster_path} />
                    <br />
                        {movieDetails.overview}
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

                         </AccordionPanel>
                       </AccordionItem>

                    </Accordion>
                    <br />
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
