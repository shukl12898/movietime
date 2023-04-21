import React, { useState, useEffect } from 'react';

function Backend(props) {
    const [movieDetails, setMovieDetails] = useState(null);
    const [selectedMovieID, setSelectedMovieID] = useState(null);
    const [showOverlay, setShowOverlay] = useState(false);

    useEffect(() => {
        fetch(`/movies/${props.id}`)
            .then(response => response.json())
            .then(data => setMovieDetails(data))
            .catch(error => console.error(error));
    }, [props.id]);

    console.log(movieDetails);

    if (!movieDetails) {
        return <div>Loading...</div>;
    }

    const showDetails = (movieID) => {
        setShowOverlay(true);
    }

    const hideDetails = () => {
        setShowOverlay(false);
    }

    return (
        <div>
            <div className="movie-title" key={movieDetails.id} onClick={() => showDetails(movieDetails.id)}>
                          {movieDetails.title}
            </div>
            {showOverlay && (
              <div className="overlay" onClick={hideDetails}>
                <div key={selectedMovieID}>
                  <p>Movie Details</p>
                  <p>{movieDetails.overview}</p>
                  <img src={movieDetails.poster} />
                </div>
              </div>
            )}
        </div>
    );
}

export default Backend;
