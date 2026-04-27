import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  SafeAreaView, Dimensions, Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SIZES, SHADOWS } from '../utils/theme';
import { useTranslation } from 'react-i18next';

const { width } = Dimensions.get('window');

const FREE_FEATURES = [
  { icon: '◎', en: '5 yoga poses per day', hi: 'दिन में 5 योग आसन' },
  { icon: '◇', en: 'Basic diet plans', hi: 'बेसिक डाइट प्लान' },
  { icon: '◈', en: 'BMI calculator', hi: 'BMI कैलकुलेटर' },
  { icon: '◉', en: 'Water tracker', hi: 'पानी ट्रैकर' },
];

const PREMIUM_FEATURES = [
  { icon: '◎', en: '100+ yoga poses with animations', hi: '100+ योग आसन एनिमेशन के साथ' },
  { icon: '◇', en: 'All 7-day diet plans (Veg + Non-Veg)', hi: 'सभी 7-दिन डाइट प्लान (शाकाहारी + मांसाहारी)' },
  { icon: '✚', en: 'Full pain relief guides', hi: 'पूर्ण दर्द राहत गाइड' },
  { icon: '⬡', en: 'Complete food database (80+ foods)', hi: 'पूर्ण फ़ूड डेटाबेस (80+ भोजन)' },
  { icon: '◈', en: 'Advanced health tracking', hi: 'उन्नत स्वास्थ्य ट्रैकिंग' },
  { icon: '▤', en: 'Weekly & monthly reports', hi: 'साप्ताहिक और मासिक रिपोर्ट' },
  { icon: '◉', en: 'Personalized goals', hi: 'व्यक्तिगत लक्ष्य' },
  { icon: '✕', en: 'No ads', hi: 'कोई विज्ञापन नहीं' },
];

const PLANS = [
  {
    id: 'monthly',
    priceEn: '₹199',
    priceHi: '₹199',
    periodEn: '/month',
    periodHi: '/महीना',
    badge: null,
    save: null,
  },
  {
    id: 'yearly',
    priceEn: '₹1,999',
    priceHi: '₹1,999',
    periodEn: '/year',
    periodHi: '/साल',
    badgeEn: 'BEST VALUE',
    badgeHi: 'सबसे अच्छा',
    saveEn: 'Save 18%',
    saveHi: '18% बचाएं',
  },
  {
    id: 'lifetime',
    priceEn: '₹4,999',
    priceHi: '₹4,999',
    periodEn: 'one-time',
    periodHi: 'एक बार',
    badgeEn: 'LIFETIME',
    badgeHi: 'आजीवन',
    saveEn: 'Pay once, use forever',
    saveHi: 'एक बार भुगतान, हमेशा उपयोग',
  },
];

