import React from 'react';
import MovieDetails from '../components/MovieDetails'

const MovieResult = (props) =>{
    return(
        <>
            {props.movies.slice(0,props.numResults).map((movie,index) => <div key = "0">
                <MovieDetails data = {movie} filter = {props.filter}/>
            </div>)}
        </>
    )
}

export default MovieResult;