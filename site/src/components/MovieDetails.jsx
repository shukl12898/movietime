import React, { useState, useEffect } from "react";
import "../styles/movie-details.css";
import HoverButtons from "../components/HoverButtons";
import {
  Box,
  Badge,
  Image,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
} from "@chakra-ui/react";

function MovieDetails(props) {
  const [movieDetails, setMovieDetails] = useState(null);
  const [isHovering, setIsHovering] = useState(false);
  const [selectedMovieID, setSelectedMovieID] = useState(null);
  const [castIsOpen, setCastIsOpen] = useState(false);

  const movieID = props.data;

  const handleCast = (newQuery) =>{
    props.handleCast(newQuery);
    setSelectedMovieID(null);
  }

  // const handleGenre = (newQuery) => {
  //   props.handleGenre(newQuery);
  //   setSelectedMovieID(null);
  // }

  useEffect(() => {
    fetch(`/movies/${movieID}`)
      .then((response) => {
        if (response.status === 400) {
          throw new Error(response.json());
        }
        return response.json();
      })
      .then((data) => setMovieDetails(data))
      .catch((error) => console.error(error));
  }, [movieID]);

  const showDetailsToggle = (movieID) => {
    if (selectedMovieID === movieID) {
       setSelectedMovieID(null);
    } else {
       setSelectedMovieID(movieID);
    }
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  if (!movieDetails) {
    return <div>Loading...</div>;
  }

  console.log("Movie Details are: " + movieDetails);

  return (
    <Box className="background">
      {movieDetails.title && (
        <Box
          p={3}
          id="movie-name"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          key={movieID}
          position="relative"
          zIndex="1"
        >
          <div
            className="movie-title"
            data-testid="movie-title"
            onClick={() => {
              showDetailsToggle(movieID);
            }}
          >
            {movieDetails.title}
          </div>
          {isHovering && <HoverButtons movieDetails={movieDetails} className="hover" />}
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
                        <AccordionButton data-testid="castButton" onClick={() => setCastIsOpen(!castIsOpen)}>Cast List</AccordionButton>
                      </h2>
                      <AccordionPanel maxH="200px" data-testid="castList" overflowY="scroll" isOpen={castIsOpen}>
                        {movieDetails.cast.map((member, index) => (
                          <li key={index} data-testid="cast" onClick={() => handleCast(member)}>
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
        </Box>
      )}
    </Box>
  );
}

export default MovieDetails;
