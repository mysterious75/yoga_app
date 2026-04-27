import React from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  SafeAreaView, Dimensions, ImageBackground,
} from 'react-native';
import { COLORS, SIZES, SHADOWS } from '../utils/theme';
import { useTranslation } from 'react-i18next';

const { width } = Dimensions.get('window');

const QUICK_ACTIONS = [
  { id: 'yoga', icon: '🧘', titleEn: 'Start Yoga', titleHi: 'योग शुरू करें', screen: 'YogaTab', color: '#FF6B35' },
  { id: 'diet', icon: '🍽️', titleEn: 'Diet Plan', titleHi: 'आहार योजना', screen: 'DietTab', color: '#00B894' },
  { id: 'tracker', icon: '📊', titleEn: 'Track Health', titleHi: 'स्वास्थ्य ट्रैक', screen: 'Tracker', color: '#3498DB' },
  { id: 'food', icon: '🍎', titleEn: 'Food DB', titleHi: 'फ़ूड डेटाबेस', screen: 'FoodDatabase', color: '#9B59B6' },
  { id: 'pain', icon: '🩺', titleEn: 'Pain Guide', titleHi: 'दर्द गाइड', screen: 'PainGuide', color: '#E74C3C' },
  { id: 'premium', icon: '⭐', titleEn: 'Go Premium', titleHi: 'प्रीमियम', screen: 'Subscription', color: '#F39C12' },
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
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>
              {isHindi ? 'नमस्ते 🙏' : 'Hello 🙏'}
            </Text>
            <Text style={styles.title}>
              {isHindi ? 'YogaFit Pro' : 'YogaFit Pro'}
            </Text>
            <Text style={styles.subtitle}>
              {isHindi ? 'आपका पूर्ण स्वास्थ्य साथी' : 'Your complete health companion'}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.premiumBadge}
            onPress={() => navigation.navigate('Subscription')}
          >
            <Text style={styles.premiumText}>⭐ PRO</Text>
          </TouchableOpacity>
        </View>

        {/* Daily Tip */}
        <View style={styles.tipCard}>
          <Text style={styles.tipLabel}>
            {isHindi ? '💡 आज का टिप' : "💡 Today's Tip"}
          </Text>
          <Text style={styles.tipText}>
            {isHindi ? todayTip.hi : todayTip.en}
          </Text>
        </View>

        {/* Quick Actions */}
        <Text style={styles.sectionTitle}>
          {isHindi ? 'त्वरित कार्य' : 'Quick Actions'}
        </Text>
        <View style={styles.actionsGrid}>
          {QUICK_ACTIONS.map((action) => (
            <TouchableOpacity
              key={action.id}
              style={styles.actionCard}
              onPress={() => {
                if (action.screen === 'FoodDatabase' || action.screen === 'PainGuide' || action.screen === 'Subscription') {
                  navigation.navigate(action.screen);
                } else {
                  navigation.navigate(action.screen);
                }
              }}
            >
              <View style={[styles.actionIcon, { backgroundColor: action.color + '15' }]}>
                <Text style={styles.actionEmoji}>{action.icon}</Text>
              </View>
              <Text style={styles.actionTitle}>
                {isHindi ? action.titleHi : action.titleEn}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Feature Highlights */}
        <Text style={styles.sectionTitle}>
          {isHindi ? 'विशेषताएं' : 'Features'}
        </Text>

        <TouchableOpacity
          style={[styles.featureCard, { backgroundColor: '#FF6B3515' }]}
          onPress={() => navigation.navigate('YogaTab')}
        >
          <View style={styles.featureContent}>
            <Text style={styles.featureIcon}>🧘</Text>
            <View style={styles.featureText}>
              <Text style={styles.featureTitle}>
                {isHindi ? '100+ योग आसन' : '100+ Yoga Poses'}
              </Text>
              <Text style={styles.featureDesc}>
                {isHindi ? 'एनिमेशन के साथ सीखें' : 'Learn with animations'}
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.featureCard, { backgroundColor: '#00B89415' }]}
          onPress={() => navigation.navigate('DietTab')}
        >
          <View style={styles.featureContent}>
            <Text style={styles.featureIcon}>🍽️</Text>
            <View style={styles.featureText}>
              <Text style={styles.featureTitle}>
                {isHindi ? 'प्रमाणित आहार योजनाएं' : 'Certified Diet Plans'}
              </Text>
              <Text style={styles.featureDesc}>
                {isHindi ? 'शाकाहारी और मांसाहारी दोनों' : 'Veg & Non-Veg options'}
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.featureCard, { backgroundColor: '#3498DB15' }]}
          onPress={() => navigation.navigate('Tracker')}
        >
          <View style={styles.featureContent}>
            <Text style={styles.featureIcon}>📊</Text>
            <View style={styles.featureText}>
              <Text style={styles.featureTitle}>
                {isHindi ? 'स्वास्थ्य ट्रैकर' : 'Health Tracker'}
              </Text>
              <Text style={styles.featureDesc}>
                {isHindi ? 'वज़न, पानी, नींद सब ट्रैक करें' : 'Track weight, water, sleep'}
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.featureCard, { backgroundColor: '#E74C3C15' }]}
          onPress={() => navigation.navigate('PainGuide')}
        >
          <View style={styles.featureContent}>
            <Text style={styles.featureIcon}>🩺</Text>
            <View style={styles.featureText}>
              <Text style={styles.featureTitle}>
                {isHindi ? 'दर्द से राहत' : 'Pain Relief Guide'}
              </Text>
              <Text style={styles.featureDesc}>
                {isHindi ? 'योग + आहार + डॉक्टर सलाह' : 'Yoga + Diet + Doctor advice'}
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* Disclaimer */}
        <View style={styles.disclaimer}>
          <Text style={styles.disclaimerText}>
            {isHindi
              ? '⚕️ यह ऐप केवल सामान्य मार्गदर्शन प्रदान करता है। चिकित्सा सलाह के लिए डॉक्टर से मिलें।'
              : '⚕️ This app provides general guidance only. Consult a doctor for medical advice.'}
          </Text>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: SIZES.padding,
    paddingTop: 20,
    paddingBottom: 10,
  },
  greeting: {
    fontSize: SIZES.md,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  title: {
    fontSize: SIZES.title,
    fontWeight: '800',
    color: COLORS.primary,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: SIZES.sm,
    color: COLORS.textSecondary,
  },
  premiumBadge: {
    backgroundColor: COLORS.star,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: SIZES.radiusFull,
    ...SHADOWS.small,
  },
  premiumText: {
    fontSize: SIZES.sm,
    fontWeight: '700',
    color: COLORS.secondary,
  },
  tipCard: {
    backgroundColor: COLORS.primary + '10',
    marginHorizontal: SIZES.padding,
    marginTop: 16,
    padding: 16,
    borderRadius: SIZES.radius,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
  },
  tipLabel: {
    fontSize: SIZES.sm,
    fontWeight: '600',
    color: COLORS.primary,
    marginBottom: 6,
  },
  tipText: {
    fontSize: SIZES.md,
    color: COLORS.text,
    lineHeight: 22,
  },
  sectionTitle: {
    fontSize: SIZES.lg,
    fontWeight: '700',
    color: COLORS.text,
    marginHorizontal: SIZES.padding,
    marginTop: 24,
    marginBottom: 12,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: SIZES.padding - 4,
    justifyContent: 'space-between',
  },
  actionCard: {
    width: (width - 48) / 3,
    alignItems: 'center',
    marginBottom: 16,
    padding: 12,
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radius,
    ...SHADOWS.small,
  },
  actionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  actionEmoji: {
    fontSize: 24,
  },
  actionTitle: {
    fontSize: SIZES.xs,
    fontWeight: '600',
    color: COLORS.text,
    textAlign: 'center',
  },
  featureCard: {
    marginHorizontal: SIZES.padding,
    marginBottom: 12,
    padding: 16,
    borderRadius: SIZES.radius,
  },
  featureContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureIcon: {
    fontSize: 36,
    marginRight: 16,
  },
  featureText: {
    flex: 1,
  },
  featureTitle: {
    fontSize: SIZES.base,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 4,
  },
  featureDesc: {
    fontSize: SIZES.sm,
    color: COLORS.textSecondary,
  },
  disclaimer: {
    marginHorizontal: SIZES.padding,
    marginTop: 20,
    padding: 12,
    backgroundColor: COLORS.warning + '15',
    borderRadius: SIZES.radius,
  },
  disclaimerText: {
    fontSize: SIZES.xs,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 18,
  },
});
