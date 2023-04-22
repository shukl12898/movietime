import React from 'react';
import MovieDetails from '../components/MovieDetails';

const MovieResult = (props) => {
    return (
        <>
            {props.movies.slice(0, props.numResults).map((movie, index) => (

                    <div key={index} id="movie-title">


                          <MovieDetails data = {movie.id} filter = {props.filter}/>


                    </div>

            ))}
        </>
    );
};

export default MovieResult;