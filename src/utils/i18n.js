import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Navigation
      home: 'Home',
      yoga: 'Yoga',
      diet: 'Diet',
      tracker: 'Tracker',
      profile: 'Profile',

      // Home
      welcome: 'Welcome to YogaFit Pro',
      subtitle: 'Your complete health & wellness companion',
      dailyGoal: 'Daily Goal',
      quickActions: 'Quick Actions',
      startYoga: 'Start Yoga',
      viewDiet: 'View Diet Plan',
      trackWeight: 'Track Weight',
      painRelief: 'Pain Relief',
      foodDatabase: 'Food Database',

      // Yoga
      allPoses: 'All Poses',
      beginner: 'Beginner',
      intermediate: 'Intermediate',
      advanced: 'Advanced',
      byGoal: 'By Goal',
      weightLoss: 'Weight Loss',
      flexibility: 'Flexibility',
      stressRelief: 'Stress Relief',
      howTo: 'How To Do',
      benefits: 'Benefits',
      precautions: 'Precautions',
      duration: 'Duration',
      calories: 'Calories/min',
      difficulty: 'Difficulty',
      steps: 'Steps',

      // Diet
      dietPlans: 'Diet Plans',
      vegPlan: 'Vegetarian',
      nonVegPlan: 'Non-Vegetarian',
      muscleGain: 'Muscle Gain',
      todayMeals: "Today's Meals",
      breakfast: 'Breakfast',
      lunch: 'Lunch',
      dinner: 'Dinner',
      snack: 'Snack',
      earlyMorning: 'Early Morning',
      totalCalories: 'Total Calories',

      // Tracker
      healthTracker: 'Health Tracker',
      weight: 'Weight',
      water: 'Water',
      steps_count: 'Steps',
      sleep: 'Sleep',
      bmi: 'BMI',
      logWeight: 'Log Weight',
      addWater: 'Add Water',
      weeklyProgress: 'Weekly Progress',
      monthlyProgress: 'Monthly Progress',

      // Pain
      painGuide: 'Pain & Problem Guide',
      selectBodyPart: 'Select Body Part',
      backPain: 'Back Pain',
      kneePain: 'Knee Pain',
      neckPain: 'Neck Pain',
      headache: 'Headache',
      digestion: 'Digestion',
      redFlags: '⚠️ See a Doctor If:',
      recommendedYoga: 'Recommended Yoga',
      recommendedFoods: 'Recommended Foods',
      schedule: 'Schedule',

      // Food
      searchFood: 'Search food...',
      caloriesLabel: 'Calories',
      protein: 'Protein',
      carbs: 'Carbs',
      fat: 'Fat',
      fiber: 'Fiber',
      per100g: 'per 100g',
      bestTime: 'Best Time to Eat',

      // Subscription
      premium: 'YogaFit Pro Premium',
      unlockAll: 'Unlock all features',
      monthlyPlan: 'Monthly',
      yearlyPlan: 'Yearly',
      perMonth: '/month',
      perYear: '/year',
      savePercent: 'Save 18%',
      subscribe: 'Subscribe',
      restorePurchase: 'Restore Purchase',
      freeFeatures: 'Free Features',
      premiumFeatures: 'Premium Features',

      // Common
      hindi: 'हिंदी',
      english: 'English',
      language: 'Language',
      settings: 'Settings',
      about: 'About',
      disclaimer: 'This app provides general health guidance only. Always consult a qualified healthcare professional for medical advice.',
    },
  },
  hi: {
    translation: {
      // Navigation
      home: 'होम',
      yoga: 'योग',
      diet: 'आहार',
      tracker: 'ट्रैकर',
      profile: 'प्रोफ़ाइल',

      // Home
      welcome: 'YogaFit Pro में आपका स्वागत है',
      subtitle: 'आपका पूर्ण स्वास्थ्य और वेलनेस साथी',
      dailyGoal: 'दैनिक लक्ष्य',
      quickActions: 'त्वरित कार्य',
      startYoga: 'योग शुरू करें',
      viewDiet: 'आहार योजना देखें',
      trackWeight: 'वज़न ट्रैक करें',
      painRelief: 'दर्द से राहत',
      foodDatabase: 'फ़ूड डेटाबेस',

      // Yoga
      allPoses: 'सभी आसन',
      beginner: 'शुरुआती',
      intermediate: 'मध्यम',
      advanced: 'उन्नत',
      byGoal: 'लक्ष्य के अनुसार',
      weightLoss: 'वज़न घटाएं',
      flexibility: 'लचीलापन',
      stressRelief: 'तनाव मुक्ति',
      howTo: 'कैसे करें',
      benefits: 'फ़ायदे',
      precautions: 'सावधानियां',
      duration: 'अवधि',
      calories: 'कैलोरी/मिनट',
      difficulty: 'कठिनाई',
      steps: 'चरण',

      // Diet
      dietPlans: 'आहार योजनाएं',
      vegPlan: 'शाकाहारी',
      nonVegPlan: 'मांसाहारी',
      muscleGain: 'मसल्स बनाएं',
      todayMeals: 'आज का खाना',
      breakfast: 'नाश्ता',
      lunch: 'दोपहर का खाना',
      dinner: 'रात का खाना',
      snack: 'नाश्ता',
      earlyMorning: 'सुबह जल्दी',
      totalCalories: 'कुल कैलोरी',

      // Tracker
      healthTracker: 'स्वास्थ्य ट्रैकर',
      weight: 'वज़न',
      water: 'पानी',
      steps_count: 'कदम',
      sleep: 'नींद',
      bmi: 'BMI',
      logWeight: 'वज़न दर्ज करें',
      addWater: 'पानी जोड़ें',
      weeklyProgress: 'साप्ताहिक प्रगति',
      monthlyProgress: 'मासिक प्रगति',

      // Pain
      painGuide: 'दर्द और समस्या गाइड',
      selectBodyPart: 'शरीर का हिस्सा चुनें',
      backPain: 'कमर दर्द',
      kneePain: 'घुटने का दर्द',
      neckPain: 'गर्दन का दर्द',
      headache: 'सिरदर्द',
      digestion: 'पाचन',
      redFlags: '⚠️ डॉक्टर के पास जाएं अगर:',
      recommendedYoga: 'अनुशंसित योग',
      recommendedFoods: 'अनुशंसित भोजन',
      schedule: 'समय-सारणी',

      // Food
      searchFood: 'भोजन खोजें...',
      caloriesLabel: 'कैलोरी',
      protein: 'प्रोटीन',
      carbs: 'कार्ब्स',
      fat: 'वसा',
      fiber: 'फाइबर',
      per100g: 'प्रति 100ग्रा',
      bestTime: 'खाने का सबसे अच्छा समय',

      // Subscription
      premium: 'YogaFit Pro प्रीमियम',
      unlockAll: 'सभी सुविधाएं अनलॉक करें',
      monthlyPlan: 'मासिक',
      yearlyPlan: 'वार्षिक',
      perMonth: '/महीना',
      perYear: '/साल',
      savePercent: '18% बचाएं',
      subscribe: 'सब्सक्राइब करें',
      restorePurchase: 'खरीदारी पुनर्स्थापित करें',
      freeFeatures: 'मुफ़्त सुविधाएं',
      premiumFeatures: 'प्रीमियम सुविधाएं',

      // Common
      hindi: 'हिंदी',
      english: 'English',
      language: 'भाषा',
      settings: 'सेटिंग्स',
      about: 'ऐप के बारे में',
      disclaimer: 'यह ऐप केवल सामान्य स्वास्थ्य मार्गदर्शन प्रदान करता है। चिकित्सा सलाह के लिए हमेशा योग्य स्वास्थ्य पेशेवर से परामर्श करें।',
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
