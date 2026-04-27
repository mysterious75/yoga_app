import React, { useState, useEffect, useCallback } from 'react';
import {
  View, Text, StyleSheet, FlatList, TouchableOpacity,
  SafeAreaView, TextInput,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SIZES, SHADOWS } from '../utils/theme';
import { FOOD_DATABASE, FOOD_CATEGORIES, CONDITION_FOODS } from '../data/foodDatabase';
import { useTranslation } from 'react-i18next';
import { getFavorites, toggleFavorite } from '../utils/favorites';

export default function FoodDatabaseScreen({ navigation }) {
  const { i18n } = useTranslation();
  const isHindi = i18n.language === 'hi';
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showConditions, setShowConditions] = useState(false);
  const [favoriteIds, setFavoriteIds] = useState([]);

  useEffect(() => {
    getFavorites().then(favs => setFavoriteIds(favs.food || []));
  }, []);

  const handleToggleFav = useCallback(async (id) => {
    const newList = await toggleFavorite('food', id);
    setFavoriteIds(newList);
  }, []);

  const filteredFoods = FOOD_DATABASE.filter(food => {
    const matchSearch = search === '' ||
      food.name.toLowerCase().includes(search.toLowerCase()) ||
      food.nameHi.includes(search);
    const matchCategory = selectedCategory === 'all'
      ? true
      : selectedCategory === 'favorites'
      ? favoriteIds.includes(food.id)
      : food.category === selectedCategory;
    return matchSearch && matchCategory;
  });

  const renderFoodItem = ({ item }) => {
    const isFav = favoriteIds.includes(item.id);
    return (
      <TouchableOpacity
        style={styles.foodCard}
        onPress={() => navigation.navigate('FoodDetail', { food: item })}
        activeOpacity={0.85}
      >
        <View style={styles.foodAccent} />
        <View style={styles.foodContent}>
          <View style={styles.foodHeader}>
            <Text style={styles.foodName}>{isHindi ? item.nameHi : item.name}</Text>
            <View style={styles.foodHeaderRight}>
              <View style={styles.calorieBadge}>
                <Text style={styles.calorieText}>{item.caloriesPer100} cal</Text>
              </View>
              <TouchableOpacity style={styles.favBtn} onPress={() => handleToggleFav(item.id)}>
                <Text style={[styles.favIcon, isFav && { color: COLORS.error }]}>{isFav ? '♥' : '♡'}</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.nutrientRow}>
            {[
              { label: 'P', value: item.protein, color: COLORS.nutrientProtein },
              { label: 'C', value: item.carbs, color: COLORS.nutrientCarbs },
              { label: 'F', value: item.fat, color: COLORS.nutrientFat },
              { label: 'Fb', value: item.fiber, color: COLORS.nutrientFiber },
            ].map((n, i) => (
              <View key={i} style={[styles.nutrientBadge, { borderLeftColor: n.color }]}>
                <Text style={styles.nutrient}>{n.label}: {n.value}g</Text>
              </View>
            ))}
          </View>
          <Text style={styles.bestTime}>
            ⏱ {isHindi ? item.bestTimeHi : item.bestTime}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={['#1B4332', '#0A0A0A']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.headerGradient}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Text style={styles.backText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.title}>{isHindi ? '⬡ फ़ूड डेटाबेस' : '⬡ Food Database'}</Text>
        </View>
      </LinearGradient>

      {/* Search */}
      <View style={styles.searchContainer}>
        <View style={styles.searchWrap}>
          <Text style={styles.searchIcon}>⌕</Text>
          <TextInput
            style={styles.searchInput}
            value={search}
            onChangeText={setSearch}
            placeholder={isHindi ? 'भोजन खोजें...' : 'Search food...'}
            placeholderTextColor={COLORS.textLight}
          />
        </View>
      </View>

      {/* Category Filter */}
      <FlatList
        horizontal
        data={[{ id: 'all', name: 'All', nameHi: 'सभी', icon: '⊞' }, { id: 'favorites', name: 'Favorites', nameHi: 'पसंदीदा', icon: '♥' }, ...FOOD_CATEGORIES]}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => setSelectedCategory(item.id)}>
            {selectedCategory === item.id ? (
              <LinearGradient
                colors={['#1B4332', '#2D6A4F']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.catChip}
              >
                <Text style={styles.catIconActive}>{item.icon}</Text>
                <Text style={styles.catTextActive}>{isHindi ? item.nameHi : item.name}</Text>
              </LinearGradient>
            ) : (
              <View style={styles.catChip}>
                <Text style={styles.catIcon}>{item.icon}</Text>
                <Text style={styles.catText}>{isHindi ? item.nameHi : item.name}</Text>
              </View>
            )}
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
        <Text style={styles.conditionToggleIcon}>✚</Text>
        <Text style={styles.conditionToggleText}>
          {isHindi ? 'स्वास्थ्य स्थिति के अनुसार भोजन' : 'Foods by Health Condition'}
        </Text>
        <Text style={styles.conditionArrow}>{showConditions ? '▴' : '▾'}</Text>
      </TouchableOpacity>

      {showConditions && (
        <View style={styles.conditionsList}>
          {Object.entries(CONDITION_FOODS).map(([key, condition]) => (
            <TouchableOpacity
              key={key}
              style={styles.conditionCard}
              onPress={() => {
                const eatFoods = condition.eat.map(e => e.toLowerCase());
                setSearch('');
                setSelectedCategory('all');
                setShowConditions(false);
                if (eatFoods.length > 0) setSearch(eatFoods[0]);
              }}
            >
              <Text style={styles.conditionName}>{isHindi ? condition.nameHi : condition.name}</Text>
              <Text style={styles.conditionDesc}>
                ✓ {condition.eat.slice(0, 3).join(', ')}...
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
  headerGradient: {
    paddingTop: 12,
    paddingBottom: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SIZES.padding,
  },
  backBtn: { padding: 8, marginRight: 8 },
  backText: { fontSize: 28, color: '#fff' },
  title: { fontSize: SIZES.lg, fontWeight: '800', color: '#fff' },
  searchContainer: {
    paddingHorizontal: SIZES.padding,
    paddingVertical: 12,
  },
  searchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radiusFull,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: COLORS.surfaceBorder,
    ...SHADOWS.small,
  },
  searchIcon: {
    fontSize: 18,
    color: COLORS.textLight,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: SIZES.md,
    color: COLORS.text,
  },
  catList: { paddingHorizontal: SIZES.padding, paddingBottom: 10, gap: 8 },
  catChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: SIZES.radiusFull,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.surfaceBorder,
  },
  catIcon: { fontSize: 14, marginRight: 4, color: COLORS.textSecondary },
  catIconActive: { fontSize: 14, marginRight: 4, color: '#fff' },
  catText: { fontSize: SIZES.xs, fontWeight: '600', color: COLORS.textSecondary },
  catTextActive: { fontSize: SIZES.xs, fontWeight: '700', color: '#fff' },
  conditionToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: SIZES.padding,
    padding: 14,
    backgroundColor: 'rgba(45,106,79,0.15)',
    borderRadius: SIZES.radius,
    marginBottom: 8,
  },
  conditionToggleIcon: { fontSize: 16, color: COLORS.primaryGlow, marginRight: 8 },
  conditionToggleText: { flex: 1, fontSize: SIZES.sm, fontWeight: '600', color: COLORS.primaryGlow },
  conditionArrow: { fontSize: SIZES.sm, color: COLORS.primaryGlow },
  conditionsList: { marginHorizontal: SIZES.padding, marginBottom: 10 },
  conditionCard: {
    backgroundColor: COLORS.surface,
    padding: 14,
    borderRadius: SIZES.radius,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: COLORS.surfaceBorder,
    ...SHADOWS.card,
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
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radius,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: COLORS.surfaceBorder,
    overflow: 'hidden',
    ...SHADOWS.card,
  },
  foodAccent: {
    width: 4,
    backgroundColor: COLORS.accent,
  },
  foodContent: {
    flex: 1,
    padding: 14,
  },
  foodHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  foodName: { fontSize: SIZES.base, fontWeight: '700', color: COLORS.text, flex: 1 },
  foodHeaderRight: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  calorieBadge: {
    backgroundColor: 'rgba(233,196,106,0.15)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: SIZES.radiusFull,
  },
  calorieText: { fontSize: SIZES.xs, fontWeight: '700', color: COLORS.accent },
  nutrientRow: { flexDirection: 'row', gap: 8, marginBottom: 6 },
  nutrientBadge: {
    borderLeftWidth: 3,
    paddingLeft: 6,
  },
  nutrient: { fontSize: SIZES.xs, color: COLORS.textSecondary },
  bestTime: { fontSize: SIZES.xs, color: COLORS.primaryGlow, fontWeight: '500' },
  favBtn: { padding: 4 },
  favIcon: { fontSize: 18, color: COLORS.textLight },
});
