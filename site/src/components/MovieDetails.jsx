import React from "react";
import {useState, useEffect} from "react";
import '../styles/movie-details.css';
import HoverButtons from '../components/HoverButtons';

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
    Box,
} from '@chakra-ui/react';

function MovieDetails(props) {

  const [movieDetails, setMovieDetails] = useState(null);
  const [isHovering, setIsHovering] = useState(false);
  const [castDetails, setCastDetails] = useState({});
  const [showOverlay, setShowOverlay] = useState(false);
  const [movieID, setMovieID] = useState({});
  const [selectedMovieID, setSelectedMovieID] = useState(null);
  const movie = props.data;
  const filter = props.filter;

    useEffect(() => {
        setMovieID(movie.id);
    }, [movie]);

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

    const handleMouseEnter = () => {
        setIsHovering(true);
      };

      const handleMouseLeave = () => {
        setIsHovering(false);
      };

    if (!movieDetails) {
            return <div>Loading...</div>;
    }

    return (
        <div className="background">
            {movieDetails.title ?
              <Box
                p={3}
                id="movie-name"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                key={movie.id}
              >
                <div
                  className="movie-title"
                  data-testid="movie-title"
                  onClick={() => {
                    showDetails(movie.id);
                  }}
                >
                  {movieDetails.title}
                </div>
                {isHovering && <HoverButtons className="hover" />}
              </Box>
              :
              <div>Loading...</div>
            }

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
export default MovieDetails
