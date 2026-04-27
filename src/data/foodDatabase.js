// Food Database — Indian + Global foods with complete nutrition
// Based on USDA FoodData Central + ICMR Indian Food Composition Tables
// All values per 100g unless specified

export const FOOD_CATEGORIES = [
  { id: 'grains', name: 'Grains & Cereals', nameHi: 'अनाज', icon: '🌾' },
  { id: 'dal', name: 'Lentils & Pulses', nameHi: 'दालें', icon: '🫘' },
  { id: 'vegetables', name: 'Vegetables', nameHi: 'सब्ज़ियां', icon: '🥬' },
  { id: 'fruits', name: 'Fruits', nameHi: 'फल', icon: '🍎' },
  { id: 'dairy', name: 'Dairy', nameHi: 'डेयरी', icon: '🥛' },
  { id: 'meat', name: 'Meat & Fish', nameHi: 'मांस', icon: '🍗' },
  { id: 'snacks', name: 'Snacks & Sweets', nameHi: 'नाश्ता', icon: '🍩' },
  { id: 'beverages', name: 'Beverages', nameHi: 'पेय', icon: '🥤' },
  { id: 'nuts', name: 'Nuts & Seeds', nameHi: 'मेवे', icon: '🥜' },
  { id: 'oils', name: 'Oils & Fats', nameHi: 'तेल', icon: '🫒' },
];

export const CONDITION_FOODS = {
  diabetes: {
    name: 'Diabetes', nameHi: 'मधुमेह',
    eat: ['Oats', 'Brown Rice', 'Moong Dal', 'Spinach', 'Guava', 'Broccoli'],
    avoid: ['White Rice', 'Sugar', 'Jalebi', 'Mango'],
  },
  blood_pressure: {
    name: 'Blood Pressure', nameHi: 'ब्लड प्रेशर',
    eat: ['Banana', 'Spinach', 'Coconut Water', 'Buttermilk'],
    avoid: ['Namkeen', 'Pickle', 'Processed Food'],
  },
  cholesterol: {
    name: 'Cholesterol', nameHi: 'कोलेस्ट्रॉल',
    eat: ['Oats', 'Walnut', 'Flaxseed', 'Olive Oil', 'Fish'],
    avoid: ['Ghee', 'Butter', 'Fried Food'],
  },
  anemia: {
    name: 'Anemia', nameHi: 'खून की कमी',
    eat: ['Spinach', 'Pomegranate', 'Rajma', 'Jaggery', 'Beetroot'],
    avoid: ['Tea', 'Coffee'],
  },
};

