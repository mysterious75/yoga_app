import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { COLORS, SIZES, SHADOWS } from '../utils/theme';
import { DIET_PLANS } from '../data/dietPlans';
import { useTranslation } from 'react-i18next';

export default function DietPlanDetailScreen({ route, navigation }) {
  const { planId } = route.params;
  const plan = DIET_PLANS[planId];
  const { i18n } = useTranslation();
  const isHindi = i18n.language === 'hi';
  const [selectedDay, setSelectedDay] = useState(0);

  if (!plan) return null;

  const day = plan.days[selectedDay];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Text style={styles.headerTitle}>{isHindi ? plan.nameHi : plan.name}</Text>
          <Text style={styles.headerSubtitle}>🔥 {plan.calories} {isHindi ? 'कैलोरी/दिन' : 'cal/day'}</Text>
        </View>
      </View>

      {/* Day Selector */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.daySelector}>
        {plan.days.map((d, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.dayChip, selectedDay === index && styles.dayChipActive]}
            onPress={() => setSelectedDay(index)}
          >
            <Text style={[styles.dayText, selectedDay === index && styles.dayTextActive]}>
              {isHindi ? d.dayHi.slice(0, 3) : d.day.slice(0, 3)}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Day Title */}
        <Text style={styles.dayTitle}>
          {isHindi ? day.dayHi : day.day} - {isHindi ? plan.nameHi : plan.name}
        </Text>

        {/* Meals */}
        {day.meals.map((meal, index) => (
          <View key={index} style={styles.mealCard}>
            <View style={styles.mealHeader}>
              <View>
                <Text style={styles.mealType}>{isHindi ? meal.typeHi : meal.type}</Text>
                <Text style={styles.mealTime}>🕐 {meal.time}</Text>
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
        ))}

        {/* Total Calories */}
        <View style={styles.totalCard}>
          <Text style={styles.totalLabel}>{isHindi ? 'कुल कैलोरी' : 'Total Calories'}</Text>
          <Text style={styles.totalValue}>
            {day.meals.reduce((sum, m) => sum + m.calories, 0)} {isHindi ? 'कैलोरी' : 'calories'}
          </Text>
        </View>

        {/* Tips */}
        <View style={styles.tipsCard}>
          <Text style={styles.tipsTitle}>{isHindi ? '💡 टिप्स' : '💡 Tips'}</Text>
          {(isHindi ? plan.tipsHi : plan.tips).map((tip, index) => (
            <View key={index} style={styles.tipRow}>
              <Text style={styles.bullet}>✓</Text>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SIZES.padding,
    paddingVertical: 12,
    backgroundColor: COLORS.surface,
    ...SHADOWS.small,
  },
  backBtn: { padding: 8 },
  backText: { fontSize: 28, color: COLORS.text },
  headerInfo: { flex: 1, marginLeft: 8 },
  headerTitle: { fontSize: SIZES.lg, fontWeight: '700', color: COLORS.text },
  headerSubtitle: { fontSize: SIZES.sm, color: COLORS.primary, fontWeight: '600' },
  daySelector: { paddingHorizontal: SIZES.padding, paddingVertical: 12, gap: 8 },
  dayChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: SIZES.radiusFull,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  dayChipActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  dayText: { fontSize: SIZES.sm, fontWeight: '600', color: COLORS.text },
  dayTextActive: { color: '#fff' },
  dayTitle: {
    fontSize: SIZES.lg,
    fontWeight: '700',
    color: COLORS.text,
    marginHorizontal: SIZES.padding,
    marginBottom: 12,
  },
  mealCard: {
    backgroundColor: COLORS.surface,
    marginHorizontal: SIZES.padding,
    marginBottom: 12,
    padding: 16,
    borderRadius: SIZES.radius,
    ...SHADOWS.small,
  },
  mealHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  mealType: { fontSize: SIZES.base, fontWeight: '700', color: COLORS.text },
  mealTime: { fontSize: SIZES.xs, color: COLORS.textSecondary, marginTop: 2 },
  calorieBadge: {
    backgroundColor: COLORS.primary + '15',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: SIZES.radiusFull,
    alignItems: 'center',
  },
  calorieValue: { fontSize: SIZES.base, fontWeight: '700', color: COLORS.primary },
  calorieLabel: { fontSize: SIZES.xs, color: COLORS.primary },
  mealItem: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 6 },
  bullet: { fontSize: SIZES.md, color: COLORS.primary, marginRight: 8, marginTop: 2 },
  mealItemText: { flex: 1, fontSize: SIZES.md, color: COLORS.text, lineHeight: 20 },
  totalCard: {
    backgroundColor: COLORS.primary,
    marginHorizontal: SIZES.padding,
    marginBottom: 12,
    padding: 16,
    borderRadius: SIZES.radius,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: { fontSize: SIZES.base, fontWeight: '700', color: '#fff' },
  totalValue: { fontSize: SIZES.lg, fontWeight: '800', color: '#fff' },
  tipsCard: {
    backgroundColor: COLORS.surface,
    marginHorizontal: SIZES.padding,
    marginBottom: 12,
    padding: 16,
    borderRadius: SIZES.radius,
    ...SHADOWS.small,
  },
  tipsTitle: { fontSize: SIZES.base, fontWeight: '700', color: COLORS.text, marginBottom: 10 },
  tipRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 8 },
  tipText: { flex: 1, fontSize: SIZES.md, color: COLORS.text, lineHeight: 20 },
  disclaimer: {
    marginHorizontal: SIZES.padding,
    padding: 12,
    backgroundColor: COLORS.warning + '15',
    borderRadius: SIZES.radius,
  },
  disclaimerText: { fontSize: SIZES.xs, color: COLORS.textSecondary, textAlign: 'center', lineHeight: 18 },
});
