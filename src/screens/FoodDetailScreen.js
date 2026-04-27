import React from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { COLORS, SIZES, SHADOWS } from '../utils/theme';
import { useTranslation } from 'react-i18next';

const NUTRIENT_COLORS = {
  calories: '#FF6B35',
  protein: '#3498DB',
  carbs: '#F39C12',
  fat: '#E74C3C',
  fiber: '#00B894',
};

export default function FoodDetailScreen({ route, navigation }) {
  const { food } = route.params;
  const { i18n } = useTranslation();
  const isHindi = i18n.language === 'hi';

  const nutrients = [
    { label: isHindi ? 'कैलोरी' : 'Calories', value: food.caloriesPer100, unit: 'kcal', color: NUTRIENT_COLORS.calories, icon: '🔥' },
    { label: isHindi ? 'प्रोटीन' : 'Protein', value: food.protein, unit: 'g', color: NUTRIENT_COLORS.protein, icon: '💪' },
    { label: isHindi ? 'कार्ब्स' : 'Carbs', value: food.carbs, unit: 'g', color: NUTRIENT_COLORS.carbs, icon: '🌾' },
    { label: isHindi ? 'वसा' : 'Fat', value: food.fat, unit: 'g', color: NUTRIENT_COLORS.fat, icon: '🫒' },
    { label: isHindi ? 'फाइबर' : 'Fiber', value: food.fiber, unit: 'g', color: NUTRIENT_COLORS.fiber, icon: '🥬' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{isHindi ? food.nameHi : food.name}</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Food Name Card */}
        <View style={styles.nameCard}>
          <Text style={styles.foodName}>{isHindi ? food.nameHi : food.name}</Text>
          <Text style={styles.foodNameEn}>{isHindi ? food.name : food.nameHi}</Text>
          {food.glycemicIndex && (
            <View style={styles.giBadge}>
              <Text style={styles.giText}>GI: {food.glycemicIndex}</Text>
            </View>
          )}
        </View>

        {/* Nutrients Grid */}
        <Text style={styles.sectionTitle}>{isHindi ? '📊 पोषण (प्रति 100g)' : '📊 Nutrition (per 100g)'}</Text>
        <View style={styles.nutrientsGrid}>
          {nutrients.map((n, index) => (
            <View key={index} style={[styles.nutrientCard, { borderLeftColor: n.color }]}>
              <Text style={styles.nutrientIcon}>{n.icon}</Text>
              <Text style={[styles.nutrientValue, { color: n.color }]}>{n.value}{n.unit}</Text>
              <Text style={styles.nutrientLabel}>{n.label}</Text>
            </View>
          ))}
        </View>

        {/* Portion Info */}
        <View style={styles.portionCard}>
          <Text style={styles.portionTitle}>{isHindi ? '🍽️ एक हिस्सा' : '🍽️ One Portion'}</Text>
          <View style={styles.portionRow}>
            <View style={styles.portionItem}>
              <Text style={styles.portionLabel}>{isHindi ? 'आकार' : 'Size'}</Text>
              <Text style={styles.portionValue}>{food.portionSize}g ({food.portionName})</Text>
            </View>
            <View style={styles.portionItem}>
              <Text style={styles.portionLabel}>{isHindi ? 'कैलोरी' : 'Calories'}</Text>
              <Text style={[styles.portionValue, { color: COLORS.primary, fontWeight: '800' }]}>{food.portionCalories} kcal</Text>
            </View>
          </View>
        </View>

        {/* Best Time to Eat */}
        <View style={styles.timingCard}>
          <Text style={styles.timingTitle}>{isHindi ? '🕐 खाने का सबसे अच्छा समय' : '🕐 Best Time to Eat'}</Text>
          <View style={styles.timingBadge}>
            <Text style={styles.timingText}>{isHindi ? food.bestTimeHi : food.bestTime}</Text>
          </View>
        </View>

        {/* Nutrient Bar Visualization */}
        <View style={styles.barCard}>
          <Text style={styles.barTitle}>{isHindi ? '📊 पोषण वितरण' : '📊 Nutrient Distribution'}</Text>
          {nutrients.slice(1).map((n, index) => {
            const total = food.protein + food.carbs + food.fat + food.fiber;
            const percent = total > 0 ? (n.value / total) * 100 : 0;
            return (
              <View key={index} style={styles.barRow}>
                <Text style={styles.barLabel}>{n.label}</Text>
                <View style={styles.barTrack}>
                  <View style={[styles.barFill, { width: `${percent}%`, backgroundColor: n.color }]} />
                </View>
                <Text style={[styles.barPercent, { color: n.color }]}>{Math.round(percent)}%</Text>
              </View>
            );
          })}
        </View>

        {/* Tips */}
        <View style={styles.tipsCard}>
          <Text style={styles.tipsTitle}>{isHindi ? '💡 टिप्स' : '💡 Tips'}</Text>
          {food.category === 'fruits' && (
            <Text style={styles.tipText}>
              {isHindi ? '• फल खाली पेट या भोजन के बीच में खाएं' : '• Eat fruits on empty stomach or between meals'}
            </Text>
          )}
          {food.category === 'dal' && (
            <Text style={styles.tipText}>
              {isHindi ? '• दाल को चावल या रोटी के साथ खाएं प्रोटीन के लिए' : '• Pair dal with rice or roti for complete protein'}
            </Text>
          )}
          {food.category === 'dairy' && (
            <Text style={styles.tipText}>
              {isHindi ? '• दूध रात को पीना सबसे अच्छा है' : '• Milk is best consumed at bedtime'}
            </Text>
          )}
          <Text style={styles.tipText}>
            {isHindi ? `• ${food.portionName} में ${food.portionCalories} कैलोरी होती है` : `• ${food.portionName} contains ${food.portionCalories} calories`}
          </Text>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
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
  headerTitle: { fontSize: SIZES.lg, fontWeight: '700', color: COLORS.text },
  nameCard: {
    backgroundColor: COLORS.surface,
    margin: SIZES.padding,
    padding: 20,
    borderRadius: SIZES.radiusLg,
    alignItems: 'center',
    ...SHADOWS.medium,
  },
  foodName: { fontSize: SIZES.xxl, fontWeight: '800', color: COLORS.text },
  foodNameEn: { fontSize: SIZES.md, color: COLORS.textSecondary, marginTop: 4 },
  giBadge: {
    backgroundColor: COLORS.info + '15',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: SIZES.radiusFull,
    marginTop: 10,
  },
  giText: { fontSize: SIZES.sm, fontWeight: '600', color: COLORS.info },
  sectionTitle: {
    fontSize: SIZES.base,
    fontWeight: '700',
    color: COLORS.text,
    marginHorizontal: SIZES.padding,
    marginBottom: 10,
  },
  nutrientsGrid: {
    paddingHorizontal: SIZES.padding,
    gap: 10,
  },
  nutrientCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    padding: 14,
    borderRadius: SIZES.radius,
    borderLeftWidth: 4,
    ...SHADOWS.small,
  },
  nutrientIcon: { fontSize: 24, marginRight: 12 },
  nutrientValue: { fontSize: SIZES.lg, fontWeight: '800', marginRight: 8 },
  nutrientLabel: { fontSize: SIZES.md, color: COLORS.textSecondary },
  portionCard: {
    backgroundColor: COLORS.surface,
    marginHorizontal: SIZES.padding,
    marginTop: 14,
    padding: 16,
    borderRadius: SIZES.radius,
    ...SHADOWS.small,
  },
  portionTitle: { fontSize: SIZES.base, fontWeight: '700', color: COLORS.text, marginBottom: 12 },
  portionRow: { flexDirection: 'row', gap: 20 },
  portionItem: { flex: 1 },
  portionLabel: { fontSize: SIZES.sm, color: COLORS.textSecondary },
  portionValue: { fontSize: SIZES.base, fontWeight: '600', color: COLORS.text, marginTop: 4 },
  timingCard: {
    backgroundColor: COLORS.accent + '10',
    marginHorizontal: SIZES.padding,
    marginTop: 14,
    padding: 16,
    borderRadius: SIZES.radius,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.accent,
  },
  timingTitle: { fontSize: SIZES.base, fontWeight: '700', color: COLORS.text, marginBottom: 10 },
  timingBadge: {
    backgroundColor: COLORS.accent + '20',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: SIZES.radiusFull,
    alignSelf: 'flex-start',
  },
  timingText: { fontSize: SIZES.md, fontWeight: '600', color: COLORS.accent },
  barCard: {
    backgroundColor: COLORS.surface,
    marginHorizontal: SIZES.padding,
    marginTop: 14,
    padding: 16,
    borderRadius: SIZES.radius,
    ...SHADOWS.small,
  },
  barTitle: { fontSize: SIZES.base, fontWeight: '700', color: COLORS.text, marginBottom: 12 },
  barRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  barLabel: { width: 60, fontSize: SIZES.sm, color: COLORS.textSecondary },
  barTrack: { flex: 1, height: 12, backgroundColor: COLORS.surfaceAlt, borderRadius: 6, marginHorizontal: 8, overflow: 'hidden' },
  barFill: { height: '100%', borderRadius: 6 },
  barPercent: { width: 40, fontSize: SIZES.sm, fontWeight: '700', textAlign: 'right' },
  tipsCard: {
    backgroundColor: COLORS.surface,
    marginHorizontal: SIZES.padding,
    marginTop: 14,
    padding: 16,
    borderRadius: SIZES.radius,
    ...SHADOWS.small,
  },
  tipsTitle: { fontSize: SIZES.base, fontWeight: '700', color: COLORS.text, marginBottom: 10 },
  tipText: { fontSize: SIZES.md, color: COLORS.text, lineHeight: 22, marginBottom: 6 },
});
