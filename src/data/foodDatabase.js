// Food Database — Indian + Global foods with complete nutrition
// Based on USDA FoodData Central + ICMR Indian Food Composition Tables
// All values per 100g unless specified

export const FOOD_CATEGORIES = [
  { id: 'grains', name: 'Grains & Cereals', nameHi: 'अनाज और अनाज', icon: '🌾' },
  { id: 'dal', name: 'Lentils & Pulses', nameHi: 'दालें', icon: '🫘' },
  { id: 'vegetables', name: 'Vegetables', nameHi: 'सब्ज़ियां', icon: '🥬' },
  { id: 'fruits', name: 'Fruits', nameHi: 'फल', icon: '🍎' },
  { id: 'dairy', name: 'Dairy', nameHi: 'डेयरी', icon: '🥛' },
  { id: 'meat', name: 'Meat & Fish', nameHi: 'मांस और मछली', icon: '🍗' },
  { id: 'snacks', name: 'Snacks & Sweets', nameHi: 'नाश्ता और मिठाई', icon: '🍩' },
  { id: 'beverages', name: 'Beverages', nameHi: 'पेय पदार्थ', icon: '🥤' },
  { id: 'nuts', name: 'Nuts & Seeds', nameHi: 'मेवे और बीज', icon: '🥜' },
  { id: 'oils', name: 'Oils & Fats', nameHi: 'तेल और वसा', icon: '🫒' },
];

