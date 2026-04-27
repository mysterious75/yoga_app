import React from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  SafeAreaView, Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SIZES, SHADOWS } from '../utils/theme';
import { useTranslation } from 'react-i18next';

const { width } = Dimensions.get('window');

const QUICK_ACTIONS = [
  { id: 'yoga', icon: '◎', titleEn: 'Start Yoga', titleHi: 'योग शुरू करें', screen: 'YogaTab', gradient: ['#1B4332', '#2D6A4F'] },
  { id: 'diet', icon: '◇', titleEn: 'Diet Plan', titleHi: 'आहार योजना', screen: 'DietTab', gradient: ['#D4A373', '#E9C46A'] },
  { id: 'tracker', icon: '◈', titleEn: 'Track Health', titleHi: 'स्वास्थ्य ट्रैक', screen: 'Tracker', gradient: ['#16213E', '#4CC9F0'] },
  { id: 'food', icon: '⬡', titleEn: 'Food DB', titleHi: 'फ़ूड डेटाबेस', screen: 'FoodDatabase', gradient: ['#2D1B4E', '#7B2CBF'] },
  { id: 'pain', icon: '✚', titleEn: 'Pain Guide', titleHi: 'दर्द गाइड', screen: 'PainGuide', gradient: ['#3D0000', '#FF6B6B'] },
  { id: 'premium', icon: '★', titleEn: 'Go Premium', titleHi: 'प्रीमियम', screen: 'Subscription', gradient: ['#B08968', '#E9C46A'] },
];

const DAILY_TIPS = [
  { en: 'Start your day with warm lemon water', hi: 'अपना दिन गर्म नींबू पानी से शुरू करें' },
  { en: 'Do 10 minutes of yoga every morning', hi: 'हर सुबह 10 मिनट योग करें' },
  { en: 'Eat more fiber-rich foods', hi: 'ज़्यादा फाइबर युक्त भोजन खाएं' },
  { en: 'Drink 3-4 liters of water daily', hi: 'रोज़ 3-4 लीटर पानी पिएं' },
  { en: 'Sleep 7-8 hours for better health', hi: 'बेहतर स्वास्थ्य के लिए 7-8 घंटे सोएं' },
  { en: 'Walk 30 minutes after dinner', hi: 'रात के खाने के बाद 30 मिनट चलें' },
];

