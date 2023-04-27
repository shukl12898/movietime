import React from 'react';
import { render } from '@testing-library/react';
import PictureGrid from './components/PictureGrid';

describe('PictureGrid component', () => {
  it('renders without crashing', () => {
    render(<PictureGrid movieImages={[]} />);
  });

  it('sorts the images randomly', () => {
    const movieImages = [
      { id: 1, imagePath: 'image1.jpg' },
      { id: 2, imagePath: 'image2.jpg' },
      { id: 3, imagePath: 'image3.jpg' },
    ];

    const { getAllByRole } = render(<PictureGrid movieImages={movieImages} />);
    const imagePaths = getAllByRole('img').map((img) => img.src);

    expect(imagePaths).not.toEqual(movieImages.map((img) => img.imagePath));
  });

});
