import React from 'react';

const PictureMontage = ({ movieImages }) => {
  return (
    <div className="montage">
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
            width: '500px',
            height: '400px',
          }}
        />
      ))}
    </div>
  );
};

export default PictureMontage;
