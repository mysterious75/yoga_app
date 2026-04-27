import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  SafeAreaView, Dimensions, FlatList,
} from 'react-native';
import { COLORS, SIZES, SHADOWS } from '../utils/theme';
import { YOGA_CATEGORIES, YOGA_POSES } from '../data/yogaPoses';
import { useTranslation } from 'react-i18next';

const { width } = Dimensions.get('window');

const DIFFICULTY_LABELS = ['', '🌱 Beginner', '🌿 Intermediate', '🌳 Advanced'];
const DIFFICULTY_LABELS_HI = ['', '🌱 शुरुआती', '🌿 मध्यम', '🌳 उन्नत'];

export default function YogaScreen({ navigation }) {
  const { i18n } = useTranslation();
  const isHindi = i18n.language === 'hi';
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredPoses = selectedCategory === 'all'
    ? YOGA_POSES
    : YOGA_POSES.filter(p => p.category.includes(selectedCategory));

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.categoryChip,
        selectedCategory === item.id && { backgroundColor: item.color },
      ]}
      onPress={() => setSelectedCategory(item.id)}
    >
      <Text style={styles.categoryIcon}>{item.icon}</Text>
      <Text style={[
        styles.categoryText,
        selectedCategory === item.id && { color: '#fff' },
      ]}>
        {isHindi ? item.nameHi : item.name}
      </Text>
    </TouchableOpacity>
  );

  const renderPoseCard = ({ item }) => (
    <TouchableOpacity
      style={styles.poseCard}
      onPress={() => navigation.navigate('YogaDetail', { pose: item })}
      activeOpacity={0.8}
    >
      <View style={[styles.poseAnimation, { backgroundColor: COLORS.primary + '15' }]}>
        <Text style={styles.poseEmoji}>🧘</Text>
      </View>
      <View style={styles.poseInfo}>
        <Text style={styles.poseName}>{isHindi ? item.nameHi : item.name}</Text>
        <Text style={styles.poseSanskrit}>{item.sanskrit}</Text>
        <View style={styles.poseMeta}>
          <Text style={styles.difficulty}>
            {isHindi ? DIFFICULTY_LABELS_HI[item.difficulty] : DIFFICULTY_LABELS[item.difficulty]}
          </Text>
          <Text style={styles.duration}>⏱️ {item.duration}</Text>
        </View>
      </View>
      <Text style={styles.arrow}>›</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          {isHindi ? '🧘 योग आसन' : '🧘 Yoga Poses'}
        </Text>
        <Text style={styles.subtitle}>
          {isHindi ? `${YOGA_POSES.length}+ आसन सीखें` : `Learn ${YOGA_POSES.length}+ poses`}
        </Text>
      </View>

      {/* Categories */}
      <View style={styles.categoriesContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoriesList}>
          <TouchableOpacity
            style={[
              styles.categoryChip,
              selectedCategory === 'all' && { backgroundColor: COLORS.primary },
            ]}
            onPress={() => setSelectedCategory('all')}
          >
            <Text style={styles.categoryIcon}>📋</Text>
            <Text style={[
              styles.categoryText,
              selectedCategory === 'all' && { color: '#fff' },
            ]}>
              {isHindi ? 'सभी' : 'All'}
            </Text>
          </TouchableOpacity>
          {YOGA_CATEGORIES.map(cat => (
            <TouchableOpacity
              key={cat.id}
              style={[
                styles.categoryChip,
                selectedCategory === cat.id && { backgroundColor: cat.color },
              ]}
              onPress={() => setSelectedCategory(cat.id)}
            >
              <Text style={styles.categoryIcon}>{cat.icon}</Text>
              <Text style={[
                styles.categoryText,
                selectedCategory === cat.id && { color: '#fff' },
              ]}>
                {isHindi ? cat.nameHi : cat.name}
              </Text>
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
    paddingBottom: 10,
  },
  title: {
    fontSize: SIZES.title,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: SIZES.sm,
    color: COLORS.textSecondary,
  },
  categoriesContainer: {
    marginVertical: 12,
  },
  categoriesList: {
    paddingHorizontal: SIZES.padding,
    gap: 8,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: SIZES.radiusFull,
    backgroundColor: COLORS.surface,
    ...SHADOWS.small,
  },
  categoryIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  categoryText: {
    fontSize: SIZES.sm,
    fontWeight: '600',
    color: COLORS.text,
  },
  posesList: {
    paddingHorizontal: SIZES.padding,
    paddingBottom: 20,
  },
  poseCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radius,
    padding: 12,
    marginBottom: 10,
    ...SHADOWS.small,
  },
  poseAnimation: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  poseEmoji: {
    fontSize: 28,
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
    color: COLORS.primary,
    fontWeight: '600',
  },
  duration: {
    fontSize: SIZES.xs,
    color: COLORS.textSecondary,
  },
  arrow: {
    fontSize: 24,
    color: COLORS.textLight,
    fontWeight: '300',
  },
});
