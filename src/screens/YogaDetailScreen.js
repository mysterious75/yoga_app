import React, { useState, useRef } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  SafeAreaView, Dimensions, Animated,
} from 'react-native';
import { COLORS, SIZES, SHADOWS } from '../utils/theme';
import { useTranslation } from 'react-i18next';

const { width } = Dimensions.get('window');

// Animated yoga pose component using simple CSS-like animation
const YogaAnimation = ({ poseId }) => {
  const fadeAnim = useRef(new Animated.Value(0.3)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;

  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(fadeAnim, { toValue: 1, duration: 1500, useNativeDriver: true }),
          Animated.timing(scaleAnim, { toValue: 1.02, duration: 1500, useNativeDriver: true }),
        ]),
        Animated.parallel([
          Animated.timing(fadeAnim, { toValue: 0.6, duration: 1500, useNativeDriver: true }),
          Animated.timing(scaleAnim, { toValue: 0.98, duration: 1500, useNativeDriver: true }),
        ]),
      ])
    ).start();
  }, []);

  return (
    <Animated.View style={[styles.animationContainer, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
      <Text style={styles.animationEmoji}>🧘‍♀️</Text>
      <Text style={styles.animationText}>Follow the steps below</Text>
    </Animated.View>
  );
};

export default function YogaDetailScreen({ route, navigation }) {
  const { pose } = route.params;
  const { i18n } = useTranslation();
  const isHindi = i18n.language === 'hi';
  const [activeTab, setActiveTab] = useState('steps');

  const difficultyStars = '⭐'.repeat(pose.difficulty);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Text style={styles.headerTitle}>{isHindi ? pose.nameHi : pose.name}</Text>
          <Text style={styles.headerSubtitle}>{pose.sanskrit}</Text>
        </View>
        <View style={styles.calorieBadge}>
          <Text style={styles.calorieText}>🔥 {pose.caloriesPerMin}/min</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Animation Area */}
        <YogaAnimation poseId={pose.id} />

        {/* Quick Info */}
        <View style={styles.infoRow}>
          <View style={styles.infoCard}>
            <Text style={styles.infoIcon}>⏱️</Text>
            <Text style={styles.infoLabel}>{isHindi ? 'अवधि' : 'Duration'}</Text>
            <Text style={styles.infoValue}>{pose.duration}</Text>
          </View>
          <View style={styles.infoCard}>
            <Text style={styles.infoIcon}>🔥</Text>
            <Text style={styles.infoLabel}>{isHindi ? 'कैलोरी' : 'Calories'}</Text>
            <Text style={styles.infoValue}>{pose.caloriesPerMin}/min</Text>
          </View>
          <View style={styles.infoCard}>
            <Text style={styles.infoIcon}>📊</Text>
            <Text style={styles.infoLabel}>{isHindi ? 'कठिनाई' : 'Difficulty'}</Text>
            <Text style={styles.infoValue}>{difficultyStars}</Text>
          </View>
        </View>

        {/* Tab Buttons */}
        <View style={styles.tabRow}>
          {['steps', 'benefits', 'precautions'].map(tab => (
            <TouchableOpacity
              key={tab}
              style={[styles.tabBtn, activeTab === tab && styles.tabBtnActive]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
                {tab === 'steps' ? (isHindi ? '📋 चरण' : '📋 Steps')
                  : tab === 'benefits' ? (isHindi ? '✅ फ़ायदे' : '✅ Benefits')
                  : (isHindi ? '⚠️ सावधानी' : '⚠️ Precautions')}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Tab Content */}
        <View style={styles.contentCard}>
          {activeTab === 'steps' && (
            <View>
              {(isHindi ? pose.stepsHi : pose.steps).map((step, index) => (
                <View key={index} style={styles.stepRow}>
                  <View style={styles.stepNumber}>
                    <Text style={styles.stepNumText}>{index + 1}</Text>
                  </View>
                  <Text style={styles.stepText}>{step}</Text>
                </View>
              ))}
            </View>
          )}

          {activeTab === 'benefits' && (
            <View>
              {(isHindi ? pose.benefitsHi : pose.benefits).map((benefit, index) => (
                <View key={index} style={styles.benefitRow}>
                  <Text style={styles.bullet}>✅</Text>
                  <Text style={styles.benefitText}>{benefit}</Text>
                </View>
              ))}
            </View>
          )}

          {activeTab === 'precautions' && (
            <View>
              {(isHindi ? pose.precautionsHi : pose.precautions).map((precaution, index) => (
                <View key={index} style={styles.benefitRow}>
                  <Text style={styles.bullet}>⚠️</Text>
                  <Text style={styles.benefitText}>{precaution}</Text>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Body Parts Tags */}
        <View style={styles.tagsContainer}>
          <Text style={styles.tagsTitle}>{isHindi ? 'शरीर के अंग' : 'Body Parts'}</Text>
          <View style={styles.tagsRow}>
            {pose.bodyPart.map((part, index) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagText}>{part.replace(/_/g, ' ')}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Categories */}
        <View style={styles.tagsContainer}>
          <Text style={styles.tagsTitle}>{isHindi ? 'श्रेणियां' : 'Categories'}</Text>
          <View style={styles.tagsRow}>
            {pose.category.map((cat, index) => (
              <View key={index} style={[styles.tag, { backgroundColor: COLORS.primary + '20' }]}>
                <Text style={[styles.tagText, { color: COLORS.primary }]}>{cat.replace(/_/g, ' ')}</Text>
              </View>
            ))}
          </View>
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
  headerSubtitle: { fontSize: SIZES.xs, color: COLORS.textSecondary, fontStyle: 'italic' },
  calorieBadge: {
    backgroundColor: COLORS.primary + '15',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: SIZES.radiusFull,
  },
  calorieText: { fontSize: SIZES.xs, fontWeight: '600', color: COLORS.primary },
  animationContainer: {
    height: 220,
    backgroundColor: COLORS.primary + '08',
    alignItems: 'center',
    justifyContent: 'center',
    margin: SIZES.padding,
    borderRadius: SIZES.radiusLg,
  },
  animationEmoji: { fontSize: 80 },
  animationText: { fontSize: SIZES.sm, color: COLORS.textSecondary, marginTop: 8 },
  infoRow: {
    flexDirection: 'row',
    paddingHorizontal: SIZES.padding,
    gap: 10,
    marginBottom: 16,
  },
  infoCard: {
    flex: 1,
    backgroundColor: COLORS.surface,
    padding: 12,
    borderRadius: SIZES.radius,
    alignItems: 'center',
    ...SHADOWS.small,
  },
  infoIcon: { fontSize: 20, marginBottom: 4 },
  infoLabel: { fontSize: SIZES.xs, color: COLORS.textSecondary },
  infoValue: { fontSize: SIZES.sm, fontWeight: '700', color: COLORS.text, marginTop: 2 },
  tabRow: {
    flexDirection: 'row',
    paddingHorizontal: SIZES.padding,
    gap: 8,
    marginBottom: 12,
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: SIZES.radiusFull,
    backgroundColor: COLORS.surface,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  tabBtnActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  tabText: { fontSize: SIZES.sm, fontWeight: '600', color: COLORS.text },
  tabTextActive: { color: '#fff' },
  contentCard: {
    backgroundColor: COLORS.surface,
    marginHorizontal: SIZES.padding,
    padding: 16,
    borderRadius: SIZES.radius,
    ...SHADOWS.small,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  stepNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  stepNumText: { fontSize: SIZES.sm, fontWeight: '700', color: '#fff' },
  stepText: { flex: 1, fontSize: SIZES.md, color: COLORS.text, lineHeight: 22 },
  benefitRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  bullet: { marginRight: 10, fontSize: 16, marginTop: 2 },
  benefitText: { flex: 1, fontSize: SIZES.md, color: COLORS.text, lineHeight: 22 },
  tagsContainer: {
    paddingHorizontal: SIZES.padding,
    marginTop: 16,
  },
  tagsTitle: {
    fontSize: SIZES.base,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 8,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    backgroundColor: COLORS.accent + '20',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: SIZES.radiusFull,
  },
  tagText: { fontSize: SIZES.xs, fontWeight: '600', color: COLORS.accent, textTransform: 'capitalize' },
});
