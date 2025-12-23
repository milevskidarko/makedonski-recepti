

import React, { useState } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import RecipeCard from '../../components/RecipeCard';
import { recipes } from '../../data/recipes';

const categories = ['Сите', 'Appetizer', 'Main', 'Dessert'];

export default function HomeScreen() {
  const [selectedCategory, setSelectedCategory] = useState('Сите');
  const filteredRecipes = selectedCategory === 'Сите'
    ? recipes
    : recipes.filter(r => r.category === selectedCategory);
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Издвоени рецепти</Text>
      <FlatList
        data={filteredRecipes}
        horizontal
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <RecipeCard
            recipe={item}
          />
        )}
        showsHorizontalScrollIndicator={false}
        style={styles.carousel}
      />
      <Text style={styles.header}>Категории</Text>
      <FlatList
        data={categories}
        horizontal
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.category, selectedCategory === item && { backgroundColor: '#d35400' }]}
            onPress={() => setSelectedCategory(item)}
          >
            <Text style={[styles.categoryText, selectedCategory === item && { color: '#fff' }]}>{item}</Text>
          </TouchableOpacity>
        )}
        showsHorizontalScrollIndicator={false}
        style={styles.categories}
      />
      <Text style={styles.header}>Популарни рецепти</Text>
      <FlatList
        data={filteredRecipes}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <RecipeCard
            recipe={item}
          />
        )}
        style={styles.trending}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff8f0',
    flex: 1,
    paddingTop: 16,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#d35400',
    marginLeft: 16,
    marginTop: 16,
  },
  carousel: {
    marginVertical: 8,
    paddingLeft: 8,
  },
  categories: {
    marginVertical: 8,
    paddingLeft: 8,
  },
  category: {
    backgroundColor: '#f6ddcc',
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 8,
    marginRight: 10,
    marginTop: 8,
  },
  categoryText: {
    color: '#6e2c00',
    fontWeight: 'bold',
    fontSize: 16,
  },
  trending: {
    marginVertical: 8,
    paddingLeft: 8,
  },
});
