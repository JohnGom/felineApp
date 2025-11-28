import React, {useMemo, useState} from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Modal, Pressable } from 'react-native';
import { RootStackParamList } from '../../../App';
import { RouteProp } from '@react-navigation/native';
import { useBreedStore } from '../../store/breedStore';
import { Heart, Expand } from 'lucide-react-native';


type DetailScreenRouteProp = RouteProp<RootStackParamList, 'Detail'>;

interface DetailScreenProps {
  route: DetailScreenRouteProp;
}

export const BreedDetail = ({ route }: DetailScreenProps) => {
  const { breed } = route.params;
  const [visible, setVisible] = useState(false);
  const toggleLike = useBreedStore(state => state.toggleLike);
  const breeds = useBreedStore(state => state.breeds);
  const current = breeds.find(b => b.id === breed.id);
  const temperamentList = useMemo(() => {
    return breed.temperament.split(',').map(item => item.trim());
  }, [breed]);

  return (
    <View style={styles.container}>
      <View>
        <Pressable
        style={styles.expanIcon}
          onPress={() => setVisible(true)}
        >
          <Expand size={24} color={'#f2f2f2'} />
        </Pressable>
        <TouchableOpacity onPress={() => toggleLike(breed.id)} style={styles.hearIcon}>
            {current?.liked ? <Heart fill={'red'} size={28} /> : <Heart color={'#f2f2f2'} size={28} />}
        </TouchableOpacity>
        {breed.imageUrl && (
          <Image
            source={{ uri: breed.imageUrl }}
            style={styles.image}
            resizeMode="cover"
          />
        )}
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>{breed.name}</Text>
        <Text style={styles.description}>{breed.description}</Text>
        <Text style={styles.meta}><Text style={styles.bold}>Origin:</Text> {breed.origin}</Text>
        <Text style={styles.meta}><Text style={styles.bold}>Life Span ☠️:</Text> {breed.life_span} Years</Text>
        <Text style={[styles.meta, styles.bold]}>Temperament:</Text>
        <View style={styles.temperament}>
          {temperamentList.map((trait, idx) => (
            <Text key={idx} style={styles.temperamentItem}>{'☑︎ '}{trait}</Text>
          ))}
        </View>
      </ScrollView>
      <Modal visible={visible} transparent>
        <Pressable
          style={styles.modalContainer}
          onPress={() => setVisible(false)}
        >
          <Image
            source={{ uri: breed.imageUrl }}
            style={{flex: 1}}
            resizeMode="contain"
          />
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'black',
  },
  image: {
    width: '100%',
    aspectRatio: 16 / 9, // ancho / alto
    resizeMode: 'cover',
  },
  scrollContent: {
    flexDirection: 'column',
    paddingVertical: 20,
    paddingHorizontal: 26,
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
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
    fontWeight: 'bold',
  },
  temperament: {
    marginLeft: 12,
    marginBottom: 16,
  },
  expanIcon: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 6,
    borderRadius: 10,
    elevation: 4,
    position: 'absolute',
    right: 10,
    bottom: 10,
    zIndex: 1000,
  },
  hearIcon: {
    top: 10,
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 6,
    borderRadius: 30,
    elevation: 4,
    position: 'absolute',
    right: 10,
    zIndex: 1000,
  },
});

