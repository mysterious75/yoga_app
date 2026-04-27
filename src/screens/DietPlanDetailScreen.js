import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SIZES, SHADOWS } from '../utils/theme';
import { DIET_PLANS } from '../data/dietPlans';
import { useTranslation } from 'react-i18next';

const MEAL_COLORS = ['#2D6A4F', '#D4A373', '#4CC9F0', '#7B2CBF', '#E9C46A'];

export default function DietPlanDetailScreen({ route, navigation }) {
  const { planId } = route.params;
  const plan = DIET_PLANS[planId];
  const { i18n } = useTranslation();
  const isHindi = i18n.language === 'hi';
  const [selectedDay, setSelectedDay] = useState(0);

  if (!plan) return null;

  const day = plan.days[selectedDay];
  const totalCalories = day.meals.reduce((sum, m) => sum + m.calories, 0);

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
          <View style={styles.headerInfo}>
            <Text style={styles.headerTitle}>{isHindi ? plan.nameHi : plan.name}</Text>
            <Text style={styles.headerSubtitle}>⬡ {plan.calories} {isHindi ? 'कैलोरी/दिन' : 'cal/day'}</Text>
          </View>
        </View>
      </LinearGradient>

      {/* Day Selector */}
      <View style={styles.daySelectorWrap}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.daySelector}>
          {plan.days.map((d, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setSelectedDay(index)}
            >
              {selectedDay === index ? (
                <LinearGradient
                  colors={['#1B4332', '#2D6A4F']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.dayChip}
                >
                  <Text style={styles.dayTextActive}>
                    {isHindi ? d.dayHi.slice(0, 3) : d.day.slice(0, 3)}
                  </Text>
                </LinearGradient>
              ) : (
                <View style={styles.dayChip}>
                  <Text style={styles.dayText}>
                    {isHindi ? d.dayHi.slice(0, 3) : d.day.slice(0, 3)}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Day Title */}
        <Text style={styles.dayTitle}>
          {isHindi ? day.dayHi : day.day} — {isHindi ? plan.nameHi : plan.name}
        </Text>

        {/* Meals */}
        {day.meals.map((meal, index) => (
          <View key={index} style={styles.mealCard}>
            <View style={[styles.mealAccent, { backgroundColor: MEAL_COLORS[index % MEAL_COLORS.length] }]} />
            <View style={styles.mealContent}>
              <View style={styles.mealHeader}>
                <View style={styles.mealTitleWrap}>
                  <Text style={styles.mealType}>{isHindi ? meal.typeHi : meal.type}</Text>
                  <Text style={styles.mealTime}>⏱ {meal.time}</Text>
                </View>
                <View style={styles.calorieBadge}>
                  <Text style={styles.calorieValue}>{meal.calories}</Text>
                  <Text style={styles.calorieLabel}>{isHindi ? 'कैलोरी' : 'cal'}</Text>
                </View>
              </View>
              {(isHindi ? meal.itemsHi : meal.items).map((item, i) => (
                <View key={i} style={styles.mealItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.mealItemText}>{item}</Text>
                </View>
              ))}
            </View>
          </View>
        ))}

        {/* Total Calories */}
        <View style={styles.totalCard}>
          <LinearGradient
            colors={['#1B4332', '#2D6A4F']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.totalGradient}
          >
            <Text style={styles.totalLabel}>{isHindi ? 'कुल कैलोरी' : 'Total Calories'}</Text>
            <Text style={styles.totalValue}>{totalCalories} {isHindi ? 'कैलोरी' : 'calories'}</Text>
          </LinearGradient>
        </View>

        {/* Tips */}
        <View style={styles.tipsCard}>
          <Text style={styles.tipsTitle}>{isHindi ? '◈ टिप्स' : '◈ Tips'}</Text>
          {(isHindi ? plan.tipsHi : plan.tips).map((tip, index) => (
            <View key={index} style={styles.tipRow}>
              <Text style={styles.tipBullet}>✓</Text>
              <Text style={styles.tipText}>{tip}</Text>
            </View>
          ))}
        </View>

        {/* Disclaimer */}
        <View style={styles.disclaimer}>
          <Text style={styles.disclaimerText}>
            {isHindi ? plan.disclaimerHi : plan.disclaimer}
          </Text>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
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
  backBtn: { padding: 8 },
  backText: { fontSize: 28, color: '#fff' },
  headerInfo: { flex: 1, marginLeft: 8 },
  headerTitle: { fontSize: SIZES.lg, fontWeight: '800', color: '#fff' },
  headerSubtitle: { fontSize: SIZES.sm, color: COLORS.accent, fontWeight: '600' },
  daySelectorWrap: {
    paddingVertical: 12,
    backgroundColor: COLORS.background,
  },
  daySelector: { paddingHorizontal: SIZES.padding, gap: 8 },
  dayChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: SIZES.radiusFull,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.surfaceBorder,
  },
  dayText: { fontSize: SIZES.sm, fontWeight: '600', color: COLORS.textSecondary },
  dayTextActive: { fontSize: SIZES.sm, fontWeight: '700', color: '#fff' },
  dayTitle: {
    fontSize: SIZES.lg,
    fontWeight: '700',
    color: COLORS.text,
    marginHorizontal: SIZES.padding,
    marginBottom: 14,
  },
  mealCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    marginHorizontal: SIZES.padding,
    marginBottom: 12,
    borderRadius: SIZES.radius,
    borderWidth: 1,
    borderColor: COLORS.surfaceBorder,
    overflow: 'hidden',
    ...SHADOWS.card,
  },
  mealAccent: {
    width: 4,
  },
  mealContent: {
    flex: 1,
    padding: 16,
  },
  mealHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.surfaceBorder,
  },
  mealTitleWrap: {},
  mealType: { fontSize: SIZES.base, fontWeight: '700', color: COLORS.text },
  mealTime: { fontSize: SIZES.xs, color: COLORS.textSecondary, marginTop: 2 },
  calorieBadge: {
    backgroundColor: 'rgba(212,163,115,0.15)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: SIZES.radiusFull,
    alignItems: 'center',
  },
  calorieValue: { fontSize: SIZES.base, fontWeight: '800', color: COLORS.accent },
  calorieLabel: { fontSize: SIZES.xs, color: COLORS.accent },
  mealItem: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 6 },
  bullet: { fontSize: SIZES.md, color: COLORS.primaryGlow, marginRight: 8, marginTop: 2 },
  mealItemText: { flex: 1, fontSize: SIZES.md, color: COLORS.text, lineHeight: 20 },
  totalCard: {
    marginHorizontal: SIZES.padding,
    marginBottom: 12,
    borderRadius: SIZES.radius,
    overflow: 'hidden',
    ...SHADOWS.glow,
  },
  totalGradient: {
    padding: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: SIZES.radius,
  },
  totalLabel: { fontSize: SIZES.base, fontWeight: '700', color: '#fff' },
  totalValue: { fontSize: SIZES.lg, fontWeight: '800', color: '#fff' },
  tipsCard: {
    backgroundColor: COLORS.surface,
    marginHorizontal: SIZES.padding,
    marginBottom: 12,
    padding: 18,
    borderRadius: SIZES.radius,
    borderWidth: 1,
    borderColor: COLORS.surfaceBorder,
    ...SHADOWS.card,
  },
  tipsTitle: { fontSize: SIZES.base, fontWeight: '700', color: COLORS.text, marginBottom: 10 },
  tipRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 8 },
  tipText: { flex: 1, fontSize: SIZES.md, color: COLORS.text, lineHeight: 20 },
  disclaimer: {
    marginHorizontal: SIZES.padding,
    padding: 14,
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radius,
    borderWidth: 1,
    borderColor: COLORS.warning + '30',
  },
  disclaimerText: { fontSize: SIZES.xs, color: COLORS.textSecondary, textAlign: 'center', lineHeight: 18 },
});
