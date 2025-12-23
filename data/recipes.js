export const recipes = [
  {
    id: '1',
    title: 'Тавче Гравче',
    description: 'Класичен македонски рецепт со вкусен грав...',
    prepTime: 15,
    cookTime: 60,
    category: 'Main',
    ingredients: [
      { name: 'Грав', quantity: '500g' },
      { name: 'Пиперка', quantity: '1' }
    ],
    steps: [
      { stepNumber: 1, instruction: 'Измиј гравот', image: null },
      { stepNumber: 2, instruction: 'Свари го гравот', image: null }
    ],
    images: ['https://example.com/tavche1.jpg'],
    video: null,
    likes: 12
  },
  {
    id: '2',
    title: 'Баклава',
    description: 'Слатка традиционална баклава',
    prepTime: 30,
    cookTime: 50,
    category: 'Dessert',
    ingredients: [
      { name: 'Тесто', quantity: '500g' },
      { name: 'Ореви', quantity: '200g' }
    ],
    steps: [
      { stepNumber: 1, instruction: 'Подготви тесто', image: null },
      { stepNumber: 2, instruction: 'Наполни со ореви', image: null }
    ],
    images: ['https://example.com/baklava1.jpg'],
    video: null,
    likes: 25
  }
];
