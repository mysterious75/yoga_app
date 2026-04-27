import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  SafeAreaView, Dimensions, Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SIZES, SHADOWS } from '../utils/theme';
import { useTranslation } from 'react-i18next';
import { getFavorites, toggleFavorite } from '../utils/favorites';

const { width } = Dimensions.get('window');

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
    <View style={styles.animationOuter}>
      <LinearGradient
        colors={['rgba(27,67,50,0.4)', 'rgba(10,10,10,0.8)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.animationContainer}
      >
        <Animated.View style={{ opacity: fadeAnim, transform: [{ scale: scaleAnim }] }}>
          <Text style={styles.animationEmoji}>◎</Text>
          <Text style={styles.animationText}>Follow the steps below</Text>
        </Animated.View>
      </LinearGradient>
    </View>
  );
};

export default function YogaDetailScreen({ route, navigation }) {
  const { pose } = route.params;
  const { i18n } = useTranslation();
  const isHindi = i18n.language === 'hi';
  const [activeTab, setActiveTab] = useState('steps');
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    getFavorites().then(favs => setIsFav((favs.yoga || []).includes(pose.id)));
  }, []);

  const handleToggleFav = async () => {
    const newList = await toggleFavorite('yoga', pose.id);
    setIsFav(newList.includes(pose.id));
  };

  const difficultyStars = '●'.repeat(pose.difficulty);

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
            <Text style={styles.headerTitle}>{isHindi ? pose.nameHi : pose.name}</Text>
            <Text style={styles.headerSubtitle}>{pose.sanskrit}</Text>
          </View>
          <View style={styles.calorieBadge}>
            <Text style={styles.calorieText}>⬡ {pose.caloriesPerMin}/min</Text>
          </View>
          <TouchableOpacity style={styles.favBtn} onPress={handleToggleFav}>
            <Text style={[styles.favIcon, isFav && { color: COLORS.error }]}>{isFav ? '♥' : '♡'}</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Animation Area */}
        <YogaAnimation poseId={pose.id} />

        {/* Quick Info */}
        <View style={styles.infoRow}>
          {[
            { icon: '⏱', label: isHindi ? 'अवधि' : 'Duration', value: pose.duration },
            { icon: '⬡', label: isHindi ? 'कैलोरी' : 'Calories', value: `${pose.caloriesPerMin}/min` },
            { icon: '◉', label: isHindi ? 'कठिनाई' : 'Difficulty', value: difficultyStars },
          ].map((info, i) => (
            <View key={i} style={styles.infoCard}>
              <Text style={styles.infoIcon}>{info.icon}</Text>
              <Text style={styles.infoLabel}>{info.label}</Text>
              <Text style={styles.infoValue}>{info.value}</Text>
            </View>
          ))}
        </View>

        {/* Tab Buttons - underline style */}
        <View style={styles.tabRow}>
          {['steps', 'benefits', 'precautions'].map(tab => (
            <TouchableOpacity
              key={tab}
              style={styles.tabBtn}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
                {tab === 'steps' ? (isHindi ? '⊞ चरण' : '⊞ Steps')
                  : tab === 'benefits' ? (isHindi ? '✓ फ़ायदे' : '✓ Benefits')
                  : (isHindi ? '⚠ सावधानी' : '⚠ Precautions')}
              </Text>
              {activeTab === tab && <View style={styles.tabUnderline} />}
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
                  <Text style={styles.bullet}>✓</Text>
                  <Text style={styles.benefitText}>{benefit}</Text>
                </View>
              ))}
            </View>
          )}

          {activeTab === 'precautions' && (
            <View>
              {(isHindi ? pose.precautionsHi : pose.precautions).map((precaution, index) => (
                <View key={index} style={styles.benefitRow}>
                  <Text style={[styles.bullet, { color: COLORS.warning }]}>⚠</Text>
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
              <LinearGradient
                key={index}
                colors={['rgba(45,106,79,0.3)', 'rgba(45,106,79,0.1)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.tag}
              >
                <Text style={[styles.tagText, { color: COLORS.primaryGlow }]}>{cat.replace(/_/g, ' ')}</Text>
              </LinearGradient>
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
  headerSubtitle: { fontSize: SIZES.xs, color: 'rgba(255,255,255,0.6)', fontStyle: 'italic' },
  calorieBadge: {
    backgroundColor: 'rgba(212,163,115,0.2)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: SIZES.radiusFull,
  },
  calorieText: { fontSize: SIZES.xs, fontWeight: '700', color: COLORS.accent },
  favBtn: { padding: 8 },
  favIcon: { fontSize: 22, color: '#fff' },
  animationOuter: {
    margin: SIZES.padding,
    borderRadius: SIZES.radiusLg,
    overflow: 'hidden',
    ...SHADOWS.glow,
  },
  animationContainer: {
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: SIZES.radiusLg,
  },
  animationEmoji: { fontSize: 64, color: COLORS.primaryGlow, textAlign: 'center' },
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
    padding: 14,
    borderRadius: SIZES.radius,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.surfaceBorder,
    ...SHADOWS.card,
  },
  infoIcon: { fontSize: 20, color: COLORS.primaryGlow, marginBottom: 6 },
  infoLabel: { fontSize: SIZES.xs, color: COLORS.textSecondary },
  infoValue: { fontSize: SIZES.sm, fontWeight: '700', color: COLORS.text, marginTop: 2 },
  tabRow: {
    flexDirection: 'row',
    paddingHorizontal: SIZES.padding,
    gap: 0,
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.surfaceBorder,
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  tabText: { fontSize: SIZES.sm, fontWeight: '600', color: COLORS.textSecondary },
  tabTextActive: { color: COLORS.text },
  tabUnderline: {
    position: 'absolute',
    bottom: 0,
    left: '20%',
    right: '20%',
    height: 3,
    backgroundColor: COLORS.primaryGlow,
    borderRadius: 2,
  },
  contentCard: {
    backgroundColor: COLORS.surface,
    marginHorizontal: SIZES.padding,
    padding: 18,
    borderRadius: SIZES.radius,
    borderWidth: 1,
    borderColor: COLORS.surfaceBorder,
    ...SHADOWS.card,
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
    backgroundColor: COLORS.primaryDark,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  stepNumText: { fontSize: SIZES.sm, fontWeight: '700', color: COLORS.primaryGlow },
  stepText: { flex: 1, fontSize: SIZES.md, color: COLORS.text, lineHeight: 22 },
  benefitRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  bullet: { marginRight: 10, fontSize: 16, marginTop: 2, color: COLORS.primaryGlow },
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
    backgroundColor: COLORS.surface,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: SIZES.radiusFull,
    borderWidth: 1,
    borderColor: COLORS.surfaceBorder,
  },
  tagText: { fontSize: SIZES.xs, fontWeight: '600', color: COLORS.textSecondary, textTransform: 'capitalize' },
});
