import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, View, StyleSheet } from 'react-native';
import { COLORS, SIZES, SHADOWS } from '../utils/theme';

// Screens
import HomeScreen from '../screens/HomeScreen';
import YogaScreen from '../screens/YogaScreen';
import YogaDetailScreen from '../screens/YogaDetailScreen';
import DietScreen from '../screens/DietScreen';
import DietPlanDetailScreen from '../screens/DietPlanDetailScreen';
import TrackerScreen from '../screens/TrackerScreen';
import FoodDatabaseScreen from '../screens/FoodDatabaseScreen';
import FoodDetailScreen from '../screens/FoodDetailScreen';
import PainGuideScreen from '../screens/PainGuideScreen';
import PainDetailScreen from '../screens/PainDetailScreen';
import SubscriptionScreen from '../screens/SubscriptionScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabIcon = ({ label, icon, focused, color }) => (
  <View style={styles.tabItem}>
    <View style={[styles.tabIconWrap, focused && styles.tabIconWrapActive]}>
      <Text style={[styles.tabIcon, { color: focused ? '#fff' : COLORS.textLight }]}>{icon}</Text>
    </View>
    {focused && <View style={styles.activeIndicator} />}
    <Text style={[styles.tabLabel, { color: focused ? COLORS.primaryGlow : COLORS.textLight, fontWeight: focused ? '700' : '400' }]}>{label}</Text>
  </View>
);

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      <Stack.Screen name="FoodDatabase" component={FoodDatabaseScreen} />
      <Stack.Screen name="FoodDetail" component={FoodDetailScreen} />
      <Stack.Screen name="PainGuide" component={PainGuideScreen} />
      <Stack.Screen name="PainDetail" component={PainDetailScreen} />
      <Stack.Screen name="Subscription" component={SubscriptionScreen} />
    </Stack.Navigator>
  );
}

function YogaStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="YogaMain" component={YogaScreen} />
      <Stack.Screen name="YogaDetail" component={YogaDetailScreen} />
    </Stack.Navigator>
  );
}

function DietStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="DietMain" component={DietScreen} />
      <Stack.Screen name="DietPlanDetail" component={DietPlanDetailScreen} />
    </Stack.Navigator>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#0F0F1A',
          borderTopWidth: 1,
          borderTopColor: COLORS.border,
          height: 88,
          paddingBottom: 22,
          paddingTop: 10,
          ...SHADOWS.large,
        },
        tabBarActiveTintColor: COLORS.primaryGlow,
        tabBarInactiveTintColor: COLORS.textLight,
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <TabIcon label="Home" icon="⌂" focused={focused} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="YogaTab"
        component={YogaStack}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <TabIcon label="Yoga" icon="◎" focused={focused} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Tracker"
        component={TrackerScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <TabIcon label="Tracker" icon="◈" focused={focused} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="DietTab"
        component={DietStack}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <TabIcon label="Diet" icon="◇" focused={focused} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <TabIcon label="Profile" icon="○" focused={focused} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={MainTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 56,
  },
  tabIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
  },
  tabIconWrapActive: {
    backgroundColor: COLORS.primaryDark,
  },
  tabIcon: {
    fontSize: 20,
    fontWeight: '600',
  },
  activeIndicator: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.primaryGlow,
    marginBottom: 2,
  },
  tabLabel: {
    fontSize: 10,
    letterSpacing: 0.3,
  },
});
