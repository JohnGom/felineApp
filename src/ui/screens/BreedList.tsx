import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useBreedStore } from '../../store/breedStore';
import BreedItem from '../components/BreedItem';
import InputSearch from '../components/SearchInput';

export const BreedList = () => {
  const { filteredBreeds, loading, error, fetchBreeds } = useBreedStore();

  useEffect(() => {
    fetchBreeds();
  }, [fetchBreeds]);

  if (loading) {
    return <ActivityIndicator size="large" style={styles.centered} />;
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorTitle}>¡Ocurrió un error!</Text>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchBreeds}>
          <Text style={styles.retryButtonText}>Reintentar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <InputSearch />
      <FlatList
        data={filteredBreeds}
        keyExtractor={item => item.id}
        renderItem={({item}) => <BreedItem item={item} />}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    padding: 16,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
  input: {
    margin: 16,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  errorTitle: {
    color: 'red',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  retryButton: {
    marginTop: 16,
    backgroundColor: '#e74c3c',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
