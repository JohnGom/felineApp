import { getLikedBreeds, setLikedBreeds, toggleLikedBreed } from '../utils/likeStorage';
import AsyncStorage from '@react-native-async-storage/async-storage';

jest.mock('@react-native-async-storage/async-storage', () => ({
  __esModule: true,
  default: {
    getItem: jest.fn(),
    setItem: jest.fn(),
  },
}));

describe('likeStorage utils', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('getLikedBreeds returns parsed array', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue('["a","b"]');
    const result = await getLikedBreeds();
    expect(result).toEqual(['a', 'b']);
  });

  it('setLikedBreeds stores stringified array', async () => {
    await setLikedBreeds(['x', 'y']);
    expect(AsyncStorage.setItem).toHaveBeenCalledWith('likedBreeds', '["x","y"]');
  });

  it('toggleLikedBreed adds id if not present', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue('["a"]');
    const result = await toggleLikedBreed('b');
    expect(result).toEqual(['a', 'b']);
    expect(AsyncStorage.setItem).toHaveBeenCalledWith('likedBreeds', '["a","b"]');
  });

  it('toggleLikedBreed removes id if present', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue('["a","b"]');
    const result = await toggleLikedBreed('a');
    expect(result).toEqual(['b']);
    expect(AsyncStorage.setItem).toHaveBeenCalledWith('likedBreeds', '["b"]');
  });
});
