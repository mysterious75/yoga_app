import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { COLORS, SIZES, SHADOWS } from '../utils/theme';
import { DIET_PLANS } from '../data/dietPlans';
import { useTranslation } from 'react-i18next';

const PLAN_CARDS = [
  { id: 'weight_loss_veg', icon: '🥗', color: '#00B894' },
  { id: 'weight_loss_nonveg', icon: '🍗', color: '#E17055' },
  { id: 'muscle_gain', icon: '💪', color: '#6C5CE7' },
];

export default function DietScreen({ navigation }) {
  const { i18n } = useTranslation();
  const isHindi = i18n.language === 'hi';
  const [selectedType, setSelectedType] = useState('all');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>{isHindi ? '🍽️ आहार योजनाएं' : '🍽️ Diet Plans'}</Text>
          <Text style={styles.subtitle}>{isHindi ? 'प्रमाणित पोषण दिशानिर्देशों पर आधारित' : 'Based on certified nutrition guidelines'}</Text>
        </View>

        {/* Calorie Calculator Teaser */}
        <View style={styles.calcCard}>
          <Text style={styles.calcIcon}>🔢</Text>
          <View style={styles.calcInfo}>
            <Text style={styles.calcTitle}>{isHindi ? 'कैलोरी कैलकुलेटर' : 'Calorie Calculator'}</Text>
            <Text style={styles.calcDesc}>{isHindi ? 'अपनी दैनिक कैलोरी ज़रूरत जानें' : 'Know your daily calorie needs'}</Text>
          </View>
          <TouchableOpacity style={styles.calcBtn}>
            <Text style={styles.calcBtnText}>{isHindi ? 'गणना करें' : 'Calculate'}</Text>
          </TouchableOpacity>
        </View>

        {/* Plan Cards */}
        {PLAN_CARDS.map(card => {
          const plan = DIET_PLANS[card.id];
          if (!plan) return null;
          return (
            <TouchableOpacity
              key={card.id}
              style={styles.planCard}
              onPress={() => navigation.navigate('DietPlanDetail', { planId: card.id })}
              activeOpacity={0.85}
            >
              <View style={[styles.planIconWrap, { backgroundColor: card.color + '15' }]}>
                <Text style={styles.planIcon}>{card.icon}</Text>
              </View>
              <View style={styles.planInfo}>
                <Text style={styles.planName}>{isHindi ? plan.nameHi : plan.name}</Text>
                <Text style={styles.planDesc}>{isHindi ? plan.descriptionHi : plan.description}</Text>
                <View style={styles.planMeta}>
                  <Text style={styles.planCalories}>🔥 {plan.calories} {isHindi ? 'कैलोरी/दिन' : 'cal/day'}</Text>
                  <Text style={styles.planDays}>📅 7 {isHindi ? 'दिन' : 'days'}</Text>
                </View>
              </View>
              <Text style={styles.arrow}>›</Text>
            </TouchableOpacity>
          );
        })}

        {/* Nutrition Tips */}
        <Text style={styles.sectionTitle}>{isHindi ? '💡 पोषण टिप्स' : '💡 Nutrition Tips'}</Text>
        {[
          { icon: '💧', en: 'Drink 3-4 liters of water daily', hi: 'रोज़ 3-4 लीटर पानी पिएं' },
          { icon: '🕐', en: 'Eat at regular intervals (every 3-4 hours)', hi: 'नियमित अंतराल पर खाएं (हर 3-4 घंटे)' },
          { icon: '🥗', en: 'Include salad in every meal', hi: 'हर भोजन में सलाद शामिल करें' },
          { icon: '🚫', en: 'Avoid processed and packaged food', hi: 'प्रोसेस्ड और पैकेज्ड फूड से बचें' },
          { icon: '🌙', en: 'Don\'t eat after 8 PM', hi: 'रात 8 बजे के बाद न खाएं' },
        ].map((tip, index) => (
          <View key={index} style={styles.tipRow}>
            <Text style={styles.tipIcon}>{tip.icon}</Text>
            <Text style={styles.tipText}>{isHindi ? tip.hi : tip.en}</Text>
          </View>
        ))}

        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { paddingHorizontal: SIZES.padding, paddingTop: 20, paddingBottom: 10 },
  title: { fontSize: SIZES.title, fontWeight: '800', color: COLORS.text },
  subtitle: { fontSize: SIZES.sm, color: COLORS.textSecondary, marginTop: 4 },
  calcCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.info + '10',
    marginHorizontal: SIZES.padding,
    marginTop: 16,
    padding: 14,
    borderRadius: SIZES.radius,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.info,
  },
  calcIcon: { fontSize: 28, marginRight: 12 },
  calcInfo: { flex: 1 },
  calcTitle: { fontSize: SIZES.base, fontWeight: '700', color: COLORS.text },
  calcDesc: { fontSize: SIZES.xs, color: COLORS.textSecondary },
  calcBtn: {
    backgroundColor: COLORS.info,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: SIZES.radiusFull,
  },
  calcBtnText: { fontSize: SIZES.xs, fontWeight: '700', color: '#fff' },
  planCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    marginHorizontal: SIZES.padding,
    marginTop: 14,
    padding: 16,
    borderRadius: SIZES.radius,
    ...SHADOWS.medium,
  },
  planIconWrap: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  planIcon: { fontSize: 28 },
  planInfo: { flex: 1, marginLeft: 12 },
  planName: { fontSize: SIZES.base, fontWeight: '700', color: COLORS.text },
  planDesc: { fontSize: SIZES.xs, color: COLORS.textSecondary, marginTop: 2 },
  planMeta: { flexDirection: 'row', marginTop: 6, gap: 12 },
  planCalories: { fontSize: SIZES.xs, fontWeight: '600', color: COLORS.primary },
  planDays: { fontSize: SIZES.xs, color: COLORS.textSecondary },
  arrow: { fontSize: 24, color: COLORS.textLight },
  sectionTitle: {
    fontSize: SIZES.lg,
    fontWeight: '700',
    color: COLORS.text,
    marginHorizontal: SIZES.padding,
    marginTop: 24,
    marginBottom: 10,
  },
  tipRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: SIZES.padding,
    marginBottom: 10,
    backgroundColor: COLORS.surface,
    padding: 12,
    borderRadius: SIZES.radius,
  },
  tipIcon: { fontSize: 20, marginRight: 12 },
  tipText: { flex: 1, fontSize: SIZES.md, color: COLORS.text },
});
