import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";

function Suggestions() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const APIkey = '?api_key=7ed8d4771870299ac266b6147ba2fa76';
 //   const baseImageUrl = "https://image.tmdb.org/t/p/w500";
    const {num} = useParams();
    const numMovies = parseInt(num);


    useEffect(() => {
        setLoading(true);
        setError(false);
        fetch(`https://api.themoviedb.org/3/discover/movie${APIkey}&with_genres=28`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setMovies(data.results);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching movies:', error);
                setError(true);
                setLoading(false);
            });
    }, []);



    return (
        <div>
          {loading && <div>Loading...</div>}
          {error && <div>These are the 0 movies that we suggest!</div>}
          {!loading && !error && (

            <div>
                These are the {num} movies that we suggest!
            </div>
          )}

          {movies.slice(0, numMovies).map((movie) => (
                <div key={movie.id}>
                  <h2>{movie.title}</h2>
                  <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
                  <p>{movie.overview}</p>
                </div>
          ))}
        </div>
    );
}

export default Suggestions;
