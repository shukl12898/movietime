import React from "react";
import { useNavigate } from "react-router-dom";
import PictureMontage from '../components/PictureMontage';

// This page provides a button with a redirect to "/other"
function Montage() {
  // Calling navigate() will allow us to redirect the webpage
  const navigate = useNavigate();

  const movieImages = [
  'https://www.gannett-cdn.com/-mm-/3a88e5a2883dc8a0c1df935cbca0abe66c9b8f17/c=0-38-2832-1638/local/-/media/2016/01/26/USATODAY/USATODAY/635894208377967792-kung-fu-panda-3-KFP3-sq500-s75-3-f106-RGB-FIN-rgb.jpg?width=2832&height=1600&fit=crop&format=pjpg&auto=webp',
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