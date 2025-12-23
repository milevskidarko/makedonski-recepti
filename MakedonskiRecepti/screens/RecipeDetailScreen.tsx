import React from 'react';
import { FlatList, Image, ScrollView, StyleSheet, Text } from 'react-native';

interface Ingredient {
    name: string;
    quantity: string;
}

interface Step {
    stepNumber: number;
    instruction: string;
}

export default function RecipeDetailScreen({ route }: { route: { params: { recipe: any } } }) {
    const { recipe } = route.params;

    return (
        <ScrollView style={styles.container}>
            <FlatList
            data={recipe.images as string[]}
            horizontal
            keyExtractor={(item: string, idx: number) => idx.toString()}
            renderItem={({ item }: { item: string }) => (
                <Image source={{ uri: item }} style={styles.image} />
            )}
            showsHorizontalScrollIndicator={false}
            style={styles.carousel}
            />
            <Text style={styles.title}>{recipe.title}</Text>
            <Text style={styles.section}>Ingredients</Text>
            {recipe.ingredients.map((ing: Ingredient, idx: number) => (
            <Text key={idx} style={styles.ingredient}>• {ing.name} - {ing.quantity}</Text>
            ))}
            <Text style={styles.section}>Steps</Text>
            {recipe.steps.map((step: Step, idx: number) => (
            <Text key={idx} style={styles.step}>{step.stepNumber}. {step.instruction}</Text>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff8f0',
        flex: 1,
        padding: 16,
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
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#d35400',
        marginBottom: 12,
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
});
