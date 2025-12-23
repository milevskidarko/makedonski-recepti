import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function RecipeCard({ recipe, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: recipe.images[0] }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title}>{recipe.title}</Text>
        <Text style={styles.time}>⏱️ {recipe.prepTime + recipe.cookTime} мин.</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff8f0',
    borderRadius: 16,
    margin: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 160,
  },
  info: {
    padding: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#d35400',
  },
  time: {
    fontSize: 14,
    color: '#6e2c00',
    marginTop: 4,
  },
});
