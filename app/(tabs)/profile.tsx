import React from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import RecipeCard from '../../components/RecipeCard';
import { useFavorites } from '../../context/FavoritesContext';
import { recipes } from '../../data/recipes';

export default function ProfileScreen() {
  const { favorites } = useFavorites();
  const favoriteRecipes = recipes.filter(r => favorites.includes(r.id));
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://ui-avatars.com/api/?name=Корисник&background=ffb366&color=fff&rounded=true&size=128' }}
        style={styles.avatar}
      />
      <Text style={styles.name}>Корисник</Text>
      <Text style={styles.section}>Омилени рецепти</Text>
      {favoriteRecipes.length === 0 ? (
        <Text style={styles.info}>(Омилените рецепти ќе се прикажат тука)</Text>
      ) : (
        <FlatList
          data={favoriteRecipes}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <RecipeCard recipe={item} />}
          style={{ width: '100%' }}
          contentContainerStyle={{ alignItems: 'center' }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff8f0',
    paddingTop: 32,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    marginBottom: 16,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#d35400',
    marginBottom: 24,
  },
  section: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6e2c00',
    marginTop: 16,
    marginBottom: 8,
  },
  info: {
    color: '#6e2c00',
    fontSize: 16,
  },
});
