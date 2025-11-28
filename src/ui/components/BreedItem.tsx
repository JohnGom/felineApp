import React from 'react';
import { Text, TouchableOpacity, View, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Breed } from '../../domain/breed';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useBreedStore } from '../../store/breedStore';
import { Heart } from 'lucide-react-native';

type RootStackParamList = {
  Home: undefined;
  Detail: { breed: Breed };
};

interface BreedItemProps {
  item: Breed;
}

const BreedItem: React.FC<BreedItemProps> = ({ item }) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const toggleLike = useBreedStore(state => state.toggleLike);

  return (
    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Detail', { breed: item })}>
      {(item.imageUrl || item.aux_image) ? (
        <Image source={{ uri: item.imageUrl || item.aux_image }} style={styles.image} />
      ) : (
        <View style={[styles.image, styles.placeholder]}>
          <Text style={styles.placeholderText}>No Image</Text>
        </View>
      )}
      <View style={styles.info}>
        <View style={styles.contentTitle}>
          <Text style={styles.title}>{item.name}</Text>
          <TouchableOpacity onPress={() => toggleLike(item.id)} >
            {item?.liked ? <Heart fill={'red'} size={24} /> : <Heart size={24} />}
        </TouchableOpacity>
        </View>
        <Text style={styles.meta}>Origin: {item.origin}</Text>
        <Text style={styles.meta}>Life Span: {item.life_span} Years</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  contentTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  image: {
    width: 100,
    height: 120,
    backgroundColor: '#eee',
  },
  placeholder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    color: '#888',
    fontSize: 12,
  },
  info: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#444',
    marginBottom: 4,
  },
  meta: {
    marginBottom: 5,
    fontSize: 14,
    color: '#666',
  },
  iconFont: {
    fontSize: 24,
  },
});

export default BreedItem;
