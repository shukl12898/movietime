import React from 'react';
import '../styles/picture-montage.css';

const PictureMontage = ({ movieImages, className }) => {
  return (
    <div className={`montage ${className}`}>
      {movieImages.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Image ${index}`}
          style={{
            top: `calc(-50% + (${20 * (Math.random() - 0.5) * index}px))`,
            left: `calc(-50% + (${20 * (Math.random() - 0.5) * index}px))`,
            transform: `rotate(${Math.floor(Math.random() * 91) - 45}deg)`,
            position: 'absolute',
          }}
        />
      ))}
    </div>
  );
};

export default PictureMontage;
