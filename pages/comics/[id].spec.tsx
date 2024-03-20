import React from 'react';
import { render, screen } from '@testing-library/react';
import ComicDetails from './[id].page';
const mockComic = {
  id: 1,
  title: 'Test Comic',
  description: 'This is a test comic.',
  thumbnail: { path: 'path/to/image', extension: 'jpg' },
  textObjects: [{ text: 'Test text' }],
  price: 9.99,
  oldPrice: 0,
  stock: 10,
  characters: {
    items: [{ name: 'Character 1', resourceURI: 'url/to/character1' }, { name: 'Character 2', resourceURI: 'url/to/character2' }]
  }
};

  test('renders component without crashing', () => {
    render(<ComicDetails comic={mockComic} />);
    expect(screen.getByText('Test Comic')).toBeInTheDocument();
    // Add additional assertions as needed
  });

  test('displays correct comic details', () => {
    render(<ComicDetails comic={mockComic} />);
    expect(screen.getByText('Test Comic')).toBeInTheDocument();
    expect(screen.getByText('This is a test comic.')).toBeInTheDocument();
    expect(screen.getByText('Test text')).toBeInTheDocument();
    expect(screen.getByText('$9.99')).toBeInTheDocument();
    // Add additional assertions as needed
  });

  test('handles buy click when comic is in stock', () => {
    // Implement a mock for handleBuyClick function
    const handleBuyClick = jest.fn();
    render(<ComicDetails comic={mockComic} />);
    const buyButton = screen.getByRole('button', { name: 'Comprar' });
    buyButton.click();
    expect(handleBuyClick).toHaveBeenCalled();
  });

  // Add more test cases as needed

