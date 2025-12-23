
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useFavorites } from '../context/FavoritesContext';
import { recipes } from '../data/recipes';


export default function RecipeDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const recipe = recipes.find(r => r.id === id);
  const { favorites, toggleFavorite } = useFavorites();
  const isFav = recipe && favorites.includes(recipe.id);
  const [comments, setComments] = useState<string[]>([]);
  const [comment, setComment] = useState('');
  const commentsKey = `comments_${id}`;

  useEffect(() => {
    const loadComments = async () => {
      try {
        const stored = await AsyncStorage.getItem(commentsKey);
        if (stored) setComments(JSON.parse(stored));
      } catch {}
    };
    loadComments();
  }, [id]);

  const saveComments = async (newComments: string[]) => {
    setComments(newComments);
    await AsyncStorage.setItem(commentsKey, JSON.stringify(newComments));
  };

  const handleAddComment = async () => {
    if (comment.trim()) {
      const newComments = [...comments, comment];
      await saveComments(newComments);
      setComment('');
    }
  };

  const handleDeleteComment = (idx: number) => {
    Alert.alert('Избриши коментар', 'Дали сте сигурни?', [
      { text: 'Откажи', style: 'cancel' },
      {
        text: 'Избриши', style: 'destructive', onPress: async () => {
          const newComments = comments.filter((_, i) => i !== idx);
          await saveComments(newComments);
        }
      }
    ]);
  };

  if (!recipe) return <Text>Рецептот не е пронајден</Text>;

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
        <Text style={styles.backText}>{'< Назад'}</Text>
      </TouchableOpacity>
      <FlatList
        data={recipe.images}
        horizontal
        keyExtractor={(item, idx) => idx.toString()}
        renderItem={({ item }) => (
          <Image source={{ uri: item }} style={styles.image} />
        )}
        showsHorizontalScrollIndicator={false}
        style={styles.carousel}
      />
      <View style={styles.headerRow}>
        <Text style={styles.title}>{recipe.title}</Text>
        <TouchableOpacity onPress={() => toggleFavorite(recipe.id)}>
          <Text style={[styles.heart, isFav && styles.heartActive]}>{isFav ? '❤️' : '🤍'}</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.section}>Состојки</Text>
      {recipe.ingredients.map((ing, idx) => (
        <Text key={idx} style={styles.ingredient}>• {ing.name} - {ing.quantity}</Text>
      ))}
      <Text style={styles.section}>Чекори</Text>
      {recipe.steps.map((step, idx) => (
        <Text key={idx} style={styles.step}>{step.stepNumber}. {step.instruction}</Text>
      ))}
      <Text style={styles.section}>Коментари</Text>
      {comments.length === 0 && <Text style={styles.noComments}>Нема коментари.</Text>}
      {comments.map((c, idx) => (
        <TouchableOpacity key={idx} onLongPress={() => handleDeleteComment(idx)}>
          <Text style={styles.comment}>• {c}</Text>
        </TouchableOpacity>
      ))}
      <View style={styles.commentInputRow}>
        <TextInput
          style={styles.commentInput}
          placeholder="Додај коментар..."
          value={comment}
          onChangeText={setComment}
        />
        <TouchableOpacity style={styles.addCommentBtn} onPress={handleAddComment}>
          <Text style={styles.addCommentText}>Додај</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff8f0',
    flex: 1,
    padding: 16,
  },
  backBtn: {
    marginBottom: 8,
  },
  backText: {
    color: '#d35400',
    fontSize: 16,
  },
  carousel: {
    marginBottom: 16,
  },
  image: {
    width: 300,
    height: 200,
    borderRadius: 16,
    marginRight: 12,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#d35400',
    marginBottom: 12,
  },
  heart: {
    fontSize: 28,
    color: '#d35400',
    marginLeft: 12,
  },
  heartActive: {
    color: '#e74c3c',
  },
  section: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6e2c00',
    marginTop: 16,
    marginBottom: 8,
  },
  ingredient: {
    fontSize: 16,
    marginLeft: 8,
    marginBottom: 4,
  },
  step: {
    fontSize: 16,
    marginLeft: 8,
    marginBottom: 6,
  },
  noComments: {
    color: '#6e2c00',
    fontStyle: 'italic',
    marginBottom: 8,
  },
  comment: {
    fontSize: 15,
    marginLeft: 8,
    marginBottom: 4,
    color: '#333',
  },
  commentInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 32,
  },
  commentInput: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#d35400',
    marginRight: 8,
  },
  addCommentBtn: {
    backgroundColor: '#d35400',
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  addCommentText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
