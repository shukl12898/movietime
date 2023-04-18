import React from "react";
import {useState, useEffect} from "react";
import '../styles/movie-details.css';

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
  const [castDetails, setCastDetails] = useState({});
  const [showOverlay, setShowOverlay] = useState(false);
  const [movieID, setMovieID] = useState({});
  const [selectedMovieID, setSelectedMovieID] = useState(null);
  const imageURL = "https://image.tmdb.org/t/p/w500/";
  const APIkey = '?api_key=';
  const movie = props.data;
  const filter = props.filter;
  const baseurl = 'https://api.themoviedb.org/3/movie/';
  const [keyVal, setKeyVal] = useState("");

useEffect(() => {
    fetchAPIKey();
  }, []);

    useEffect(() => {
      if (filter === "movie") {
        setMovieID(movie.id);
      } else if (filter === "keyword") {
          setMovieID(movie.id);
      } else if (filter === "person") {
        if (movie.known_for.length > 0) {
          const knownForIDs = movie.known_for.map((movie)=>movie.id);
          setMovieID(knownForIDs);
        }
      }
    }, [filter, movie]);

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
            const casturl = baseurl + id + '/credits' + APIkey + keyVal;
            return fetch(casturl).then((response) => response.json());
        });

        Promise.all(promises)
        .then((data) => setCastDetails(data))
        .catch((error) => console.log(error));
        } else if (movieID) {
            const casturl = baseurl + movieID + '/credits' + APIkey + keyVal;
            fetch(casturl)
            .then((response) => response.json())
            .then((data) => setCastDetails(data))
            .catch((error) => console.log(error));
        }
    }, [movieID]);

        console.log(castDetails);


    const showDetails = (movieID) => {
        setShowOverlay(true);
        setSelectedMovieID(movieID);
    }

    const fetchAPIKey = () => {
    fetch("/api/getKey", {
                  method: "GET",
                  headers: {
                    Accept: "application/json"
                  }
                })
              .then((res) => res.json())
              .then((response) => {
                console.log("API Responded With: ");
                console.log(response);
                setKeyVal(response.getKey);
              })
              .catch((error) => {
                console.log(error);
              });
    }

    return (
      <div className="background">
        {movieDetails.length > 0 ? (
          movieDetails.map((movie) => (
            <div className="movie-title"  data-testid="movie-title" key={movie.id} onClick={() => {
            showDetails(movie.id) }}
            ><Box p={3}>
              {movie.original_title}
            </Box>
            </div>
          ))
        ) : (
          <div>No movies found</div>
        )}

        {showOverlay && selectedMovieID && (

        <Modal isOpen={showOverlay} onClose={setShowOverlay} >
            <ModalOverlay />
                <ModalContent data-testid="overlay">
                  <ModalHeader>
                    {movieDetails.filter((movie) => movie.id === selectedMovieID)[0].original_title}
                    <br />
                    <Badge>Released {movieDetails.filter((movie) =>
                     movie.id === selectedMovieID)[0].release_date.toString().substring(0, 4)} </Badge >
                  </ModalHeader>
                  <ModalCloseButton data-testid="closeButton"/>
                  <ModalBody>
                    <br />
                      <Image src={imageURL + movieDetails.filter((movie) => movie.id === selectedMovieID)[0].poster_path} />
                    <br />
                        {movieDetails.filter((movie) => movie.id === selectedMovieID)[0].overview}
                    <br />
                      Genres:
                                          {movieDetails.filter((movie) => movie.id === selectedMovieID)[0].genres && movieDetails.filter((movie) => movie.id === selectedMovieID)[0].genres.map((genre) => genre.name).join(", ")}

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
                         <AccordionPanel >
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
                  {movieDetails.filter((movie) => movie.id === selectedMovieID)[0].production_companies.map((company) => company.name).join(", ")}

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
