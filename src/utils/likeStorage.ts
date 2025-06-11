import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'likedBreeds';

export const getLikedBreeds = async (): Promise<string[]> => {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    return [];
  }
};

export const setLikedBreeds = async (likedIds: string[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(likedIds));
  } catch (e) {
    // handle error
  }
};

export const toggleLikedBreed = async (id: string): Promise<string[]> => {
  const current = await getLikedBreeds();
  let updated: string[];
  if (current.includes(id)) {
    updated = current.filter(breedId => breedId !== id);
  } else {
    updated = [...current, id];
  }
  await setLikedBreeds(updated);
  return updated;
};
