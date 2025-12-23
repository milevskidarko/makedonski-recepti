import React, { useState } from 'react';
import { FlatList, StyleSheet, TextInput, View } from 'react-native';
import RecipeCard from '../../components/RecipeCard';
import { recipes } from '../../data/recipes';

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const [filtered, setFiltered] = useState(recipes);

  const handleSearch = (text: string) => {
    setQuery(text);
    setFiltered(
      recipes.filter(r =>
        r.title.toLowerCase().includes(text.toLowerCase()) ||
        r.category.toLowerCase().includes(text.toLowerCase())
      )
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Пребарај рецепти..."
        value={query}
        onChangeText={handleSearch}
      />
      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <RecipeCard recipe={item} />}
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
  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#d35400',
  },
});
