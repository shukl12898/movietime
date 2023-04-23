import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PictureGrid from '../components/PictureGrid';
import NavBar from '../components/NavBar';

function Montage() {
  const navigate = useNavigate();
  const [images, setImages] = useState(null);

  const movieIDs = [9502, 550, 502356, 76600, 638974];
  useEffect(() => {
    fetch(`/images/${movieIDs}`)
      .then(response => {
        if(response.status === 400) {
          throw new Error(response.json());
        }
        return response.json();
      })
      .then(data => setImages(data))
      .catch(error => console.error(error));
  }, []);

  console.log(images);

  return (
    <div>
          <NavBar />
          {images && <PictureGrid movieImages = {images.montageImages} />}
        </div>
  );
}

export default Montage;
