import React, { useState } from 'react';
import {
  View, Text, StyleSheet, FlatList, TouchableOpacity,
  SafeAreaView, TextInput,
} from 'react-native';
import { COLORS, SIZES, SHADOWS } from '../utils/theme';
import { FOOD_DATABASE, FOOD_CATEGORIES, CONDITION_FOODS } from '../data/foodDatabase';
import { useTranslation } from 'react-i18next';

export default function FoodDatabaseScreen({ navigation }) {
  const { i18n } = useTranslation();
  const isHindi = i18n.language === 'hi';
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showConditions, setShowConditions] = useState(false);

  const filteredFoods = FOOD_DATABASE.filter(food => {
    const matchSearch = search === '' ||
      food.name.toLowerCase().includes(search.toLowerCase()) ||
      food.nameHi.includes(search);
    const matchCategory = selectedCategory === 'all' || food.category === selectedCategory;
    return matchSearch && matchCategory;
  });

  const renderFoodItem = ({ item }) => (
    <TouchableOpacity
      style={styles.foodCard}
      onPress={() => navigation.navigate('FoodDetail', { food: item })}
    >
      <View style={styles.foodHeader}>
        <Text style={styles.foodName}>{isHindi ? item.nameHi : item.name}</Text>
        <View style={styles.calorieBadge}>
          <Text style={styles.calorieText}>{item.caloriesPer100} cal</Text>
        </View>
      </View>
      <View style={styles.nutrientRow}>
        <Text style={styles.nutrient}>P: {item.protein}g</Text>
        <Text style={styles.nutrient}>C: {item.carbs}g</Text>
        <Text style={styles.nutrient}>F: {item.fat}g</Text>
        <Text style={styles.nutrient}>Fiber: {item.fiber}g</Text>
      </View>
      <Text style={styles.bestTime}>
        {isHindi ? '🕐 ' : '🕐 '}{isHindi ? item.bestTimeHi : item.bestTime}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{isHindi ? '🍎 फ़ूड डेटाबेस' : '🍎 Food Database'}</Text>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          value={search}
          onChangeText={setSearch}
          placeholder={isHindi ? 'भोजन खोजें...' : 'Search food...'}
          placeholderTextColor={COLORS.textLight}
        />
      </View>

      {/* Category Filter */}
      <FlatList
        horizontal
        data={[{ id: 'all', name: 'All', nameHi: 'सभी', icon: '📋' }, ...FOOD_CATEGORIES]}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.catChip, selectedCategory === item.id && styles.catChipActive]}
            onPress={() => setSelectedCategory(item.id)}
          >
            <Text style={styles.catIcon}>{item.icon}</Text>
            <Text style={[styles.catText, selectedCategory === item.id && { color: '#fff' }]}>
              {isHindi ? item.nameHi : item.name}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.catList}
      />

      {/* Condition-based Foods Toggle */}
      <TouchableOpacity
        style={styles.conditionToggle}
        onPress={() => setShowConditions(!showConditions)}
      >
        <Text style={styles.conditionToggleText}>
          {isHindi ? '🩺 स्वास्थ्य स्थिति के अनुसार भोजन' : '🩺 Foods by Health Condition'}
        </Text>
        <Text style={styles.arrow}>{showConditions ? '▲' : '▼'}</Text>
      </TouchableOpacity>

      {showConditions && (
        <View style={styles.conditionsList}>
          {Object.entries(CONDITION_FOODS).map(([key, condition]) => (
            <TouchableOpacity
              key={key}
              style={styles.conditionCard}
              onPress={() => {
                setSearch('');
                setSelectedCategory('all');
                setShowConditions(false);
              }}
            >
              <Text style={styles.conditionName}>{isHindi ? condition.nameHi : condition.name}</Text>
              <Text style={styles.conditionDesc}>
                {isHindi ? '✅ ' : '✅ '}
                {condition.eat.slice(0, 3).join(', ')}...
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Results Count */}
      <Text style={styles.resultCount}>
        {filteredFoods.length} {isHindi ? 'भोजन मिले' : 'foods found'}
      </Text>

      {/* Food List */}
      <FlatList
        data={filteredFoods}
        renderItem={renderFoodItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.foodList}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SIZES.padding,
    paddingVertical: 12,
    backgroundColor: COLORS.surface,
    ...SHADOWS.small,
  },
  backBtn: { padding: 8, marginRight: 8 },
  backText: { fontSize: 28, color: COLORS.text },
  title: { fontSize: SIZES.lg, fontWeight: '700', color: COLORS.text },
  searchContainer: {
    paddingHorizontal: SIZES.padding,
    paddingVertical: 10,
  },
  searchInput: {
    backgroundColor: COLORS.surface,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: SIZES.radiusFull,
    fontSize: SIZES.md,
    color: COLORS.text,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  catList: { paddingHorizontal: SIZES.padding, paddingBottom: 10, gap: 8 },
  catChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: SIZES.radiusFull,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  catChipActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  catIcon: { fontSize: 14, marginRight: 4 },
  catText: { fontSize: SIZES.xs, fontWeight: '600', color: COLORS.text },
  conditionToggle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: SIZES.padding,
    padding: 12,
    backgroundColor: COLORS.accent + '15',
    borderRadius: SIZES.radius,
    marginBottom: 8,
  },
  conditionToggleText: { fontSize: SIZES.sm, fontWeight: '600', color: COLORS.accent },
  arrow: { fontSize: SIZES.sm, color: COLORS.accent },
  conditionsList: { marginHorizontal: SIZES.padding, marginBottom: 10 },
  conditionCard: {
    backgroundColor: COLORS.surface,
    padding: 12,
    borderRadius: SIZES.radius,
    marginBottom: 8,
    ...SHADOWS.small,
  },
  conditionName: { fontSize: SIZES.base, fontWeight: '700', color: COLORS.text },
  conditionDesc: { fontSize: SIZES.xs, color: COLORS.textSecondary, marginTop: 4 },
  resultCount: {
    fontSize: SIZES.sm,
    color: COLORS.textSecondary,
    marginHorizontal: SIZES.padding,
    marginBottom: 8,
  },
  foodList: { paddingHorizontal: SIZES.padding, paddingBottom: 20 },
  foodCard: {
    backgroundColor: COLORS.surface,
    padding: 14,
    borderRadius: SIZES.radius,
    marginBottom: 10,
    ...SHADOWS.small,
  },
  foodHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  foodName: { fontSize: SIZES.base, fontWeight: '700', color: COLORS.text, flex: 1 },
  calorieBadge: {
    backgroundColor: COLORS.primary + '15',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: SIZES.radiusFull,
  },
  calorieText: { fontSize: SIZES.xs, fontWeight: '700', color: COLORS.primary },
  nutrientRow: { flexDirection: 'row', gap: 12, marginBottom: 6 },
  nutrient: { fontSize: SIZES.xs, color: COLORS.textSecondary },
  bestTime: { fontSize: SIZES.xs, color: COLORS.accent, fontWeight: '500' },
});
