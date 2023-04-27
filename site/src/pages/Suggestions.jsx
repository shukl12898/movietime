import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SuggestionResult from "../components/SuggestionResult";
import SuggestionCreateNewList from "../components/SuggestionCreateNewList"
import { Box, Flex, Text} from "@chakra-ui/react";

function Suggestions({ selectedMovies }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const APIkey = "?api_key=7ed8d4771870299ac266b6147ba2fa76";
  const { num } = useParams();
  const numMovies = parseInt(num);

  useEffect(() => {
    setLoading(true);
    setError(false);

        const fetchMovies = async () => {
          try {
            const suggestedMoviesResponse = await fetch(
              `/api/suggestions/${selectedMovies[0]}`
            );
            const suggestedMoviesData = await suggestedMoviesResponse.json();

            const filteredMovies = suggestedMoviesData.results.filter(
              (movie) => !selectedMovies.includes(movie.id)
            );
            // Fisher-Yates shuffle algorithm
            const shuffleArray = (array) => {
              for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
              }
            };
            shuffleArray(filteredMovies);
            setMovies(filteredMovies);
            setLoading(false);
          } catch (error) {
            console.error("Error fetching movies:", error);
            setError(true);
            setLoading(false);
          }
        };

        if (selectedMovies.length > 0) {
          fetchMovies();
        } else {
          setLoading(false);
        }
      }, [selectedMovies]);


  return (
    <div>

       <Flex justifyContent="center" alignItems="center" flexDirection="column">
          {loading && <div>Loading...</div>}
          {error && <div>These are the 0 movies that we suggest!</div>}
          {!loading && !error && (
            <Text color = "green.500">
              These are the {num} movies that we suggest!
            </Text>
          )}

             <SuggestionResult
               movies={movies}
               numResults={numMovies}
             />

           <Box>
                <SuggestionCreateNewList movies = {movies} numResults ={numMovies}/>
           </Box>
        </Flex>

    </div>

  );
}

export default Suggestions;

