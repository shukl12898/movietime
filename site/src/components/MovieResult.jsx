import React from 'react';
import MovieDetails from '../components/MovieDetails';

const MovieResult = (props) => {
    console.log("hello");
    console.log(props);
    return (
        <>
            {props.movies.slice(0, props.numResults).map((movie, index) => (
                    <div key={index} id="movie-title">
                        <MovieDetails data = {movie} handleCast = {props.handleCast} handleGenre = {props.handleGenre}/>

                    </div>

            ))}
        </>
    );
};

export default MovieResult;