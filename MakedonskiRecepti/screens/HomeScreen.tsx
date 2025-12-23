import React from 'react';
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import RecipeCard from '../components/RecipeCard';
import { recipes } from '../data/recipes';

const categories = ['Appetizer', 'Main', 'Dessert'];

export default function HomeScreen({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Featured Recipes</Text>
      <FlatList
        data={recipes}
        horizontal
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <RecipeCard
            recipe={item}
            onPress={() => navigation.navigate('RecipeDetail', { recipe: item })}
          />
        )}
        showsHorizontalScrollIndicator={false}
        style={styles.carousel}
      />
      <Text style={styles.header}>Categories</Text>
      <FlatList
        data={categories}
        horizontal
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.category}>
            <Text style={styles.categoryText}>{item}</Text>
          </TouchableOpacity>
        )}
        showsHorizontalScrollIndicator={false}
        style={styles.categories}
      />
      <Text style={styles.header}>Trending Recipes</Text>
      <FlatList
        data={recipes}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <RecipeCard
            recipe={item}
            onPress={() => navigation.navigate('RecipeDetail', { recipe: item })}
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