export default function HomeScreen({ navigation }) {
  const { t, i18n } = useTranslation();
  const isHindi = i18n.language === 'hi';
  const todayTip = DAILY_TIPS[new Date().getDay()];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <LinearGradient
          colors={['#0A0A0A', '#1B4332', '#0A0A0A']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.hero}
        >
          <View style={styles.heroInner}>
            <View style={styles.heroTop}>
              <View>
                <Text style={styles.greeting}>
                  {isHindi ? 'नमस्ते 🙏' : 'Hello 🙏'}
                </Text>
                <Text style={styles.title}>YogaFit Pro</Text>
                <Text style={styles.subtitle}>
                  {isHindi ? 'आपका पूर्ण स्वास्थ्य साथी' : 'Your complete health companion'}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.premiumBadge}
                onPress={() => navigation.navigate('Subscription')}
              >
                <LinearGradient
                  colors={['#D4A373', '#E9C46A']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.premiumBadgeGradient}
                >
                  <Text style={styles.premiumText}>★ PRO</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>

            {/* Daily Tip */}
            <View style={styles.tipCard}>
              <LinearGradient
                colors={['rgba(45,106,79,0.3)', 'rgba(26,26,46,0.8)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.tipGradient}
              >
                <View style={styles.tipAccent} />
                <View style={styles.tipContent}>
                  <Text style={styles.tipLabel}>
                    {isHindi ? '✦ आज का टिप' : "✦ Today's Tip"}
                  </Text>
                  <Text style={styles.tipText}>
                    {isHindi ? todayTip.hi : todayTip.en}
                  </Text>
                </View>
              </LinearGradient>
            </View>
          </View>
        </LinearGradient>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {isHindi ? 'त्वरित कार्य' : 'Quick Actions'}
          </Text>
          <View style={styles.sectionDivider} />
          <View style={styles.actionsGrid}>
            {QUICK_ACTIONS.map((action) => (
              <TouchableOpacity
                key={action.id}
                style={styles.actionCard}
                onPress={() => navigation.navigate(action.screen)}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={action.gradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.actionIconWrap}
                >
                  <Text style={styles.actionIcon}>{action.icon}</Text>
                </LinearGradient>
                <Text style={styles.actionTitle}>
                  {isHindi ? action.titleHi : action.titleEn}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Feature Highlights */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {isHindi ? 'विशेषताएं' : 'Features'}
          </Text>
          <View style={styles.sectionDivider} />

          {[
            { icon: '◎', titleEn: '100+ Yoga Poses', titleHi: '100+ योग आसन', descEn: 'Learn with animations', descHi: 'एनिमेशन के साथ सीखें', screen: 'YogaTab', gradient: ['#1B4332', '#2D6A4F'] },
            { icon: '◇', titleEn: 'Certified Diet Plans', titleHi: 'प्रमाणित आहार योजनाएं', descEn: 'Veg & Non-Veg options', descHi: 'शाकाहारी और मांसाहारी दोनों', screen: 'DietTab', gradient: ['#D4A373', '#B08968'] },
            { icon: '◈', titleEn: 'Health Tracker', titleHi: 'स्वास्थ्य ट्रैकर', descEn: 'Track weight, water, sleep', descHi: 'वज़न, पानी, नींद सब ट्रैक करें', screen: 'Tracker', gradient: ['#16213E', '#4CC9F0'] },
            { icon: '✚', titleEn: 'Pain Relief Guide', titleHi: 'दर्द से राहत', descEn: 'Yoga + Diet + Doctor advice', descHi: 'योग + आहार + डॉक्टर सलाह', screen: 'PainGuide', gradient: ['#3D0000', '#FF6B6B'] },
          ].map((feature, index) => (
            <TouchableOpacity
              key={index}
              style={styles.featureCard}
              onPress={() => navigation.navigate(feature.screen)}
              activeOpacity={0.85}
            >
              <View style={styles.featureCardInner}>
                <LinearGradient
                  colors={feature.gradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.featureIconWrap}
                >
                  <Text style={styles.featureIcon}>{feature.icon}</Text>
                </LinearGradient>
                <View style={styles.featureText}>
                  <Text style={styles.featureTitle}>
                    {isHindi ? feature.titleHi : feature.titleEn}
                  </Text>
                  <Text style={styles.featureDesc}>
                    {isHindi ? feature.descHi : feature.descEn}
                  </Text>
                </View>
                <Text style={styles.featureArrow}>›</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Disclaimer */}
        <View style={styles.disclaimer}>
          <View style={styles.disclaimerInner}>
            <Text style={styles.disclaimerIcon}>⚕</Text>
            <Text style={styles.disclaimerText}>
              {isHindi
                ? 'यह ऐप केवल सामान्य मार्गदर्शन प्रदान करता है। चिकित्सा सलाह के लिए डॉक्टर से मिलें।'
                : 'This app provides general guidance only. Consult a doctor for medical advice.'}
            </Text>
          </View>
        </View>

        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  hero: {
    paddingTop: 20,
    paddingBottom: 24,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  heroInner: {
    paddingHorizontal: SIZES.padding,
  },
  heroTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  greeting: {
    fontSize: SIZES.md,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  title: {
    fontSize: SIZES.title,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: SIZES.sm,
    color: COLORS.textSecondary,
  },
  premiumBadge: {
    borderRadius: SIZES.radiusFull,
    overflow: 'hidden',
    ...SHADOWS.glowGold,
  },
  premiumBadgeGradient: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: SIZES.radiusFull,
  },
  premiumText: {
    fontSize: SIZES.sm,
    fontWeight: '800',
    color: '#0A0A0A',
    letterSpacing: 1,
  },
  tipCard: {
    borderRadius: SIZES.radius,
    overflow: 'hidden',
    ...SHADOWS.card,
  },
  tipGradient: {
    flexDirection: 'row',
    borderRadius: SIZES.radius,
    overflow: 'hidden',
  },
  tipAccent: {
    width: 4,
    backgroundColor: COLORS.primaryGlow,
  },
  tipContent: {
    flex: 1,
    padding: 16,
  },
  tipLabel: {
    fontSize: SIZES.sm,
    fontWeight: '700',
    color: COLORS.primaryGlow,
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  tipText: {
    fontSize: SIZES.md,
    color: COLORS.text,
    lineHeight: 22,
  },
  section: {
    marginTop: 28,
    paddingHorizontal: SIZES.padding,
  },
  sectionTitle: {
    fontSize: SIZES.lg,
    fontWeight: '800',
    color: COLORS.text,
    letterSpacing: 0.3,
  },
  sectionDivider: {
    width: 32,
    height: 3,
    backgroundColor: COLORS.primaryGlow,
    borderRadius: 2,
    marginTop: 8,
    marginBottom: 16,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  actionCard: {
    width: (width - SIZES.padding * 2 - 24) / 3,
    alignItems: 'center',
    padding: 14,
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radiusLg,
    borderWidth: 1,
    borderColor: COLORS.surfaceBorder,
    ...SHADOWS.card,
  },
  actionIconWrap: {
    width: 50,
    height: 50,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  actionIcon: {
    fontSize: 22,
    color: '#fff',
    fontWeight: '600',
  },
  actionTitle: {
    fontSize: SIZES.xs,
    fontWeight: '600',
    color: COLORS.text,
    textAlign: 'center',
    letterSpacing: 0.2,
  },
  featureCard: {
    marginBottom: 12,
    borderRadius: SIZES.radiusLg,
    overflow: 'hidden',
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.surfaceBorder,
    ...SHADOWS.card,
  },
  featureCardInner: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  featureIconWrap: {
    width: 52,
    height: 52,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureIcon: {
    fontSize: 24,
    color: '#fff',
    fontWeight: '600',
  },
  featureText: {
    flex: 1,
    marginLeft: 14,
  },
  featureTitle: {
    fontSize: SIZES.base,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 3,
  },
  featureDesc: {
    fontSize: SIZES.sm,
    color: COLORS.textSecondary,
  },
  featureArrow: {
    fontSize: 28,
    color: COLORS.textLight,
    fontWeight: '300',
  },
  disclaimer: {
    marginHorizontal: SIZES.padding,
    marginTop: 24,
    borderRadius: SIZES.radius,
    overflow: 'hidden',
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.warning + '30',
  },
  disclaimerInner: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
  },
  disclaimerIcon: {
    fontSize: 18,
    color: COLORS.warning,
    marginRight: 10,
  },
  disclaimerText: {
    flex: 1,
    fontSize: SIZES.xs,
    color: COLORS.textSecondary,
    lineHeight: 18,
  },
});
