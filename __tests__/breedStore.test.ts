import { act } from 'react-test-renderer';
import { useBreedStore } from '../src/store/breedStore';

jest.mock('react-native-config', () => ({
  API_KEY: 'test-api-key',
}));

// Variable con prefijo 'mock' que Jest permite usar en el factory
const mockLikedBreeds: string[] = [];

jest.mock('../src/utils/likeStorage', () => ({
  getLikedBreeds: jest.fn(async () => mockLikedBreeds),
  toggleLikedBreed: jest.fn(async (id: string) => {
    const index = mockLikedBreeds.indexOf(id);
    if (index > -1) {
      mockLikedBreeds.splice(index, 1);
    } else {
      mockLikedBreeds.push(id);
    }
    return [...mockLikedBreeds];
  }),
}));

const breedsMock = [
  { id: 'abys', name: 'Abyssinian', description: '', temperament: '', origin: '', life_span: '', liked: false },
  { id: 'beng', name: 'Bengal', description: '', temperament: '', origin: '', life_span: '', liked: false },
];

describe('useBreedStore', () => {
  beforeEach(() => {
    // Resetear el estado del store antes de cada test
    useBreedStore.setState({
      breeds: [],
      filteredBreeds: [],
      loading: false,
      error: null,
      searchTerm: '',
    });
    // Resetear el array de favoritos
    mockLikedBreeds.length = 0;
    jest.clearAllMocks();
  });

  it('toggleLike updates liked state', async () => {
    // Establecer el estado inicial usando setState
    useBreedStore.setState({
      breeds: breedsMock,
      filteredBreeds: breedsMock,
    });

    const store = useBreedStore.getState();

    // Verificar que inicialmente no está marcado como liked
    expect(store.filteredBreeds.find(b => b.id === 'abys')?.liked).toBe(false);

    // Toggle like
    await act(async () => {
      await store.toggleLike('abys');
    });

    // Verificar que ahora está marcado como liked
    const updatedState = useBreedStore.getState();
    expect(updatedState.filteredBreeds.find(b => b.id === 'abys')?.liked).toBe(true);
    expect(updatedState.breeds.find(b => b.id === 'abys')?.liked).toBe(true);
  });

  it('toggleLike removes like when breed is already liked', async () => {
    // Establecer estado inicial con 'abys' ya marcado como liked
    mockLikedBreeds.push('abys');
    const breedsWithLike = breedsMock.map(breed => ({
      ...breed,
      liked: breed.id === 'abys',
    }));

    useBreedStore.setState({
      breeds: breedsWithLike,
      filteredBreeds: breedsWithLike,
    });

    const store = useBreedStore.getState();

    // Verificar que inicialmente está marcado como liked
    expect(store.filteredBreeds.find(b => b.id === 'abys')?.liked).toBe(true);

    // Toggle like para quitar el like
    await act(async () => {
      await store.toggleLike('abys');
    });

    // Verificar que ahora no está marcado como liked
    const updatedState = useBreedStore.getState();
    expect(updatedState.filteredBreeds.find(b => b.id === 'abys')?.liked).toBe(false);
    expect(updatedState.breeds.find(b => b.id === 'abys')?.liked).toBe(false);
  });
});
