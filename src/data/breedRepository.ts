import { fetchBreeds } from '../api/catApi';
import { Breed } from '../domain/breed';

export const breedRepository = {
  async getBreeds(): Promise<Breed[]> {
    try {
      const data = await fetchBreeds();
      return data.map((item: any) => ({
        id: item.id,
        name: item.name,
        description: item.description,
        temperament: item.temperament,
        origin: item.origin,
        life_span: item.life_span,
        imageUrl: item.image?.url,
      }));
    } catch (error: any) {
      throw new Error('No se pudieron obtener las razas: ' + (error.message || error));
    }
  },
};
