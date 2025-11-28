/**
 * @format
 */

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';

// Mock de react-native-config (debe estar antes de cualquier import que lo use)
jest.mock('react-native-config', () => ({
  API_KEY: 'test-api-key',
}));

// Mock de react-native-splash-screen
jest.mock('react-native-splash-screen', () => ({
  hide: jest.fn(),
  show: jest.fn(),
}));

// Mock de lucide-react-native
jest.mock('lucide-react-native', () => ({
  Heart: ({ fill, testID }: any) => {
    const MockHeart = require('react-native').Text;
    return <MockHeart testID={testID || 'heart-icon'}>{fill ? '❤️' : '🤍'}</MockHeart>;
  },
  Expand: ({ testID }: any) => {
    const MockExpand = require('react-native').Text;
    return <MockExpand testID={testID || 'expand-icon'}>🔍</MockExpand>;
  },
}));

// Mock de AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

// Mock de Zustand store
const mockToggleLike = jest.fn();
const mockFetchBreeds = jest.fn();

jest.mock('../src/store/breedStore', () => ({
  useBreedStore: jest.fn((selector?: (state: any) => any) => {
    const mockState = {
      breeds: [],
      filteredBreeds: [],
      loading: false,
      error: null,
      searchTerm: '',
      searchBreeds: jest.fn(),
      fetchBreeds: mockFetchBreeds,
      toggleLike: mockToggleLike,
      loadLikes: jest.fn(),
    };
    return selector ? selector(mockState) : mockState;
  }),
}));

// Mock de los componentes de pantalla
jest.mock('../src/ui/screens/BreedList', () => ({
  BreedList: () => {
    const { View, Text } = require('react-native');
    return (
      <View testID="breed-list">
        <Text>BreedList</Text>
      </View>
    );
  },
}));

jest.mock('../src/ui/screens/BreedDetail', () => ({
  BreedDetail: () => {
    const { View, Text } = require('react-native');
    return (
      <View testID="breed-detail">
        <Text>BreedDetail</Text>
      </View>
    );
  },
}));

// Mock de React Navigation
jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    NavigationContainer: ({ children }: any) => children,
    useNavigation: () => ({
      navigate: jest.fn(),
      goBack: jest.fn(),
    }),
  };
});

jest.mock('@react-navigation/native-stack', () => {
  const actualStack = jest.requireActual('@react-navigation/native-stack');
  return {
    ...actualStack,
    createNativeStackNavigator: () => ({
      Navigator: ({ children }: any) => children,
      Screen: ({ component: Component, ...props }: any) => <Component {...props} />,
    }),
  };
});

import App from '../App';

test('renders correctly', async () => {
  await ReactTestRenderer.act(() => {
    ReactTestRenderer.create(<App />);
  });
});
