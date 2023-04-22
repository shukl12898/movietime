import React from 'react';

const PictureMontage = ({ movieImages }) => {
  return (
    <div className="montage" style={{ position: 'relative', width: '500px', height: '400px' }}>
      {movieImages.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Image ${index}`}
          style={{
            top: `${20 * (Math.random() - 0.5) * index}px`,
            left: `${20 * (Math.random() - 0.5) * index}px`,
            transform: `rotate(${Math.floor(Math.random() * 91) - 45}deg)`,
            position: 'absolute',
            width: '100%',
            height: '100%',
          }}
        />
      ))}
    </div>
  );
};

export default PictureMontage;
