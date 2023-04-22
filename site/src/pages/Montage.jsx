import React from "react";
import { useNavigate } from "react-router-dom";
import PictureMontage from '../components/PictureMontage';
import NavBar from '../components/NavBar';

// This page provides a button with a redirect to "/other"
function Montage() {
  // Calling navigate() will allow us to redirect the webpage
  const navigate = useNavigate();

  const movieImages = [
  'https://www.gannett-cdn.com/-mm-/3a88e5a2883dc8a0c1df935cbca0abe66c9b8f17/c=0-38-2832-1638/local/-/media/2016/01/26/USATODAY/USATODAY/635894208377967792-kung-fu-panda-3-KFP3-sq500-s75-3-f106-RGB-FIN-rgb.jpg?width=2832&height=1600&fit=crop&format=pjpg&auto=webp',
  'https://m.media-amazon.com/images/M/MV5BMjk3NTYyMzc4Nl5BMl5BanBnXkFtZTcwODU3ODMzMw@@._V1_.jpg',
  'https://lumiere-a.akamaihd.net/v1/images/p_shangchiandthelegendofthetenringshomeentupdate_22055_7b62fa67.jpeg?region=0%2C0%2C540%2C800',
  'https://www.koimoi.com/wp-content/new-galleries/2023/01/pathaan-quick-review-001.jpg',
  'https://m.media-amazon.com/images/M/MV5BNWExMzg3NjAtZmZmYy00MWE3LWJkNjEtOTYzYTZjYTZkMjZiXkEyXkFqcGdeQXVyMTA3MDk2NDg2._V1_FMjpg_UX1000_.jpg',
  'https://lumiere-a.akamaihd.net/v1/images/h_up_mobile_19753_7ebfeaa0.jpeg?region=0,0,640,480',
  'https://compote.slate.com/images/df9e3881-e04a-4470-94ad-d24c978bb11a.jpeg?crop=7500%2C5000%2Cx0%2Cy0',
  'https://cdn.vox-cdn.com/thumbor/BWdOviRGsOV68iMKQ2u_wddLjB4=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/24564655/2530_FP_00926.jpg',
  'https://lumiere-a.akamaihd.net/v1/images/pp_frozen_herobanner_mobile_20501_ae840c59.jpeg?region=0,0,1024,768',
  'https://www.movienewsletters.net/photos/331505R1.jpg'
  ]

  // Anything returned will be rendered in React
  return (

    <div>
        <NavBar/>
        <PictureMontage movieImages = {movieImages}/>
    </div>

  );
}

export default Montage;