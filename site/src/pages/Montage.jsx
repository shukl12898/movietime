import React from "react";
import { useNavigate } from "react-router-dom";
import PictureMontage from '../components/PictureMontage';

// This page provides a button with a redirect to "/other"
function Montage() {
  // Calling navigate() will allow us to redirect the webpage
  const navigate = useNavigate();

  const movieImages = [
  'https://m.media-amazon.com/images/M/MV5BMzFkMWUzM2ItZWFjMi00NDY0LTk2MDMtZDhkMDE2MjRlYmZlXkEyXkFqcGdeQXVyNTAzNzgwNTg@._V1_FMjpg_UX1000_.jpg',
  'https://m.media-amazon.com/images/M/MV5BMjk3NTYyMzc4Nl5BMl5BanBnXkFtZTcwODU3ODMzMw@@._V1_.jpg',
  ]

  // Anything returned will be rendered in React
  return (
    <div>
      <div>Montage Page</div>
       <button
           onClick={() => {
             navigate("/Search");
           }}>
              Click to go to Search page
       </button>
       <button
           onClick={() => {
             navigate("/MyWatchlists");
           }}>
              Click to go to MyWatchlists page
       </button>

       <PictureMontage movieImages = {movieImages}/>

    </div>
  );
}

export default Montage;