import React, {useMemo} from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { RootStackParamList } from '../../../App';
import { RouteProp } from '@react-navigation/native';
import { useBreedStore } from '../../store/breedStore';

const { width } = Dimensions.get('window');

type DetailScreenRouteProp = RouteProp<RootStackParamList, 'Detail'>;

interface DetailScreenProps {
  route: DetailScreenRouteProp;
}

export const BreedDetail = ({ route }: DetailScreenProps) => {
  const { breed } = route.params;
  const toggleLike = useBreedStore(state => state.toggleLike);
  const breeds = useBreedStore(state => state.breeds);
  const current = breeds.find(b => b.id === breed.id);
  const temperamentList = useMemo(() => {
    return breed.temperament.split(',').map(item => item.trim())
  }, [breed]) 

  return (
    <View style={styles.container}>
      {breed.imageUrl && (
        <Image
          source={{ uri: breed.imageUrl }}
          style={styles.image}
          resizeMode="cover"
        />
      )}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.titleContent}>
          <Text style={styles.title}>{breed.name}</Text>
          <TouchableOpacity onPress={() => toggleLike(breed.id)}>
            <Text style={{ fontSize: 32 }}>
              {current?.liked ? '❤️' : '🤍'}
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.description}>{breed.description}</Text>
        <Text style={styles.meta}><Text style={styles.bold}>Origin:</Text> {breed.origin}</Text>
        <Text style={styles.meta}><Text style={styles.bold}>Life Span ☠️:</Text> {breed.life_span} Years</Text>
        <Text style={[styles.meta, styles.bold]}>Temperament:</Text>
        <View style={styles.temperament}>
          {temperamentList.map((trait, idx) => (
            <Text key={idx} style={styles.temperamentItem}>{'* '}{trait}</Text>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const IMAGE_HEIGHT = 260;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  titleContent: { 
    marginBottom: 20,
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'space-between' 
  },
  image: {
    width: width,
    height: IMAGE_HEIGHT,
    marginBottom: 10
  },
  scrollContent: {
    paddingVertical: 20,
    paddingHorizontal: 26,
    paddingTop: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#222',
  },
  description: {
    fontSize: 18,
    letterSpacing: 1.5,
    textAlign: 'justify',
    marginBottom: 16,
    color: '#444',
  },
  meta: {
    fontSize: 17,
    color: '#666',
    marginBottom: 12,
  },
  temperamentItem: {
    fontSize: 15,
    color: '#666',
    marginBottom: 2,
  },
  bold: {
    fontWeight: 'bold'
  },
  temperament: { 
    marginLeft: 12, 
    marginBottom: 16
  }
});
