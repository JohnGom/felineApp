import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

// Mock de react-native-config (debe estar antes de cualquier import que lo use)
jest.mock('react-native-config', () => ({
  API_KEY: 'test-api-key',
}));

// Mock de lucide-react-native
jest.mock('lucide-react-native', () => ({
  Heart: ({ fill, testID }: any) => {
    const MockHeart = require('react-native').Text;
    return <MockHeart testID={testID || 'heart-icon'}>{fill ? '❤️' : '🤍'}</MockHeart>;
  },
}));

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

// Mock de Zustand store - debe funcionar con selectores
jest.mock('../src/store/breedStore', () => ({
  useBreedStore: jest.fn((selector?: (state: any) => any) => {
    const mockState = {
      toggleLike: mockToggleLike,
    };
    // Si se pasa un selector, lo ejecutamos; si no, retornamos el estado completo
    return selector ? selector(mockState) : mockState;
  }),
}));

import BreedItem from '../src/ui/components/BreedItem';

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

describe('BreedItem', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders breed info', () => {
    const { getByText } = render(<BreedItem item={breed} />);
    expect(getByText('Abyssinian')).toBeTruthy();
    expect(getByText('Origin: Egypt')).toBeTruthy();
    expect(getByText('Life Span: 14 - 15 Years')).toBeTruthy();
  });

  it('calls toggleLike when heart is pressed', () => {
    const { getByTestId } = render(<BreedItem item={breed} />);
    const heart = getByTestId('heart-icon');
    fireEvent.press(heart);
    expect(mockToggleLike).toHaveBeenCalledWith('abys');
  });

  it('shows filled heart when breed is liked', () => {
    const likedBreed = { ...breed, liked: true };
    const { getByText } = render(<BreedItem item={likedBreed} />);
    expect(getByText('❤️')).toBeTruthy();
  });

  it('shows empty heart when breed is not liked', () => {
    const { getByText } = render(<BreedItem item={breed} />);
    expect(getByText('🤍')).toBeTruthy();
  });
});