export const FOOD_DATABASE = [
  // ============ GRAINS ============
  { id: 'roti', name: 'Roti (Chapati)', nameHi: 'रोटी', category: 'grains', caloriesPer100: 264, protein: 9.6, carbs: 52, fat: 3.5, fiber: 2.8, portionSize: 30, portionName: '1 roti', portionCalories: 79, bestTime: 'Lunch & Dinner', bestTimeHi: 'दोपहर और रात का खाना', glycemicIndex: 62 },
  { id: 'rice', name: 'White Rice (Cooked)', nameHi: 'सफ़ेद चावल', category: 'grains', caloriesPer100: 130, protein: 2.7, carbs: 28, fat: 0.3, fiber: 0.4, portionSize: 150, portionName: '1 bowl', portionCalories: 195, bestTime: 'Lunch', bestTimeHi: 'दोपहर का खाना', glycemicIndex: 73 },
  { id: 'brown_rice', name: 'Brown Rice (Cooked)', nameHi: 'ब्राउन राइस', category: 'grains', caloriesPer100: 123, protein: 2.7, carbs: 26, fat: 1.0, fiber: 1.8, portionSize: 150, portionName: '1 bowl', portionCalories: 185, bestTime: 'Lunch', bestTimeHi: 'दोपहर का खाना', glycemicIndex: 50 },
  { id: 'oats', name: 'Oats', nameHi: 'ओट्स', category: 'grains', caloriesPer100: 389, protein: 16.9, carbs: 66, fat: 6.9, fiber: 10.6, portionSize: 40, portionName: '1 bowl', portionCalories: 156, bestTime: 'Breakfast', bestTimeHi: 'सुबह का नाश्ता', glycemicIndex: 55 },
  { id: 'poha', name: 'Poha (Flattened Rice)', nameHi: 'पोहा', category: 'grains', caloriesPer100: 110, protein: 2.5, carbs: 24, fat: 0.4, fiber: 0.3, portionSize: 100, portionName: '1 plate', portionCalories: 110, bestTime: 'Breakfast', bestTimeHi: 'सुबह का नाश्ता', glycemicIndex: 65 },
  { id: 'upma', name: 'Upma', nameHi: 'उपमा', category: 'grains', caloriesPer100: 120, protein: 3.0, carbs: 22, fat: 2.5, fiber: 1.5, portionSize: 100, portionName: '1 bowl', portionCalories: 120, bestTime: 'Breakfast', bestTimeHi: 'सुबह का नाश्ता', glycemicIndex: 60 },
  { id: 'multigrain_bread', name: 'Multigrain Bread', nameHi: 'मल्टीग्रेन ब्रेड', category: 'grains', caloriesPer100: 265, protein: 9.0, carbs: 47, fat: 3.5, fiber: 5.0, portionSize: 30, portionName: '1 slice', portionCalories: 80, bestTime: 'Breakfast', bestTimeHi: 'सुबह का नाश्ता', glycemicIndex: 45 },
  { id: 'dalia', name: 'Dalia (Broken Wheat)', nameHi: 'दलिया', category: 'grains', caloriesPer100: 120, protein: 3.5, carbs: 25, fat: 0.5, fiber: 3.0, portionSize: 100, portionName: '1 bowl', portionCalories: 120, bestTime: 'Breakfast/Lunch', bestTimeHi: 'सुबह/दोपहर', glycemicIndex: 41 },

  // ============ LENTILS & PULSES ============
  { id: 'dal_tadka', name: 'Dal Tadka (Cooked)', nameHi: 'दाल तड़का', category: 'dal', caloriesPer100: 104, protein: 7.0, carbs: 15, fat: 2.5, fiber: 3.5, portionSize: 150, portionName: '1 bowl', portionCalories: 156, bestTime: 'Lunch & Dinner', bestTimeHi: 'दोपहर और रात', glycemicIndex: 29 },
  { id: 'rajma', name: 'Rajma (Kidney Beans)', nameHi: 'राजमा', category: 'dal', caloriesPer100: 127, protein: 8.7, carbs: 22.8, fat: 0.5, fiber: 6.4, portionSize: 150, portionName: '1 bowl', portionCalories: 191, bestTime: 'Lunch', bestTimeHi: 'दोपहर का खाना', glycemicIndex: 24 },
  { id: 'chana_masala', name: 'Chana Masala', nameHi: 'छोले', category: 'dal', caloriesPer100: 164, protein: 8.9, carbs: 27, fat: 2.6, fiber: 7.6, portionSize: 150, portionName: '1 bowl', portionCalories: 246, bestTime: 'Lunch', bestTimeHi: 'दोपहर का खाना', glycemicIndex: 28 },
  { id: 'moong_dal', name: 'Moong Dal (Cooked)', nameHi: 'मूंग दाल', category: 'dal', caloriesPer100: 105, protein: 7.6, carbs: 16.3, fat: 0.4, fiber: 4.5, portionSize: 150, portionName: '1 bowl', portionCalories: 158, bestTime: 'Lunch & Dinner', bestTimeHi: 'दोपहर और रात', glycemicIndex: 26 },
  { id: 'toor_dal', name: 'Toor Dal (Cooked)', nameHi: 'तूर दाल', category: 'dal', caloriesPer100: 118, protein: 8.2, carbs: 19.5, fat: 0.6, fiber: 5.0, portionSize: 150, portionName: '1 bowl', portionCalories: 177, bestTime: 'Lunch & Dinner', bestTimeHi: 'दोपहर और रात', glycemicIndex: 22 },
  { id: 'sprouts', name: 'Moong Sprouts', nameHi: 'अंकुरित मूंग', category: 'dal', caloriesPer100: 30, protein: 3.0, carbs: 5.9, fat: 0.2, fiber: 1.8, portionSize: 100, portionName: '1 cup', portionCalories: 30, bestTime: 'Breakfast/Snack', bestTimeHi: 'सुबह/नाश्ता', glycemicIndex: 25 },

  // ============ VEGETABLES ============
  { id: 'palak', name: 'Spinach (Cooked)', nameHi: 'पालक', category: 'vegetables', caloriesPer100: 23, protein: 2.9, carbs: 3.6, fat: 0.4, fiber: 2.2, portionSize: 100, portionName: '1 bowl', portionCalories: 23, bestTime: 'Lunch & Dinner', bestTimeHi: 'दोपहर और रात', glycemicIndex: 15 },
  { id: 'broccoli', name: 'Broccoli (Cooked)', nameHi: 'ब्रोकली', category: 'vegetables', caloriesPer100: 35, protein: 2.4, carbs: 7.2, fat: 0.4, fiber: 3.3, portionSize: 100, portionName: '1 cup', portionCalories: 35, bestTime: 'Lunch', bestTimeHi: 'दोपहर का खाना', glycemicIndex: 10 },
  { id: 'aloo_gobi', name: 'Aloo Gobi', nameHi: 'आलू गोभी', category: 'vegetables', caloriesPer100: 95, protein: 2.5, carbs: 13, fat: 4.0, fiber: 2.5, portionSize: 150, portionName: '1 bowl', portionCalories: 143, bestTime: 'Lunch', bestTimeHi: 'दोपहर का खाना', glycemicIndex: 55 },
  { id: 'bhindi', name: 'Bhindi (Okra)', nameHi: 'भिंडी', category: 'vegetables', caloriesPer100: 33, protein: 1.9, carbs: 7.0, fat: 0.1, fiber: 3.2, portionSize: 100, portionName: '1 bowl', portionCalories: 33, bestTime: 'Lunch', bestTimeHi: 'दोपहर का खाना', glycemicIndex: 20 },
  { id: 'baingan', name: 'Baingan (Eggplant)', nameHi: 'बैंगन', category: 'vegetables', caloriesPer100: 25, protein: 1.0, carbs: 6.0, fat: 0.2, fiber: 3.0, portionSize: 100, portionName: '1 bowl', portionCalories: 25, bestTime: 'Lunch & Dinner', bestTimeHi: 'दोपहर और रात', glycemicIndex: 15 },
  { id: 'lauki', name: 'Lauki (Bottle Gourd)', nameHi: 'लौकी', category: 'vegetables', caloriesPer100: 14, protein: 0.6, carbs: 3.4, fat: 0.1, fiber: 0.5, portionSize: 150, portionName: '1 bowl', portionCalories: 21, bestTime: 'Lunch', bestTimeHi: 'दोपहर का खाना', glycemicIndex: 15 },
  { id: 'matar', name: 'Green Peas', nameHi: 'मटर', category: 'vegetables', caloriesPer100: 81, protein: 5.4, carbs: 14.5, fat: 0.4, fiber: 5.7, portionSize: 80, portionName: '1/2 cup', portionCalories: 65, bestTime: 'Lunch', bestTimeHi: 'दोपहर का खाना', glycemicIndex: 48 },
  { id: 'carrot', name: 'Carrot', nameHi: 'गाजर', category: 'vegetables', caloriesPer100: 41, protein: 0.9, carbs: 9.6, fat: 0.2, fiber: 2.8, portionSize: 80, portionName: '1 medium', portionCalories: 33, bestTime: 'Any time', bestTimeHi: 'कभी भी', glycemicIndex: 39 },

  // ============ FRUITS ============
  { id: 'apple', name: 'Apple', nameHi: 'सेब', category: 'fruits', caloriesPer100: 52, protein: 0.3, carbs: 14, fat: 0.2, fiber: 2.4, portionSize: 150, portionName: '1 medium', portionCalories: 78, bestTime: 'Morning/Evening snack', bestTimeHi: 'सुबह/शाम का नाश्ता', glycemicIndex: 36 },
  { id: 'banana', name: 'Banana', nameHi: 'केला', category: 'fruits', caloriesPer100: 89, protein: 1.1, carbs: 23, fat: 0.3, fiber: 2.6, portionSize: 100, portionName: '1 medium', portionCalories: 89, bestTime: 'Pre-workout/Morning', bestTimeHi: 'वर्कआउट से पहले/सुबह', glycemicIndex: 51 },
  { id: 'mango', name: 'Mango', nameHi: 'आम', category: 'fruits', caloriesPer100: 60, protein: 0.8, carbs: 15, fat: 0.4, fiber: 1.6, portionSize: 100, portionName: '1/2 cup', portionCalories: 60, bestTime: 'Morning', bestTimeHi: 'सुबह', glycemicIndex: 56 },
  { id: 'papaya', name: 'Papaya', nameHi: 'पपीता', category: 'fruits', caloriesPer100: 43, protein: 0.5, carbs: 11, fat: 0.3, fiber: 1.7, portionSize: 150, portionName: '1 cup', portionCalories: 65, bestTime: 'Morning (empty stomach)', bestTimeHi: 'सुबह (खाली पेट)', glycemicIndex: 60 },
  { id: 'orange', name: 'Orange', nameHi: 'संतरा', category: 'fruits', caloriesPer100: 47, protein: 0.9, carbs: 12, fat: 0.1, fiber: 2.4, portionSize: 130, portionName: '1 medium', portionCalories: 61, bestTime: 'Morning/Evening', bestTimeHi: 'सुबह/शाम', glycemicIndex: 43 },
  { id: 'watermelon', name: 'Watermelon', nameHi: 'तरबूज', category: 'fruits', caloriesPer100: 30, protein: 0.6, carbs: 8, fat: 0.2, fiber: 0.4, portionSize: 200, portionName: '1 cup', portionCalories: 60, bestTime: 'Afternoon', bestTimeHi: 'दोपहर', glycemicIndex: 76 },
  { id: 'guava', name: 'Guava', nameHi: 'अमरूद', category: 'fruits', caloriesPer100: 68, protein: 2.6, carbs: 14, fat: 1.0, fiber: 5.4, portionSize: 100, portionName: '1 medium', portionCalories: 68, bestTime: 'Morning', bestTimeHi: 'सुबह', glycemicIndex: 12 },
  { id: 'pomegranate', name: 'Pomegranate', nameHi: 'अनार', category: 'fruits', caloriesPer100: 83, protein: 1.7, carbs: 19, fat: 1.2, fiber: 4.0, portionSize: 80, portionName: '1/2 cup seeds', portionCalories: 66, bestTime: 'Morning', bestTimeHi: 'सुबह', glycemicIndex: 35 },

  // ============ DAIRY ============
  { id: 'milk', name: 'Whole Milk', nameHi: 'पूरा दूध', category: 'dairy', caloriesPer100: 61, protein: 3.2, carbs: 4.8, fat: 3.3, fiber: 0, portionSize: 200, portionName: '1 glass', portionCalories: 122, bestTime: 'Morning/Bedtime', bestTimeHi: 'सुबह/सोने से पहले', glycemicIndex: 31 },
  { id: 'dahi', name: 'Curd (Dahi)', nameHi: 'दही', category: 'dairy', caloriesPer100: 98, protein: 4.3, carbs: 7.0, fat: 5.0, fiber: 0, portionSize: 100, portionName: '1 cup', portionCalories: 98, bestTime: 'Lunch', bestTimeHi: 'दोपहर का खाना', glycemicIndex: 36 },
  { id: 'paneer', name: 'Paneer', nameHi: 'पनीर', category: 'dairy', caloriesPer100: 265, protein: 18.3, carbs: 4.5, fat: 20.8, fiber: 0, portionSize: 50, portionName: '2 cubes', portionCalories: 133, bestTime: 'Lunch/Dinner', bestTimeHi: 'दोपहर/रात', glycemicIndex: 27 },
  { id: 'buttermilk', name: 'Buttermilk (Chaas)', nameHi: 'छाछ', category: 'dairy', caloriesPer100: 40, protein: 3.3, carbs: 4.8, fat: 0.9, fiber: 0, portionSize: 200, portionName: '1 glass', portionCalories: 80, bestTime: 'After lunch', bestTimeHi: 'खाने के बाद', glycemicIndex: 20 },
  { id: 'lassi', name: 'Sweet Lassi', nameHi: 'लस्सी', category: 'dairy', caloriesPer100: 88, protein: 3.0, carbs: 14, fat: 2.5, fiber: 0, portionSize: 200, portionName: '1 glass', portionCalories: 176, bestTime: 'Afternoon', bestTimeHi: 'दोपहर', glycemicIndex: 40 },
  { id: 'cheese', name: 'Cheese', nameHi: 'चीज़', category: 'dairy', caloriesPer100: 350, protein: 21, carbs: 2.5, fat: 28, fiber: 0, portionSize: 30, portionName: '1 slice', portionCalories: 105, bestTime: 'Breakfast', bestTimeHi: 'सुबह का नाश्ता', glycemicIndex: 27 },

  // ============ MEAT & FISH ============
  { id: 'chicken_breast', name: 'Chicken Breast (Grilled)', nameHi: 'ग्रिल्ड चिकन ब्रेस्ट', category: 'meat', caloriesPer100: 165, protein: 31, carbs: 0, fat: 3.6, fiber: 0, portionSize: 100, portionName: '1 piece', portionCalories: 165, bestTime: 'Lunch', bestTimeHi: 'दोपहर का खाना', glycemicIndex: 0 },
  { id: 'eggs', name: 'Egg (Boiled)', nameHi: 'उबला अंडा', category: 'meat', caloriesPer100: 155, protein: 13, carbs: 1.1, fat: 11, fiber: 0, portionSize: 50, portionName: '1 egg', portionCalories: 78, bestTime: 'Breakfast', bestTimeHi: 'सुबह का नाश्ता', glycemicIndex: 0 },
  { id: 'fish_curry', name: 'Fish Curry', nameHi: 'मछली करी', category: 'meat', caloriesPer100: 140, protein: 18, carbs: 5, fat: 5.5, fiber: 0.5, portionSize: 150, portionName: '1 bowl', portionCalories: 210, bestTime: 'Lunch', bestTimeHi: 'दोपहर का खाना', glycemicIndex: 0 },
  { id: 'mutton_curry', name: 'Mutton Curry', nameHi: 'मटन करी', category: 'meat', caloriesPer100: 210, protein: 20, carbs: 5, fat: 12, fiber: 0.5, portionSize: 100, portionName: '1 bowl', portionCalories: 210, bestTime: 'Lunch', bestTimeHi: 'दोपहर का खाना', glycemicIndex: 0 },

  // ============ SNACKS & SWEETS ============
  { id: 'samosa', name: 'Samosa', nameHi: 'समोसा', category: 'snacks', caloriesPer100: 262, protein: 4.0, carbs: 28, fat: 15, fiber: 1.5, portionSize: 50, portionName: '1 piece', portionCalories: 131, bestTime: 'Evening snack (occasional)', bestTimeHi: 'शाम का नाश्ता (कभी-कभी)', glycemicIndex: 65 },
  { id: 'biscuit', name: 'Marie Biscuit', nameHi: 'मैरी बिस्कुट', category: 'snacks', caloriesPer100: 360, protein: 7.0, carbs: 72, fat: 5.0, fiber: 2.0, portionSize: 7, portionName: '1 biscuit', portionCalories: 25, bestTime: 'Tea time', bestTimeHi: 'चाय के साथ', glycemicIndex: 70 },
  { id: 'namkeen', name: 'Namkeen (Mixed)', nameHi: 'नमकीन', category: 'snacks', caloriesPer100: 480, protein: 8.0, carbs: 48, fat: 30, fiber: 2.0, portionSize: 25, portionName: '1 small bowl', portionCalories: 120, bestTime: 'Evening (small portion)', bestTimeHi: 'शाम (छोटी प्लेट)', glycemicIndex: 55 },
  { id: 'jalebi', name: 'Jalebi', nameHi: 'जलेबी', category: 'snacks', caloriesPer100: 380, protein: 3.0, carbs: 60, fat: 16, fiber: 0.5, portionSize: 30, portionName: '1 piece', portionCalories: 114, bestTime: 'Festival/Occasional', bestTimeHi: 'त्योहार/कभी-कभी', glycemicIndex: 80 },
  { id: 'gulab_jamun', name: 'Gulab Jamun', nameHi: 'गुलाब जामुन', category: 'snacks', caloriesPer100: 350, protein: 4.0, carbs: 52, fat: 15, fiber: 0.3, portionSize: 35, portionName: '1 piece', portionCalories: 123, bestTime: 'Festival/Occasional', bestTimeHi: 'त्योहार/कभी-कभी', glycemicIndex: 75 },
  { id: 'dhokla', name: 'Dhokla', nameHi: 'ढोकला', category: 'snacks', caloriesPer100: 160, protein: 5.0, carbs: 22, fat: 5.0, fiber: 1.5, portionSize: 50, portionName: '2 pieces', portionCalories: 80, bestTime: 'Breakfast/Snack', bestTimeHi: 'सुबह/नाश्ता', glycemicIndex: 45 },

  // ============ BEVERAGES ============
  { id: 'chai', name: 'Chai (with sugar)', nameHi: 'चाय (चीनी के साथ)', category: 'beverages', caloriesPer100: 45, protein: 0.8, carbs: 8, fat: 1.2, fiber: 0, portionSize: 150, portionName: '1 cup', portionCalories: 68, bestTime: 'Morning/Evening', bestTimeHi: 'सुबह/शाम', glycemicIndex: 60 },
  { id: 'chai_no_sugar', name: 'Chai (No Sugar)', nameHi: 'चाय (बिना चीनी)', category: 'beverages', caloriesPer100: 20, protein: 0.8, carbs: 3, fat: 0.8, fiber: 0, portionSize: 150, portionName: '1 cup', portionCalories: 30, bestTime: 'Morning/Evening', bestTimeHi: 'सुबह/शाम', glycemicIndex: 30 },
  { id: 'coffee', name: 'Coffee (with milk)', nameHi: 'कॉफ़ी (दूध के साथ)', category: 'beverages', caloriesPer100: 35, protein: 1.0, carbs: 5, fat: 1.0, fiber: 0, portionSize: 150, portionName: '1 cup', portionCalories: 53, bestTime: 'Morning', bestTimeHi: 'सुबह', glycemicIndex: 40 },
  { id: 'nimbu_pani', name: 'Nimbu Pani (Lemon Water)', nameHi: 'नींबू पानी', category: 'beverages', caloriesPer100: 10, protein: 0.1, carbs: 2.5, fat: 0, fiber: 0, portionSize: 200, portionName: '1 glass', portionCalories: 20, bestTime: 'Morning (empty stomach)', bestTimeHi: 'सुबह (खाली पेट)', glycemicIndex: 15 },
  { id: 'green_tea', name: 'Green Tea', nameHi: 'ग्रीन टी', category: 'beverages', caloriesPer100: 1, protein: 0, carbs: 0, fat: 0, fiber: 0, portionSize: 200, portionName: '1 cup', portionCalories: 2, bestTime: 'Between meals', bestTimeHi: 'खाने के बीच में', glycemicIndex: 0 },
  { id: 'lassi_salty', name: 'Salted Lassi/Chaas', nameHi: 'नमकीन छाछ/लस्सी', category: 'beverages', caloriesPer100: 35, protein: 2.5, carbs: 4, fat: 1.0, fiber: 0, portionSize: 200, portionName: '1 glass', portionCalories: 70, bestTime: 'After lunch', bestTimeHi: 'खाने के बाद', glycemicIndex: 20 },

  // ============ NUTS & SEEDS ============
  { id: 'almonds', name: 'Almonds', nameHi: 'बादाम', category: 'nuts', caloriesPer100: 579, protein: 21, carbs: 22, fat: 50, fiber: 12.5, portionSize: 10, portionName: '6-8 pieces', portionCalories: 58, bestTime: 'Morning (soaked)', bestTimeHi: 'सुबह (भिगोकर)', glycemicIndex: 15 },
  { id: 'walnuts', name: 'Walnuts', nameHi: 'अखरोट', category: 'nuts', caloriesPer100: 654, protein: 15, carbs: 14, fat: 65, fiber: 6.7, portionSize: 10, portionName: '2-3 halves', portionCalories: 65, bestTime: 'Morning', bestTimeHi: 'सुबह', glycemicIndex: 15 },
  { id: 'cashews', name: 'Cashews', nameHi: 'काजू', category: 'nuts', caloriesPer100: 553, protein: 18, carbs: 30, fat: 44, fiber: 3.3, portionSize: 10, portionName: '4-5 pieces', portionCalories: 55, bestTime: 'Snack', bestTimeHi: 'नाश्ता', glycemicIndex: 22 },
  { id: 'peanuts', name: 'Peanuts', nameHi: 'मूंगफली', category: 'nuts', caloriesPer100: 567, protein: 26, carbs: 16, fat: 49, fiber: 8.5, portionSize: 20, portionName: '1 small handful', portionCalories: 113, bestTime: 'Evening snack', bestTimeHi: 'शाम का नाश्ता', glycemicIndex: 14 },
  { id: 'flaxseeds', name: 'Flax Seeds', nameHi: 'अलसी के बीज', category: 'nuts', caloriesPer100: 534, protein: 18, carbs: 29, fat: 42, fiber: 27, portionSize: 10, portionName: '1 tbsp', portionCalories: 53, bestTime: 'Morning', bestTimeHi: 'सुबह', glycemicIndex: 35 },
  { id: 'chia_seeds', name: 'Chia Seeds', nameHi: 'चिया सीड्स', category: 'nuts', caloriesPer100: 486, protein: 17, carbs: 42, fat: 31, fiber: 34, portionSize: 10, portionName: '1 tbsp', portionCalories: 49, bestTime: 'Morning (soaked)', bestTimeHi: 'सुबह (भिगोकर)', glycemicIndex: 30 },

  // ============ OILS & FATS ============
  { id: 'ghee', name: 'Ghee', nameHi: 'घी', category: 'oils', caloriesPer100: 900, protein: 0, carbs: 0, fat: 100, fiber: 0, portionSize: 5, portionName: '1 tsp', portionCalories: 45, bestTime: 'With meals', bestTimeHi: 'खाने के साथ', glycemicIndex: 0 },
  { id: 'olive_oil', name: 'Olive Oil', nameHi: 'जैतून का तेल', category: 'oils', caloriesPer100: 884, protein: 0, carbs: 0, fat: 100, fiber: 0, portionSize: 10, portionName: '1 tbsp', portionCalories: 88, bestTime: 'Cooking/Salad', bestTimeHi: 'खाना बनाते/सलाद', glycemicIndex: 0 },
  { id: 'coconut_oil', name: 'Coconut Oil', nameHi: 'नारियल तेल', category: 'oils', caloriesPer100: 862, protein: 0, carbs: 0, fat: 100, fiber: 0, portionSize: 10, portionName: '1 tbsp', portionCalories: 86, bestTime: 'Cooking', bestTimeHi: 'खाना बनाते', glycemicIndex: 0 },
  { id: 'butter', name: 'Butter', nameHi: 'मक्खन', category: 'oils', caloriesPer100: 717, protein: 0.9, carbs: 0.1, fat: 81, fiber: 0, portionSize: 5, portionName: '1 tsp', portionCalories: 36, bestTime: 'Breakfast', bestTimeHi: 'सुबह का नाश्ता', glycemicIndex: 0 },
];

