import React, { useState, useMemo, useEffect, useCallback } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  SafeAreaView, Dimensions, FlatList, TextInput,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SIZES, SHADOWS } from '../utils/theme';
import { YOGA_CATEGORIES, YOGA_POSES } from '../data/yogaPoses';
import { useTranslation } from 'react-i18next';
import { getFavorites, toggleFavorite } from '../utils/favorites';

const { width } = Dimensions.get('window');

const DIFFICULTY_LABELS = ['', '● Beginner', '●● Intermediate', '●●● Advanced'];
const DIFFICULTY_LABELS_HI = ['', '● शुरुआती', '●● मध्यम', '●●● उन्नत'];

export default function YogaScreen({ navigation }) {
  const { i18n } = useTranslation();
  const isHindi = i18n.language === 'hi';
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [favoriteIds, setFavoriteIds] = useState([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    const favs = await getFavorites();
    setFavoriteIds(favs.yoga || []);
  };

  const handleToggleFavorite = useCallback(async (id) => {
    const newList = await toggleFavorite('yoga', id);
    setFavoriteIds(newList);
  }, []);

  const filteredPoses = useMemo(() => {
    let poses = selectedCategory === 'all'
      ? YOGA_POSES
      : selectedCategory === 'favorites'
      ? YOGA_POSES.filter(p => favoriteIds.includes(p.id))
      : YOGA_POSES.filter(p => p.category.includes(selectedCategory));
    if (search.trim()) {
      const q = search.toLowerCase();
      poses = poses.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.nameHi.includes(search) ||
        p.sanskrit.toLowerCase().includes(q)
      );
    }
    return poses;
  }, [selectedCategory, search, favoriteIds]);

  const renderPoseCard = ({ item }) => {
    const isFav = favoriteIds.includes(item.id);
    return (
      <TouchableOpacity
        style={styles.poseCard}
        onPress={() => navigation.navigate('YogaDetail', { pose: item })}
        activeOpacity={0.85}
      >
        <View style={styles.poseAccent} />
        <View style={[styles.poseIconWrap, { backgroundColor: COLORS.primaryDark + '40' }]}>
          <Text style={styles.poseEmoji}>◎</Text>
        </View>
        <View style={styles.poseInfo}>
          <Text style={styles.poseName}>{isHindi ? item.nameHi : item.name}</Text>
          <Text style={styles.poseSanskrit}>{item.sanskrit}</Text>
          <View style={styles.poseMeta}>
            <Text style={styles.difficulty}>
              {isHindi ? DIFFICULTY_LABELS_HI[item.difficulty] : DIFFICULTY_LABELS[item.difficulty]}
            </Text>
            <Text style={styles.duration}>⏱ {item.duration}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.favBtn}
          onPress={() => handleToggleFavorite(item.id)}
        >
          <Text style={[styles.favIcon, isFav && { color: COLORS.error }]}>{isFav ? '♥' : '♡'}</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          {isHindi ? '◎ योग आसन' : '◎ Yoga Poses'}
        </Text>
        <Text style={styles.subtitle}>
          {isHindi ? `${YOGA_POSES.length}+ आसन सीखें` : `Learn ${YOGA_POSES.length}+ poses`}
        </Text>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <View style={styles.searchWrap}>
          <Text style={styles.searchIcon}>⌕</Text>
          <TextInput
            style={styles.searchInput}
            value={search}
            onChangeText={setSearch}
            placeholder={isHindi ? 'आसन खोजें...' : 'Search poses...'}
            placeholderTextColor={COLORS.textLight}
          />
          {search ? (
            <TouchableOpacity style={styles.clearBtn} onPress={() => setSearch('')}>
              <Text style={styles.clearText}>✕</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>

      {/* Categories */}
      <View style={styles.categoriesContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoriesList}>
          {[
            { id: 'all', icon: '⊞', name: 'All', nameHi: 'सभी' },
            { id: 'favorites', icon: '♥', name: 'Favorites', nameHi: 'पसंदीदा' },
            ...YOGA_CATEGORIES,
          ].map(cat => (
            <TouchableOpacity
              key={cat.id}
              style={styles.categoryChipWrap}
              onPress={() => setSelectedCategory(cat.id)}
            >
              {selectedCategory === cat.id ? (
                <LinearGradient
                  colors={['#1B4332', '#2D6A4F']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.categoryChip}
                >
                  <Text style={styles.categoryIconActive}>{cat.icon}</Text>
                  <Text style={styles.categoryTextActive}>
                    {isHindi ? cat.nameHi : cat.name}
                  </Text>
                </LinearGradient>
              ) : (
                <View style={styles.categoryChip}>
                  <Text style={styles.categoryIcon}>{cat.icon}</Text>
                  <Text style={styles.categoryText}>
                    {isHindi ? cat.nameHi : cat.name}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Poses List */}
      <FlatList
        data={filteredPoses}
        renderItem={renderPoseCard}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.posesList}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>
              {selectedCategory === 'favorites' ? '♡' : '⌕'}
            </Text>
            <Text style={styles.emptyText}>
              {selectedCategory === 'favorites'
                ? (isHindi ? 'अभी कोई पसंदीदा नहीं\n♥ दबाकर जोड़ें' : 'No favorites yet\nTap ♥ to add')
                : (isHindi ? 'कोई आसन नहीं मिला' : 'No poses found')}
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    paddingHorizontal: SIZES.padding,
    paddingTop: 20,
    paddingBottom: 8,
  },
  title: {
    fontSize: SIZES.title,
    fontWeight: '800',
    color: COLORS.text,
    letterSpacing: 0.3,
  },
  subtitle: {
    fontSize: SIZES.sm,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  searchContainer: {
    paddingHorizontal: SIZES.padding,
    paddingVertical: 10,
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
  clearBtn: {
    padding: 4,
  },
  clearText: { fontSize: 16, color: COLORS.textLight },
  categoriesContainer: {
    marginVertical: 8,
  },
  categoriesList: {
    paddingHorizontal: SIZES.padding,
    gap: 8,
  },
  categoryChipWrap: {
    borderRadius: SIZES.radiusFull,
    overflow: 'hidden',
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: SIZES.radiusFull,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.surfaceBorder,
  },
  categoryIcon: {
    fontSize: 14,
    marginRight: 6,
    color: COLORS.textSecondary,
  },
  categoryIconActive: {
    fontSize: 14,
    marginRight: 6,
    color: '#fff',
  },
  categoryText: {
    fontSize: SIZES.sm,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  categoryTextActive: {
    fontSize: SIZES.sm,
    fontWeight: '700',
    color: '#fff',
  },
  posesList: {
    paddingHorizontal: SIZES.padding,
    paddingBottom: 20,
    paddingTop: 8,
  },
  poseCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radius,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: COLORS.surfaceBorder,
    overflow: 'hidden',
    ...SHADOWS.card,
  },
  poseAccent: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
    backgroundColor: COLORS.primaryGlow,
    borderRadius: 2,
  },
  poseIconWrap: {
    width: 52,
    height: 52,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  poseEmoji: {
    fontSize: 24,
    color: COLORS.primaryGlow,
  },
  poseInfo: {
    flex: 1,
    marginLeft: 12,
  },
  poseName: {
    fontSize: SIZES.base,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 2,
  },
  poseSanskrit: {
    fontSize: SIZES.xs,
    color: COLORS.textSecondary,
    fontStyle: 'italic',
    marginBottom: 4,
  },
  poseMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  difficulty: {
    fontSize: SIZES.xs,
    color: COLORS.primaryGlow,
    fontWeight: '600',
  },
  duration: {
    fontSize: SIZES.xs,
    color: COLORS.textSecondary,
  },
  favBtn: {
    padding: 8,
  },
  favIcon: {
    fontSize: 22,
    color: COLORS.textLight,
  },
  emptyState: {
    alignItems: 'center',
    paddingTop: 60,
  },
  emptyIcon: { fontSize: 48, color: COLORS.textLight, marginBottom: 12 },
  emptyText: {
    fontSize: SIZES.md,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
});
