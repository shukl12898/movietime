import React from 'react';
import '../styles/picture-montage.css';

const PictureMontage = ({ movieImages }) => {
  // Anything returned will be rendered in React
  return (
    <div className="montage">
      {movieImages.map((image, index) => (
        <img key={index} src={image} alt={`Image ${index}`} />
      ))}
    </div>
  );
}

export default PictureMontage;