export default function SubscriptionScreen({ navigation }) {
  const { i18n } = useTranslation();
  const isHindi = i18n.language === 'hi';
  const [selectedPlan, setSelectedPlan] = useState('yearly');

  const handleSubscribe = () => {
    Alert.alert(
      isHindi ? '🎉 प्रीमियम' : '🎉 Premium',
      isHindi
        ? 'सब्सक्रिप्शन सिस्टम जल्द ही जोड़ा जाएगा। धन्यवाद!'
        : 'Subscription system coming soon. Thank you!',
      [{ text: 'OK' }]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Text style={styles.backText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>
            {isHindi ? '★ प्रीमियम' : '★ Premium'}
          </Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Hero Section */}
        <LinearGradient
          colors={['#0A0A0A', '#1B4332', '#0A0A0A']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.hero}
        >
          <View style={styles.heroIconWrap}>
            <LinearGradient
              colors={['#D4A373', '#E9C46A']}
              style={styles.heroIconGradient}
            >
              <Text style={styles.heroEmoji}>★</Text>
            </LinearGradient>
          </View>
          <Text style={styles.heroTitle}>
            {isHindi ? 'YogaFit Pro प्रीमियम' : 'YogaFit Pro Premium'}
          </Text>
          <Text style={styles.heroSubtitle}>
            {isHindi
              ? 'सभी सुविधाएं अनलॉक करें और अपनी स्वास्थ्य यात्रा तेज़ करें'
              : 'Unlock all features & accelerate your health journey'}
          </Text>
        </LinearGradient>

        {/* Free vs Premium */}
        <View style={styles.comparisonSection}>
          <Text style={styles.sectionTitle}>
            {isHindi ? 'मुफ़्त vs प्रीमियम' : 'Free vs Premium'}
          </Text>

          {/* Free Column */}
          <View style={styles.comparisonCard}>
            <View style={styles.comparisonHeader}>
              <Text style={styles.comparisonLabel}>
                {isHindi ? '🆓 मुफ़्त' : '🆓 Free'}
              </Text>
            </View>
            {FREE_FEATURES.map((feature, index) => (
              <View key={index} style={styles.featureRow}>
                <Text style={styles.featureIcon}>{feature.icon}</Text>
                <Text style={styles.featureText}>
                  {isHindi ? feature.hi : feature.en}
                </Text>
                <Text style={styles.checkIcon}>✓</Text>
              </View>
            ))}
          </View>

          {/* Premium Column */}
          <View style={[styles.comparisonCard, styles.premiumCard]}>
            <LinearGradient
              colors={[COLORS.primaryDark, COLORS.primary]}
              style={styles.premiumHeader}
            >
              <Text style={[styles.comparisonLabel, { color: '#fff' }]}>
                {isHindi ? '★ प्रीमियम' : '★ Premium'}
              </Text>
            </LinearGradient>
            {PREMIUM_FEATURES.map((feature, index) => (
              <View key={index} style={styles.featureRow}>
                <Text style={[styles.featureIcon, { color: COLORS.accent }]}>{feature.icon}</Text>
                <Text style={[styles.featureText, { color: COLORS.text }]}>
                  {isHindi ? feature.hi : feature.en}
                </Text>
                <Text style={[styles.checkIcon, { color: COLORS.accent }]}>✓</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Plans */}
        <View style={styles.plansSection}>
          <Text style={styles.sectionTitle}>
            {isHindi ? '📦 प्लान चुनें' : '📦 Choose Your Plan'}
          </Text>

          {PLANS.map((plan) => (
            <TouchableOpacity
              key={plan.id}
              style={[
                styles.planCard,
                selectedPlan === plan.id && styles.planCardSelected,
              ]}
              onPress={() => setSelectedPlan(plan.id)}
              activeOpacity={0.7}
            >
              {plan.badge && (
                <LinearGradient
                  colors={[COLORS.primaryDark, COLORS.primary]}
                  style={styles.planBadge}
                >
                  <Text style={styles.planBadgeText}>
                    {isHindi ? plan.badgeHi : plan.badgeEn}
                  </Text>
                </LinearGradient>
              )}
              <View style={styles.planContent}>
                <View>
                  <Text style={styles.planPrice}>
                    {isHindi ? plan.priceHi : plan.priceEn}
                  </Text>
                  <Text style={styles.planPeriod}>
                    {isHindi ? plan.periodHi : plan.periodEn}
                  </Text>
                </View>
                {plan.save && (
                  <View style={styles.saveTag}>
                    <Text style={styles.saveText}>
                      {isHindi ? plan.saveHi : plan.saveEn}
                    </Text>
                  </View>
                )}
                <View style={[
                  styles.radioOuter,
                  selectedPlan === plan.id && styles.radioOuterSelected,
                ]}>
                  {selectedPlan === plan.id && (
                    <LinearGradient
                      colors={[COLORS.primaryDark, COLORS.primary]}
                      style={styles.radioInner}
                    />
                  )}
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Subscribe Button */}
        <TouchableOpacity style={styles.subscribeBtnWrap} onPress={handleSubscribe}>
          <LinearGradient
            colors={[COLORS.primaryDark, COLORS.primary, COLORS.primaryLight]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.subscribeBtn}
          >
            <Text style={styles.subscribeText}>
              {isHindi ? 'अभी सब्सक्राइब करें' : 'Subscribe Now'}
            </Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Restore */}
        <TouchableOpacity style={styles.restoreBtn}>
          <Text style={styles.restoreText}>
            {isHindi ? 'खरीदारी पुनर्स्थापित करें' : 'Restore Purchase'}
          </Text>
        </TouchableOpacity>

        {/* Testimonial */}
        <View style={styles.testimonial}>
          <Text style={styles.testimonialStars}>★ ★ ★ ★ ★</Text>
          <Text style={styles.testimonialText}>
            {isHindi
              ? '"यह ऐप मेरी ज़िंदगी बदल दी! 3 महीने में 10 kg वज़न कम किया।"'
              : '"This app changed my life! Lost 10kg in 3 months."'}
          </Text>
          <Text style={styles.testimonialAuthor}>
            {isHindi ? '— प्रिया, दिल्ली' : '— Priya, Delhi'}
          </Text>
        </View>

        {/* Disclaimer */}
        <View style={styles.disclaimer}>
          <Text style={styles.disclaimerText}>
            {isHindi
              ? 'सब्सक्रिप्शन ऑटो-रिन्यू होता है। किसी भी समय रद्द करें। 7 दिन का फ्री ट्रायल।'
              : 'Subscription auto-renews. Cancel anytime. 7-day free trial.'}
          </Text>
        </View>

        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SIZES.padding,
    paddingVertical: 12,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  backBtn: { padding: 8 },
  backText: { fontSize: 28, color: COLORS.text },
  headerTitle: { fontSize: SIZES.lg, fontWeight: '700', color: COLORS.accent },
  hero: {
    alignItems: 'center',
    paddingVertical: 36,
    paddingHorizontal: SIZES.padding,
  },
  heroIconWrap: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: 'hidden',
    marginBottom: 16,
    ...SHADOWS.glowGold,
  },
  heroIconGradient: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroEmoji: { fontSize: 36, color: '#fff' },
  heroTitle: {
    fontSize: SIZES.xxl,
    fontWeight: '800',
    color: COLORS.text,
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: SIZES.md,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: 8,
    paddingHorizontal: 20,
    lineHeight: 22,
  },
  comparisonSection: {
    paddingHorizontal: SIZES.padding,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: SIZES.lg,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 14,
  },
  comparisonCard: {
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radius,
    marginBottom: 14,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.card,
  },
  premiumCard: {
    borderWidth: 1,
    borderColor: COLORS.primaryGlow,
  },
  comparisonHeader: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: COLORS.surfaceAlt,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  premiumHeader: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  comparisonLabel: {
    fontSize: SIZES.base,
    fontWeight: '700',
    color: COLORS.text,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  featureIcon: { fontSize: 16, marginRight: 12, color: COLORS.textSecondary, width: 20, textAlign: 'center' },
  featureText: { flex: 1, fontSize: SIZES.sm, color: COLORS.textSecondary },
  checkIcon: { fontSize: 16, fontWeight: '700', color: COLORS.success },
  plansSection: {
    paddingHorizontal: SIZES.padding,
    marginTop: 24,
  },
  planCard: {
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radius,
    padding: 18,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.card,
  },
  planCardSelected: {
    borderColor: COLORS.primaryGlow,
    backgroundColor: COLORS.surfaceElevated,
  },
  planBadge: {
    position: 'absolute',
    top: -1,
    right: 16,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  planBadgeText: {
    fontSize: SIZES.xs,
    fontWeight: '700',
    color: '#fff',
  },
  planContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  planPrice: {
    fontSize: SIZES.xxl,
    fontWeight: '800',
    color: COLORS.text,
  },
  planPeriod: {
    fontSize: SIZES.sm,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  saveTag: {
    backgroundColor: COLORS.accent + '20',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: SIZES.radiusFull,
  },
  saveText: {
    fontSize: SIZES.xs,
    fontWeight: '600',
    color: COLORS.accent,
  },
  radioOuter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOuterSelected: {
    borderColor: COLORS.primaryGlow,
  },
  radioInner: {
    width: 14,
    height: 14,
    borderRadius: 7,
  },
  subscribeBtnWrap: {
    marginHorizontal: SIZES.padding,
    marginTop: 24,
    borderRadius: SIZES.radiusLg,
    overflow: 'hidden',
    ...SHADOWS.glow,
  },
  subscribeBtn: {
    paddingVertical: 18,
    alignItems: 'center',
    borderRadius: SIZES.radiusLg,
  },
  subscribeText: {
    fontSize: SIZES.lg,
    fontWeight: '800',
    color: '#fff',
  },
  restoreBtn: {
    alignItems: 'center',
    marginTop: 16,
  },
  restoreText: {
    fontSize: SIZES.md,
    color: COLORS.primaryGlow,
    fontWeight: '600',
  },
  testimonial: {
    marginHorizontal: SIZES.padding,
    marginTop: 24,
    padding: 18,
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radius,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.card,
  },
  testimonialStars: { fontSize: 14, marginBottom: 10, color: COLORS.accent, letterSpacing: 4 },
  testimonialText: {
    fontSize: SIZES.md,
    color: COLORS.text,
    fontStyle: 'italic',
    lineHeight: 22,
  },
  testimonialAuthor: {
    fontSize: SIZES.sm,
    color: COLORS.textSecondary,
    marginTop: 10,
    fontWeight: '600',
  },
  disclaimer: {
    marginHorizontal: SIZES.padding,
    marginTop: 20,
    padding: 12,
  },
  disclaimerText: {
    fontSize: SIZES.xs,
    color: COLORS.textLight,
    textAlign: 'center',
    lineHeight: 18,
  },
});
