import { breedRepository } from '../data/breedRepository';
import { Breed } from './breed';

export const getBreeds = async (): Promise<Breed[]> => {
  return await breedRepository.getBreeds();
};
