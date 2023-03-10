import React from "react";
import {useState, useEffect} from "react";
import '../styles/movie-details.css';

function MovieDetails(props) {

  const [movieDetails, setMovieDetails] = useState({});
  const [castDetails, setCastDetails] = useState({});
  const [showOverlay, setShowOverlay] = useState(false);
  const [movieID, setMovieID] = useState(null);
  const imageURL = "https://image.tmdb.org/t/p/w500/";
  const APIkey = '?api_key=5e9de98263d160a232935f6d95ab878d';
  const movie = props.data;
  const filter = props.filter;
  const baseurl = 'https://api.themoviedb.org/3/movie/';

    console.log(movie);

    useEffect(() => {
      if (filter === "movie") {
        setMovieID(movie.id);
      } else if (filter === "keyword") {
          setMovieID(movie.id);
      } else if (filter === "person") {
        if (movie.known_for.length > 0) {
          setMovieID(movie.known_for[0].id);
        }
      }
    }, [filter, movie]);

  console.log(movieID);

    useEffect(() => {
    if (movieID){
    const fullurl = baseurl + movieID + APIkey;
    console.log(fullurl);
        fetch(fullurl)
              .then(response => response.json())
              .then(data => setMovieDetails(data))
              .catch(error => console.log(error));
              }
    }, [movieID]);

    useEffect(() => {
    if (movieID){
    const casturl = baseurl + movieID + '/credits' + APIkey;
            fetch(casturl)
                  .then(response => response.json())
                  .then(data => setCastDetails(data))
                  .catch(error => console.log(error));
                  }
        }, [movieID]);

    const showDetails = () => {
        setShowOverlay(true);
    }

    const hideDetails = () => {
        setShowOverlay(false);
    }
    return (
       <div className="background">
             {movieDetails ? (
                <div className="movie-title" onClick = {showDetails}>
                    {movieDetails.original_title}
                </div>
             ) : (
                <div> Details here... </div>
             )}

             {showOverlay && movieDetails && (
                <div className="overlay" onClick = {hideDetails}>
                      <p>Movie Details</p>
                      <h1>{movieDetails.original_title}</h1>
                      <h2>{movieDetails.release_date.substring(0,4)}</h2>
                      <h2>{movieDetails.genres && movieDetails.genres.map(genre => genre.name).join(', ')}</h2>
                      <img src={imageURL + movieDetails.poster_path}/>
                      <ul>{castDetails.cast && castDetails.cast.map((member,index)=>(
                            <li key ={index}>{member.name}</li>
                      ))}</ul>
                      <h3>{castDetails.crew.find(member=> member.job == 'Director').name}</h3>
                      <h4>{movieDetails.production_companies.map(company => company.name).join(', ')}</h4>
                      <p>{movieDetails.overview}</p>
                </div>
             )}
       </div>
      );

}
export default MovieDetails
