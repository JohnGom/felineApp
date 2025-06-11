import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import BreedItem from '../ui/components/BreedItem';
import { useBreedStore } from '../store/breedStore';


const breed = {
  id: 'abys',
  name: 'Abyssinian',
  description: 'Active, Energetic, Independent, Intelligent, Gentle',
  temperament: 'Active, Energetic, Independent, Intelligent, Gentle',
  origin: 'Egypt',
  life_span: '14 - 15',
  imageUrl: 'https://cdn2.thecatapi.com/images/0XYvRd7oD.jpg',
  liked: false,
};

jest.mock('../store/breedStore');

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

const mockToggleLike = jest.fn();

const mockSetBreed = jest.fn();
(useBreedStore as jest.Mock).mockReturnValue({
  toggleLike: mockToggleLike,
});

describe('BreedItem', () => {
  beforeEach(() => {
    mockSetBreed.mockClear();
  });

  it('renders breed info', () => {
    const { getByText } = render(<BreedItem item={breed} />);
    expect(getByText('Abyssinian')).toBeTruthy();
    expect(getByText('Origin: Egypt')).toBeTruthy();
    expect(getByText('Temperament: Active, Energetic, Independent, Intelligent, Gentle')).toBeTruthy();
  });

  /* it('calls toggleLike when heart is pressed', () => {
    const { getByText } = render(<BreedItem item={breed} />);
    const heart = getByText('🤍');
    fireEvent.press(heart);
    expect(mockToggleLike).toHaveBeenCalledWith('abys');
  }); */
});
