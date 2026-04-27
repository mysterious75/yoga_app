# 🧘 YogaFit Pro

A complete health & wellness React Native app with yoga poses, diet plans, health tracking, and pain relief guides — in Hindi & English.

## Features

- 🧘 **100+ Yoga Poses** — Steps, benefits, precautions in Hindi & English
- 🍽️ **7-Day Diet Plans** — Vegetarian, Non-Vegetarian, Muscle Gain
- 📊 **Health Tracker** — BMI, water intake, weight log, sleep tracking
- 🩺 **Pain Relief Guide** — Back, knee, neck, headache, sciatica & more
- 🍎 **Food Database** — 80+ Indian foods with full nutrition info
- ⭐ **Premium Subscription** — Monthly, yearly & lifetime plans
- 🌐 **Bilingual** — Full Hindi + English support
- 👤 **Profile** — Personal goals, settings, language switching

## Screens

| Screen | Description |
|--------|-------------|
| HomeScreen | Dashboard with quick actions, daily tips, feature highlights |
| YogaScreen | All poses list with category filtering |
| YogaDetailScreen | Pose detail with steps, benefits, precautions, body parts |
| DietScreen | Diet plan categories (Veg/Non-Veg/Muscle Gain) |
| DietPlanDetailScreen | 7-day meal plan with calories |
| TrackerScreen | BMI calculator, water tracker, weight log, sleep tracker |
| FoodDatabaseScreen | Search foods by name, filter by category |
| FoodDetailScreen | Full nutrition breakdown per food item |
| PainGuideScreen | Select body part for pain relief guidance |
| PainDetailScreen | Yoga + foods + daily schedule for specific pain |
| SubscriptionScreen | Premium plans with feature comparison |
| ProfileScreen | User profile, settings, language, notifications |

## Tech Stack

- **React Native** (Expo SDK 52)
- **React Navigation** v7 (Bottom Tabs + Native Stack)
- **i18next** — Internationalization (Hindi + English)
- **AsyncStorage** — Persistent data storage
- **React Native Reanimated** — Animations

## Getting Started

```bash
# Install dependencies
npm install

# Start Expo
npx expo start

# Run on Android
npx expo start --android

# Run on iOS
npx expo start --ios
```

## Project Structure

```
YogaFitPro/
├── App.js                    # Entry point
├── app.json                  # Expo config
├── package.json              # Dependencies
├── src/
│   ├── assets/               # Icons, splash, animations
│   ├── data/
│   │   ├── yogaPoses.js      # 20+ yoga poses database
│   │   ├── foodDatabase.js   # 80+ Indian foods database
│   │   └── dietPlans.js      # 7-day meal plans
│   ├── navigation/
│   │   └── AppNavigator.js   # Bottom tabs + stack navigation
│   ├── screens/              # All 12 screens
│   └── utils/
│       ├── theme.js          # Colors, fonts, sizes, shadows
│       └── i18n.js           # Hindi + English translations
```

## License

MIT
