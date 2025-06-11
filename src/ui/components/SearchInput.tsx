import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { useBreedStore } from '../../store/breedStore';

const InputSearch: React.FC = () => {
  const {searchTerm, searchBreeds} = useBreedStore();
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search breeds..."
        value={searchTerm}
        onChangeText={searchBreeds}
        autoCapitalize="none"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: 'white',
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    marginBottom: 12,
  },
});

export default InputSearch;
