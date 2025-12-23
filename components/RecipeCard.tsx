import { Link } from 'expo-router';
import React from 'react';
import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useFavorites } from '../context/FavoritesContext';

type RecipeCardProps = {
    recipe: {
        id: string;
        title: string;
        images: string[];
        prepTime: number;
        cookTime: number;
    };
};

export default function RecipeCard({ recipe }: RecipeCardProps) {
    const { favorites, toggleFavorite } = useFavorites();
    const isFav = favorites.includes(recipe.id);
    return (
        <Link
            href={{
                pathname: '/recipe-detail',
                params: { id: recipe.id },
            }}
            asChild
        >
            <Pressable style={styles.card}>
                <Image
                    source={{ uri: recipe.images?.[0] }}
                    style={styles.image}
                />
                <TouchableOpacity
                    style={styles.heartBtn}
                    onPress={e => {
                        e.preventDefault();
                        toggleFavorite(recipe.id);
                    }}
                >
                    <Text style={[styles.heart, isFav && styles.heartActive]}>
                        {isFav ? '❤️' : '🤍'}
                    </Text>
                </TouchableOpacity>
                <View style={styles.info}>
                    <Text style={styles.title}>{recipe.title}</Text>
                    <Text style={styles.time}>
                        ⏱️ {recipe.prepTime + recipe.cookTime} минути
                    </Text>
                </View>
            </Pressable>
        </Link>
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
        position: 'relative',
    },
    heartBtn: {
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 2,
    },
    heart: {
        fontSize: 26,
        color: '#d35400',
    },
    heartActive: {
        color: '#e74c3c',
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
