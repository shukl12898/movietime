import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import PictureGrid from '../components/PictureGrid';
import NavBar from '../components/NavBar';

function Montage() {
  const navigate = useNavigate();
  const [images, setImages] = useState(null);
  const location = useLocation();

  if (!location.state) {
    // handle case where location.state does not exist
    return null;
  }

  const movies = location.state;

  useEffect(() => {
      fetch(`/images/${movies.movies}`)
        .then(response => {
          if(response.status === 400) {
            throw new Error("Error fetching data");
          }
          return response.json();
        })
        .then(data => setImages(data))
        .catch(error => console.error(error));
    }, [location.state]);

  return (
    <div>
          <NavBar data-testid="navbar"/>
          {images && <PictureGrid data-testid="picture-grid" movieImages = {images.montageImages} />}
        </div>
  );
}

export default Montage;
