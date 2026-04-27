// Food Database — Indian + Global foods with complete nutrition
// Based on USDA FoodData Central + ICMR Indian Food Composition Tables
// All values per 100g unless specified

export const FOOD_CATEGORIES = [
  { id: 'oils', name: 'Oils & Fats', nameHi: 'तेल और वसा', icon: '🫒' },
];

export const FOOD_DATABASE = [
  // ============ GRAINS ============
    tags: ['fiber'],
  { id: 'dalia', name: 'Dalia (Broken Wheat)', nameHi: 'दलिया', category: 'grains', caloriesPer100: 120, protein: 3.5, carbs: 25, fat: 0.5, fiber: 3.0, portionSize: 100, portionName: '1 bowl', portionCalories: 120, bestTime: 'Breakfast/Lunch', bestTimeHi: 'सुबह/दोपहर', glycemicIndex: 41 },
    tags: ['fiber', 'carbs'],

  // ============ LENTILS & PULSES ============
    tags: ['protein', 'fiber', 'digestive'],
  { id: 'sprouts', name: 'Moong Sprouts', nameHi: 'अंकुरित मूंग', category: 'dal', caloriesPer100: 30, protein: 3.0, carbs: 5.9, fat: 0.2, fiber: 1.8, portionSize: 100, portionName: '1 cup', portionCalories: 30, bestTime: 'Breakfast/Snack', bestTimeHi: 'सुबह/नाश्ता', glycemicIndex: 25 },
    tags: ['protein', 'fiber', 'digestive'],

  // ============ VEGETABLES ============
    tags: ['vitamin_a', 'fiber'],
  { id: 'carrot', name: 'Carrot', nameHi: 'गाजर', category: 'vegetables', caloriesPer100: 41, protein: 0.9, carbs: 9.6, fat: 0.2, fiber: 2.8, portionSize: 80, portionName: '1 medium', portionCalories: 33, bestTime: 'Any time', bestTimeHi: 'कभी भी', glycemicIndex: 39 },
    tags: ['vitamin_a', 'fiber'],

  // ============ FRUITS ============
    tags: ['iron', 'vitamin_c', 'anti_inflammatory'],
  { id: 'pomegranate', name: 'Pomegranate', nameHi: 'अनार', category: 'fruits', caloriesPer100: 83, protein: 1.7, carbs: 19, fat: 1.2, fiber: 4.0, portionSize: 80, portionName: '1/2 cup seeds', portionCalories: 66, bestTime: 'Morning', bestTimeHi: 'सुबह', glycemicIndex: 35 },
    tags: ['iron', 'vitamin_c', 'anti_inflammatory'],

  // ============ DAIRY ============
    tags: ['calcium', 'protein'],
  { id: 'cheese', name: 'Cheese', nameHi: 'चीज़', category: 'dairy', caloriesPer100: 350, protein: 21, carbs: 2.5, fat: 28, fiber: 0, portionSize: 30, portionName: '1 slice', portionCalories: 105, bestTime: 'Breakfast', bestTimeHi: 'सुबह का नाश्ता', glycemicIndex: 27 },
    tags: ['calcium', 'protein'],

  // ============ MEAT & FISH ============
    tags: ['protein'],
  { id: 'mutton_curry', name: 'Mutton Curry', nameHi: 'मटन करी', category: 'meat', caloriesPer100: 210, protein: 20, carbs: 5, fat: 12, fiber: 0.5, portionSize: 100, portionName: '1 bowl', portionCalories: 210, bestTime: 'Lunch', bestTimeHi: 'दोपहर का खाना', glycemicIndex: 0 },
    tags: ['protein', 'iron'],

  // ============ SNACKS & SWEETS ============
  { id: 'dhokla', name: 'Dhokla', nameHi: 'ढोकला', category: 'snacks', caloriesPer100: 160, protein: 5.0, carbs: 22, fat: 5.0, fiber: 1.5, portionSize: 50, portionName: '2 pieces', portionCalories: 80, bestTime: 'Breakfast/Snack', bestTimeHi: 'सुबह/नाश्ता', glycemicIndex: 45 },
    tags: ['carbs', 'protein'],

  // ============ BEVERAGES ============
  { id: 'lassi_salty', name: 'Salted Lassi/Chaas', nameHi: 'नमकीन छाछ/लस्सी', category: 'beverages', caloriesPer100: 35, protein: 2.5, carbs: 4, fat: 1.0, fiber: 0, portionSize: 200, portionName: '1 glass', portionCalories: 70, bestTime: 'After lunch', bestTimeHi: 'खाने के बाद', glycemicIndex: 20 },

  // ============ NUTS & SEEDS ============
    tags: ['omega3'],
  { id: 'chia_seeds', name: 'Chia Seeds', nameHi: 'चिया सीड्स', category: 'nuts', caloriesPer100: 486, protein: 17, carbs: 42, fat: 31, fiber: 34, portionSize: 10, portionName: '1 tbsp', portionCalories: 49, bestTime: 'Morning (soaked)', bestTimeHi: 'सुबह (भिगोकर)', glycemicIndex: 30 },

  // ============ OILS & FATS ============
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
