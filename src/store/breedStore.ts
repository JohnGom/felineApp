import { create } from 'zustand';
import { Breed } from '../domain/breed';
import { getBreeds } from '../domain/getBreeds';
import { getLikedBreeds, toggleLikedBreed } from '../utils/likeStorage';

interface BreedState {
  breeds: Breed[]
  filteredBreeds: Breed[]
  loading: boolean
  error: string | null
  searchTerm: string
  fetchBreeds: () => Promise<void>
  toggleLike: (id: string) => Promise<void>
  loadLikes: () => Promise<void>
}

export const useBreedStore = create<BreedState>((set, get) => ({
  breeds: [],
  filteredBreeds: [],
  searchTerm: '',
  loading: false,
  error: null,
  fetchBreeds: async () => {
    set({ loading: true, error: null });
    try {
      const breeds = await getBreeds();
      const likedIds = await getLikedBreeds();
      const breedsWithLikes = breeds.map(breed => ({ ...breed, liked: likedIds.includes(breed.id) }));
      set({ breeds: breedsWithLikes, filteredBreeds: breedsWithLikes, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
  searchBreeds: (search: string) => {
    const { breeds } = get();

    const filtered = search
      ? breeds.filter(breed =>
        breed.name.toLowerCase().includes(search.toLowerCase())
        )
      : [...breeds];

    set({ filteredBreeds: filtered, searchTerm: search});
  },
  toggleLike: async (id: string) => {
    const updatedLikedIds = await toggleLikedBreed(id);
    set(state => {
      const update = (arr: Breed[]) => arr.map(breed =>
        breed.id === id ? { ...breed, liked: updatedLikedIds.includes(id) } : { ...breed, liked: updatedLikedIds.includes(breed.id) }
      );
      return {
        breeds: update(state.breeds),
        filteredBreeds: update(state.filteredBreeds),
      };
    });
  },
  loadLikes: async () => {
    set(state => {
      const update = (arr: Breed[]) => arr.filter(breed => breed.liked);
      return {
        filteredBreeds: update(state.filteredBreeds),
      };
    });
  },
}));
