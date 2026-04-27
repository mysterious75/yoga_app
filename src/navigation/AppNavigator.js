import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, View, StyleSheet } from 'react-native';
import { COLORS } from '../utils/theme';

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
    <Text style={[styles.tabIcon, { color }]}>{icon}</Text>
    <Text style={[styles.tabLabel, { color, fontWeight: focused ? '700' : '400' }]}>{label}</Text>
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
          backgroundColor: COLORS.surface,
          borderTopWidth: 0,
          height: 85,
          paddingBottom: 20,
          paddingTop: 10,
          ...styles.shadow,
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textLight,
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <TabIcon label="Home" icon="🏠" focused={focused} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="YogaTab"
        component={YogaStack}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <TabIcon label="Yoga" icon="🧘" focused={focused} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Tracker"
        component={TrackerScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <TabIcon label="Tracker" icon="📊" focused={focused} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="DietTab"
        component={DietStack}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <TabIcon label="Diet" icon="🍽️" focused={focused} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <TabIcon label="Profile" icon="👤" focused={focused} color={color} />
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
    width: 60,
  },
  tabIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  tabLabel: {
    fontSize: 10,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 10,
  },
});
