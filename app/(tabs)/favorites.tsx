import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import RecipeCard from '../../components/RecipeCard';
import { recipes } from '../../data/recipes';

export default function FavoritesScreen() {
  // For demo: use local state. In real app, use context or persistent storage.
  const [favorites, setFavorites] = useState(recipes.filter(r => r.id === '1'));

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Омилени рецепти</Text>
      <FlatList
        data={favorites}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <RecipeCard recipe={item} />}
        ListEmptyComponent={<Text style={styles.empty}>Немате омилени рецепти.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff8f0',
    padding: 16,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#d35400',
    marginBottom: 16,
  },
  empty: {
    textAlign: 'center',
    color: '#6e2c00',
    marginTop: 32,
    fontSize: 16,
  },
});
