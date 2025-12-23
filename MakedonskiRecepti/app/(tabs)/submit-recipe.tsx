import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';

export default function SubmitRecipeScreen() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState(['']);
  const [steps, setSteps] = useState(['']);

  const addIngredient = () => setIngredients([...ingredients, '']);
  const addStep = () => setSteps([...steps, '']);

  const handleIngredientChange = (text: string, idx: number) => {
    const newArr = [...ingredients];
    newArr[idx] = text;
    setIngredients(newArr);
  };
  const handleStepChange = (text: string, idx: number) => {
    const newArr = [...steps];
    newArr[idx] = text;
    setSteps(newArr);
  };

  const handleSubmit = () => {
    // For now, just clear the form
    setTitle('');
    setDescription('');
    setIngredients(['']);
    setSteps(['']);
    alert('Рецептот е зачуван локално!');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Нов рецепт</Text>
      <TextInput
        style={styles.input}
        placeholder="Наслов"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Опис"
        value={description}
        onChangeText={setDescription}
      />
      <Text style={styles.section}>Состојки</Text>
      {ingredients.map((ing, idx) => (
        <TextInput
          key={idx}
          style={styles.input}
          placeholder={`Состојка ${idx + 1}`}
          value={ing}
          onChangeText={text => handleIngredientChange(text, idx)}
        />
      ))}
      <TouchableOpacity style={styles.addBtn} onPress={addIngredient}>
        <Text style={styles.addBtnText}>+ Додај состојка</Text>
      </TouchableOpacity>
      <Text style={styles.section}>Чекори</Text>
      {steps.map((step, idx) => (
        <TextInput
          key={idx}
          style={styles.input}
          placeholder={`Чекор ${idx + 1}`}
          value={step}
          onChangeText={text => handleStepChange(text, idx)}
        />
      ))}
      <TouchableOpacity style={styles.addBtn} onPress={addStep}>
        <Text style={styles.addBtnText}>+ Додај чекор</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
        <Text style={styles.submitBtnText}>Зачувај рецепт</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff8f0',
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#d35400',
    marginBottom: 16,
  },
  section: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6e2c00',
    marginTop: 16,
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#d35400',
  },
  addBtn: {
    backgroundColor: '#f6ddcc',
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    marginBottom: 8,
  },
  addBtnText: {
    color: '#d35400',
    fontWeight: 'bold',
    fontSize: 16,
  },
  submitBtn: {
    backgroundColor: '#d35400',
    borderRadius: 20,
    padding: 14,
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 32,
  },
  submitBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
