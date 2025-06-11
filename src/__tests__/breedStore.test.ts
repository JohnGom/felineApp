import { act } from 'react-test-renderer';
import { useBreedStore } from '../store/breedStore';

jest.mock('../utils/likeStorage', () => ({
  getLikedBreeds: jest.fn().mockResolvedValue(['abys']),
  toggleLikedBreed: jest.fn().mockResolvedValue(['abys']),
}));

const breedsMock = [
  { id: 'abys', name: 'Abyssinian', description: '', temperament: '', origin: '', life_span: '', liked: false },
  { id: 'beng', name: 'Bengal', description: '', temperament: '', origin: '', life_span: '', liked: false },
];

describe('useBreedStore', () => {

  it('toggleLike updates liked state', async () => {
    const store = useBreedStore.getState();
    act(() => {
      store.breeds = breedsMock;
      store.filteredBreeds = breedsMock;
    });
    await act(async () => {
      await store.toggleLike('abys');
    });
    expect(store.filteredBreeds.find(b => b.id === 'abys')?.liked).toBe(true);
  });
});
