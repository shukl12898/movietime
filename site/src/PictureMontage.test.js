import React from 'react';
import { render } from '@testing-library/react';
import PictureMontage from './components/PictureMontage';

describe('PictureMontage', () => {
  it('renders all images', () => {
    const movieImages = ['image1.jpg', 'image2.jpg', 'image3.jpg'];
    const { getAllByAltText } = render(<PictureMontage movieImages={movieImages} />);
    const images = getAllByAltText(/Image/);
    expect(images).toHaveLength(movieImages.length);
  });
});
