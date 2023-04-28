import React from 'react';
import MovieDetails from '../components/MovieDetails';

const SuggestionResult = (props) => {
    console.log(props.movies);
    return (
        <>
            {props.movies.slice(0, props.numResults).map((movie, index) => (

                <div key={index} >

                    <MovieDetails data = {movie.id}/>
                </div>
            ))}
        </>
    );
};

export default SuggestionResult;