// Special food recommendations for health conditions
export const CONDITION_FOODS = {
  weight_loss: {
    name: 'Weight Loss',
    nameHi: 'वज़न घटाएं',
    eat: ['oats', 'sprouts', 'palak', 'broccoli', 'egg', 'chicken_breast', 'brown_rice', 'guava', 'green_tea', 'buttermilk', 'dalia'],
    avoid: ['samosa', 'jalebi', 'gulab_jamun', 'mango', 'white_rice', 'lassi', 'ghee', 'butter', 'namkeen', 'potato_chips'],
    tips: [
      'Eat small meals every 3-4 hours',
      'Drink 3-4 liters of water daily',
      'Avoid eating after 8 PM',
      'Include protein in every meal',
      'Reduce sugar and oil intake',
    ],
    tipsHi: [
      'हर 3-4 घंटे में छोटे भोजन खाएं',
      'रोज़ 3-4 लीटर पानी पिएं',
      'रात 8 बजे के बाद न खाएं',
      'हर भोजन में प्रोटीन शामिल करें',
      'चीनी और तेल कम करें',
    ],
  },
  diabetes: {
    name: 'Diabetes Friendly',
    nameHi: 'मधुमेह के लिए',
    eat: ['brown_rice', 'moong_dal', 'broccoli', 'guava', 'egg', 'fish_curry', 'green_tea', 'flaxseeds', 'oats', 'dalia'],
    avoid: ['white_rice', 'banana', 'mango', 'watermelon', 'jalebi', 'gulab_jamun', 'samosa', 'lassi', 'bread'],
    tips: [
      'Eat low glycemic index foods',
      'Avoid sugar completely',
      'Eat at regular intervals',
      'Include fiber-rich foods',
      'Monitor portion sizes',
    ],
    tipsHi: [
      'कम ग्लाइसेमिक इंडेक्स वाला खाना खाएं',
      'चीनी पूरी तरह बंद करें',
      'नियमित समय पर खाएं',
      'फाइबर युक्त भोजन शामिल करें',
      'हिस्से का आकार देखें',
    ],
  },
  pcod: {
    name: 'PCOD/PCOS Friendly',
    nameHi: 'PCOD/PCOS के लिए',
    eat: ['brown_rice', 'moong_dal', 'broccoli', 'flaxseeds', 'chia_seeds', 'walnuts', 'egg', 'palak', 'green_tea'],
    avoid: ['white_rice', 'bread', 'sweets', 'fried_food', 'sugary_drinks', 'processed_food'],
    tips: [
      'Anti-inflammatory diet follow karo',
      'Low GI foods khao',
      'Regular meals khao, skip mat karo',
      'Omega-3 rich foods include karo',
      'Exercise daily (yoga best hai)',
    ],
    tipsHi: [
      'सूजन-रोधी आहार लें',
      'कम GI वाला खाना खाएं',
      'नियमित भोजन करें, स्किप न करें',
      'ओमेगा-3 युक्त भोजन शामिल करें',
      'रोज़ व्यायाम करें (योग सबसे अच्छा)',
    ],
  },
  high_bp: {
    name: 'High Blood Pressure',
    nameHi: 'हाई ब्लड प्रेशर',
    eat: ['palak', 'banana', 'orange', 'broccoli', 'low_fat_dahi', 'oats', 'garlic', 'beetroot'],
    avoid: ['pickles', 'papad', 'namkeen', 'processed_food', 'excess_salt', 'chai', 'coffee'],
    tips: [
      'Reduce salt intake (under 5g/day)',
      'Eat potassium-rich foods',
      'Avoid processed and packaged foods',
      'Exercise regularly',
      'Manage stress with yoga',
    ],
    tipsHi: [
      'नमक कम खाएं (5g से कम/दिन)',
      'पोटैशियम युक्त भोजन खाएं',
      'प्रोसेस्ड और पैकेज्ड फूड से बचें',
      'नियमित व्यायाम करें',
      'योग से तनाव कम करें',
    ],
  },
  back_pain: {
    name: 'Back Pain Relief Diet',
    nameHi: 'कमर दर्द के लिए आहार',
    eat: ['walnuts', 'fish_curry', 'egg', 'milk', 'curd', 'spinach', 'almonds', 'flaxseeds'],
    avoid: ['fried_food', 'sugar', 'processed_food', 'excess_caffeine', 'alcohol'],
    tips: [
      'Anti-inflammatory foods khao',
      'Calcium aur Vitamin D rich foods',
      'Haldi wala dhu pee raat ko',
      'Hydrated raho',
      'Weight maintain karo',
    ],
    tipsHi: [
      'सूजन-रोधी भोजन खाएं',
      'कैल्शियम और विटामिन D युक्त भोजन',
      'रात को हल्दी वाला दूध पिएं',
      'पानी पीते रहें',
      'वज़न नियंत्रित रखें',
    ],
  },
};

// Daily calorie needs calculator
export const calculateDailyCalories = (gender, age, weight, height, activityLevel) => {
  let bmr;
  if (gender === 'male') {
    bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
  } else {
    bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
  }
  const activityMultipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    very_active: 1.9,
  };
  return Math.round(bmr * (activityMultipliers[activityLevel] || 1.2));
};

export default { FOOD_CATEGORIES, FOOD_DATABASE, CONDITION_FOODS, calculateDailyCalories };
