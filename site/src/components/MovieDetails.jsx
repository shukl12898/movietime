import React from "react";
import {useState, useEffect} from "react";
import '../styles/movie-details.css';

function MovieDetails(props) {

  const [movieDetails, setMovieDetails] = useState({});
  const [castDetails, setCastDetails] = useState({});
  const [showOverlay, setShowOverlay] = useState(false);
  const [movieID, setMovieID] = useState({});
  const [selectedMovieID, setSelectedMovieID] = useState(null);
  const imageURL = "https://image.tmdb.org/t/p/w500/";
  const APIkey = '?api_key=5e9de98263d160a232935f6d95ab878d';
  const movie = props.data;
  const filter = props.filter;
  const baseurl = 'https://api.themoviedb.org/3/movie/';

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

    const hideDetails = () => {
        setShowOverlay(false);
        setSelectedMovieID(null);
    }

    return (
      <div className="background">
        {movieDetails.length > 0 ? (
          movieDetails.map((movie) => (
            <div className="movie-title" key={movie.id} onClick={() => showDetails(movie.id)}>
              {movie.original_title}
            </div>
          ))
        ) : (
          <div>No movies found</div>
        )}

        {showOverlay && selectedMovieID && (
              <div className="overlay" onClick={hideDetails}>
                <div key={selectedMovieID}>
                  <p>Movie Details</p>
                  <h1>{movieDetails.filter((movie) => movie.id === selectedMovieID)[0].original_title}</h1>
                  <h2>{movieDetails.filter((movie) => movie.id === selectedMovieID)[0].release_date.substring(0, 4)}</h2>
                  <h2>{movieDetails.filter((movie) => movie.id === selectedMovieID)[0].genres && movieDetails.filter((movie) => movie.id === selectedMovieID)[0].genres.map((genre) => genre.name).join(", ")}</h2>
                  <img src={imageURL + movieDetails.filter((movie) => movie.id === selectedMovieID)[0].poster_path} />
                  {castDetails && (
                  <h2 className="scrollContainer">
                    Cast List
                    <ul className="scrollable">
                      {Array.isArray(castDetails) && castDetails.find((cast) => cast.id === selectedMovieID) && castDetails.find((cast) => cast.id === selectedMovieID).cast.map((member,index) =>
                        <li key={index}>{member.name}</li>
                      )}
                      {!Array.isArray(castDetails) && castDetails.cast.map((member,index) =>
                        <li key={index}>{member.name}</li>
                      )}
                    </ul>
                  </h2>
                  )}
                  <h3 className="afterScroll">
                  {Array.isArray(castDetails) && castDetails.find((cast) => cast.id === selectedMovieID) && castDetails.find((cast) => cast.id === selectedMovieID).crew.find((member) => member.job === "Director").name}
                  {!Array.isArray(castDetails) && castDetails.crew.find((member)=>member.job === "Director").name}
                  </h3>
                  <h4>{movieDetails.filter((movie) => movie.id === selectedMovieID)[0].production_companies.map((company) => company.name).join(", ")}</h4>
                  <p>{movieDetails.filter((movie) => movie.id === selectedMovieID)[0].overview}</p>
                </div>
              </div>
            )}
          </div>
    );
}
export default MovieDetails
