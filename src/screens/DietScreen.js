import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  SafeAreaView, TextInput, Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SIZES, SHADOWS } from '../utils/theme';
import { DIET_PLANS } from '../data/dietPlans';
import { useTranslation } from 'react-i18next';

const PLAN_CARDS = [
  { id: 'weight_loss_veg', icon: '◇', gradient: ['#1B4332', '#52B788'] },
  { id: 'weight_loss_nonveg', icon: '◇', gradient: ['#8B4513', '#D4A373'] },
  { id: 'muscle_gain', icon: '◇', gradient: ['#2D1B4E', '#7B2CBF'] },
];

export default function DietScreen({ navigation }) {
  const { i18n } = useTranslation();
  const isHindi = i18n.language === 'hi';
  const [showCalc, setShowCalc] = useState(false);
  const [calcWeight, setCalcWeight] = useState('');
  const [calcHeight, setCalcHeight] = useState('');
  const [calcAge, setCalcAge] = useState('');
  const [calcGender, setCalcGender] = useState('male');
  const [calcActivity, setCalcActivity] = useState('moderate');
  const [calcResult, setCalcResult] = useState(null);

  const calculateCalories = () => {
    const w = parseFloat(calcWeight);
    const h = parseFloat(calcHeight);
    const a = parseFloat(calcAge);
    if (!w || !h || !a) {
      Alert.alert(isHindi ? 'त्रुटि' : 'Error', isHindi ? 'सभी फ़ील्ड भरें' : 'Fill all fields');
      return;
    }
    let bmr = calcGender === 'male'
      ? (10 * w) + (6.25 * h) - (5 * a) + 5
      : (10 * w) + (6.25 * h) - (5 * a) - 161;
    
    const multipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      very_active: 1.9,
    };
    const tdee = Math.round(bmr * (multipliers[calcActivity] || 1.55));
    const loseWeight = tdee - 500;
    const gainWeight = tdee + 300;
    setCalcResult({ tdee, loseWeight, gainWeight });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>{isHindi ? '◇ आहार योजनाएं' : '◇ Diet Plans'}</Text>
          <Text style={styles.subtitle}>{isHindi ? 'प्रमाणित पोषण दिशानिर्देशों पर आधारित' : 'Based on certified nutrition guidelines'}</Text>
        </View>

        {/* Calorie Calculator */}
        <TouchableOpacity
          style={styles.calcCard}
          onPress={() => setShowCalc(!showCalc)}
        >
          <LinearGradient
            colors={['rgba(76,201,240,0.15)', 'rgba(26,26,46,0.8)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.calcGradient}
          >
            <View style={styles.calcAccent} />
            <View style={styles.calcInner}>
              <Text style={styles.calcIcon}>◈</Text>
              <View style={styles.calcInfo}>
                <Text style={styles.calcTitle}>{isHindi ? 'कैलोरी कैलकुलेटर' : 'Calorie Calculator'}</Text>
                <Text style={styles.calcDesc}>{isHindi ? 'अपनी दैनिक कैलोरी ज़रूरत जानें' : 'Know your daily calorie needs'}</Text>
              </View>
              <Text style={styles.arrowIcon}>{showCalc ? '▴' : '▾'}</Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>

        {showCalc && (
          <View style={styles.calcForm}>
            <View style={styles.calcRow}>
              <View style={styles.calcField}>
                <Text style={styles.calcLabel}>{isHindi ? 'वज़न (kg)' : 'Weight (kg)'}</Text>
                <TextInput
                  style={styles.calcInput}
                  value={calcWeight}
                  onChangeText={setCalcWeight}
                  keyboardType="numeric"
                  placeholder="70"
                  placeholderTextColor={COLORS.textLight}
                />
              </View>
              <View style={styles.calcField}>
                <Text style={styles.calcLabel}>{isHindi ? 'ऊंचाई (cm)' : 'Height (cm)'}</Text>
                <TextInput
                  style={styles.calcInput}
                  value={calcHeight}
                  onChangeText={setCalcHeight}
                  keyboardType="numeric"
                  placeholder="170"
                  placeholderTextColor={COLORS.textLight}
                />
              </View>
            </View>
            <View style={styles.calcRow}>
              <View style={styles.calcField}>
                <Text style={styles.calcLabel}>{isHindi ? 'उम्र' : 'Age'}</Text>
                <TextInput
                  style={styles.calcInput}
                  value={calcAge}
                  onChangeText={setCalcAge}
                  keyboardType="numeric"
                  placeholder="25"
                  placeholderTextColor={COLORS.textLight}
                />
              </View>
              <View style={styles.calcField}>
                <Text style={styles.calcLabel}>{isHindi ? 'लिंग' : 'Gender'}</Text>
                <View style={styles.genderRow}>
                  <TouchableOpacity
                    style={[styles.genderBtn, calcGender === 'male' && styles.genderBtnActive]}
                    onPress={() => setCalcGender('male')}
                  >
                    <Text style={[styles.genderText, calcGender === 'male' && { color: '#fff' }]}>
                      {isHindi ? 'पुरुष' : 'Male'}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.genderBtn, calcGender === 'female' && styles.genderBtnActive]}
                    onPress={() => setCalcGender('female')}
                  >
                    <Text style={[styles.genderText, calcGender === 'female' && { color: '#fff' }]}>
                      {isHindi ? 'महिला' : 'Female'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* Activity Level */}
            <Text style={[styles.calcLabel, { marginBottom: 8, marginHorizontal: SIZES.padding }]}>
              {isHindi ? '● गतिविधि स्तर' : '● Activity Level'}
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.activityRow}>
              {[
                { id: 'sedentary', en: 'Sedentary', hi: 'कम', icon: '○' },
                { id: 'light', en: 'Light', hi: 'हल्का', icon: '◎' },
                { id: 'moderate', en: 'Moderate', hi: 'मध्यम', icon: '◉' },
                { id: 'active', en: 'Active', hi: 'सक्रिय', icon: '●' },
                { id: 'very_active', en: 'Very Active',hi: 'बहुत सक्रिय', icon: '⬤' },
              ].map(level => (
                <TouchableOpacity
                  key={level.id}
                  style={[styles.activityChip, calcActivity === level.id && styles.activityChipActive]}
                  onPress={() => setCalcActivity(level.id)}
                >
                  <Text style={[styles.activityIcon, calcActivity === level.id && { color: '#fff' }]}>{level.icon}</Text>
                  <Text style={[styles.activityText, calcActivity === level.id && { color: '#fff' }]}>
                    {isHindi ? level.hi : level.en}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <TouchableOpacity style={styles.calcSubmitBtn} onPress={calculateCalories}>
              <LinearGradient
                colors={['#16213E', '#4CC9F0']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.calcSubmitGradient}
              >
                <Text style={styles.calcSubmitText}>
                  {isHindi ? '◈ गणना करें' : '◈ Calculate'}
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            {calcResult && (
              <View style={styles.calcResult}>
                {[
                  { label: isHindi ? '🔄 मेंटेनेंस' : '🔄 Maintenance', value: `${calcResult.tdee} ${isHindi ? 'कैलोरी' : 'cal'}`, color: COLORS.text },
                  { label: isHindi ? '▾ वज़न घटाएं' : '▾ Lose Weight', value: `${calcResult.loseWeight} ${isHindi ? 'कैलोरी' : 'cal'}`, color: COLORS.success },
                  { label: isHindi ? '▴ वज़न बढ़ाएं' : '▴ Gain Weight', value: `${calcResult.gainWeight} ${isHindi ? 'कैलोरी' : 'cal'}`, color: COLORS.accent },
                ].map((r, i) => (
                  <View key={i} style={styles.resultRow}>
                    <Text style={styles.resultLabel}>{r.label}</Text>
                    <Text style={[styles.resultValue, { color: r.color }]}>{r.value}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        )}

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
              <LinearGradient
                colors={card.gradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.planIconWrap}
              >
                <Text style={styles.planIcon}>{card.icon}</Text>
              </LinearGradient>
              <View style={styles.planInfo}>
                <Text style={styles.planName}>{isHindi ? plan.nameHi : plan.name}</Text>
                <Text style={styles.planDesc}>{isHindi ? plan.descriptionHi : plan.description}</Text>
                <View style={styles.planMeta}>
                  <Text style={styles.planCalories}>⬡ {plan.calories} {isHindi ? 'कैलोरी/दिन' : 'cal/day'}</Text>
                  <Text style={styles.planDays}>⊞ 7 {isHindi ? 'दिन' : 'days'}</Text>
                </View>
              </View>
              <Text style={styles.arrowIcon}>›</Text>
            </TouchableOpacity>
          );
        })}

        {/* Nutrition Tips */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{isHindi ? '◈ पोषण टिप्स' : '◈ Nutrition Tips'}</Text>
          <View style={styles.sectionDivider} />
          {[
            { icon: '◉', en: 'Drink 3-4 liters of water daily', hi: 'रोज़ 3-4 लीटर पानी पिएं' },
            { icon: '⏱', en: 'Eat at regular intervals (every 3-4 hours)', hi: 'नियमित अंतराल पर खाएं (हर 3-4 घंटे)' },
            { icon: '◇', en: 'Include salad in every meal', hi: 'हर भोजन में सलाद शामिल करें' },
            { icon: '✕', en: 'Avoid processed and packaged food', hi: 'प्रोसेस्ड और पैकेज्ड फूड से बचें' },
            { icon: '☽', en: 'Don\'t eat after 8 PM', hi: 'रात 8 बजे के बाद न खाएं' },
          ].map((tip, index) => (
            <View key={index} style={styles.tipRow}>
              <View style={styles.tipIconWrap}>
                <Text style={styles.tipIcon}>{tip.icon}</Text>
              </View>
              <Text style={styles.tipText}>{isHindi ? tip.hi : tip.en}</Text>
            </View>
          ))}
        </View>

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
    marginHorizontal: SIZES.padding,
    marginTop: 16,
    borderRadius: SIZES.radius,
    overflow: 'hidden',
    ...SHADOWS.card,
  },
  calcGradient: {
    flexDirection: 'row',
    borderRadius: SIZES.radius,
    overflow: 'hidden',
  },
  calcAccent: {
    width: 4,
    backgroundColor: COLORS.info,
  },
  calcInner: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
  },
  calcIcon: { fontSize: 28, color: COLORS.info, marginRight: 12 },
  calcInfo: { flex: 1 },
  calcTitle: { fontSize: SIZES.base, fontWeight: '700', color: COLORS.text },
  calcDesc: { fontSize: SIZES.xs, color: COLORS.textSecondary },
  arrowIcon: { fontSize: 14, color: COLORS.info, marginLeft: 8 },
  calcForm: {
    marginHorizontal: SIZES.padding,
    marginTop: 10,
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radius,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: COLORS.surfaceBorder,
    ...SHADOWS.card,
  },
  calcRow: {
    flexDirection: 'row',
    paddingHorizontal: SIZES.padding,
    gap: 12,
    marginBottom: 12,
  },
  calcField: { flex: 1 },
  calcLabel: { fontSize: SIZES.sm, color: COLORS.textSecondary, marginBottom: 6 },
  calcInput: {
    backgroundColor: COLORS.backgroundAlt,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: SIZES.radius,
    fontSize: SIZES.md,
    color: COLORS.text,
    borderWidth: 1,
    borderColor: COLORS.surfaceBorder,
  },
  genderRow: { flexDirection: 'row', gap: 8 },
  genderBtn: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.backgroundAlt,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.surfaceBorder,
  },
  genderBtnActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  genderText: { fontSize: SIZES.sm, fontWeight: '600', color: COLORS.text },
  activityRow: {
    paddingHorizontal: SIZES.padding,
    gap: 8,
    marginBottom: 14,
  },
  activityChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: SIZES.radiusFull,
    backgroundColor: COLORS.backgroundAlt,
    borderWidth: 1,
    borderColor: COLORS.surfaceBorder,
  },
  activityChipActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  activityIcon: { fontSize: 12, marginRight: 4, color: COLORS.textSecondary },
  activityText: { fontSize: SIZES.xs, fontWeight: '600', color: COLORS.text },
  calcSubmitBtn: {
    marginHorizontal: SIZES.padding,
    borderRadius: SIZES.radius,
    overflow: 'hidden',
  },
  calcSubmitGradient: {
    paddingVertical: 14,
    alignItems: 'center',
    borderRadius: SIZES.radius,
  },
  calcSubmitText: { fontSize: SIZES.md, fontWeight: '700', color: '#fff' },
  calcResult: {
    marginHorizontal: SIZES.padding,
    marginTop: 12,
    padding: 14,
    backgroundColor: COLORS.backgroundAlt,
    borderRadius: SIZES.radius,
    borderWidth: 1,
    borderColor: COLORS.surfaceBorder,
  },
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  resultLabel: { fontSize: SIZES.md, color: COLORS.textSecondary },
  resultValue: { fontSize: SIZES.md, fontWeight: '700', color: COLORS.text },
  planCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    marginHorizontal: SIZES.padding,
    marginTop: 14,
    padding: 16,
    borderRadius: SIZES.radiusLg,
    borderWidth: 1,
    borderColor: COLORS.surfaceBorder,
    ...SHADOWS.card,
  },
  planIconWrap: {
    width: 56,
    height: 56,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  planIcon: { fontSize: 28, color: '#fff' },
  planInfo: { flex: 1, marginLeft: 14 },
  planName: { fontSize: SIZES.base, fontWeight: '700', color: COLORS.text },
  planDesc: { fontSize: SIZES.xs, color: COLORS.textSecondary, marginTop: 2 },
  planMeta: { flexDirection: 'row', marginTop: 6, gap: 12 },
  planCalories: { fontSize: SIZES.xs, fontWeight: '600', color: COLORS.accent },
  planDays: { fontSize: SIZES.xs, color: COLORS.textSecondary },
  section: {
    marginTop: 28,
    paddingHorizontal: SIZES.padding,
  },
  sectionTitle: {
    fontSize: SIZES.lg,
    fontWeight: '800',
    color: COLORS.text,
  },
  sectionDivider: {
    width: 32,
    height: 3,
    backgroundColor: COLORS.accent,
    borderRadius: 2,
    marginTop: 8,
    marginBottom: 14,
  },
  tipRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: COLORS.surface,
    padding: 14,
    borderRadius: SIZES.radius,
    borderWidth: 1,
    borderColor: COLORS.surfaceBorder,
  },
  tipIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: COLORS.primaryDark + '40',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  tipIcon: { fontSize: 16, color: COLORS.primaryGlow },
  tipText: { flex: 1, fontSize: SIZES.md, color: COLORS.text },
});