export const FOOD_DATABASE = [
  // ============ GRAINS ============
  { id: 'roti', name: 'Roti (Chapati)', nameHi: 'रोटी', category: 'grains', caloriesPer100: 264, protein: 9.6, carbs: 52, fat: 3.5, fiber: 2.8, portionSize: 30, portionName: '1 roti', portionCalories: 79, bestTime: 'Lunch & Dinner', bestTimeHi: 'दोपहर और रात', glycemicIndex: 62, tags: ['carbs', 'fiber'] },
  { id: 'rice', name: 'White Rice (Cooked)', nameHi: 'सफ़ेद चावल', category: 'grains', caloriesPer100: 130, protein: 2.7, carbs: 28, fat: 0.3, fiber: 0.4, portionSize: 150, portionName: '1 bowl', portionCalories: 195, bestTime: 'Lunch', bestTimeHi: 'दोपहर', glycemicIndex: 73, tags: ['carbs'] },
  { id: 'brown_rice', name: 'Brown Rice (Cooked)', nameHi: 'ब्राउन राइस', category: 'grains', caloriesPer100: 123, protein: 2.7, carbs: 26, fat: 1.0, fiber: 1.8, portionSize: 150, portionName: '1 bowl', portionCalories: 185, bestTime: 'Lunch', bestTimeHi: 'दोपहर', glycemicIndex: 50, tags: ['carbs', 'fiber'] },
  { id: 'oats', name: 'Oats', nameHi: 'ओट्स', category: 'grains', caloriesPer100: 389, protein: 16.9, carbs: 66, fat: 6.9, fiber: 10.6, portionSize: 40, portionName: '1 bowl', portionCalories: 156, bestTime: 'Breakfast', bestTimeHi: 'सुबह', glycemicIndex: 55, tags: ['fiber', 'anti_inflammatory', 'protein'] },
  { id: 'poha', name: 'Poha (Flattened Rice)', nameHi: 'पोहा', category: 'grains', caloriesPer100: 110, protein: 2.5, carbs: 24, fat: 0.4, fiber: 0.3, portionSize: 100, portionName: '1 plate', portionCalories: 110, bestTime: 'Breakfast', bestTimeHi: 'सुबह', glycemicIndex: 65, tags: ['carbs'] },
  { id: 'upma', name: 'Upma', nameHi: 'उपमा', category: 'grains', caloriesPer100: 120, protein: 3.0, carbs: 22, fat: 2.5, fiber: 1.5, portionSize: 100, portionName: '1 bowl', portionCalories: 120, bestTime: 'Breakfast', bestTimeHi: 'सुबह', glycemicIndex: 60, tags: ['carbs', 'fiber'] },
  { id: 'multigrain_bread', name: 'Multigrain Bread', nameHi: 'मल्टीग्रेन ब्रेड', category: 'grains', caloriesPer100: 265, protein: 9.0, carbs: 47, fat: 3.5, fiber: 5.0, portionSize: 30, portionName: '1 slice', portionCalories: 80, bestTime: 'Breakfast', bestTimeHi: 'सुबह', glycemicIndex: 45, tags: ['carbs', 'fiber'] },
  { id: 'dalia', name: 'Dalia (Broken Wheat)', nameHi: 'दलिया', category: 'grains', caloriesPer100: 120, protein: 3.5, carbs: 25, fat: 0.5, fiber: 3.0, portionSize: 100, portionName: '1 bowl', portionCalories: 120, bestTime: 'Breakfast/Lunch', bestTimeHi: 'सुबह/दोपहर', glycemicIndex: 41, tags: ['fiber', 'carbs'] },

  // ============ LENTILS & PULSES ============
  { id: 'dal_tadka', name: 'Dal Tadka (Cooked)', nameHi: 'दाल तड़का', category: 'dal', caloriesPer100: 104, protein: 7.0, carbs: 15, fat: 2.5, fiber: 3.5, portionSize: 150, portionName: '1 bowl', portionCalories: 156, bestTime: 'Lunch & Dinner', bestTimeHi: 'दोपहर और रात', glycemicIndex: 29, tags: ['protein', 'fiber'] },
  { id: 'rajma', name: 'Rajma (Kidney Beans)', nameHi: 'राजमा', category: 'dal', caloriesPer100: 127, protein: 8.7, carbs: 22.8, fat: 0.5, fiber: 6.4, portionSize: 150, portionName: '1 bowl', portionCalories: 191, bestTime: 'Lunch', bestTimeHi: 'दोपहर', glycemicIndex: 24, tags: ['protein', 'fiber', 'iron'] },
  { id: 'chana_masala', name: 'Chana Masala', nameHi: 'छोले', category: 'dal', caloriesPer100: 164, protein: 8.9, carbs: 27, fat: 2.6, fiber: 7.6, portionSize: 150, portionName: '1 bowl', portionCalories: 246, bestTime: 'Lunch', bestTimeHi: 'दोपहर', glycemicIndex: 28, tags: ['protein', 'fiber'] },
  { id: 'moong_dal', name: 'Moong Dal (Cooked)', nameHi: 'मूंग दाल', category: 'dal', caloriesPer100: 105, protein: 7.6, carbs: 16.3, fat: 0.4, fiber: 4.5, portionSize: 150, portionName: '1 bowl', portionCalories: 158, bestTime: 'Lunch & Dinner', bestTimeHi: 'दोपहर और रात', glycemicIndex: 26, tags: ['protein', 'fiber'] },
  { id: 'toor_dal', name: 'Toor Dal (Cooked)', nameHi: 'तूर दाल', category: 'dal', caloriesPer100: 118, protein: 8.2, carbs: 19.5, fat: 0.6, fiber: 5.0, portionSize: 150, portionName: '1 bowl', portionCalories: 177, bestTime: 'Lunch & Dinner', bestTimeHi: 'दोपहर और रात', glycemicIndex: 22, tags: ['protein', 'fiber'] },
  { id: 'sprouts', name: 'Moong Sprouts', nameHi: 'अंकुरित मूंग', category: 'dal', caloriesPer100: 30, protein: 3.0, carbs: 5.9, fat: 0.2, fiber: 1.8, portionSize: 100, portionName: '1 cup', portionCalories: 30, bestTime: 'Breakfast/Snack', bestTimeHi: 'सुबह/नाश्ता', glycemicIndex: 25, tags: ['protein', 'fiber', 'digestive'] },

  // ============ VEGETABLES ============
  { id: 'palak', name: 'Spinach (Cooked)', nameHi: 'पालक', category: 'vegetables', caloriesPer100: 23, protein: 2.9, carbs: 3.6, fat: 0.4, fiber: 2.2, portionSize: 100, portionName: '1 bowl', portionCalories: 23, bestTime: 'Lunch & Dinner', bestTimeHi: 'दोपहर और रात', glycemicIndex: 15, tags: ['iron', 'calcium', 'anti_inflammatory'] },
  { id: 'broccoli', name: 'Broccoli (Cooked)', nameHi: 'ब्रोकली', category: 'vegetables', caloriesPer100: 35, protein: 2.4, carbs: 7.2, fat: 0.4, fiber: 3.3, portionSize: 100, portionName: '1 cup', portionCalories: 35, bestTime: 'Lunch', bestTimeHi: 'दोपहर', glycemicIndex: 10, tags: ['anti_inflammatory', 'fiber', 'vitamin_c'] },
  { id: 'aloo_gobi', name: 'Aloo Gobi', nameHi: 'आलू गोभी', category: 'vegetables', caloriesPer100: 95, protein: 2.5, carbs: 13, fat: 4.0, fiber: 2.5, portionSize: 150, portionName: '1 bowl', portionCalories: 143, bestTime: 'Lunch', bestTimeHi: 'दोपहर', glycemicIndex: 55, tags: ['fiber'] },
  { id: 'bhindi', name: 'Bhindi (Okra)', nameHi: 'भिंडी', category: 'vegetables', caloriesPer100: 33, protein: 1.9, carbs: 7.0, fat: 0.1, fiber: 3.2, portionSize: 100, portionName: '1 bowl', portionCalories: 33, bestTime: 'Lunch', bestTimeHi: 'दोपहर', glycemicIndex: 20, tags: ['fiber'] },
  { id: 'baingan', name: 'Baingan (Eggplant)', nameHi: 'बैंगन', category: 'vegetables', caloriesPer100: 25, protein: 1.0, carbs: 6.0, fat: 0.2, fiber: 3.0, portionSize: 100, portionName: '1 bowl', portionCalories: 25, bestTime: 'Lunch & Dinner', bestTimeHi: 'दोपहर और रात', glycemicIndex: 15, tags: ['fiber'] },
  { id: 'lauki', name: 'Lauki (Bottle Gourd)', nameHi: 'लौकी', category: 'vegetables', caloriesPer100: 14, protein: 0.6, carbs: 3.4, fat: 0.1, fiber: 0.5, portionSize: 150, portionName: '1 bowl', portionCalories: 21, bestTime: 'Lunch', bestTimeHi: 'दोपहर', glycemicIndex: 15, tags: ['hydration', 'digestive'] },
  { id: 'matar', name: 'Green Peas', nameHi: 'मटर', category: 'vegetables', caloriesPer100: 81, protein: 5.4, carbs: 14.5, fat: 0.4, fiber: 5.7, portionSize: 80, portionName: '1/2 cup', portionCalories: 65, bestTime: 'Lunch', bestTimeHi: 'दोपहर', glycemicIndex: 48, tags: ['protein', 'fiber'] },
  { id: 'carrot', name: 'Carrot', nameHi: 'गाजर', category: 'vegetables', caloriesPer100: 41, protein: 0.9, carbs: 9.6, fat: 0.2, fiber: 2.8, portionSize: 80, portionName: '1 medium', portionCalories: 33, bestTime: 'Any time', bestTimeHi: 'कभी भी', glycemicIndex: 39, tags: ['vitamin_a', 'fiber'] },
  { id: 'beetroot', name: 'Beetroot', nameHi: 'चुकंदर', category: 'vegetables', caloriesPer100: 43, protein: 1.6, carbs: 10, fat: 0.2, fiber: 2.8, portionSize: 80, portionName: '1/2 cup', portionCalories: 34, bestTime: 'Lunch', bestTimeHi: 'दोपहर', glycemicIndex: 61, tags: ['iron', 'fiber'] },

  // ============ FRUITS ============
  { id: 'apple', name: 'Apple', nameHi: 'सेब', category: 'fruits', caloriesPer100: 52, protein: 0.3, carbs: 14, fat: 0.2, fiber: 2.4, portionSize: 150, portionName: '1 medium', portionCalories: 78, bestTime: 'Morning/Evening', bestTimeHi: 'सुबह/शाम', glycemicIndex: 36, tags: ['fiber', 'vitamin_c'] },
  { id: 'banana', name: 'Banana', nameHi: 'केला', category: 'fruits', caloriesPer100: 89, protein: 1.1, carbs: 23, fat: 0.3, fiber: 2.6, portionSize: 100, portionName: '1 medium', portionCalories: 89, bestTime: 'Pre-workout/Morning', bestTimeHi: 'वर्कआउट से पहले', glycemicIndex: 51, tags: ['potassium', 'magnesium'] },
  { id: 'mango', name: 'Mango', nameHi: 'आम', category: 'fruits', caloriesPer100: 60, protein: 0.8, carbs: 15, fat: 0.4, fiber: 1.6, portionSize: 100, portionName: '1/2 cup', portionCalories: 60, bestTime: 'Morning', bestTimeHi: 'सुबह', glycemicIndex: 56, tags: ['vitamin_a', 'vitamin_c'] },
  { id: 'papaya', name: 'Papaya', nameHi: 'पपीता', category: 'fruits', caloriesPer100: 43, protein: 0.5, carbs: 11, fat: 0.3, fiber: 1.7, portionSize: 150, portionName: '1 cup', portionCalories: 65, bestTime: 'Morning (empty stomach)', bestTimeHi: 'सुबह खाली पेट', glycemicIndex: 60, tags: ['digestive', 'vitamin_c'] },
  { id: 'orange', name: 'Orange', nameHi: 'संतरा', category: 'fruits', caloriesPer100: 47, protein: 0.9, carbs: 12, fat: 0.1, fiber: 2.4, portionSize: 130, portionName: '1 medium', portionCalories: 61, bestTime: 'Morning/Evening', bestTimeHi: 'सुबह/शाम', glycemicIndex: 43, tags: ['vitamin_c', 'hydration'] },
  { id: 'watermelon', name: 'Watermelon', nameHi: 'तरबूज', category: 'fruits', caloriesPer100: 30, protein: 0.6, carbs: 8, fat: 0.2, fiber: 0.4, portionSize: 200, portionName: '1 cup', portionCalories: 60, bestTime: 'Afternoon', bestTimeHi: 'दोपहर', glycemicIndex: 76, tags: ['hydration', 'vitamin_c'] },
  { id: 'guava', name: 'Guava', nameHi: 'अमरूद', category: 'fruits', caloriesPer100: 68, protein: 2.6, carbs: 14, fat: 1.0, fiber: 5.4, portionSize: 100, portionName: '1 medium', portionCalories: 68, bestTime: 'Morning', bestTimeHi: 'सुबह', glycemicIndex: 12, tags: ['fiber', 'vitamin_c'] },
  { id: 'pomegranate', name: 'Pomegranate', nameHi: 'अनार', category: 'fruits', caloriesPer100: 83, protein: 1.7, carbs: 19, fat: 1.2, fiber: 4.0, portionSize: 80, portionName: '1/2 cup', portionCalories: 66, bestTime: 'Morning', bestTimeHi: 'सुबह', glycemicIndex: 35, tags: ['iron', 'vitamin_c', 'anti_inflammatory'] },

  // ============ DAIRY ============
  { id: 'milk', name: 'Whole Milk', nameHi: 'पूरा दूध', category: 'dairy', caloriesPer100: 61, protein: 3.2, carbs: 4.8, fat: 3.3, fiber: 0, portionSize: 200, portionName: '1 glass', portionCalories: 122, bestTime: 'Morning/Bedtime', bestTimeHi: 'सुबह/सोने से पहले', glycemicIndex: 31, tags: ['calcium', 'protein'] },
  { id: 'dahi', name: 'Curd (Dahi)', nameHi: 'दही', category: 'dairy', caloriesPer100: 98, protein: 4.3, carbs: 7.0, fat: 5.0, fiber: 0, portionSize: 100, portionName: '1 cup', portionCalories: 98, bestTime: 'Lunch', bestTimeHi: 'दोपहर', glycemicIndex: 36, tags: ['calcium', 'probiotic', 'protein'] },
  { id: 'paneer', name: 'Paneer', nameHi: 'पनीर', category: 'dairy', caloriesPer100: 265, protein: 18.3, carbs: 4.5, fat: 20.8, fiber: 0, portionSize: 50, portionName: '2 cubes', portionCalories: 133, bestTime: 'Lunch/Dinner', bestTimeHi: 'दोपहर/रात', glycemicIndex: 27, tags: ['calcium', 'protein'] },
  { id: 'buttermilk', name: 'Buttermilk (Chaas)', nameHi: 'छाछ', category: 'dairy', caloriesPer100: 40, protein: 3.3, carbs: 4.8, fat: 0.9, fiber: 0, portionSize: 200, portionName: '1 glass', portionCalories: 80, bestTime: 'After lunch', bestTimeHi: 'खाने के बाद', glycemicIndex: 20, tags: ['calcium', 'probiotic', 'digestive'] },
  { id: 'lassi', name: 'Sweet Lassi', nameHi: 'लस्सी', category: 'dairy', caloriesPer100: 88, protein: 3.0, carbs: 14, fat: 2.5, fiber: 0, portionSize: 200, portionName: '1 glass', portionCalories: 176, bestTime: 'Afternoon', bestTimeHi: 'दोपहर', glycemicIndex: 40, tags: ['calcium', 'probiotic'] },
  { id: 'cheese', name: 'Cheese', nameHi: 'चीज़', category: 'dairy', caloriesPer100: 350, protein: 21, carbs: 2.5, fat: 28, fiber: 0, portionSize: 30, portionName: '1 slice', portionCalories: 105, bestTime: 'Breakfast', bestTimeHi: 'सुबह', glycemicIndex: 27, tags: ['calcium', 'protein'] },

  // ============ MEAT & FISH ============
  { id: 'chicken_breast', name: 'Chicken Breast (Grilled)', nameHi: 'ग्रिल्ड चिकन', category: 'meat', caloriesPer100: 165, protein: 31, carbs: 0, fat: 3.6, fiber: 0, portionSize: 100, portionName: '1 piece', portionCalories: 165, bestTime: 'Lunch', bestTimeHi: 'दोपहर', glycemicIndex: 0, tags: ['protein'] },
  { id: 'eggs', name: 'Egg (Boiled)', nameHi: 'उबला अंडा', category: 'meat', caloriesPer100: 155, protein: 13, carbs: 1.1, fat: 11, fiber: 0, portionSize: 50, portionName: '1 egg', portionCalories: 78, bestTime: 'Breakfast', bestTimeHi: 'सुबह', glycemicIndex: 0, tags: ['protein', 'vitamin_d'] },
  { id: 'fish_curry', name: 'Fish Curry', nameHi: 'मछली करी', category: 'meat', caloriesPer100: 140, protein: 18, carbs: 5, fat: 5.5, fiber: 0.5, portionSize: 150, portionName: '1 bowl', portionCalories: 210, bestTime: 'Lunch', bestTimeHi: 'दोपहर', glycemicIndex: 0, tags: ['protein', 'omega3', 'anti_inflammatory'] },
  { id: 'mutton_curry', name: 'Mutton Curry', nameHi: 'मटन करी', category: 'meat', caloriesPer100: 210, protein: 20, carbs: 5, fat: 12, fiber: 0.5, portionSize: 100, portionName: '1 bowl', portionCalories: 210, bestTime: 'Lunch', bestTimeHi: 'दोपहर', glycemicIndex: 0, tags: ['protein', 'iron'] },

  // ============ SNACKS & SWEETS ============
  { id: 'samosa', name: 'Samosa', nameHi: 'समोसा', category: 'snacks', caloriesPer100: 262, protein: 4.0, carbs: 28, fat: 15, fiber: 1.5, portionSize: 50, portionName: '1 piece', portionCalories: 131, bestTime: 'Evening (occasional)', bestTimeHi: 'शाम (कभी-कभी)', glycemicIndex: 65, tags: ['carbs'] },
  { id: 'biscuit', name: 'Marie Biscuit', nameHi: 'मैरी बिस्कुट', category: 'snacks', caloriesPer100: 360, protein: 7.0, carbs: 72, fat: 5.0, fiber: 2.0, portionSize: 7, portionName: '1 biscuit', portionCalories: 25, bestTime: 'Tea time', bestTimeHi: 'चाय के साथ', glycemicIndex: 70, tags: ['carbs'] },
  { id: 'namkeen', name: 'Namkeen (Mixed)', nameHi: 'नमकीन', category: 'snacks', caloriesPer100: 480, protein: 8.0, carbs: 48, fat: 30, fiber: 2.0, portionSize: 25, portionName: '1 small bowl', portionCalories: 120, bestTime: 'Evening (small portion)', bestTimeHi: 'शाम (छोटी प्लेट)', glycemicIndex: 55, tags: ['carbs'] },
  { id: 'jalebi', name: 'Jalebi', nameHi: 'जलेबी', category: 'snacks', caloriesPer100: 380, protein: 3.0, carbs: 60, fat: 16, fiber: 0.5, portionSize: 30, portionName: '1 piece', portionCalories: 114, bestTime: 'Festival/Occasional', bestTimeHi: 'त्योहार/कभी-कभी', glycemicIndex: 80, tags: ['carbs'] },
  { id: 'gulab_jamun', name: 'Gulab Jamun', nameHi: 'गुलाब जामुन', category: 'snacks', caloriesPer100: 350, protein: 4.0, carbs: 52, fat: 15, fiber: 0.3, portionSize: 35, portionName: '1 piece', portionCalories: 123, bestTime: 'Festival/Occasional', bestTimeHi: 'त्योहार/कभी-कभी', glycemicIndex: 75, tags: ['carbs'] },
  { id: 'dhokla', name: 'Dhokla', nameHi: 'ढोकला', category: 'snacks', caloriesPer100: 160, protein: 5.0, carbs: 22, fat: 5.0, fiber: 1.5, portionSize: 50, portionName: '2 pieces', portionCalories: 80, bestTime: 'Breakfast/Snack', bestTimeHi: 'सुबह/नाश्ता', glycemicIndex: 45, tags: ['carbs', 'protein'] },

  // ============ BEVERAGES ============
  { id: 'chai', name: 'Chai (with sugar)', nameHi: 'चाय', category: 'beverages', caloriesPer100: 45, protein: 0.8, carbs: 8, fat: 1.2, fiber: 0, portionSize: 150, portionName: '1 cup', portionCalories: 68, bestTime: 'Morning/Evening', bestTimeHi: 'सुबह/शाम', glycemicIndex: 60, tags: [] },
  { id: 'coffee', name: 'Coffee (with milk)', nameHi: 'कॉफ़ी', category: 'beverages', caloriesPer100: 50, protein: 1.0, carbs: 7, fat: 2.0, fiber: 0, portionSize: 150, portionName: '1 cup', portionCalories: 75, bestTime: 'Morning', bestTimeHi: 'सुबह', glycemicIndex: 55, tags: [] },
  { id: 'green_tea', name: 'Green Tea', nameHi: 'ग्रीन टी', category: 'beverages', caloriesPer100: 1, protein: 0, carbs: 0, fat: 0, fiber: 0, portionSize: 200, portionName: '1 cup', portionCalories: 2, bestTime: 'Any time', bestTimeHi: 'कभी भी', glycemicIndex: 0, tags: ['anti_inflammatory', 'hydration'] },
  { id: 'coconut_water', name: 'Coconut Water', nameHi: 'नारियल पानी', category: 'beverages', caloriesPer100: 19, protein: 0.7, carbs: 3.7, fat: 0.2, fiber: 1.1, portionSize: 250, portionName: '1 glass', portionCalories: 48, bestTime: 'Morning/Afternoon', bestTimeHi: 'सुबह/दोपहर', glycemicIndex: 3, tags: ['hydration', 'potassium'] },

  // ============ NUTS & SEEDS ============
  { id: 'badam', name: 'Almonds', nameHi: 'बादाम', category: 'nuts', caloriesPer100: 579, protein: 21, carbs: 22, fat: 50, fiber: 12, portionSize: 15, portionName: '10-12 pieces', portionCalories: 87, bestTime: 'Morning', bestTimeHi: 'सुबह', glycemicIndex: 0, tags: ['protein', 'omega3', 'vitamin_e'] },
  { id: 'walnut', name: 'Walnuts', nameHi: 'अखरोट', category: 'nuts', caloriesPer100: 654, protein: 15, carbs: 14, fat: 65, fiber: 7, portionSize: 15, portionName: '3-4 pieces', portionCalories: 98, bestTime: 'Morning', bestTimeHi: 'सुबह', glycemicIndex: 0, tags: ['omega3', 'anti_inflammatory'] },
  { id: 'cashew', name: 'Cashews', nameHi: 'काजू', category: 'nuts', caloriesPer100: 553, protein: 18, carbs: 30, fat: 44, fiber: 3, portionSize: 15, portionName: '5-6 pieces', portionCalories: 83, bestTime: 'Morning/Snack', bestTimeHi: 'सुबह/नाश्ता', glycemicIndex: 22, tags: ['protein', 'magnesium'] },
  { id: 'peanut', name: 'Peanuts', nameHi: 'मूंगफली', category: 'nuts', caloriesPer100: 567, protein: 26, carbs: 16, fat: 49, fiber: 9, portionSize: 25, portionName: '1 small bowl', portionCalories: 142, bestTime: 'Evening snack', bestTimeHi: 'शाम', glycemicIndex: 14, tags: ['protein', 'fiber'] },
  { id: 'flaxseed', name: 'Flax Seeds', nameHi: 'अलसी', category: 'nuts', caloriesPer100: 534, protein: 18, carbs: 29, fat: 42, fiber: 27, portionSize: 10, portionName: '1 tbsp', portionCalories: 53, bestTime: 'Morning', bestTimeHi: 'सुबह', glycemicIndex: 0, tags: ['omega3', 'fiber'] },

  // ============ OILS & FATS ============
  { id: 'ghee', name: 'Ghee', nameHi: 'घी', category: 'oils', caloriesPer100: 900, protein: 0, carbs: 0, fat: 100, fiber: 0, portionSize: 5, portionName: '1 tsp', portionCalories: 45, bestTime: 'With meals', bestTimeHi: 'खाने के साथ', glycemicIndex: 0, tags: ['vitamin_a'] },
  { id: 'mustard_oil', name: 'Mustard Oil', nameHi: 'सरसों का तेल', category: 'oils', caloriesPer100: 884, protein: 0, carbs: 0, fat: 100, fiber: 0, portionSize: 5, portionName: '1 tsp', portionCalories: 44, bestTime: 'Cooking', bestTimeHi: 'खाना बनाते समय', glycemicIndex: 0, tags: ['omega3', 'anti_inflammatory'] },
  { id: 'olive_oil', name: 'Olive Oil', nameHi: 'जैतून का तेल', category: 'oils', caloriesPer100: 884, protein: 0, carbs: 0, fat: 100, fiber: 0, portionSize: 5, portionName: '1 tsp', portionCalories: 44, bestTime: 'Cooking/Salad', bestTimeHi: 'खाना/सलाद', glycemicIndex: 0, tags: ['anti_inflammatory'] },

  // ============ SWEETENERS ============
  { id: 'honey', name: 'Honey', nameHi: 'शहद', category: 'beverages', caloriesPer100: 304, protein: 0.3, carbs: 82, fat: 0, fiber: 0, portionSize: 10, portionName: '1 tbsp', portionCalories: 30, bestTime: 'Morning (with warm water)', bestTimeHi: 'सुबह (गर्म पानी के साथ)', glycemicIndex: 58, tags: ['antioxidant'] },
  { id: 'jaggery', name: 'Jaggery (Gur)', nameHi: 'गुड़', category: 'snacks', caloriesPer100: 383, protein: 0.4, carbs: 95, fat: 0.1, fiber: 0, portionSize: 10, portionName: '1 small piece', portionCalories: 38, bestTime: 'After meals', bestTimeHi: 'खाने के बाद', glycemicIndex: 84, tags: ['iron'] },
];
