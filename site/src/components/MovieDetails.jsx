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

  const [movieDetails, setMovieDetails] = useState({});
  const [isHovering, setIsHovering] = useState(false);
  const [castDetails, setCastDetails] = useState({});
  const [showOverlay, setShowOverlay] = useState(false);
  const [movieID, setMovieID] = useState({});
  const [selectedMovieID, setSelectedMovieID] = useState(null);
  const imageURL = "https://image.tmdb.org/t/p/w500/";
  const APIkey = '?api_key=5e9de98263d160a232935f6d95ab878d';
  const movieId = props.data;
  const filter = props.filter;
  const baseurl = 'https://api.themoviedb.org/3/movie/';

    useEffect(() => {
      if (filter === "movie") {
        setMovieID(movieId);
      } else if (filter === "keyword") {
          setMovieID(movieId);
      } else if (filter === "person") {
//         if (movie.known_for.length > 0) {
//           const knownForIDs = movie.known_for.map((movie)=>movieId);
//           setMovieID(knownForIDs);
//         }
      }
    }, [filter, movieId]);

    useEffect(() => {
      if (Array.isArray(movieID)) {
        const promises = movieID.map((id) => {
          const fullurl = baseurl + id + APIkey;
          return fetch(fullurl).then((response) => response.json());
        });

        Promise.all(promises)
          .then((data) => setMovieDetails(data))
          .catch((error) => console.log(error));
      } else if (movieID) {
        const fullurl = baseurl + movieID + APIkey;
        fetch(fullurl)
          .then((response) => response.json())
          .then((data) => setMovieDetails([data]))
          .catch((error) => console.log(error));
      }
    }, [movieID]);

    useEffect(() => {
        if (Array.isArray(movieID)) {
            const promises = movieID.map((id) => {
            const casturl = baseurl + id + '/credits' + APIkey;
            return fetch(casturl).then((response) => response.json());
        });

        Promise.all(promises)
        .then((data) => setCastDetails(data))
        .catch((error) => console.log(error));
        } else if (movieID) {
            const casturl = baseurl + movieID + '/credits' + APIkey;
            fetch(casturl)
            .then((response) => response.json())
            .then((data) => setCastDetails(data))
            .catch((error) => console.log(error));
        }
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

    return (
      <div className="background">
        {movieDetails.length > 0 ? (
          movieDetails.map((movie) => (
            <Box p={3} id="movie-name" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} key={movieId} >
            <div className="movie-title"  data-testid="movie-title" onClick={() => {
                                showDetails(movieId);
                        }}
                        >
              {movie.original_title}
                          </div>
              {isHovering && (
               <HoverButtons movieTitle={movie.original_title} movieId={movieId}/>
              )}
            </Box>
          ))
        ) : (
          <div>No movies found</div>
        )}

        {showOverlay && selectedMovieID && (

        <Modal isOpen={showOverlay} onClose={setShowOverlay} >
            <ModalOverlay />
                <ModalContent data-testid="overlay" id="overlay-content">
                  <ModalHeader>
                    {movieDetails.filter((movie) => movieId === selectedMovieID)[0].original_title}
                    <br />
                    <Badge>Released {movieDetails.filter((movie) =>
                     movieId === selectedMovieID)[0].release_date.toString().substring(0, 4)} </Badge >
                  </ModalHeader>
                  <ModalCloseButton data-testid="closeButton"/>
                  <ModalBody>
                    <br />
                      <Image src={imageURL + movieDetails.filter((movie) => movieId === selectedMovieID)[0].poster_path} />
                    <br />
                        {movieDetails.filter((movie) => movieId === selectedMovieID)[0].overview}
                    <br />
                      Genres:
                                          {movieDetails.filter((movie) => movieId === selectedMovieID)[0].genres && movieDetails.filter((movie) => movie.id === selectedMovieID)[0].genres.map((genre) => genre.name).join(", ")}

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
                           {Array.isArray(castDetails) && castDetails.find((cast) => cast.id === selectedMovieID) && castDetails.find((cast) => cast.id === selectedMovieID).cast.map((member,index) =>
                              <li key={index}>{member.name}</li>
                            )}
                            {!Array.isArray(castDetails) && castDetails.cast.map((member,index) =>
                              <li key={index} data-testid="cast">{member.name}</li>
                            )}
                         </AccordionPanel>
                       </AccordionItem>

                    </Accordion>
                    <br />

                 {Array.isArray(castDetails) && castDetails.find((cast) => cast.id === selectedMovieID) && castDetails.find((cast) => cast.id === selectedMovieID).crew.find((member) => member.job === "Director").name}
                  {!Array.isArray(castDetails) && castDetails.crew.find((member)=>member.job === "Director").name}
                  {movieDetails.filter((movie) => movieId === selectedMovieID)[0].production_companies.map((company) => company.name).join(", ")}

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
